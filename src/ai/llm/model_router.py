"""
Model Router
============

Intelligent routing of tasks to optimal LLM models based on
task type, complexity, and budget constraints.
"""

from dataclasses import dataclass
from typing import Dict, List, Optional, Tuple
from enum import Enum
from loguru import logger


class TaskType(str, Enum):
    """Types of tasks for routing."""
    # Research tasks
    PAPER_REVIEW = "paper_review"
    CODE_GENERATION = "code_generation"
    LITERATURE_SEARCH = "literature_search"
    DATA_ANALYSIS = "data_analysis"
    
    # Admin tasks
    APPLICATION_REVIEW = "application_review"
    REPORT_GENERATION = "report_generation"
    EMAIL_DRAFT = "email_draft"
    
    # Quick tasks
    SUMMARIZATION = "summarization"
    TRANSLATION = "translation"
    FORMATTING = "formatting"
    
    # Complex tasks
    RESEARCH_PLANNING = "research_planning"
    METHODOLOGY_DESIGN = "methodology_design"
    DEBUGGING = "debugging"


class Complexity(str, Enum):
    """Task complexity levels."""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    EXPERT = "expert"


@dataclass
class RoutingConfig:
    """Configuration for model routing."""
    task_type: TaskType
    complexity: Complexity
    requires_thinking: bool = False
    cost_sensitive: bool = False
    latency_sensitive: bool = False


# Default routing rules
ROUTING_RULES: Dict[TaskType, Dict[Complexity, str]] = {
    # Research tasks
    TaskType.PAPER_REVIEW: {
        Complexity.LOW: "claude-sonnet-4",
        Complexity.MEDIUM: "claude-opus-4",
        Complexity.HIGH: "claude-opus-4",  # with thinking
        Complexity.EXPERT: "claude-opus-4",  # with extended thinking
    },
    TaskType.CODE_GENERATION: {
        Complexity.LOW: "claude-sonnet-4",
        Complexity.MEDIUM: "claude-sonnet-4",
        Complexity.HIGH: "claude-opus-4",
        Complexity.EXPERT: "claude-opus-4",
    },
    TaskType.LITERATURE_SEARCH: {
        Complexity.LOW: "gemini-2.5-pro",
        Complexity.MEDIUM: "gemini-2.5-pro",
        Complexity.HIGH: "gemini-2.5-pro",  # Deep Research
        Complexity.EXPERT: "gemini-2.5-pro",
    },
    TaskType.DATA_ANALYSIS: {
        Complexity.LOW: "gpt-4o",
        Complexity.MEDIUM: "claude-sonnet-4",
        Complexity.HIGH: "claude-opus-4",
        Complexity.EXPERT: "gpt-5",
    },
    
    # Admin tasks
    TaskType.APPLICATION_REVIEW: {
        Complexity.LOW: "claude-sonnet-4",
        Complexity.MEDIUM: "claude-opus-4",
        Complexity.HIGH: "claude-opus-4",
        Complexity.EXPERT: "claude-opus-4",
    },
    TaskType.REPORT_GENERATION: {
        Complexity.LOW: "gpt-4o",
        Complexity.MEDIUM: "claude-sonnet-4",
        Complexity.HIGH: "claude-opus-4",
        Complexity.EXPERT: "claude-opus-4",
    },
    TaskType.EMAIL_DRAFT: {
        Complexity.LOW: "gpt-4o",
        Complexity.MEDIUM: "claude-sonnet-4",
        Complexity.HIGH: "claude-sonnet-4",
        Complexity.EXPERT: "claude-sonnet-4",
    },
    
    # Quick tasks
    TaskType.SUMMARIZATION: {
        Complexity.LOW: "gpt-4o",
        Complexity.MEDIUM: "gpt-4o",
        Complexity.HIGH: "claude-sonnet-4",
        Complexity.EXPERT: "claude-sonnet-4",
    },
    TaskType.TRANSLATION: {
        Complexity.LOW: "gpt-4o",
        Complexity.MEDIUM: "gpt-4o",
        Complexity.HIGH: "claude-sonnet-4",
        Complexity.EXPERT: "claude-opus-4",
    },
    TaskType.FORMATTING: {
        Complexity.LOW: "gpt-4o",
        Complexity.MEDIUM: "gpt-4o",
        Complexity.HIGH: "gpt-4o",
        Complexity.EXPERT: "claude-sonnet-4",
    },
    
    # Complex tasks
    TaskType.RESEARCH_PLANNING: {
        Complexity.LOW: "claude-sonnet-4",
        Complexity.MEDIUM: "claude-opus-4",
        Complexity.HIGH: "claude-opus-4",
        Complexity.EXPERT: "gpt-5",
    },
    TaskType.METHODOLOGY_DESIGN: {
        Complexity.LOW: "claude-sonnet-4",
        Complexity.MEDIUM: "claude-opus-4",
        Complexity.HIGH: "gpt-5",
        Complexity.EXPERT: "gpt-5",
    },
    TaskType.DEBUGGING: {
        Complexity.LOW: "claude-sonnet-4",
        Complexity.MEDIUM: "claude-sonnet-4",
        Complexity.HIGH: "claude-opus-4",
        Complexity.EXPERT: "claude-opus-4",
    },
}

# Cost-optimized alternatives
COST_OPTIMIZED = {
    "claude-opus-4": "deepseek-r1",
    "gpt-5": "deepseek-r1",
    "claude-sonnet-4": "gpt-4o",
    "gemini-2.5-pro": "gemini-2.5-pro",  # Already cost-effective
    "gpt-4o": "gpt-4o",
    "deepseek-r1": "deepseek-r1",
}

# Latency-optimized alternatives
LATENCY_OPTIMIZED = {
    "claude-opus-4": "claude-sonnet-4",
    "gpt-5": "gpt-4o",
    "gemini-2.5-pro": "gpt-4o",
    "claude-sonnet-4": "gpt-4o",
    "gpt-4o": "gpt-4o",
    "deepseek-r1": "gpt-4o",
}


class ModelRouter:
    """
    Routes tasks to optimal models based on requirements.
    
    Considers:
    - Task type and complexity
    - Budget constraints
    - Latency requirements
    - Extended thinking needs
    """
    
    def __init__(
        self,
        budget_threshold_usd: float = 0.5,
        enable_cost_optimization: bool = True,
    ):
        self.budget_threshold = budget_threshold_usd
        self.enable_cost_optimization = enable_cost_optimization
        self.routing_stats: Dict[str, int] = {}
    
    def route(
        self,
        task_type: TaskType,
        complexity: Complexity = Complexity.MEDIUM,
        cost_sensitive: bool = False,
        latency_sensitive: bool = False,
        estimated_tokens: int = 1000,
    ) -> Tuple[str, bool, int]:
        """
        Route a task to the optimal model.
        
        Args:
            task_type: Type of task
            complexity: Task complexity
            cost_sensitive: Prefer cheaper models
            latency_sensitive: Prefer faster models
            estimated_tokens: Estimated input tokens
            
        Returns:
            Tuple of (model_key, enable_thinking, thinking_budget)
        """
        # Get base model from rules
        model = ROUTING_RULES.get(task_type, {}).get(
            complexity, "claude-sonnet-4"
        )
        
        # Determine if thinking is needed
        enable_thinking = (
            complexity in [Complexity.HIGH, Complexity.EXPERT] and
            task_type in [
                TaskType.PAPER_REVIEW,
                TaskType.RESEARCH_PLANNING,
                TaskType.METHODOLOGY_DESIGN,
                TaskType.APPLICATION_REVIEW,
            ]
        )
        
        # Set thinking budget based on complexity
        thinking_budget = 0
        if enable_thinking:
            thinking_budgets = {
                Complexity.HIGH: 8000,
                Complexity.EXPERT: 16000,
            }
            thinking_budget = thinking_budgets.get(complexity, 8000)
        
        # Apply cost optimization
        if cost_sensitive and self.enable_cost_optimization:
            model = COST_OPTIMIZED.get(model, model)
            # Reduce thinking budget for cost savings
            thinking_budget = min(thinking_budget, 4000)
        
        # Apply latency optimization
        if latency_sensitive:
            model = LATENCY_OPTIMIZED.get(model, model)
            # Disable thinking for speed
            enable_thinking = False
            thinking_budget = 0
        
        # Track routing
        self.routing_stats[model] = self.routing_stats.get(model, 0) + 1
        
        logger.debug(
            f"Routed {task_type.value}/{complexity.value} -> {model} "
            f"(thinking={enable_thinking}, budget={thinking_budget})"
        )
        
        return model, enable_thinking, thinking_budget
    
    def estimate_complexity(
        self,
        content: str,
        task_type: TaskType,
    ) -> Complexity:
        """
        Estimate task complexity from content.
        
        Uses heuristics based on content length, structure, and keywords.
        """
        # Length-based estimation
        word_count = len(content.split())
        
        if word_count < 500:
            base_complexity = Complexity.LOW
        elif word_count < 2000:
            base_complexity = Complexity.MEDIUM
        elif word_count < 5000:
            base_complexity = Complexity.HIGH
        else:
            base_complexity = Complexity.EXPERT
        
        # Task-specific adjustments
        if task_type in [TaskType.PAPER_REVIEW, TaskType.METHODOLOGY_DESIGN]:
            # Always at least medium for these tasks
            if base_complexity == Complexity.LOW:
                base_complexity = Complexity.MEDIUM
        
        if task_type in [TaskType.FORMATTING, TaskType.TRANSLATION]:
            # Cap at medium for these tasks
            if base_complexity in [Complexity.HIGH, Complexity.EXPERT]:
                base_complexity = Complexity.MEDIUM
        
        # Keyword-based adjustments
        complex_keywords = [
            "foundation model", "multimodal", "transformer",
            "diffusion", "variational", "bayesian",
            "methodology", "hypothesis", "statistical"
        ]
        
        content_lower = content.lower()
        keyword_count = sum(
            1 for kw in complex_keywords if kw in content_lower
        )
        
        if keyword_count >= 5 and base_complexity != Complexity.EXPERT:
            # Bump up complexity
            complexity_order = [
                Complexity.LOW, Complexity.MEDIUM,
                Complexity.HIGH, Complexity.EXPERT
            ]
            idx = complexity_order.index(base_complexity)
            base_complexity = complexity_order[min(idx + 1, 3)]
        
        return base_complexity
    
    def get_routing_stats(self) -> Dict[str, int]:
        """Get model usage statistics."""
        return dict(self.routing_stats)
    
    def suggest_budget_allocation(
        self,
        monthly_budget_usd: float,
        expected_tasks: Dict[TaskType, int],
    ) -> Dict[str, float]:
        """
        Suggest budget allocation based on expected task distribution.
        
        Args:
            monthly_budget_usd: Total monthly budget
            expected_tasks: Dict of task_type -> expected count
            
        Returns:
            Suggested budget per model
        """
        # Estimate costs per task type
        task_costs = {
            TaskType.PAPER_REVIEW: 0.50,
            TaskType.CODE_GENERATION: 0.30,
            TaskType.LITERATURE_SEARCH: 0.20,
            TaskType.DATA_ANALYSIS: 0.25,
            TaskType.APPLICATION_REVIEW: 0.40,
            TaskType.REPORT_GENERATION: 0.15,
            TaskType.EMAIL_DRAFT: 0.05,
            TaskType.SUMMARIZATION: 0.05,
            TaskType.TRANSLATION: 0.05,
            TaskType.FORMATTING: 0.02,
            TaskType.RESEARCH_PLANNING: 0.60,
            TaskType.METHODOLOGY_DESIGN: 0.50,
            TaskType.DEBUGGING: 0.20,
        }
        
        total_estimated = sum(
            task_costs.get(task, 0.10) * count
            for task, count in expected_tasks.items()
        )
        
        # Scale to budget
        scale_factor = monthly_budget_usd / total_estimated if total_estimated > 0 else 1.0
        
        allocation = {}
        for task, count in expected_tasks.items():
            cost = task_costs.get(task, 0.10) * count * scale_factor
            model, _, _ = self.route(task, Complexity.MEDIUM)
            allocation[model] = allocation.get(model, 0) + cost
        
        return allocation

