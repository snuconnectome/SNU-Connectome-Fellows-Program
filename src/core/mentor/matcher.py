"""
Mentor-Fellow Matching System
=============================

Optimal matching between mentors and fellows based on
research interests, expertise, and availability.
"""

import numpy as np
from typing import List, Dict, Tuple, Optional
from scipy.optimize import linear_sum_assignment
from loguru import logger

from .models import Mentor, MentorMatch
from ..fellow.models import Fellow


class MentorMatcher:
    """Matches Fellows with optimal Mentors using Hungarian algorithm."""
    
    def __init__(self, mentors: List[Mentor]):
        self.mentors = {m.id: m for m in mentors}
        
    def compute_compatibility(
        self, 
        fellow: Fellow, 
        mentor: Mentor
    ) -> Tuple[float, Dict[str, float]]:
        """
        Compute compatibility score between a Fellow and Mentor.
        
        Returns:
            Tuple of (total_score, score_breakdown)
        """
        scores = {}
        
        # 1. Research Interest Match (40%)
        fellow_interests = set(
            ri.area.lower() for ri in fellow.application.research_interests
        )
        mentor_keywords = set(kw.lower() for kw in mentor.research_keywords)
        mentor_expertise = set(
            e.area.lower() for e in mentor.expertise_areas
        )
        mentor_all = mentor_keywords | mentor_expertise
        
        if mentor_all:
            interest_overlap = len(fellow_interests & mentor_all) / len(mentor_all)
        else:
            interest_overlap = 0.0
        scores["interest_match"] = interest_overlap * 40
        
        # 2. Technical Skills Match (30%)
        fellow_skills = set(
            s.name.lower() for s in fellow.application.programming_skills +
            fellow.application.ml_skills + fellow.application.neuro_tools
        )
        mentor_skills = set(
            e.area.lower() for e in mentor.expertise_areas
        )
        
        if mentor_skills:
            skill_overlap = len(fellow_skills & mentor_skills) / len(mentor_skills)
        else:
            skill_overlap = 0.0
        scores["skill_match"] = skill_overlap * 30
        
        # 3. Availability (15%)
        availability_score = 15.0 if mentor.available_slots > 0 else 0.0
        scores["availability"] = availability_score
        
        # 4. Language/Culture (10%)
        if mentor.speaks_korean:
            scores["language"] = 10.0
        elif any("korea" in kw.lower() for kw in mentor.research_keywords):
            scores["language"] = 5.0
        else:
            scores["language"] = 0.0
        
        # 5. Career Alignment (5%)
        # Simple heuristic based on affiliation
        prestigious_affiliations = ["princeton", "mit", "stanford", "harvard", "bnl"]
        if any(aff in mentor.affiliation.lower() for aff in prestigious_affiliations):
            scores["career"] = 5.0
        else:
            scores["career"] = 2.5
        
        total_score = sum(scores.values())
        return total_score, scores
    
    def match_fellow(
        self, 
        fellow: Fellow,
        top_k: int = 3
    ) -> List[MentorMatch]:
        """
        Find best mentor matches for a single Fellow.
        
        Args:
            fellow: Fellow to match
            top_k: Number of matches to return
            
        Returns:
            List of MentorMatch objects, sorted by compatibility
        """
        matches = []
        
        for mentor_id, mentor in self.mentors.items():
            if not mentor.active:
                continue
                
            score, breakdown = self.compute_compatibility(fellow, mentor)
            
            # Find matching areas
            fellow_interests = set(
                ri.area.lower() for ri in fellow.application.research_interests
            )
            mentor_keywords = set(kw.lower() for kw in mentor.research_keywords)
            matching = list(fellow_interests & mentor_keywords)
            
            match = MentorMatch(
                fellow_id=fellow.id,
                mentor_id=mentor_id,
                compatibility_score=score,
                matching_expertise=matching[:5],  # Top 5
                matching_interests=matching[:5],
                expertise_match_score=breakdown.get("skill_match", 0),
                interest_match_score=breakdown.get("interest_match", 0),
                availability_score=breakdown.get("availability", 0),
                language_score=breakdown.get("language", 0),
                is_primary=False,  # Will be set later
                recommendation_notes=f"Compatibility: {score:.1f}/100"
            )
            matches.append(match)
        
        # Sort by score descending
        matches.sort(key=lambda m: m.compatibility_score, reverse=True)
        
        # Mark top match as primary
        if matches:
            matches[0].is_primary = True
        
        return matches[:top_k]
    
    def match_all_fellows(
        self, 
        fellows: List[Fellow],
        ensure_unique: bool = True
    ) -> Dict[str, MentorMatch]:
        """
        Optimal matching of all Fellows to Mentors.
        
        Uses Hungarian algorithm when ensure_unique=True to maximize
        overall compatibility while ensuring each mentor has at most
        one primary mentee (can have more secondary).
        
        Args:
            fellows: List of Fellows to match
            ensure_unique: If True, use Hungarian algorithm for 1:1 matching
            
        Returns:
            Dict mapping fellow_id to their primary MentorMatch
        """
        if not ensure_unique:
            # Simple greedy matching
            return {
                f.id: self.match_fellow(f, top_k=1)[0]
                for f in fellows
                if self.match_fellow(f, top_k=1)
            }
        
        # Build cost matrix for Hungarian algorithm
        mentor_list = [m for m in self.mentors.values() if m.active]
        
        if len(fellows) > len(mentor_list):
            logger.warning(
                f"More fellows ({len(fellows)}) than mentors ({len(mentor_list)}). "
                "Some fellows will share mentors."
            )
        
        # Cost matrix: rows=fellows, cols=mentors
        # We want to maximize compatibility, so cost = 100 - compatibility
        n_fellows = len(fellows)
        n_mentors = len(mentor_list)
        
        cost_matrix = np.zeros((n_fellows, n_mentors))
        
        for i, fellow in enumerate(fellows):
            for j, mentor in enumerate(mentor_list):
                score, _ = self.compute_compatibility(fellow, mentor)
                cost_matrix[i, j] = 100 - score  # Lower cost = better match
        
        # Run Hungarian algorithm
        row_ind, col_ind = linear_sum_assignment(cost_matrix)
        
        # Build results
        results = {}
        for f_idx, m_idx in zip(row_ind, col_ind):
            fellow = fellows[f_idx]
            mentor = mentor_list[m_idx]
            score = 100 - cost_matrix[f_idx, m_idx]
            
            # Get full breakdown
            _, breakdown = self.compute_compatibility(fellow, mentor)
            
            match = MentorMatch(
                fellow_id=fellow.id,
                mentor_id=mentor.id,
                compatibility_score=score,
                expertise_match_score=breakdown.get("skill_match", 0),
                interest_match_score=breakdown.get("interest_match", 0),
                availability_score=breakdown.get("availability", 0),
                language_score=breakdown.get("language", 0),
                is_primary=True,
                recommendation_notes=f"Optimal match via Hungarian algorithm"
            )
            results[fellow.id] = match
            
            logger.info(
                f"Matched {fellow.id} -> {mentor.name} "
                f"(score: {score:.1f})"
            )
        
        return results
    
    def get_mentor_workload(self) -> Dict[str, Dict]:
        """Get current mentoring workload for all mentors."""
        return {
            mentor_id: {
                "name": mentor.name,
                "current_fellows": len(mentor.current_fellows),
                "max_fellows": mentor.max_fellows,
                "available_slots": mentor.available_slots,
                "total_hours": mentor.total_mentoring_hours,
            }
            for mentor_id, mentor in self.mentors.items()
        }

