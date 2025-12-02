"""
Extended Thinking Reviewer
==========================

AI-powered research review system using extended thinking
for deep analysis of research proposals and papers.
"""

import asyncio
from dataclasses import dataclass
from typing import Dict, List, Optional, Any
from enum import Enum
from loguru import logger

from .client import MultiModelClient


class ReviewType(str, Enum):
    """Types of reviews."""
    APPLICATION = "application"
    RESEARCH_PROPOSAL = "research_proposal"
    PROGRESS_REPORT = "progress_report"
    PAPER_DRAFT = "paper_draft"
    CODE_REVIEW = "code_review"


@dataclass
class ReviewConfig:
    """Configuration for a review task."""
    review_type: ReviewType
    thinking_budget: int
    criteria: List[str]
    rubric: Dict[str, Dict]  # category -> {description, weight, max_score}


# Review configurations
REVIEW_CONFIGS = {
    ReviewType.APPLICATION: ReviewConfig(
        review_type=ReviewType.APPLICATION,
        thinking_budget=12000,
        criteria=[
            "academic_excellence",
            "research_potential",
            "motivation_clarity",
            "technical_skills",
            "communication",
        ],
        rubric={
            "academic_excellence": {
                "description": "GPA, relevant coursework, academic achievements",
                "weight": 0.20,
                "max_score": 100,
            },
            "research_potential": {
                "description": "Research plan quality, creativity, feasibility",
                "weight": 0.30,
                "max_score": 100,
            },
            "motivation_clarity": {
                "description": "Clear motivation, alignment with program goals",
                "weight": 0.20,
                "max_score": 100,
            },
            "technical_skills": {
                "description": "Programming, ML/AI, neuroscience tools",
                "weight": 0.20,
                "max_score": 100,
            },
            "communication": {
                "description": "Writing clarity, presentation skills, English",
                "weight": 0.10,
                "max_score": 100,
            },
        }
    ),
    ReviewType.RESEARCH_PROPOSAL: ReviewConfig(
        review_type=ReviewType.RESEARCH_PROPOSAL,
        thinking_budget=16000,
        criteria=[
            "novelty",
            "methodology",
            "feasibility",
            "significance",
            "presentation",
        ],
        rubric={
            "novelty": {
                "description": "Original contribution, advances the field",
                "weight": 0.25,
                "max_score": 100,
            },
            "methodology": {
                "description": "Sound methods, appropriate techniques",
                "weight": 0.25,
                "max_score": 100,
            },
            "feasibility": {
                "description": "Achievable within timeframe and resources",
                "weight": 0.20,
                "max_score": 100,
            },
            "significance": {
                "description": "Impact on field, broader implications",
                "weight": 0.20,
                "max_score": 100,
            },
            "presentation": {
                "description": "Clear writing, logical structure, figures",
                "weight": 0.10,
                "max_score": 100,
            },
        }
    ),
    ReviewType.PAPER_DRAFT: ReviewConfig(
        review_type=ReviewType.PAPER_DRAFT,
        thinking_budget=20000,
        criteria=[
            "technical_correctness",
            "novelty",
            "clarity",
            "experimental_rigor",
            "significance",
            "reproducibility",
        ],
        rubric={
            "technical_correctness": {
                "description": "Methods are sound, no errors",
                "weight": 0.20,
                "max_score": 100,
            },
            "novelty": {
                "description": "New ideas, techniques, or insights",
                "weight": 0.20,
                "max_score": 100,
            },
            "clarity": {
                "description": "Well-written, easy to understand",
                "weight": 0.15,
                "max_score": 100,
            },
            "experimental_rigor": {
                "description": "Proper experiments, statistical analysis",
                "weight": 0.20,
                "max_score": 100,
            },
            "significance": {
                "description": "Important contribution to the field",
                "weight": 0.15,
                "max_score": 100,
            },
            "reproducibility": {
                "description": "Code/data available, methods detailed",
                "weight": 0.10,
                "max_score": 100,
            },
        }
    ),
}


class ExtendedThinkingReviewer:
    """
    AI reviewer using extended thinking for deep analysis.
    
    Uses Claude Opus 4's extended thinking feature for thorough,
    well-reasoned reviews of research materials.
    """
    
    def __init__(
        self,
        client: Optional[MultiModelClient] = None,
        default_model: str = "claude-opus-4",
    ):
        self.client = client or MultiModelClient(default_model=default_model)
        self.default_model = default_model
    
    async def review(
        self,
        content: str,
        review_type: ReviewType,
        additional_context: Optional[str] = None,
        model: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Perform a comprehensive review using extended thinking.
        
        Args:
            content: The content to review
            review_type: Type of review
            additional_context: Extra context (e.g., program goals)
            model: Model to use (default: claude-opus-4)
            
        Returns:
            Detailed review with scores, feedback, and recommendations
        """
        config = REVIEW_CONFIGS.get(review_type)
        if not config:
            raise ValueError(f"Unknown review type: {review_type}")
        
        # Build review prompt
        prompt = self._build_review_prompt(
            content, config, additional_context
        )
        
        system = self._build_system_prompt(config)
        
        # Generate review with extended thinking
        response = await self.client.generate(
            prompt=prompt,
            model=model or self.default_model,
            system=system,
            enable_thinking=True,
            thinking_budget=config.thinking_budget,
        )
        
        # Parse review
        review = self._parse_review(response["content"], config)
        
        # Add metadata
        review["thinking_process"] = response.get("thinking", "")
        review["usage"] = response["usage"]
        review["model"] = response["model"]
        review["review_type"] = review_type.value
        
        logger.info(
            f"Review completed: type={review_type.value}, "
            f"total_score={review.get('total_score', 'N/A')}"
        )
        
        return review
    
    def _build_system_prompt(self, config: ReviewConfig) -> str:
        """Build system prompt for the reviewer."""
        rubric_text = "\n".join([
            f"- {cat}: {info['description']} (weight: {info['weight']*100}%)"
            for cat, info in config.rubric.items()
        ])
        
        return f"""You are an expert reviewer for the SNU Connectome Fellows Program,
a prestigious research fellowship focused on Neuroscience Foundation Models.

Your role is to provide thorough, constructive reviews using the following rubric:

{rubric_text}

Guidelines:
1. Be thorough but constructive - highlight both strengths and areas for improvement
2. Provide specific, actionable feedback
3. Score each criterion from 0-100
4. Consider the program's focus on Brain Foundation Models, multimodal learning,
   and training world-class researchers
5. Maintain high standards while being encouraging

Output Format:
Provide your review in the following JSON structure:
{{
    "scores": {{"criterion": score, ...}},
    "strengths": ["strength1", "strength2", ...],
    "weaknesses": ["weakness1", "weakness2", ...],
    "detailed_feedback": {{
        "criterion": "detailed feedback for each criterion"
    }},
    "overall_assessment": "summary assessment",
    "recommendation": "accept/revise/reject",
    "confidence": 0.0-1.0
}}
"""
    
    def _build_review_prompt(
        self,
        content: str,
        config: ReviewConfig,
        additional_context: Optional[str],
    ) -> str:
        """Build the review prompt."""
        prompt = f"""Please review the following {config.review_type.value}:

---
{content}
---
"""
        
        if additional_context:
            prompt += f"""
Additional Context:
{additional_context}
"""
        
        prompt += """
Provide a comprehensive review following the rubric and output format
specified in your instructions. Think carefully about each criterion
before scoring.
"""
        return prompt
    
    def _parse_review(
        self,
        response: str,
        config: ReviewConfig,
    ) -> Dict[str, Any]:
        """Parse review response into structured format."""
        import json
        import re
        
        # Try to extract JSON
        json_match = re.search(r'\{[\s\S]*\}', response)
        
        if json_match:
            try:
                review_data = json.loads(json_match.group())
                
                # Calculate total score
                scores = review_data.get("scores", {})
                total_score = 0.0
                for criterion, info in config.rubric.items():
                    score = scores.get(criterion, 0)
                    total_score += score * info["weight"]
                
                review_data["total_score"] = round(total_score, 2)
                return review_data
                
            except json.JSONDecodeError:
                pass
        
        # Fallback: return raw response
        return {
            "raw_response": response,
            "scores": {},
            "total_score": None,
            "parse_error": True,
        }
    
    async def review_batch(
        self,
        items: List[Dict[str, str]],
        review_type: ReviewType,
        max_concurrent: int = 3,
    ) -> List[Dict[str, Any]]:
        """
        Review multiple items concurrently.
        
        Args:
            items: List of dicts with 'id' and 'content'
            review_type: Type of review
            max_concurrent: Max concurrent reviews
            
        Returns:
            List of reviews with item IDs
        """
        semaphore = asyncio.Semaphore(max_concurrent)
        
        async def review_item(item):
            async with semaphore:
                review = await self.review(
                    content=item["content"],
                    review_type=review_type,
                )
                review["item_id"] = item["id"]
                return review
        
        tasks = [review_item(item) for item in items]
        reviews = await asyncio.gather(*tasks, return_exceptions=True)
        
        results = []
        for review in reviews:
            if isinstance(review, Exception):
                results.append({
                    "error": str(review),
                    "item_id": "unknown",
                })
            else:
                results.append(review)
        
        return results
    
    async def generate_summary_report(
        self,
        reviews: List[Dict[str, Any]],
    ) -> str:
        """Generate a summary report of multiple reviews."""
        
        # Aggregate statistics
        total_reviews = len(reviews)
        scores = [r.get("total_score") for r in reviews if r.get("total_score")]
        avg_score = sum(scores) / len(scores) if scores else 0
        
        recommendations = {}
        for r in reviews:
            rec = r.get("recommendation", "unknown")
            recommendations[rec] = recommendations.get(rec, 0) + 1
        
        prompt = f"""Based on {total_reviews} reviews with an average score of {avg_score:.1f},
and recommendation distribution: {recommendations},

Generate a comprehensive summary report including:
1. Overall quality assessment
2. Common strengths across submissions
3. Common areas for improvement
4. Recommendations for the program
5. Notable standouts (if any)

Reviews data (sample):
{reviews[:3]}
"""
        
        response = await self.client.generate(
            prompt=prompt,
            model="claude-sonnet-4",  # Use faster model for summary
            system="You are summarizing fellow application reviews for program administrators.",
        )
        
        return response["content"]

