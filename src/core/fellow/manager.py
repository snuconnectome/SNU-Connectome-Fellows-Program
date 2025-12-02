"""
Fellow Manager
==============

Manages Fellow lifecycle including applications, evaluations,
and progress tracking.
"""

import json
from datetime import date, datetime
from pathlib import Path
from typing import List, Optional, Dict, Any
from loguru import logger

from .models import Fellow, FellowApplication, FellowEvaluation, FellowStatus


class FellowManager:
    """Manages Fellows in the program."""
    
    def __init__(self, data_dir: Path = Path("data")):
        self.data_dir = data_dir
        self.fellows_dir = data_dir / "fellows"
        self.applications_dir = data_dir / "applications"
        
        # Create directories
        self.fellows_dir.mkdir(parents=True, exist_ok=True)
        self.applications_dir.mkdir(parents=True, exist_ok=True)
        
        # Load existing fellows
        self.fellows: Dict[str, Fellow] = {}
        self._load_fellows()
        
    def _load_fellows(self) -> None:
        """Load all fellows from disk."""
        for file_path in self.fellows_dir.glob("*.json"):
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    fellow = Fellow(**data)
                    self.fellows[fellow.id] = fellow
            except Exception as e:
                logger.error(f"Failed to load fellow from {file_path}: {e}")
    
    def _save_fellow(self, fellow: Fellow) -> None:
        """Save a fellow to disk."""
        file_path = self.fellows_dir / f"{fellow.id}.json"
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(fellow.model_dump(mode='json'), f, ensure_ascii=False, indent=2, default=str)
        logger.info(f"Saved fellow {fellow.id} to {file_path}")
    
    def submit_application(self, application: FellowApplication) -> str:
        """Submit a new application."""
        # Generate application ID
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        app_id = f"APP-{timestamp}-{application.student_id}"
        
        # Save application
        file_path = self.applications_dir / f"{app_id}.json"
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(application.model_dump(mode='json'), f, ensure_ascii=False, indent=2, default=str)
        
        logger.info(f"Application submitted: {app_id}")
        return app_id
    
    def review_application(
        self, 
        app_id: str, 
        scores: Dict[str, float],
        reviewer: str,
        comments: str
    ) -> Dict[str, Any]:
        """Review an application and calculate scores."""
        # Load application
        file_path = self.applications_dir / f"{app_id}.json"
        if not file_path.exists():
            raise FileNotFoundError(f"Application not found: {app_id}")
        
        with open(file_path, 'r', encoding='utf-8') as f:
            app_data = json.load(f)
        
        # Calculate total score
        weights = {
            "academic": 0.20,
            "motivation": 0.25,
            "research_plan": 0.25,
            "technical": 0.20,
            "english": 0.10,
        }
        
        total_score = sum(
            scores.get(key, 0) * weight 
            for key, weight in weights.items()
        )
        
        review = {
            "app_id": app_id,
            "reviewer": reviewer,
            "scores": scores,
            "weights": weights,
            "total_score": total_score,
            "comments": comments,
            "reviewed_at": datetime.now().isoformat(),
            "recommendation": "accept" if total_score >= 70 else "reject"
        }
        
        # Save review
        review_path = self.applications_dir / f"{app_id}_review.json"
        with open(review_path, 'w', encoding='utf-8') as f:
            json.dump(review, f, ensure_ascii=False, indent=2)
        
        return review
    
    def accept_fellow(
        self, 
        app_id: str,
        cohort: int,
        primary_mentor: str,
        research_area: str
    ) -> Fellow:
        """Accept an applicant as a Fellow."""
        # Load application
        file_path = self.applications_dir / f"{app_id}.json"
        with open(file_path, 'r', encoding='utf-8') as f:
            app_data = json.load(f)
        
        application = FellowApplication(**app_data)
        
        # Generate Fellow ID
        existing_fellows = [f for f in self.fellows.values() if f.cohort == cohort]
        fellow_num = len(existing_fellows) + 1
        fellow_id = f"F{cohort}-{fellow_num:03d}"
        
        # Create Fellow
        fellow = Fellow(
            id=fellow_id,
            application=application,
            status=FellowStatus.ACCEPTED,
            cohort=cohort,
            start_date=date(cohort, 3, 1),  # Start in March
            expected_graduation=date(cohort + 3, 2, 28),  # 3 year program
            primary_mentor=primary_mentor,
            research_area=research_area,
            monthly_stipend=2000000,
            ai_budget_usd=500,
        )
        
        # Save
        self.fellows[fellow_id] = fellow
        self._save_fellow(fellow)
        
        logger.info(f"Fellow accepted: {fellow_id} ({application.name_korean})")
        return fellow
    
    def activate_fellow(self, fellow_id: str) -> Fellow:
        """Activate a Fellow to start the program."""
        fellow = self.get_fellow(fellow_id)
        fellow.status = FellowStatus.ACTIVE
        self._save_fellow(fellow)
        logger.info(f"Fellow activated: {fellow_id}")
        return fellow
    
    def get_fellow(self, fellow_id: str) -> Fellow:
        """Get a Fellow by ID."""
        if fellow_id not in self.fellows:
            raise ValueError(f"Fellow not found: {fellow_id}")
        return self.fellows[fellow_id]
    
    def get_all_fellows(self, status: Optional[FellowStatus] = None) -> List[Fellow]:
        """Get all Fellows, optionally filtered by status."""
        fellows = list(self.fellows.values())
        if status:
            fellows = [f for f in fellows if f.status == status]
        return fellows
    
    def add_evaluation(
        self,
        fellow_id: str,
        evaluation: FellowEvaluation
    ) -> Fellow:
        """Add an evaluation for a Fellow."""
        fellow = self.get_fellow(fellow_id)
        fellow.add_evaluation(evaluation)
        self._save_fellow(fellow)
        
        logger.info(
            f"Evaluation added for {fellow_id}: "
            f"score={evaluation.total_score:.1f}, "
            f"stipend={evaluation.stipend_recommendation}"
        )
        return fellow
    
    def assign_mentor(
        self,
        fellow_id: str,
        primary_mentor: str,
        secondary_mentor: Optional[str] = None
    ) -> Fellow:
        """Assign mentors to a Fellow."""
        fellow = self.get_fellow(fellow_id)
        fellow.primary_mentor = primary_mentor
        if secondary_mentor:
            fellow.secondary_mentor = secondary_mentor
        self._save_fellow(fellow)
        
        logger.info(f"Mentors assigned to {fellow_id}: {primary_mentor}, {secondary_mentor}")
        return fellow
    
    def assign_dgx_spark(self, fellow_id: str) -> Fellow:
        """Assign a DGX Spark to a Fellow."""
        fellow = self.get_fellow(fellow_id)
        fellow.dgx_spark_assigned = True
        self._save_fellow(fellow)
        logger.info(f"DGX Spark assigned to {fellow_id}")
        return fellow
    
    def add_publication(self, fellow_id: str, publication: str) -> Fellow:
        """Add a publication for a Fellow."""
        fellow = self.get_fellow(fellow_id)
        fellow.publications.append(publication)
        self._save_fellow(fellow)
        logger.info(f"Publication added for {fellow_id}: {publication}")
        return fellow
    
    def add_presentation(self, fellow_id: str, presentation: str) -> Fellow:
        """Add a presentation for a Fellow."""
        fellow = self.get_fellow(fellow_id)
        fellow.presentations.append(presentation)
        self._save_fellow(fellow)
        return fellow
    
    def add_conference(self, fellow_id: str, conference: str) -> Fellow:
        """Add a conference attendance for a Fellow."""
        fellow = self.get_fellow(fellow_id)
        fellow.conferences_attended.append(conference)
        self._save_fellow(fellow)
        return fellow
    
    def add_overseas_visit(
        self,
        fellow_id: str,
        institution: str,
        duration_weeks: int,
        purpose: str
    ) -> Fellow:
        """Add an overseas visit for a Fellow."""
        fellow = self.get_fellow(fellow_id)
        visit = {
            "institution": institution,
            "duration_weeks": duration_weeks,
            "purpose": purpose,
            "date": datetime.now().isoformat()
        }
        fellow.overseas_visits.append(visit)
        self._save_fellow(fellow)
        logger.info(f"Overseas visit added for {fellow_id}: {institution}")
        return fellow
    
    def get_program_statistics(self) -> Dict[str, Any]:
        """Get overall program statistics."""
        all_fellows = self.get_all_fellows()
        active_fellows = [f for f in all_fellows if f.status == FellowStatus.ACTIVE]
        
        total_publications = sum(len(f.publications) for f in all_fellows)
        total_presentations = sum(len(f.presentations) for f in all_fellows)
        total_conferences = sum(len(f.conferences_attended) for f in all_fellows)
        
        avg_score = 0.0
        scores = [f.current_score for f in active_fellows if f.current_score]
        if scores:
            avg_score = sum(scores) / len(scores)
        
        return {
            "total_fellows": len(all_fellows),
            "active_fellows": len(active_fellows),
            "total_publications": total_publications,
            "total_presentations": total_presentations,
            "total_conferences": total_conferences,
            "average_score": avg_score,
            "fellows_with_dgx": sum(1 for f in all_fellows if f.dgx_spark_assigned),
            "by_department": self._count_by_department(all_fellows),
            "by_cohort": self._count_by_cohort(all_fellows),
        }
    
    def _count_by_department(self, fellows: List[Fellow]) -> Dict[str, int]:
        """Count fellows by department."""
        counts = {}
        for f in fellows:
            dept = f.application.department.value
            counts[dept] = counts.get(dept, 0) + 1
        return counts
    
    def _count_by_cohort(self, fellows: List[Fellow]) -> Dict[int, int]:
        """Count fellows by cohort."""
        counts = {}
        for f in fellows:
            counts[f.cohort] = counts.get(f.cohort, 0) + 1
        return counts


