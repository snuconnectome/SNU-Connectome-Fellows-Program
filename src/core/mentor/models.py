"""
Mentor Data Models
==================

Models for mentor profiles and mentor-fellow matching.
"""

from datetime import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field, EmailStr


class MentorExpertise(BaseModel):
    """Mentor expertise area with proficiency."""
    area: str
    level: str = "expert"  # expert, proficient, familiar
    years: int = 0
    publications: int = 0


class MentorActivity(BaseModel):
    """Mentor activity log."""
    activity_type: str  # seminar, mentoring, visit_hosting, collaboration
    description: str
    date: datetime
    duration_hours: float
    fellow_id: Optional[str] = None
    notes: str = ""


class Mentor(BaseModel):
    """Mentor profile."""
    
    id: str = Field(..., description="Unique mentor ID")
    name: str
    name_korean: Optional[str] = None
    affiliation: str
    position: str
    email: EmailStr
    
    # Expertise
    expertise_areas: List[MentorExpertise] = []
    research_keywords: List[str] = []
    
    # Background
    h_index: Optional[int] = None
    total_publications: Optional[int] = None
    notable_papers: List[str] = []
    
    # Mentoring
    max_fellows: int = 3
    current_fellows: List[str] = []  # Fellow IDs
    past_fellows: List[str] = []
    
    # Compensation
    annual_fee_usd: float = 5000.0
    
    # Availability
    speaks_korean: bool = False
    timezone: str = "America/New_York"
    preferred_meeting_times: List[str] = []  # e.g., ["Monday 10am EST", "Friday 2pm EST"]
    
    # Activities
    activities: List[MentorActivity] = []
    
    # Status
    active: bool = True
    joined_date: datetime = Field(default_factory=datetime.now)
    
    @property
    def available_slots(self) -> int:
        """Number of available mentee slots."""
        return max(0, self.max_fellows - len(self.current_fellows))
    
    @property
    def total_mentoring_hours(self) -> float:
        """Total hours spent mentoring."""
        return sum(a.duration_hours for a in self.activities)
    
    def add_activity(self, activity: MentorActivity) -> None:
        """Log a mentoring activity."""
        self.activities.append(activity)
    
    def assign_fellow(self, fellow_id: str) -> bool:
        """Assign a fellow to this mentor."""
        if self.available_slots <= 0:
            return False
        if fellow_id not in self.current_fellows:
            self.current_fellows.append(fellow_id)
        return True
    
    def remove_fellow(self, fellow_id: str) -> None:
        """Remove a fellow (graduated/withdrawn)."""
        if fellow_id in self.current_fellows:
            self.current_fellows.remove(fellow_id)
            self.past_fellows.append(fellow_id)
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "M001",
                "name": "Uri Hasson",
                "affiliation": "Princeton University",
                "position": "Professor",
                "email": "hasson@princeton.edu",
                "expertise_areas": [
                    {"area": "language-brain", "level": "expert", "years": 20}
                ],
            }
        }


class MentorMatch(BaseModel):
    """Mentor-Fellow match result."""
    
    fellow_id: str
    mentor_id: str
    compatibility_score: float = Field(..., ge=0, le=100)
    
    # Match details
    matching_expertise: List[str] = []
    matching_interests: List[str] = []
    
    # Scores breakdown
    expertise_match_score: float = 0.0
    interest_match_score: float = 0.0
    availability_score: float = 0.0
    language_score: float = 0.0
    
    # Recommendation
    is_primary: bool = True
    recommendation_notes: str = ""
    
    created_at: datetime = Field(default_factory=datetime.now)
    
    class Config:
        json_schema_extra = {
            "example": {
                "fellow_id": "F2025-001",
                "mentor_id": "M001",
                "compatibility_score": 85.5,
                "is_primary": True,
            }
        }


