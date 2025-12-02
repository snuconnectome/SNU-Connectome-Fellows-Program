"""
Multi-Model LLM Client
======================

Unified client for multiple LLM providers (Anthropic, OpenAI, Google, DeepSeek).
Supports automatic model routing, cost tracking, and extended thinking.
"""

import os
import asyncio
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from datetime import datetime
from typing import Dict, List, Optional, Any, Literal
from enum import Enum
from loguru import logger

# Lazy imports for API clients
anthropic = None
openai = None
google_genai = None


def get_anthropic():
    global anthropic
    if anthropic is None:
        import anthropic as _anthropic
        anthropic = _anthropic
    return anthropic


def get_openai():
    global openai
    if openai is None:
        import openai as _openai
        openai = _openai
    return openai


def get_google():
    global google_genai
    if google_genai is None:
        import google.generativeai as _google_genai
        google_genai = _google_genai
    return google_genai


class Provider(str, Enum):
    """LLM provider enum."""
    ANTHROPIC = "anthropic"
    OPENAI = "openai"
    GOOGLE = "google"
    DEEPSEEK = "deepseek"


@dataclass
class ModelConfig:
    """Configuration for a specific model."""
    name: str
    provider: Provider
    max_tokens: int = 4096
    cost_per_1k_input: float = 0.01
    cost_per_1k_output: float = 0.03
    supports_thinking: bool = False
    default_thinking_budget: int = 8000


@dataclass
class UsageStats:
    """Token usage statistics."""
    input_tokens: int = 0
    output_tokens: int = 0
    thinking_tokens: int = 0
    cost_usd: float = 0.0
    requests: int = 0
    
    def add(self, input_t: int, output_t: int, thinking_t: int = 0, cost: float = 0.0):
        self.input_tokens += input_t
        self.output_tokens += output_t
        self.thinking_tokens += thinking_t
        self.cost_usd += cost
        self.requests += 1


# Model configurations
MODELS = {
    # Anthropic
    "claude-opus-4": ModelConfig(
        name="claude-opus-4-20250514",
        provider=Provider.ANTHROPIC,
        max_tokens=16000,
        cost_per_1k_input=0.015,
        cost_per_1k_output=0.075,
        supports_thinking=True,
        default_thinking_budget=12000,
    ),
    "claude-sonnet-4": ModelConfig(
        name="claude-sonnet-4-20250514",
        provider=Provider.ANTHROPIC,
        max_tokens=8000,
        cost_per_1k_input=0.003,
        cost_per_1k_output=0.015,
        supports_thinking=False,
    ),
    # OpenAI
    "gpt-5": ModelConfig(
        name="gpt-5",
        provider=Provider.OPENAI,
        max_tokens=32000,
        cost_per_1k_input=0.01,
        cost_per_1k_output=0.03,
        supports_thinking=True,
    ),
    "gpt-4o": ModelConfig(
        name="gpt-4o",
        provider=Provider.OPENAI,
        max_tokens=4096,
        cost_per_1k_input=0.0025,
        cost_per_1k_output=0.01,
    ),
    # Google
    "gemini-2.5-pro": ModelConfig(
        name="gemini-2.5-pro",
        provider=Provider.GOOGLE,
        max_tokens=8192,
        cost_per_1k_input=0.00125,
        cost_per_1k_output=0.005,
        supports_thinking=True,
        default_thinking_budget=20000,
    ),
    # DeepSeek
    "deepseek-r1": ModelConfig(
        name="deepseek-reasoner",
        provider=Provider.DEEPSEEK,
        max_tokens=8000,
        cost_per_1k_input=0.00055,
        cost_per_1k_output=0.0022,
        supports_thinking=True,
    ),
}


class MultiModelClient:
    """
    Unified client for multiple LLM providers.
    
    Features:
    - Automatic provider detection
    - Cost tracking
    - Extended thinking support
    - Fallback on errors
    """
    
    def __init__(
        self,
        default_model: str = "claude-sonnet-4",
        monthly_budget_usd: float = 500.0,
    ):
        self.default_model = default_model
        self.monthly_budget_usd = monthly_budget_usd
        self.usage = UsageStats()
        self._clients: Dict[Provider, Any] = {}
        
        # Initialize clients lazily
        self._init_clients()
    
    def _init_clients(self) -> None:
        """Initialize API clients from environment variables."""
        # Anthropic
        if os.getenv("ANTHROPIC_API_KEY"):
            try:
                client = get_anthropic().Anthropic()
                self._clients[Provider.ANTHROPIC] = client
                logger.info("Anthropic client initialized")
            except Exception as e:
                logger.warning(f"Failed to init Anthropic: {e}")
        
        # OpenAI
        if os.getenv("OPENAI_API_KEY"):
            try:
                client = get_openai().OpenAI()
                self._clients[Provider.OPENAI] = client
                logger.info("OpenAI client initialized")
            except Exception as e:
                logger.warning(f"Failed to init OpenAI: {e}")
        
        # Google
        if os.getenv("GOOGLE_API_KEY"):
            try:
                genai = get_google()
                genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
                self._clients[Provider.GOOGLE] = genai
                logger.info("Google client initialized")
            except Exception as e:
                logger.warning(f"Failed to init Google: {e}")
        
        # DeepSeek (uses OpenAI-compatible API)
        if os.getenv("DEEPSEEK_API_KEY"):
            try:
                client = get_openai().OpenAI(
                    api_key=os.getenv("DEEPSEEK_API_KEY"),
                    base_url="https://api.deepseek.com/v1"
                )
                self._clients[Provider.DEEPSEEK] = client
                logger.info("DeepSeek client initialized")
            except Exception as e:
                logger.warning(f"Failed to init DeepSeek: {e}")
    
    def _get_client(self, provider: Provider) -> Any:
        """Get client for a provider."""
        if provider not in self._clients:
            raise ValueError(f"Provider {provider} not configured")
        return self._clients[provider]
    
    async def generate(
        self,
        prompt: str,
        model: Optional[str] = None,
        system: Optional[str] = None,
        max_tokens: Optional[int] = None,
        temperature: float = 0.7,
        enable_thinking: bool = False,
        thinking_budget: Optional[int] = None,
    ) -> Dict[str, Any]:
        """
        Generate a response from an LLM.
        
        Args:
            prompt: User prompt
            model: Model key (e.g., "claude-opus-4")
            system: System prompt
            max_tokens: Max output tokens
            temperature: Sampling temperature
            enable_thinking: Enable extended thinking
            thinking_budget: Token budget for thinking
            
        Returns:
            Dict with 'content', 'thinking', 'usage', 'model'
        """
        model_key = model or self.default_model
        config = MODELS.get(model_key)
        
        if not config:
            raise ValueError(f"Unknown model: {model_key}")
        
        provider = config.provider
        max_tokens = max_tokens or config.max_tokens
        
        # Route to appropriate provider
        if provider == Provider.ANTHROPIC:
            return await self._generate_anthropic(
                prompt, config, system, max_tokens, temperature,
                enable_thinking, thinking_budget
            )
        elif provider == Provider.OPENAI:
            return await self._generate_openai(
                prompt, config, system, max_tokens, temperature,
                enable_thinking
            )
        elif provider == Provider.GOOGLE:
            return await self._generate_google(
                prompt, config, system, max_tokens, temperature,
                enable_thinking, thinking_budget
            )
        elif provider == Provider.DEEPSEEK:
            return await self._generate_deepseek(
                prompt, config, system, max_tokens, temperature
            )
        else:
            raise ValueError(f"Unsupported provider: {provider}")
    
    async def _generate_anthropic(
        self,
        prompt: str,
        config: ModelConfig,
        system: Optional[str],
        max_tokens: int,
        temperature: float,
        enable_thinking: bool,
        thinking_budget: Optional[int],
    ) -> Dict[str, Any]:
        """Generate using Anthropic API."""
        client = self._get_client(Provider.ANTHROPIC)
        
        messages = [{"role": "user", "content": prompt}]
        
        kwargs = {
            "model": config.name,
            "max_tokens": max_tokens,
            "messages": messages,
        }
        
        if system:
            kwargs["system"] = system
        
        # Extended thinking
        if enable_thinking and config.supports_thinking:
            budget = thinking_budget or config.default_thinking_budget
            kwargs["thinking"] = {
                "type": "enabled",
                "budget_tokens": budget
            }
            # Temperature must be 1 for thinking
            kwargs["temperature"] = 1.0
        else:
            kwargs["temperature"] = temperature
        
        # Make request
        response = await asyncio.to_thread(
            client.messages.create, **kwargs
        )
        
        # Parse response
        content = ""
        thinking = ""
        
        for block in response.content:
            if hasattr(block, 'type'):
                if block.type == "thinking":
                    thinking = block.thinking
                elif block.type == "text":
                    content = block.text
        
        # Track usage
        usage = response.usage
        input_t = usage.input_tokens
        output_t = usage.output_tokens
        thinking_t = getattr(usage, 'thinking_tokens', 0) or 0
        
        cost = (
            input_t * config.cost_per_1k_input / 1000 +
            output_t * config.cost_per_1k_output / 1000
        )
        self.usage.add(input_t, output_t, thinking_t, cost)
        
        return {
            "content": content,
            "thinking": thinking,
            "usage": {
                "input_tokens": input_t,
                "output_tokens": output_t,
                "thinking_tokens": thinking_t,
                "cost_usd": cost,
            },
            "model": config.name,
        }
    
    async def _generate_openai(
        self,
        prompt: str,
        config: ModelConfig,
        system: Optional[str],
        max_tokens: int,
        temperature: float,
        enable_thinking: bool,
    ) -> Dict[str, Any]:
        """Generate using OpenAI API."""
        client = self._get_client(Provider.OPENAI)
        
        messages = []
        if system:
            messages.append({"role": "system", "content": system})
        messages.append({"role": "user", "content": prompt})
        
        kwargs = {
            "model": config.name,
            "max_tokens": max_tokens,
            "temperature": temperature,
            "messages": messages,
        }
        
        # GPT-5 thinking mode
        if enable_thinking and config.supports_thinking:
            kwargs["reasoning_effort"] = "high"
        
        response = await asyncio.to_thread(
            client.chat.completions.create, **kwargs
        )
        
        content = response.choices[0].message.content
        
        # Track usage
        usage = response.usage
        input_t = usage.prompt_tokens
        output_t = usage.completion_tokens
        reasoning_t = getattr(usage, 'reasoning_tokens', 0) or 0
        
        cost = (
            input_t * config.cost_per_1k_input / 1000 +
            output_t * config.cost_per_1k_output / 1000
        )
        self.usage.add(input_t, output_t, reasoning_t, cost)
        
        return {
            "content": content,
            "thinking": "",  # OpenAI doesn't expose thinking
            "usage": {
                "input_tokens": input_t,
                "output_tokens": output_t,
                "reasoning_tokens": reasoning_t,
                "cost_usd": cost,
            },
            "model": config.name,
        }
    
    async def _generate_google(
        self,
        prompt: str,
        config: ModelConfig,
        system: Optional[str],
        max_tokens: int,
        temperature: float,
        enable_thinking: bool,
        thinking_budget: Optional[int],
    ) -> Dict[str, Any]:
        """Generate using Google Gemini API."""
        genai = self._get_client(Provider.GOOGLE)
        
        model = genai.GenerativeModel(config.name)
        
        full_prompt = prompt
        if system:
            full_prompt = f"{system}\n\n{prompt}"
        
        generation_config = {
            "max_output_tokens": max_tokens,
            "temperature": temperature,
        }
        
        if enable_thinking and config.supports_thinking:
            budget = thinking_budget or config.default_thinking_budget
            generation_config["thinking_config"] = {
                "thinking_budget": budget
            }
        
        response = await asyncio.to_thread(
            model.generate_content,
            full_prompt,
            generation_config=generation_config
        )
        
        content = response.text
        
        # Estimate tokens (Gemini doesn't always report accurately)
        input_t = len(full_prompt.split()) * 1.3
        output_t = len(content.split()) * 1.3
        
        cost = (
            input_t * config.cost_per_1k_input / 1000 +
            output_t * config.cost_per_1k_output / 1000
        )
        self.usage.add(int(input_t), int(output_t), 0, cost)
        
        return {
            "content": content,
            "thinking": "",
            "usage": {
                "input_tokens": int(input_t),
                "output_tokens": int(output_t),
                "cost_usd": cost,
            },
            "model": config.name,
        }
    
    async def _generate_deepseek(
        self,
        prompt: str,
        config: ModelConfig,
        system: Optional[str],
        max_tokens: int,
        temperature: float,
    ) -> Dict[str, Any]:
        """Generate using DeepSeek API (OpenAI-compatible)."""
        client = self._get_client(Provider.DEEPSEEK)
        
        messages = []
        if system:
            messages.append({"role": "system", "content": system})
        messages.append({"role": "user", "content": prompt})
        
        response = await asyncio.to_thread(
            client.chat.completions.create,
            model=config.name,
            max_tokens=max_tokens,
            temperature=temperature,
            messages=messages,
        )
        
        content = response.choices[0].message.content
        reasoning = getattr(
            response.choices[0].message, 
            'reasoning_content', 
            ''
        ) or ''
        
        usage = response.usage
        input_t = usage.prompt_tokens
        output_t = usage.completion_tokens
        
        cost = (
            input_t * config.cost_per_1k_input / 1000 +
            output_t * config.cost_per_1k_output / 1000
        )
        self.usage.add(input_t, output_t, 0, cost)
        
        return {
            "content": content,
            "thinking": reasoning,
            "usage": {
                "input_tokens": input_t,
                "output_tokens": output_t,
                "cost_usd": cost,
            },
            "model": config.name,
        }
    
    def get_usage_summary(self) -> Dict[str, Any]:
        """Get usage summary."""
        return {
            "total_requests": self.usage.requests,
            "total_input_tokens": self.usage.input_tokens,
            "total_output_tokens": self.usage.output_tokens,
            "total_thinking_tokens": self.usage.thinking_tokens,
            "total_cost_usd": round(self.usage.cost_usd, 4),
            "budget_remaining_usd": round(
                self.monthly_budget_usd - self.usage.cost_usd, 4
            ),
            "budget_utilization_pct": round(
                self.usage.cost_usd / self.monthly_budget_usd * 100, 2
            ),
        }
    
    def is_within_budget(self) -> bool:
        """Check if still within budget."""
        return self.usage.cost_usd < self.monthly_budget_usd




