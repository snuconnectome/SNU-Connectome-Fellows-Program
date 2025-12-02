"""
Fellow Data Models
==================

Pydantic models for Fellow management including applications,
evaluations, and progress tracking.
"""

from datetime import date, datetime
from enum import Enum
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field, EmailStr, validator


class Department(str, Enum):
    """Supported departments for Fellows."""
    MEDICINE = "의과대학"
    EE = "전기정보공학부"
    PSYCHOLOGY = "심리학과"
    LIBERAL_STUDIES = "자유전공학부"
    BRAIN_COGNITIVE = "뇌인지과학과"
    CS = "컴퓨터공학부"
    OTHER = "기타"


class FellowStatus(str, Enum):
    """Fellow status in the program."""
    APPLICANT = "applicant"
    UNDER_REVIEW = "under_review"
    ACCEPTED = "accepted"
    ACTIVE = "active"
    ON_LEAVE = "on_leave"
    GRADUATED = "graduated"
    WITHDRAWN = "withdrawn"


class SkillLevel(str, Enum):
    """Skill proficiency levels."""
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"
    EXPERT = "expert"


class TechnicalSkill(BaseModel):
    """Technical skill with proficiency level."""
    name: str
    level: SkillLevel
    years_experience: float = 0.0
    
    
class ResearchInterest(BaseModel):
    """Research interest area."""
    area: str
    description: str
    priority: int = Field(ge=1, le=5)  # 1 = highest priority


class FellowApplication(BaseModel):
    """Fellow application data model."""
    
    # Personal Info
    name_korean: str = Field(..., min_length=2, max_length=50)
    name_english: str = Field(..., min_length=2, max_length=100)
    student_id: str = Field(..., regex=r"^\d{4}-\d{5}$")
    email: EmailStr
    phone: str
    department: Department
    year: int = Field(..., ge=1, le=6)
    
    # Academic Info
    gpa_overall: float = Field(..., ge=0.0, le=4.5)
    gpa_major: float = Field(..., ge=0.0, le=4.5)
    relevant_courses: List[Dict[str, Any]] = []
    
    # Skills
    programming_skills: List[TechnicalSkill] = []
    ml_skills: List[TechnicalSkill] = []
    neuro_tools: List[TechnicalSkill] = []
    
    # Research
    research_interests: List[ResearchInterest] = []
    previous_research: Optional[str] = None
    publications: List[str] = []
    
    # Essays
    motivation_statement: str = Field(..., min_length=500, max_length=3000)
    research_proposal: str = Field(..., min_length=800, max_length=5000)
    long_term_vision: str = Field(..., min_length=300, max_length=2000)
    
    # References
    references: List[Dict[str, str]] = []
    
    # Portfolio
    github_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    
    # Language
    english_score: Optional[str] = None  # TOEFL, IELTS, etc.
    
    # Metadata
    submitted_at: datetime = Field(default_factory=datetime.now)
    
    @validator('programming_skills')
    def validate_python_skill(cls, v):
        """Ensure Python is listed in programming skills."""
        python_skills = [s for s in v if s.name.lower() == 'python']
        if not python_skills:
            raise ValueError("Python skill is required")
        return v
    
    class Config:
        json_schema_extra = {
            "example": {
                "name_korean": "김철수",
                "name_english": "Cheolsu Kim",
                "student_id": "2022-12345",
                "email": "cheolsu@snu.ac.kr",
                "phone": "010-1234-5678",
                "department": "전기정보공학부",
                "year": 3,
                "gpa_overall": 4.1,
                "gpa_major": 4.3,
            }
        }


class FellowEvaluation(BaseModel):
    """Quarterly evaluation for a Fellow."""
    
    fellow_id: str
    evaluation_period: str  # e.g., "2025-Q1"
    evaluator: str
    evaluated_at: datetime = Field(default_factory=datetime.now)
    
    # Scores (0-100)
    research_progress: float = Field(..., ge=0, le=100)
    publication_score: float = Field(..., ge=0, le=100)
    participation_score: float = Field(..., ge=0, le=100)
    collaboration_score: float = Field(..., ge=0, le=100)
    initiative_score: float = Field(..., ge=0, le=100)
    
    # Weights
    weights: Dict[str, float] = Field(default={
        "research_progress": 0.40,
        "publication": 0.20,
        "participation": 0.20,
        "collaboration": 0.10,
        "initiative": 0.10,
    })
    
    # Qualitative
    strengths: List[str] = []
    areas_for_improvement: List[str] = []
    mentor_feedback: str = ""
    goals_for_next_period: List[str] = []
    
    @property
    def total_score(self) -> float:
        """Calculate weighted total score."""
        return (
            self.research_progress * self.weights["research_progress"] +
            self.publication_score * self.weights["publication"] +
            self.participation_score * self.weights["participation"] +
            self.collaboration_score * self.weights["collaboration"] +
            self.initiative_score * self.weights["initiative"]
        )
    
    @property
    def stipend_recommendation(self) -> str:
        """Recommend stipend level based on score."""
        score = self.total_score
        if score >= 90:
            return "excellence"  # 2,500,000 KRW
        elif score >= 70:
            return "standard"    # 2,000,000 KRW
        elif score >= 50:
            return "probation"   # 1,500,000 KRW
        else:
            return "review_required"


class Fellow(BaseModel):
    """Active Fellow in the program."""
    
    id: str = Field(..., description="Unique fellow ID")
    application: FellowApplication
    status: FellowStatus = FellowStatus.ACTIVE
    
    # Program Info
    cohort: int  # Year of joining (e.g., 2025)
    start_date: date
    expected_graduation: date
    
    # Mentor Assignment
    primary_mentor: Optional[str] = None
    secondary_mentor: Optional[str] = None
    
    # Research
    research_project: Optional[str] = None
    research_area: Optional[str] = None
    
    # Support
    monthly_stipend: int = 2000000  # KRW
    ai_budget_usd: int = 500
    
    # Progress
    evaluations: List[FellowEvaluation] = []
    publications: List[str] = []
    presentations: List[str] = []
    conferences_attended: List[str] = []
    overseas_visits: List[Dict[str, Any]] = []
    
    # Compute
    dgx_spark_assigned: bool = False
    cloud_credits_usd: float = 0.0
    
    @property
    def current_score(self) -> Optional[float]:
        """Get the most recent evaluation score."""
        if self.evaluations:
            return self.evaluations[-1].total_score
        return None
    
    @property
    def program_duration_months(self) -> int:
        """Calculate months in program."""
        today = date.today()
        delta = today - self.start_date
        return delta.days // 30
    
    def add_evaluation(self, evaluation: FellowEvaluation) -> None:
        """Add a new evaluation."""
        self.evaluations.append(evaluation)
        
        # Update stipend based on evaluation
        rec = evaluation.stipend_recommendation
        if rec == "excellence":
            self.monthly_stipend = 2500000
        elif rec == "standard":
            self.monthly_stipend = 2000000
        elif rec == "probation":
            self.monthly_stipend = 1500000
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "F2025-001",
                "cohort": 2025,
                "status": "active",
            }
        }


