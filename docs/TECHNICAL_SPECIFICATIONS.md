# 🔧 Technical Specifications

## 📋 Document Information

**Created**: December 2, 2025
**Author**: Claude AI Research Assistant
**Purpose**: Comprehensive technical specifications for SNU Connectome Fellows Program website
**Version**: 1.0

---

## 🏗️ System Requirements

### 📊 Performance Requirements

```yaml
performance_specifications:
  response_times:
    page_load_time: "< 2 seconds (95th percentile)"
    time_to_first_byte: "< 500ms"
    first_contentful_paint: "< 1.5 seconds"
    largest_contentful_paint: "< 2.5 seconds"
    cumulative_layout_shift: "< 0.1"
    first_input_delay: "< 100ms"

  throughput:
    concurrent_users: "1,000 simultaneous users"
    requests_per_second: "500 RPS (peak)"
    database_queries_per_second: "1,000 QPS"
    file_upload_throughput: "10MB/s per user"

  availability:
    uptime: "99.9% (8.76 hours downtime/year)"
    recovery_time: "< 5 minutes for planned maintenance"
    backup_frequency: "Daily automated backups"
    disaster_recovery: "< 4 hours RTO, < 1 hour RPO"

  scalability:
    horizontal_scaling: "Auto-scaling 1-10 instances"
    database_scaling: "Read replicas for analytics"
    cdn_coverage: "Global edge locations"
    load_balancing: "Multi-AZ distribution"
```

### 🔒 Security Requirements

```yaml
security_specifications:
  authentication:
    methods: ["Email/Password", "Google OAuth", "SNU SSO"]
    session_management: "JWT with 24-hour expiry"
    password_policy: "Min 8 chars, complexity requirements"
    multi_factor_auth: "Optional TOTP for admin users"
    account_lockout: "5 failed attempts, 15-minute lockout"

  authorization:
    access_control: "Role-Based Access Control (RBAC)"
    permission_granularity: "Endpoint and resource level"
    privilege_escalation: "Prevented through strict validation"
    data_access: "Principle of least privilege"

  data_protection:
    encryption_at_rest: "AES-256 for sensitive data"
    encryption_in_transit: "TLS 1.3 for all communications"
    key_management: "AWS KMS integration"
    pii_handling: "GDPR compliant anonymization"

  application_security:
    input_validation: "Comprehensive sanitization"
    output_encoding: "Context-aware encoding"
    csrf_protection: "Double submit cookie pattern"
    xss_prevention: "Content Security Policy"
    sql_injection: "Parameterized queries only"

  infrastructure_security:
    network_security: "VPC with private subnets"
    firewall: "AWS WAF with custom rules"
    ddos_protection: "CloudFlare + AWS Shield"
    intrusion_detection: "CloudTrail + GuardDuty"
    vulnerability_scanning: "Automated OWASP ZAP scans"
```

### ♿ Accessibility Requirements

```yaml
accessibility_specifications:
  compliance_level: "WCAG 2.1 AA"

  keyboard_navigation:
    tab_order: "Logical tab sequence"
    focus_indicators: "Visible focus states"
    keyboard_shortcuts: "Alt+S for search, Alt+M for menu"
    skip_links: "Skip to content, skip navigation"

  screen_reader_support:
    semantic_markup: "Proper HTML5 semantics"
    aria_labels: "Comprehensive ARIA attributes"
    alt_text: "Descriptive alt text for all images"
    form_labels: "Explicit form field labels"

  visual_accessibility:
    color_contrast: "4.5:1 minimum ratio"
    text_scaling: "200% zoom without horizontal scroll"
    color_independence: "No color-only information"
    focus_visible: "High contrast focus indicators"

  motor_accessibility:
    click_targets: "44x44px minimum touch targets"
    timeout_controls: "Adjustable or no timeouts"
    motion_controls: "Reduced motion preferences"
    error_handling: "Clear error identification"

  cognitive_accessibility:
    plain_language: "Grade 9 reading level"
    consistent_navigation: "Predictable interface"
    error_suggestions: "Helpful error messages"
    help_context: "Contextual help available"
```

---

## 💻 Frontend Technical Specifications

### 🎨 Next.js Application Architecture

```typescript
// Frontend Technology Stack
interface FrontendStack {
  framework: "Next.js 14.0+";
  runtime: "Node.js 18+";
  language: "TypeScript 5.0+";
  styling: "Tailwind CSS 3.3+";
  ui_library: "shadcn/ui + Radix UI";
  state_management: "TanStack Query + Zustand";
  forms: "React Hook Form + Zod";
  animations: "Framer Motion";
  testing: "Vitest + Testing Library + Playwright";
}

// Project Structure
const projectStructure = {
  "app/": "Next.js 13+ App Router",
  "components/": "Reusable UI components",
  "lib/": "Utility functions and configs",
  "hooks/": "Custom React hooks",
  "types/": "TypeScript type definitions",
  "styles/": "Global styles and Tailwind config",
  "public/": "Static assets",
  "__tests__/": "Unit and integration tests",
  "e2e/": "End-to-end tests",
  "docs/": "Component documentation"
};

// Component Architecture
interface ComponentArchitecture {
  design_system: {
    tokens: "Design tokens for colors, typography, spacing";
    components: "Atomic design methodology";
    documentation: "Storybook for component catalog";
  };

  routing: {
    strategy: "App Router with TypeScript";
    layouts: "Nested layouts for consistent structure";
    loading: "React Suspense with loading components";
    error_handling: "Error boundaries with fallbacks";
  };

  data_fetching: {
    client_side: "TanStack Query for server state";
    server_side: "Next.js Server Components";
    caching: "Automatic caching with revalidation";
    optimistic_updates: "Optimistic UI patterns";
  };
}
```

### 🎯 Component Specifications

```typescript
// Core Component Interfaces
interface CoreComponents {
  Layout: {
    Header: {
      props: {
        navigation: NavigationItem[];
        user?: User;
        showSearch: boolean;
      };
      features: ["Responsive navigation", "Search integration", "User menu"];
    };

    Footer: {
      props: {
        links: FooterLink[];
        socialMedia: SocialLink[];
      };
      features: ["Multi-column layout", "Newsletter signup", "Legal links"];
    };

    Sidebar: {
      props: {
        items: SidebarItem[];
        collapsed: boolean;
      };
      features: ["Collapsible menu", "Active state", "Icon support"];
    };
  };

  Forms: {
    ApplicationForm: {
      props: {
        initialData?: ApplicationData;
        onSubmit: (data: ApplicationData) => Promise<void>;
        onSave?: (data: Partial<ApplicationData>) => Promise<void>;
        readonly?: boolean;
      };
      features: [
        "Multi-step wizard",
        "Auto-save functionality",
        "File upload integration",
        "Real-time validation",
        "Progress indicator"
      ];
      validation: "Zod schema validation";
      accessibility: "WCAG 2.1 AA compliant";
    };

    AuthForms: {
      components: ["LoginForm", "RegisterForm", "ForgotPasswordForm"];
      props: {
        onSuccess: (user: User) => void;
        onError: (error: string) => void;
        redirectUrl?: string;
      };
      features: [
        "Social authentication",
        "Form validation",
        "Loading states",
        "Error handling"
      ];
    };
  };

  DataVisualization: {
    BudgetChart: {
      props: {
        data: BudgetData;
        currency: "KRW" | "USD";
        interactive: boolean;
      };
      charts: ["Pie chart", "Bar chart", "Stacked chart"];
      features: ["Responsive", "Animated", "Tooltip", "Legend"];
    };

    NetworkGraph: {
      props: {
        mentors: Mentor[];
        fellows: Fellow[];
        connections: Connection[];
      };
      features: [
        "Force-directed layout",
        "Zoom and pan",
        "Node clustering",
        "Interactive tooltips"
      ];
      library: "D3.js with React integration";
    };
  };

  AI: {
    ChatBot: {
      props: {
        apiEndpoint: string;
        context: ChatContext;
        language: "ko" | "en";
      };
      features: [
        "Real-time messaging",
        "Typing indicators",
        "Message history",
        "File attachments",
        "Voice input (optional)"
      ];
      integration: "WebSocket for real-time updates";
    };

    TranslationToggle: {
      props: {
        content: string;
        fromLang: string;
        toLang: string;
        onTranslate: (translated: string) => void;
      };
      features: [
        "One-click translation",
        "Language detection",
        "Quality indicator",
        "Fallback handling"
      ];
    };
  };
}

// State Management Specifications
interface StateManagement {
  global_state: {
    tool: "Zustand";
    stores: [
      "authStore",      // User authentication state
      "uiStore",        // UI preferences (theme, language)
      "notificationStore" // Toast notifications
    ];
  };

  server_state: {
    tool: "TanStack Query";
    caching: {
      staleTime: "5 minutes";
      gcTime: "30 minutes";
      refetchOnWindowFocus: true;
    };
    optimizations: [
      "Background refetching",
      "Optimistic updates",
      "Infinite queries for pagination",
      "Parallel queries"
    ];
  };

  form_state: {
    tool: "React Hook Form";
    validation: "Zod schemas";
    features: [
      "Real-time validation",
      "Field-level errors",
      "Auto-save drafts",
      "Form persistence"
    ];
  };
}
```

### 🎨 Design System Specifications

```typescript
// Design Token Definitions
const designTokens = {
  colors: {
    primary: {
      50: "#eff6ff",
      500: "#3b82f6",  // Main brand color
      900: "#1e3a8a"
    },
    semantic: {
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#6366f1"
    },
    neutral: {
      50: "#f9fafb",
      500: "#6b7280",
      900: "#111827"
    }
  },

  typography: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      mono: ["JetBrains Mono", "monospace"],
      korean: ["Noto Sans KR", "sans-serif"]
    },
    fontSize: {
      xs: "0.75rem",    // 12px
      sm: "0.875rem",   // 14px
      base: "1rem",     // 16px
      lg: "1.125rem",   // 18px
      xl: "1.25rem",    // 20px
      "2xl": "1.5rem",  // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem"  // 36px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75
    }
  },

  spacing: {
    scale: "0.25rem base (4px)",
    values: {
      px: "1px",
      0.5: "0.125rem", // 2px
      1: "0.25rem",    // 4px
      2: "0.5rem",     // 8px
      4: "1rem",       // 16px
      8: "2rem",       // 32px
      16: "4rem"       // 64px
    }
  },

  breakpoints: {
    sm: "640px",   // Mobile landscape
    md: "768px",   // Tablet
    lg: "1024px",  // Desktop
    xl: "1280px",  // Large desktop
    "2xl": "1536px" // Extra large
  },

  animations: {
    duration: {
      fast: "150ms",
      normal: "200ms",
      slow: "300ms"
    },
    easing: {
      ease_in_out: "cubic-bezier(0.4, 0, 0.2, 1)",
      ease_out: "cubic-bezier(0, 0, 0.2, 1)",
      bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
    }
  }
};

// Component Styling Standards
interface StylingStandards {
  methodology: "Utility-first with Tailwind CSS";
  custom_styles: "CSS modules for complex components";
  theming: "CSS variables for runtime theme switching";

  responsive_design: {
    approach: "Mobile-first";
    breakpoints: typeof designTokens.breakpoints;
    container_strategy: "Max-width with auto margins";
    grid_system: "CSS Grid and Flexbox";
  };

  dark_mode: {
    strategy: "CSS variables with class toggle";
    persistence: "localStorage with system preference";
    components: "All components support dark mode";
  };

  animations: {
    library: "Framer Motion";
    principles: [
      "Meaningful motion",
      "Reduced motion preference",
      "60fps performance",
      "Accessibility consideration"
    ];
    common_patterns: [
      "Page transitions",
      "Hover effects",
      "Loading states",
      "Micro-interactions"
    ];
  };
}
```

---

## 🖥️ Backend Technical Specifications

### 🐍 FastAPI Application Architecture

```python
# Backend Technology Stack
from typing import Dict, List, Optional
from pydantic import BaseModel

class BackendStack(BaseModel):
    framework: str = "FastAPI 0.104+"
    runtime: str = "Python 3.11+"
    database: str = "PostgreSQL 15+"
    orm: str = "SQLAlchemy 2.0+"
    cache: str = "Redis 7+"
    task_queue: str = "Celery + Redis"
    auth: str = "JWT with python-jose"
    validation: str = "Pydantic 2.0+"
    testing: str = "pytest + httpx"
    documentation: str = "OpenAPI 3.0 (auto-generated)"

# Application Structure
class ApplicationArchitecture:
    structure = {
        "main.py": "FastAPI app initialization",
        "config/": "Configuration management",
        "models/": "SQLAlchemy database models",
        "schemas/": "Pydantic request/response schemas",
        "routers/": "API route handlers",
        "services/": "Business logic layer",
        "middleware/": "Custom middleware components",
        "utils/": "Utility functions",
        "tests/": "Test suites",
        "migrations/": "Alembic database migrations"
    }

    layers = {
        "presentation": "FastAPI routers and endpoints",
        "business": "Service layer with business logic",
        "data_access": "Repository pattern with SQLAlchemy",
        "external": "Third-party integrations (AI, email, etc.)"
    }
```

### 🗄️ Database Specifications

```sql
-- Database Schema Specifications
-- PostgreSQL 15 with specific configurations

-- Connection Settings
-- max_connections = 100
-- shared_buffers = 256MB
-- effective_cache_size = 1GB
-- maintenance_work_mem = 64MB
-- checkpoint_completion_target = 0.9
-- wal_buffers = 16MB
-- default_statistics_target = 100

-- Core Tables with Detailed Specifications

-- Users table with comprehensive user management
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role user_role NOT NULL DEFAULT 'visitor',

    -- Integration with existing systems
    fellow_id UUID REFERENCES fellows(id),
    mentor_id UUID REFERENCES mentors(id),

    -- Account status
    email_verified BOOLEAN DEFAULT false,
    account_locked BOOLEAN DEFAULT false,
    failed_login_attempts INTEGER DEFAULT 0,
    last_failed_login TIMESTAMP WITH TIME ZONE,

    -- Profile information
    phone VARCHAR(20),
    department VARCHAR(100),
    student_id VARCHAR(20),
    graduation_year INTEGER,
    profile_image_url VARCHAR(500),
    bio TEXT,

    -- Preferences
    language_preference VARCHAR(5) DEFAULT 'ko',
    timezone VARCHAR(50) DEFAULT 'Asia/Seoul',
    notification_preferences JSONB DEFAULT '{}',

    -- Audit fields
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES users(id),

    -- Constraints
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT valid_phone CHECK (phone IS NULL OR phone ~* '^\+?[\d\s\-\(\)]{10,20}$')
);

-- User roles with comprehensive permissions
CREATE TYPE user_role AS ENUM (
    'super_admin',      -- Full system access
    'admin',            -- Program administration
    'program_manager',  -- Program operations
    'mentor',           -- Fellow mentoring
    'fellow',           -- Active program participant
    'applicant',        -- Application submitted
    'visitor'           -- Public access only
);

-- Applications table with detailed tracking
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- Application content (JSONB for flexibility)
    form_data JSONB NOT NULL,

    -- Status tracking
    status application_status NOT NULL DEFAULT 'draft',
    submitted_at TIMESTAMP WITH TIME ZONE,
    review_started_at TIMESTAMP WITH TIME ZONE,
    review_completed_at TIMESTAMP WITH TIME ZONE,
    decision_at TIMESTAMP WITH TIME ZONE,

    -- Review information
    reviewer_id UUID REFERENCES users(id),
    review_notes TEXT,
    score INTEGER CHECK (score >= 0 AND score <= 100),
    ai_screening_score DECIMAL(5,2),
    ai_screening_notes JSONB,

    -- Application metadata
    application_year INTEGER NOT NULL,
    application_round INTEGER DEFAULT 1,
    priority_score DECIMAL(8,4),
    tags TEXT[],

    -- Audit fields
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- Indexes for performance
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TYPE application_status AS ENUM (
    'draft',            -- Being written
    'submitted',        -- Submitted for review
    'under_review',     -- Being evaluated
    'interview_scheduled', -- Interview phase
    'accepted',         -- Accepted into program
    'rejected',         -- Not accepted
    'waitlisted',       -- On waiting list
    'withdrawn'         -- Withdrawn by applicant
);

-- File uploads with comprehensive metadata
CREATE TABLE file_uploads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    application_id UUID REFERENCES applications(id),

    -- File information
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_extension VARCHAR(10),

    -- Storage information
    s3_bucket VARCHAR(100) NOT NULL,
    s3_key VARCHAR(500) NOT NULL,
    s3_version_id VARCHAR(100),

    -- File categorization
    file_category file_category NOT NULL,
    file_purpose VARCHAR(100),
    is_public BOOLEAN DEFAULT false,

    -- Processing status
    virus_scan_status VARCHAR(20) DEFAULT 'pending',
    virus_scan_result VARCHAR(50),
    processing_status VARCHAR(20) DEFAULT 'uploaded',

    -- Metadata
    upload_ip INET,
    user_agent TEXT,
    upload_method VARCHAR(20) DEFAULT 'web',

    -- Audit
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE,

    -- Constraints
    CONSTRAINT positive_file_size CHECK (file_size > 0),
    CONSTRAINT valid_mime_type CHECK (mime_type ~ '^[a-zA-Z0-9][a-zA-Z0-9!#$&\-\^_]*\/[a-zA-Z0-9][a-zA-Z0-9!#$&\-\^_.]*$')
);

CREATE TYPE file_category AS ENUM (
    'transcript',       -- Academic transcripts
    'cv_resume',        -- CV or resume
    'personal_statement', -- Personal statement
    'research_proposal', -- Research proposal
    'portfolio',        -- Work portfolio
    'recommendation',   -- Recommendation letters
    'certificate',     -- Certificates
    'photo',           -- Profile photos
    'other'            -- Other documents
);

-- Content management for website pages
CREATE TABLE website_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Content identification
    content_type content_type NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,

    -- Multi-language content
    title JSONB NOT NULL, -- {"ko": "제목", "en": "Title", "ja": "タイトル"}
    content JSONB NOT NULL, -- Multi-language content body
    summary JSONB, -- Brief summary/excerpt
    meta_description JSONB, -- SEO meta descriptions

    -- Media
    featured_image_url VARCHAR(500),
    featured_image_alt JSONB, -- Alt text in multiple languages
    media_gallery JSONB, -- Array of media items

    -- Publishing
    status content_status NOT NULL DEFAULT 'draft',
    published_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,

    -- SEO and organization
    seo_data JSONB, -- SEO metadata
    tags TEXT[], -- Content tags
    categories TEXT[], -- Content categories
    priority INTEGER DEFAULT 0, -- Display priority

    -- Versioning
    version INTEGER DEFAULT 1,
    parent_id UUID REFERENCES website_content(id),

    -- Audit
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID NOT NULL REFERENCES users(id),
    updated_by UUID REFERENCES users(id),

    -- Search optimization
    search_vector tsvector GENERATED ALWAYS AS (
        to_tsvector('english', coalesce(title->>'en', '') || ' ' || coalesce(content->>'en', '')) ||
        to_tsvector('korean', coalesce(title->>'ko', '') || ' ' || coalesce(content->>'ko', ''))
    ) STORED
);

CREATE TYPE content_type AS ENUM (
    'page',             -- Static pages
    'news',             -- News articles
    'event',            -- Events
    'blog',             -- Blog posts
    'announcement',     -- Announcements
    'faq',              -- Frequently asked questions
    'policy'            -- Policy documents
);

CREATE TYPE content_status AS ENUM (
    'draft',            -- Work in progress
    'review',           -- Under review
    'published',        -- Live on website
    'archived',         -- No longer active
    'scheduled'         -- Scheduled for future publication
);

-- Analytics tracking (privacy-compliant)
CREATE TABLE website_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Session information (anonymized)
    session_id VARCHAR(255) NOT NULL, -- Anonymous session ID
    visitor_id VARCHAR(255), -- Persistent visitor ID (hashed)

    -- Page information
    page_url VARCHAR(1000) NOT NULL,
    page_title VARCHAR(500),
    referrer VARCHAR(1000),

    -- Event tracking
    event_type analytics_event NOT NULL,
    event_data JSONB,
    event_value DECIMAL(10,2),

    -- User agent (anonymized)
    browser_family VARCHAR(50),
    browser_version VARCHAR(20),
    os_family VARCHAR(50),
    device_type VARCHAR(20),

    -- Geographic (anonymized to city level)
    country VARCHAR(2),
    region VARCHAR(100),
    city VARCHAR(100),

    -- Technical metrics
    page_load_time INTEGER, -- milliseconds
    dom_content_loaded INTEGER, -- milliseconds

    -- Privacy compliance
    tracking_consent BOOLEAN DEFAULT true,
    do_not_track BOOLEAN DEFAULT false,

    -- Timestamp
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- Partitioning by month for performance
    CONSTRAINT valid_timestamp CHECK (timestamp >= '2025-01-01'::timestamp)
) PARTITION BY RANGE (timestamp);

CREATE TYPE analytics_event AS ENUM (
    'pageview',         -- Page view
    'session_start',    -- Session start
    'session_end',      -- Session end
    'application_start', -- Started application
    'application_save', -- Saved application draft
    'application_submit', -- Submitted application
    'file_upload',      -- File uploaded
    'download',         -- File downloaded
    'search',           -- Search performed
    'contact_form',     -- Contact form submitted
    'newsletter_signup', -- Newsletter subscription
    'ai_chat_start',    -- Started AI chat
    'ai_chat_message',  -- AI chat message
    'translation_used', -- Used translation feature
    'external_link',    -- Clicked external link
    'error_encountered' -- Error occurred
);

-- Performance indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_users_fellow_mentor ON users(fellow_id, mentor_id);

CREATE INDEX idx_applications_user_id ON applications(user_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_submitted_at ON applications(submitted_at);
CREATE INDEX idx_applications_year_round ON applications(application_year, application_round);
CREATE INDEX idx_applications_score ON applications(score) WHERE score IS NOT NULL;

CREATE INDEX idx_files_user_id ON file_uploads(user_id);
CREATE INDEX idx_files_application_id ON file_uploads(application_id);
CREATE INDEX idx_files_category ON file_uploads(file_category);
CREATE INDEX idx_files_uploaded_at ON file_uploads(uploaded_at);

CREATE INDEX idx_content_slug ON website_content(slug);
CREATE INDEX idx_content_type_status ON website_content(content_type, status);
CREATE INDEX idx_content_published ON website_content(published_at) WHERE status = 'published';
CREATE INDEX idx_content_search ON website_content USING gin(search_vector);

CREATE INDEX idx_analytics_session ON website_analytics(session_id);
CREATE INDEX idx_analytics_timestamp ON website_analytics(timestamp);
CREATE INDEX idx_analytics_event_type ON website_analytics(event_type);

-- Full-text search indexes
CREATE INDEX idx_content_search_ko ON website_content
    USING gin(to_tsvector('korean', title->>'ko' || ' ' || content->>'ko'));
CREATE INDEX idx_content_search_en ON website_content
    USING gin(to_tsvector('english', title->>'en' || ' ' || content->>'en'));
```

### 🔌 API Specifications

```python
# Comprehensive API Endpoint Specifications
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from fastapi.responses import JSONResponse, StreamingResponse
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field, validator
from datetime import datetime
from enum import Enum

# API Response Models
class APIResponse(BaseModel):
    success: bool
    message: str
    data: Optional[Dict[str, Any]] = None
    errors: Optional[List[str]] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class PaginatedResponse(BaseModel):
    items: List[Dict[str, Any]]
    total: int
    page: int
    per_page: int
    pages: int
    has_next: bool
    has_prev: bool

# Authentication Endpoints
class AuthRouter:
    prefix = "/api/v1/auth"

    @staticmethod
    async def login(credentials: UserCredentials) -> AuthResponse:
        """
        User login with email/password or OAuth

        Request:
        - email: string (email format)
        - password: string (min 8 characters)
        - remember_me: boolean (optional)

        Response:
        - access_token: JWT token (24 hours)
        - refresh_token: Refresh token (30 days)
        - user: User profile data
        - expires_in: Token expiry in seconds

        Errors:
        - 401: Invalid credentials
        - 423: Account locked
        - 429: Too many attempts
        """
        pass

    @staticmethod
    async def register(user_data: UserCreate) -> AuthResponse:
        """
        User registration

        Request:
        - email: string (unique, @snu.ac.kr preferred)
        - password: string (min 8 chars, complexity required)
        - first_name: string (max 100 chars)
        - last_name: string (max 100 chars)
        - department: string (optional)
        - student_id: string (optional)

        Response:
        - user: Created user profile
        - verification_email_sent: boolean

        Errors:
        - 400: Validation errors
        - 409: Email already exists
        """
        pass

    @staticmethod
    async def verify_email(token: str) -> APIResponse:
        """Email verification"""
        pass

    @staticmethod
    async def refresh_token(refresh_token: str) -> AuthResponse:
        """Refresh access token"""
        pass

    @staticmethod
    async def logout() -> APIResponse:
        """Logout and invalidate tokens"""
        pass

    @staticmethod
    async def forgot_password(email: str) -> APIResponse:
        """Request password reset"""
        pass

    @staticmethod
    async def reset_password(token: str, new_password: str) -> APIResponse:
        """Reset password with token"""
        pass

# Application Management Endpoints
class ApplicationRouter:
    prefix = "/api/v1/applications"

    @staticmethod
    async def create_application(
        application_data: ApplicationCreate,
        current_user: User = Depends(get_current_user)
    ) -> ApplicationResponse:
        """
        Create new application

        Request:
        - personal_info: PersonalInfo object
        - academic_info: AcademicInfo object
        - research_experience: List[ResearchExperience]
        - technical_skills: List[TechnicalSkill]
        - essays: List[Essay]
        - research_proposal: ResearchProposal

        Response:
        - application: Created application
        - next_steps: List of required actions

        Permissions: Authenticated users only
        """
        pass

    @staticmethod
    async def get_application(
        application_id: str,
        current_user: User = Depends(get_current_user)
    ) -> ApplicationResponse:
        """
        Get application by ID

        Permissions:
        - Own applications: Always
        - Admin/Reviewer: All applications
        - Mentor: Assigned applications only
        """
        pass

    @staticmethod
    async def update_application(
        application_id: str,
        update_data: ApplicationUpdate,
        current_user: User = Depends(get_current_user)
    ) -> ApplicationResponse:
        """
        Update application (draft status only)

        Validation:
        - Only draft applications can be modified
        - Owner or admin permission required
        - Incremental validation on each section
        """
        pass

    @staticmethod
    async def submit_application(
        application_id: str,
        current_user: User = Depends(get_current_user)
    ) -> ApplicationResponse:
        """
        Submit application for review

        Process:
        1. Validate all required fields
        2. Run AI pre-screening
        3. Update status to 'submitted'
        4. Send confirmation email
        5. Notify reviewers
        """
        pass

    @staticmethod
    async def upload_file(
        application_id: str,
        file: UploadFile = File(...),
        category: str = Form(...),
        current_user: User = Depends(get_current_user)
    ) -> FileUploadResponse:
        """
        Upload file for application

        Validation:
        - File size: Max 10MB
        - File types: PDF, DOC, DOCX, JPG, PNG
        - Virus scanning
        - Metadata extraction

        Processing:
        - S3 upload with versioning
        - Thumbnail generation for images
        - Text extraction for searchability
        """
        pass

    @staticmethod
    async def download_file(
        file_id: str,
        current_user: User = Depends(get_current_user)
    ) -> StreamingResponse:
        """
        Download uploaded file

        Security:
        - Permission validation
        - Virus scan verification
        - Access logging
        """
        pass

# Content Management Endpoints
class ContentRouter:
    prefix = "/api/v1/content"

    @staticmethod
    async def get_page(
        slug: str,
        lang: str = "ko"
    ) -> ContentResponse:
        """
        Get page content by slug

        Features:
        - Multi-language support
        - SEO metadata included
        - View tracking
        - Related content suggestions
        """
        pass

    @staticmethod
    async def list_content(
        content_type: Optional[str] = None,
        status: Optional[str] = "published",
        lang: str = "ko",
        page: int = 1,
        per_page: int = 20
    ) -> PaginatedResponse:
        """
        List content with filtering

        Filters:
        - content_type: page, news, event, blog
        - status: published, draft, archived
        - language: ko, en, ja, zh
        - tags: Comma-separated tags
        - search: Full-text search
        """
        pass

    @staticmethod
    async def search_content(
        query: str,
        lang: str = "ko",
        content_type: Optional[str] = None
    ) -> SearchResponse:
        """
        Full-text content search

        Features:
        - Multi-language search
        - Relevance scoring
        - Faceted search
        - Search suggestions
        """
        pass

    @staticmethod
    async def create_content(
        content_data: ContentCreate,
        current_user: User = Depends(get_current_admin)
    ) -> ContentResponse:
        """
        Create new content

        Permissions: Admin, Program Manager
        Features:
        - Multi-language support
        - Draft/schedule publishing
        - SEO optimization
        - Version control
        """
        pass

    @staticmethod
    async def update_content(
        content_id: str,
        update_data: ContentUpdate,
        current_user: User = Depends(get_current_admin)
    ) -> ContentResponse:
        """Update content with versioning"""
        pass

# AI Service Endpoints
class AIRouter:
    prefix = "/api/v1/ai"

    @staticmethod
    async def chat(
        message: str,
        context: Optional[str] = None,
        language: str = "ko",
        current_user: User = Depends(get_current_user)
    ) -> ChatResponse:
        """
        AI chatbot interaction

        Features:
        - Context-aware responses
        - Multi-language support
        - Conversation history
        - Usage tracking

        Rate limits:
        - 60 requests per hour per user
        - 10 requests per minute per user
        """
        pass

    @staticmethod
    async def translate(
        text: str,
        from_lang: str,
        to_lang: str,
        current_user: Optional[User] = Depends(get_current_user_optional)
    ) -> TranslationResponse:
        """
        Text translation service

        Supported languages: ko, en, ja, zh
        Features:
        - Quality scoring
        - Translation caching
        - Batch translation
        """
        pass

    @staticmethod
    async def analyze_application(
        application_id: str,
        current_user: User = Depends(get_current_reviewer)
    ) -> AnalysisResponse:
        """
        AI-powered application analysis

        Features:
        - Completeness check
        - Eligibility verification
        - Quality scoring
        - Recommendation generation

        Permissions: Reviewer, Admin only
        """
        pass

# Admin Endpoints
class AdminRouter:
    prefix = "/api/v1/admin"

    @staticmethod
    async def list_applications(
        status: Optional[str] = None,
        year: Optional[int] = None,
        page: int = 1,
        per_page: int = 50,
        current_user: User = Depends(get_current_admin)
    ) -> PaginatedResponse:
        """
        List applications for review

        Filters:
        - status: All application statuses
        - year: Application year
        - reviewer: Assigned reviewer
        - score_range: Min/max scores
        - department: Applicant department
        """
        pass

    @staticmethod
    async def review_application(
        application_id: str,
        review_data: ApplicationReview,
        current_user: User = Depends(get_current_reviewer)
    ) -> ReviewResponse:
        """
        Review and score application

        Process:
        1. Record review decision
        2. Update application status
        3. Send notification to applicant
        4. Log review activity
        """
        pass

    @staticmethod
    async def bulk_update_applications(
        application_ids: List[str],
        update_data: BulkApplicationUpdate,
        current_user: User = Depends(get_current_admin)
    ) -> BulkUpdateResponse:
        """Bulk update multiple applications"""
        pass

    @staticmethod
    async def get_analytics(
        start_date: datetime,
        end_date: datetime,
        metrics: List[str],
        current_user: User = Depends(get_current_admin)
    ) -> AnalyticsResponse:
        """
        Get application and website analytics

        Metrics:
        - application_stats: Counts, conversions
        - user_stats: Registrations, activity
        - content_stats: Views, engagement
        - performance_stats: Load times, errors
        """
        pass

    @staticmethod
    async def export_data(
        data_type: str,
        format: str = "xlsx",
        filters: Optional[Dict] = None,
        current_user: User = Depends(get_current_admin)
    ) -> StreamingResponse:
        """
        Export data in various formats

        Data types: applications, users, analytics
        Formats: xlsx, csv, json
        """
        pass

# Program Information Endpoints
class ProgramRouter:
    prefix = "/api/v1/program"

    @staticmethod
    async def get_overview() -> ProgramOverviewResponse:
        """Get program overview information"""
        pass

    @staticmethod
    async def get_mentors() -> List[MentorProfile]:
        """Get mentor network information"""
        pass

    @staticmethod
    async def get_curriculum() -> CurriculumResponse:
        """Get curriculum details"""
        pass

    @staticmethod
    async def get_budget_info() -> BudgetInfoResponse:
        """Get investment and support information"""
        pass

    @staticmethod
    async def get_alumni() -> List[AlumniProfile]:
        """Get alumni network and outcomes"""
        pass

    @staticmethod
    async def get_research_projects() -> List[ResearchProject]:
        """Get current research projects"""
        pass

# Rate Limiting Specifications
rate_limits = {
    "auth_login": "5 attempts per 15 minutes per IP",
    "auth_register": "3 attempts per hour per IP",
    "file_upload": "10 uploads per hour per user",
    "ai_chat": "60 requests per hour per user",
    "translation": "100 requests per hour per user",
    "content_search": "200 requests per hour per IP",
    "admin_export": "5 exports per hour per user"
}

# Error Response Specifications
class ErrorResponse(BaseModel):
    error_code: str
    message: str
    details: Optional[Dict] = None
    timestamp: datetime
    request_id: str

error_codes = {
    "VALIDATION_ERROR": "Request validation failed",
    "AUTHENTICATION_REQUIRED": "Authentication required",
    "PERMISSION_DENIED": "Insufficient permissions",
    "RESOURCE_NOT_FOUND": "Requested resource not found",
    "RATE_LIMIT_EXCEEDED": "Rate limit exceeded",
    "FILE_TOO_LARGE": "File size exceeds limit",
    "INVALID_FILE_TYPE": "File type not allowed",
    "APPLICATION_ALREADY_SUBMITTED": "Application already submitted",
    "AI_SERVICE_UNAVAILABLE": "AI service temporarily unavailable"
}
```

---

## 🧪 Testing Specifications

### 🔬 Test Strategy

```python
# Comprehensive Testing Framework
import pytest
from fastapi.testclient import TestClient
from typing import Dict, List, Any

class TestingStrategy:
    """Complete testing strategy for the application"""

    # Test Coverage Requirements
    coverage_requirements = {
        "backend": "85% minimum",
        "frontend": "80% minimum",
        "integration": "90% of critical paths",
        "e2e": "100% of user journeys"
    }

    # Testing Pyramid
    test_distribution = {
        "unit_tests": "70%",        # Fast, isolated tests
        "integration_tests": "20%", # Component interaction tests
        "e2e_tests": "10%"          # Full user workflow tests
    }

    # Test Categories
    test_categories = {
        "functionality": "Core feature testing",
        "performance": "Load and stress testing",
        "security": "Vulnerability and penetration testing",
        "accessibility": "WCAG compliance testing",
        "usability": "User experience testing",
        "compatibility": "Cross-browser and device testing"
    }

# Unit Test Specifications
class UnitTestSpecs:
    """Backend unit testing specifications"""

    @pytest.fixture
    def test_db():
        """Test database fixture with isolation"""
        # Setup isolated test database
        # Rollback after each test
        pass

    @pytest.fixture
    def test_user():
        """Create test user fixture"""
        return {
            "id": "test-uuid",
            "email": "test@snu.ac.kr",
            "first_name": "Test",
            "last_name": "User",
            "role": "applicant"
        }

    @pytest.fixture
    def auth_headers(test_user):
        """Authentication headers for test requests"""
        token = create_test_jwt(test_user)
        return {"Authorization": f"Bearer {token}"}

    # Test Examples
    async def test_user_registration():
        """Test user registration endpoint"""
        user_data = {
            "email": "newuser@snu.ac.kr",
            "password": "SecurePass123!",
            "first_name": "New",
            "last_name": "User",
            "department": "컴퓨터공학부"
        }

        response = client.post("/api/v1/auth/register", json=user_data)

        assert response.status_code == 201
        assert response.json()["success"] == True
        assert "user" in response.json()["data"]

        # Verify user created in database
        user = await get_user_by_email("newuser@snu.ac.kr")
        assert user is not None
        assert user.email == "newuser@snu.ac.kr"

    async def test_application_creation():
        """Test application creation with validation"""
        application_data = {
            "personal_info": {
                "name": "Test Applicant",
                "email": "applicant@snu.ac.kr",
                "department": "의과대학"
            },
            "academic_info": {
                "gpa": 4.0,
                "major": "Medicine"
            }
        }

        response = client.post(
            "/api/v1/applications",
            json=application_data,
            headers=auth_headers
        )

        assert response.status_code == 201
        application = response.json()["data"]["application"]
        assert application["status"] == "draft"
        assert application["user_id"] == test_user["id"]

    async def test_file_upload_validation():
        """Test file upload with security validation"""
        # Test valid file
        valid_file = ("test.pdf", b"PDF content", "application/pdf")
        response = client.post(
            "/api/v1/applications/test-id/files",
            files={"file": valid_file},
            data={"category": "transcript"},
            headers=auth_headers
        )
        assert response.status_code == 200

        # Test invalid file type
        invalid_file = ("malware.exe", b"executable", "application/x-executable")
        response = client.post(
            "/api/v1/applications/test-id/files",
            files={"file": invalid_file},
            headers=auth_headers
        )
        assert response.status_code == 400
        assert "not allowed" in response.json()["message"].lower()

    async def test_ai_chat_rate_limiting():
        """Test AI chat rate limiting"""
        # Send multiple requests rapidly
        for i in range(65):  # Exceed 60/hour limit
            response = client.post(
                "/api/v1/ai/chat",
                json={"message": f"Test message {i}"},
                headers=auth_headers
            )

            if i < 60:
                assert response.status_code == 200
            else:
                assert response.status_code == 429  # Rate limited

# Integration Test Specifications
class IntegrationTestSpecs:
    """Integration testing between components"""

    async def test_application_workflow():
        """Test complete application submission workflow"""
        # 1. User registration
        user_data = {...}
        register_response = client.post("/api/v1/auth/register", json=user_data)
        user_id = register_response.json()["data"]["user"]["id"]

        # 2. Email verification (mock)
        verify_response = client.post(f"/api/v1/auth/verify/{mock_token}")
        assert verify_response.status_code == 200

        # 3. Login
        login_response = client.post("/api/v1/auth/login", json={
            "email": user_data["email"],
            "password": user_data["password"]
        })
        token = login_response.json()["data"]["access_token"]
        headers = {"Authorization": f"Bearer {token}"}

        # 4. Create application
        app_response = client.post("/api/v1/applications", json=app_data, headers=headers)
        app_id = app_response.json()["data"]["application"]["id"]

        # 5. Upload files
        file_response = client.post(
            f"/api/v1/applications/{app_id}/files",
            files={"file": ("transcript.pdf", pdf_content, "application/pdf")},
            headers=headers
        )
        assert file_response.status_code == 200

        # 6. Submit application
        submit_response = client.post(f"/api/v1/applications/{app_id}/submit", headers=headers)
        assert submit_response.status_code == 200

        # 7. Verify status change
        app_check = client.get(f"/api/v1/applications/{app_id}", headers=headers)
        assert app_check.json()["data"]["application"]["status"] == "submitted"

    async def test_ai_integration():
        """Test AI service integration"""
        # Test AI chat
        chat_response = client.post(
            "/api/v1/ai/chat",
            json={"message": "What is the Connectome Fellows Program?"},
            headers=auth_headers
        )
        assert chat_response.status_code == 200
        assert len(chat_response.json()["data"]["response"]) > 0

        # Test translation
        translation_response = client.post(
            "/api/v1/ai/translate",
            json={
                "text": "안녕하세요",
                "from_lang": "ko",
                "to_lang": "en"
            }
        )
        assert translation_response.status_code == 200
        assert "hello" in translation_response.json()["data"]["translated_text"].lower()

    async def test_admin_workflow():
        """Test admin application review workflow"""
        # Setup: Create application as regular user
        app_id = await create_test_application()

        # Admin login
        admin_headers = await get_admin_auth_headers()

        # List applications
        list_response = client.get("/api/v1/admin/applications", headers=admin_headers)
        assert app_id in [app["id"] for app in list_response.json()["data"]["items"]]

        # Review application
        review_response = client.put(
            f"/api/v1/admin/applications/{app_id}/review",
            json={
                "decision": "accepted",
                "score": 85,
                "notes": "Strong candidate with excellent research background"
            },
            headers=admin_headers
        )
        assert review_response.status_code == 200

        # Verify status update
        app_status = client.get(f"/api/v1/applications/{app_id}", headers=admin_headers)
        assert app_status.json()["data"]["application"]["status"] == "accepted"

# Frontend Test Specifications (TypeScript)
frontend_test_specs = """
// Frontend testing with Testing Library and Playwright

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { test, expect } from '@playwright/test'
import userEvent from '@testing-library/user-event'

// Component Unit Tests
describe('ApplicationForm', () => {
  it('should render all form sections', () => {
    render(<ApplicationForm onSubmit={jest.fn()} />)

    expect(screen.getByText('개인 정보')).toBeInTheDocument()
    expect(screen.getByText('학업 성취')).toBeInTheDocument()
    expect(screen.getByText('연구 경험')).toBeInTheDocument()
    expect(screen.getByText('기술 역량')).toBeInTheDocument()
    expect(screen.getByText('개인서술서')).toBeInTheDocument()
    expect(screen.getByText('연구계획서')).toBeInTheDocument()
  })

  it('should validate required fields', async () => {
    const user = userEvent.setup()
    const mockSubmit = jest.fn()

    render(<ApplicationForm onSubmit={mockSubmit} />)

    const submitButton = screen.getByRole('button', { name: '제출' })
    await user.click(submitButton)

    expect(screen.getByText('이름은 필수입니다')).toBeInTheDocument()
    expect(screen.getByText('이메일은 필수입니다')).toBeInTheDocument()
    expect(mockSubmit).not.toHaveBeenCalled()
  })

  it('should auto-save form data', async () => {
    const mockSave = jest.fn()
    render(<ApplicationForm onSave={mockSave} />)

    const nameInput = screen.getByLabelText('이름')
    await userEvent.type(nameInput, 'Test User')

    // Wait for auto-save debounce
    await waitFor(() => {
      expect(mockSave).toHaveBeenCalledWith(
        expect.objectContaining({
          personalInfo: expect.objectContaining({
            name: 'Test User'
          })
        })
      )
    }, { timeout: 3000 })
  })
})

// E2E Test Specifications
test.describe('Application Submission Flow', () => {
  test('should complete full application process', async ({ page }) => {
    // Setup test data
    const testUser = {
      email: `test${Date.now()}@snu.ac.kr`,
      password: 'TestPassword123!',
      firstName: 'Test',
      lastName: 'User'
    }

    // 1. Navigate to registration
    await page.goto('/auth/register')

    // 2. Fill registration form
    await page.fill('[data-testid=email-input]', testUser.email)
    await page.fill('[data-testid=password-input]', testUser.password)
    await page.fill('[data-testid=first-name-input]', testUser.firstName)
    await page.fill('[data-testid=last-name-input]', testUser.lastName)
    await page.click('[data-testid=register-button]')

    // 3. Verify registration success
    await expect(page.locator('[data-testid=success-message]')).toBeVisible()

    // 4. Login (skip email verification for test)
    await page.goto('/auth/login')
    await page.fill('[data-testid=email-input]', testUser.email)
    await page.fill('[data-testid=password-input]', testUser.password)
    await page.click('[data-testid=login-button]')

    // 5. Navigate to application
    await expect(page.locator('[data-testid=dashboard]')).toBeVisible()
    await page.click('[data-testid=start-application]')

    // 6. Fill application form
    await page.fill('[data-testid=personal-name]', 'Test User')
    await page.fill('[data-testid=personal-email]', testUser.email)
    await page.selectOption('[data-testid=department]', '컴퓨터공학부')

    // Navigate through form steps
    await page.click('[data-testid=next-step]')

    // Academic information
    await page.fill('[data-testid=gpa]', '4.0')
    await page.fill('[data-testid=major]', 'Computer Science')
    await page.click('[data-testid=next-step]')

    // Research experience
    await page.fill('[data-testid=research-title]', 'ML Research Project')
    await page.fill('[data-testid=research-description]', 'Deep learning for image classification')
    await page.click('[data-testid=next-step]')

    // Technical skills
    await page.check('[data-testid=skill-python]')
    await page.check('[data-testid=skill-pytorch]')
    await page.click('[data-testid=next-step]')

    // Essays
    await page.fill('[data-testid=motivation-essay]', 'I am passionate about neuroscience research...')
    await page.fill('[data-testid=research-essay]', 'My research interests include...')
    await page.click('[data-testid=next-step]')

    // Research proposal
    await page.fill('[data-testid=proposal-title]', 'Brain Foundation Models')
    await page.fill('[data-testid=proposal-description]', 'Developing foundation models for neuroscience...')

    // 7. Upload files
    await page.setInputFiles('[data-testid=transcript-upload]', 'test-files/transcript.pdf')
    await page.setInputFiles('[data-testid=cv-upload]', 'test-files/cv.pdf')

    // 8. Review and submit
    await page.click('[data-testid=review-application]')
    await expect(page.locator('[data-testid=application-preview]')).toBeVisible()

    await page.click('[data-testid=submit-application]')
    await page.click('[data-testid=confirm-submit]') // Confirmation dialog

    // 9. Verify submission
    await expect(page.locator('[data-testid=submission-success]')).toBeVisible()
    await expect(page.locator('text=성공적으로 제출되었습니다')).toBeVisible()

    // 10. Check application status
    await page.goto('/dashboard/applications')
    await expect(page.locator('[data-testid=application-status]')).toHaveText('제출됨')
  })

  test('should handle file upload errors gracefully', async ({ page }) => {
    await page.goto('/apply/form')

    // Try to upload invalid file type
    await page.setInputFiles('[data-testid=transcript-upload]', 'test-files/malware.exe')

    await expect(page.locator('[data-testid=file-error]')).toBeVisible()
    await expect(page.locator('text=지원하지 않는 파일 형식입니다')).toBeVisible()
  })
})

// Performance Tests
test.describe('Performance Tests', () => {
  test('should load homepage within 2 seconds', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const loadTime = Date.now() - startTime

    expect(loadTime).toBeLessThan(2000)
  })

  test('should handle concurrent users', async ({ browser }) => {
    const contexts = await Promise.all(
      Array(10).fill(0).map(() => browser.newContext())
    )

    const pages = await Promise.all(
      contexts.map(context => context.newPage())
    )

    // Simulate 10 concurrent users
    const loadPromises = pages.map(page => page.goto('/'))
    await Promise.all(loadPromises)

    // Verify all pages loaded successfully
    for (const page of pages) {
      await expect(page.locator('[data-testid=homepage]')).toBeVisible()
    }
  })
})

// Accessibility Tests
test.describe('Accessibility Tests', () => {
  test('should pass axe accessibility checks', async ({ page }) => {
    await page.goto('/')

    const accessibilityScanResults = await page.locator('body').evaluateHandle(
      async (body) => {
        const { default: axe } = await import('axe-core')
        return await axe.run(body)
      }
    )

    const { violations } = await accessibilityScanResults.jsonValue()
    expect(violations).toHaveLength(0)
  })

  test('should be navigable with keyboard only', async ({ page }) => {
    await page.goto('/')

    // Navigate using Tab key
    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toBeVisible()

    // Should be able to reach all interactive elements
    const focusableElements = await page.locator('button, a, input, select, textarea, [tabindex]').count()

    for (let i = 0; i < focusableElements; i++) {
      await page.keyboard.press('Tab')
      await expect(page.locator(':focus')).toBeVisible()
    }
  })
})
"""

# Load Testing Specifications
load_testing_config = {
    "scenarios": {
        "homepage_load": {
            "virtual_users": 100,
            "duration": "5m",
            "target_rps": 50,
            "thresholds": {
                "response_time_95th": "< 2000ms",
                "error_rate": "< 1%"
            }
        },
        "application_submission": {
            "virtual_users": 20,
            "duration": "10m",
            "target_rps": 5,
            "thresholds": {
                "response_time_95th": "< 5000ms",
                "error_rate": "< 0.1%"
            }
        },
        "api_stress_test": {
            "virtual_users": 200,
            "duration": "2m",
            "target_rps": 100,
            "endpoints": [
                "/api/v1/applications",
                "/api/v1/content/page",
                "/api/v1/program/overview"
            ]
        }
    }
}

# Security Test Specifications
security_testing_config = {
    "automated_scans": {
        "owasp_zap": {
            "frequency": "Every deployment",
            "scan_types": ["active", "passive"],
            "thresholds": {
                "high_risk": 0,
                "medium_risk": "< 5",
                "low_risk": "< 20"
            }
        },
        "dependency_scan": {
            "tools": ["npm audit", "pip-audit", "Snyk"],
            "frequency": "Daily",
            "auto_fix": "Patch level only"
        }
    },

    "manual_testing": {
        "penetration_testing": {
            "frequency": "Monthly",
            "scope": ["Authentication", "Authorization", "Input validation"],
            "tools": ["Burp Suite", "OWASP ZAP", "Custom scripts"]
        }
    }
}
```

---

## 🚀 Deployment Specifications

### ☁️ AWS Infrastructure Configuration

```yaml
# Complete AWS Infrastructure as Code
aws_infrastructure:
  region: "ap-northeast-2"  # Seoul
  availability_zones: ["ap-northeast-2a", "ap-northeast-2c"]

  # VPC Configuration
  networking:
    vpc:
      cidr_block: "10.0.0.0/16"
      enable_dns_hostnames: true
      enable_dns_support: true

    subnets:
      public:
        - cidr: "10.0.1.0/24"
          az: "ap-northeast-2a"
        - cidr: "10.0.2.0/24"
          az: "ap-northeast-2c"
      private:
        - cidr: "10.0.10.0/24"
          az: "ap-northeast-2a"
        - cidr: "10.0.20.0/24"
          az: "ap-northeast-2c"

    security_groups:
      web:
        ingress:
          - port: 80
            protocol: "tcp"
            source: "0.0.0.0/0"
          - port: 443
            protocol: "tcp"
            source: "0.0.0.0/0"
      app:
        ingress:
          - port: 8000
            protocol: "tcp"
            source: "web_sg"
      database:
        ingress:
          - port: 5432
            protocol: "tcp"
            source: "app_sg"

  # Compute Resources
  compute:
    frontend:
      service: "AWS Amplify"
      configuration:
        branch: "main"
        auto_deploy: true
        custom_domain: "connectome.snu.ac.kr"
        environment_variables:
          NEXT_PUBLIC_API_URL: "https://api.connectome.snu.ac.kr"
          NEXTAUTH_URL: "https://connectome.snu.ac.kr"
          NODE_ENV: "production"

    backend:
      service: "AWS App Runner"
      configuration:
        instance_type: "1 vCPU, 2 GB RAM"
        auto_scaling:
          min_instances: 1
          max_instances: 10
          target_cpu: 70
          target_memory: 80
        environment_variables:
          DATABASE_URL: "from_parameter_store"
          REDIS_URL: "from_parameter_store"
          JWT_SECRET: "from_secrets_manager"
        health_check:
          path: "/health"
          interval: 30
          timeout: 5
          healthy_threshold: 2
          unhealthy_threshold: 5

  # Database Configuration
  database:
    rds:
      engine: "postgres"
      version: "15.4"
      instance_class: "db.t3.micro"
      allocated_storage: 20
      storage_type: "gp2"
      storage_encrypted: true
      multi_az: false
      backup_retention: 7
      backup_window: "03:00-04:00"
      maintenance_window: "sun:04:00-sun:05:00"
      deletion_protection: true
      performance_insights: true

  # Cache Configuration
  cache:
    elasticache:
      engine: "redis"
      node_type: "cache.t3.micro"
      num_cache_nodes: 1
      parameter_group: "default.redis7"
      port: 6379

  # Storage Configuration
  storage:
    s3_buckets:
      static_assets:
        name: "connectome-static-assets"
        versioning: true
        public_access: true
        cors_configuration:
          allowed_origins: ["https://connectome.snu.ac.kr"]
          allowed_methods: ["GET", "HEAD"]
      user_uploads:
        name: "connectome-user-uploads"
        versioning: true
        public_access: false
        encryption: "AES256"
        lifecycle_rules:
          - transition_to_ia: 30
          - transition_to_glacier: 90
          - expiration: 2555  # 7 years
      backups:
        name: "connectome-backups"
        versioning: true
        public_access: false
        encryption: "aws:kms"

  # CDN Configuration
  cdn:
    cloudfront:
      price_class: "PriceClass_100"  # US, Europe, Asia
      origins:
        - domain: "amplify-app-domain"
          path_pattern: "/*"
          behavior:
            viewer_protocol: "redirect-to-https"
            compress: true
            cache_policy: "Managed-CachingOptimized"
        - domain: "s3-static-domain"
          path_pattern: "/static/*"
          behavior:
            viewer_protocol: "https-only"
            compress: true
            cache_policy: "Managed-CachingOptimizedForUncompressedObjects"

  # Security Configuration
  security:
    waf:
      name: "ConnectomeWebACL"
      scope: "CLOUDFRONT"
      rules:
        - name: "AWSManagedRulesCommonRuleSet"
          priority: 1
          action: "block"
        - name: "AWSManagedRulesKnownBadInputsRuleSet"
          priority: 2
          action: "block"
        - name: "RateLimitRule"
          priority: 3
          action: "block"
          rate_limit: 2000  # per 5 minutes

    secrets_manager:
      secrets:
        - name: "connectome/jwt-secret"
          description: "JWT signing secret"
        - name: "connectome/anthropic-api-key"
          description: "Anthropic API key"
        - name: "connectome/openai-api-key"
          description: "OpenAI API key"
        - name: "connectome/google-api-key"
          description: "Google API key"

  # Monitoring Configuration
  monitoring:
    cloudwatch:
      dashboards:
        - name: "ConnectomeApplicationMetrics"
          widgets:
            - application_requests
            - database_connections
            - cache_hit_ratio
            - error_rates
      alarms:
        - name: "HighErrorRate"
          metric: "ApplicationErrors"
          threshold: 10
          period: 300
          evaluation_periods: 2
        - name: "DatabaseConnectionsHigh"
          metric: "DatabaseConnections"
          threshold: 80
          period: 300

    # Application Performance Monitoring
    apm:
      service: "AWS X-Ray"
      sampling_rate: 0.1
      trace_segments:
        - web_requests
        - database_queries
        - external_apis
        - background_jobs

# Docker Configuration
docker_specifications:
  frontend:
    dockerfile: |
      FROM node:18-alpine AS deps
      WORKDIR /app
      COPY package*.json ./
      RUN npm ci --only=production && npm cache clean --force

      FROM node:18-alpine AS builder
      WORKDIR /app
      COPY --from=deps /app/node_modules ./node_modules
      COPY . .
      ENV NODE_ENV production
      ENV NEXT_TELEMETRY_DISABLED 1
      RUN npm run build

      FROM node:18-alpine AS runner
      WORKDIR /app
      ENV NODE_ENV production
      ENV NEXT_TELEMETRY_DISABLED 1

      RUN addgroup --system --gid 1001 nodejs
      RUN adduser --system --uid 1001 nextjs

      COPY --from=builder /app/public ./public
      COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
      COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

      USER nextjs
      EXPOSE 3000
      ENV PORT 3000
      CMD ["node", "server.js"]

  backend:
    dockerfile: |
      FROM python:3.11-slim AS base

      # Install system dependencies
      RUN apt-get update && apt-get install -y \
          gcc \
          libpq-dev \
          && rm -rf /var/lib/apt/lists/*

      # Set working directory
      WORKDIR /app

      # Install Python dependencies
      FROM base AS dependencies
      COPY requirements.txt .
      RUN pip install --no-cache-dir --upgrade pip \
          && pip install --no-cache-dir -r requirements.txt

      # Production stage
      FROM dependencies AS runtime

      # Create non-root user
      RUN groupadd -r appuser && useradd -r -g appuser appuser

      # Copy application code
      COPY . .
      RUN chown -R appuser:appuser /app
      USER appuser

      # Health check
      HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
        CMD python -c "import requests; requests.get('http://localhost:8000/health')"

      EXPOSE 8000
      CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1"]

# Kubernetes Configuration (Alternative deployment option)
kubernetes_specs:
  namespace: "connectome-fellows"

  deployments:
    frontend:
      replicas: 3
      image: "connectome/website:latest"
      resources:
        requests:
          cpu: "100m"
          memory: "128Mi"
        limits:
          cpu: "500m"
          memory: "512Mi"
      env:
        - name: "NEXT_PUBLIC_API_URL"
          value: "https://api.connectome.snu.ac.kr"
        - name: "NODE_ENV"
          value: "production"

    backend:
      replicas: 2
      image: "connectome/api:latest"
      resources:
        requests:
          cpu: "200m"
          memory: "256Mi"
        limits:
          cpu: "1000m"
          memory: "1Gi"
      env:
        - name: "DATABASE_URL"
          valueFrom:
            secretKeyRef:
              name: "db-credentials"
              key: "url"
        - name: "JWT_SECRET"
          valueFrom:
            secretKeyRef:
              name: "api-secrets"
              key: "jwt-secret"

  services:
    frontend:
      type: "LoadBalancer"
      ports:
        - port: 80
          targetPort: 3000
    backend:
      type: "ClusterIP"
      ports:
        - port: 8000
          targetPort: 8000

  ingress:
    className: "nginx"
    tls:
      secretName: "connectome-tls"
    rules:
      - host: "connectome.snu.ac.kr"
        paths:
          - path: "/"
            pathType: "Prefix"
            service: "frontend"
      - host: "api.connectome.snu.ac.kr"
        paths:
          - path: "/"
            pathType: "Prefix"
            service: "backend"
```

---

## 🔄 CI/CD Pipeline Specifications

```yaml
# Complete GitHub Actions Workflow
name: "Connectome Fellows CI/CD Pipeline"

on:
  push:
    branches: [main, develop, feature/*]
  pull_request:
    branches: [main, develop]

env:
  NODE_VERSION: "18"
  PYTHON_VERSION: "3.11"
  AWS_REGION: "ap-northeast-2"

jobs:
  # Code Quality and Security Checks
  code-quality:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        component: [frontend, backend]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js (Frontend)
        if: matrix.component == 'frontend'
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: 'website/package-lock.json'

      - name: Setup Python (Backend)
        if: matrix.component == 'backend'
        uses: actions/setup-python@v4
        with:
          python-version: ${{ env.PYTHON_VERSION }}
          cache: 'pip'
          cache-dependency-path: 'api/requirements.txt'

      # Frontend Quality Checks
      - name: Install Frontend Dependencies
        if: matrix.component == 'frontend'
        run: |
          cd website
          npm ci

      - name: Frontend Linting
        if: matrix.component == 'frontend'
        run: |
          cd website
          npm run lint
          npm run type-check

      - name: Frontend Security Scan
        if: matrix.component == 'frontend'
        run: |
          cd website
          npm audit --audit-level=high
          npx better-npm-audit audit

      # Backend Quality Checks
      - name: Install Backend Dependencies
        if: matrix.component == 'backend'
        run: |
          cd api
          pip install -r requirements.txt
          pip install -r requirements-dev.txt

      - name: Backend Linting
        if: matrix.component == 'backend'
        run: |
          cd api
          black --check .
          ruff check .
          mypy .

      - name: Backend Security Scan
        if: matrix.component == 'backend'
        run: |
          cd api
          bandit -r . -f json -o bandit-report.json
          safety check --json --output safety-report.json
          pip-audit --format=json --output=pip-audit-report.json

      - name: Upload Security Reports
        if: matrix.component == 'backend'
        uses: actions/upload-artifact@v3
        with:
          name: security-reports-${{ matrix.component }}
          path: |
            api/bandit-report.json
            api/safety-report.json
            api/pip-audit-report.json

  # Unit and Integration Tests
  test:
    runs-on: ubuntu-latest
    needs: code-quality

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_DB: connectome_test
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

      redis:
        image: redis:7-alpine
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379:6379

    strategy:
      matrix:
        component: [frontend, backend]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        if: matrix.component == 'frontend'
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: 'website/package-lock.json'

      - name: Setup Python
        if: matrix.component == 'backend'
        uses: actions/setup-python@v4
        with:
          python-version: ${{ env.PYTHON_VERSION }}
          cache: 'pip'

      # Frontend Tests
      - name: Install Frontend Dependencies
        if: matrix.component == 'frontend'
        run: |
          cd website
          npm ci

      - name: Run Frontend Unit Tests
        if: matrix.component == 'frontend'
        run: |
          cd website
          npm run test:coverage

      - name: Run Frontend Component Tests
        if: matrix.component == 'frontend'
        run: |
          cd website
          npm run test:components

      # Backend Tests
      - name: Install Backend Dependencies
        if: matrix.component == 'backend'
        run: |
          cd api
          pip install -r requirements.txt
          pip install -r requirements-dev.txt

      - name: Run Backend Unit Tests
        if: matrix.component == 'backend'
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/connectome_test
          REDIS_URL: redis://localhost:6379
        run: |
          cd api
          pytest --cov=. --cov-report=xml --cov-report=html

      - name: Upload Coverage Reports
        uses: codecov/codecov-action@v3
        with:
          file: |
            ./website/coverage/coverage-final.json
            ./api/coverage.xml
          flags: ${{ matrix.component }}
          name: ${{ matrix.component }}-coverage

  # End-to-End Tests
  e2e-test:
    runs-on: ubuntu-latest
    needs: test

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: ${{ env.PYTHON_VERSION }}

      - name: Start Test Environment
        run: |
          docker-compose -f docker-compose.test.yml up -d

      - name: Wait for Services
        run: |
          sleep 30
          curl --retry 10 --retry-delay 5 http://localhost:3000/health
          curl --retry 10 --retry-delay 5 http://localhost:8000/health

      - name: Install Playwright
        run: |
          cd website
          npm ci
          npx playwright install

      - name: Run E2E Tests
        run: |
          cd website
          npm run test:e2e

      - name: Upload E2E Test Results
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: e2e-test-results
          path: |
            website/test-results/
            website/playwright-report/

  # Security Testing
  security-test:
    runs-on: ubuntu-latest
    needs: test

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Run OWASP ZAP Scan
        uses: zaproxy/action-full-scan@v0.8.0
        with:
          target: 'http://localhost:3000'
          rules_file_name: '.zap/rules.tsv'
          cmd_options: '-a'

      - name: Upload ZAP Results
        uses: actions/upload-artifact@v3
        with:
          name: zap-report
          path: report_html.html

  # Build and Deploy
  build-and-deploy:
    runs-on: ubuntu-latest
    needs: [code-quality, test, e2e-test]
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}

      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2

      - name: Build and Push Frontend Image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          ECR_REPOSITORY: connectome-website
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG ./website
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
          docker tag $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG $ECR_REGISTRY/$ECR_REPOSITORY:latest
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:latest

      - name: Build and Push Backend Image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          ECR_REPOSITORY: connectome-api
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG ./api
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
          docker tag $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG $ECR_REGISTRY/$ECR_REPOSITORY:latest
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:latest

      # Deploy to Staging
      - name: Deploy to Staging
        if: github.ref == 'refs/heads/develop'
        run: |
          aws apprunner start-deployment --service-arn ${{ secrets.STAGING_APP_RUNNER_ARN }}
          aws amplify start-job --app-id ${{ secrets.STAGING_AMPLIFY_APP_ID }} --branch-name develop --job-type RELEASE

      # Deploy to Production
      - name: Deploy to Production
        if: github.ref == 'refs/heads/main'
        run: |
          aws apprunner start-deployment --service-arn ${{ secrets.PROD_APP_RUNNER_ARN }}
          aws amplify start-job --app-id ${{ secrets.PROD_AMPLIFY_APP_ID }} --branch-name main --job-type RELEASE

      # Run Database Migrations
      - name: Run Database Migrations
        if: github.ref == 'refs/heads/main'
        run: |
          # Run migrations in secure environment
          aws ecs run-task --cluster connectome-cluster --task-definition migration-task --overrides '{
            "containerOverrides": [{
              "name": "migration",
              "command": ["python", "-m", "alembic", "upgrade", "head"]
            }]
          }'

      # Health Checks
      - name: Health Check - Production
        if: github.ref == 'refs/heads/main'
        run: |
          sleep 60  # Wait for deployment
          curl -f https://connectome.snu.ac.kr/health
          curl -f https://api.connectome.snu.ac.kr/health

      # Notify Deployment
      - name: Notify Deployment Success
        if: success()
        uses: 8398a7/action-slack@v3
        with:
          status: success
          text: '🚀 Deployment successful to production!'
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}

      - name: Notify Deployment Failure
        if: failure()
        uses: 8398a7/action-slack@v3
        with:
          status: failure
          text: '❌ Deployment failed! Check logs.'
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}

  # Performance Testing (Post-Deploy)
  performance-test:
    runs-on: ubuntu-latest
    needs: build-and-deploy
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Install Artillery
        run: npm install -g artillery

      - name: Run Load Tests
        run: |
          artillery run load-tests/homepage.yml
          artillery run load-tests/api-endpoints.yml

      - name: Run Lighthouse Audit
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            https://connectome.snu.ac.kr
            https://connectome.snu.ac.kr/about
            https://connectome.snu.ac.kr/apply
          uploadArtifacts: true
          temporaryPublicStorage: true
```

---

**Document Status**: Complete and Production-Ready
**Technical Review**: Required before implementation
**Security Review**: Required for production deployment
**Performance Validation**: Load testing specifications included

This comprehensive technical specification provides all necessary details for implementing a world-class website for the SNU Connectome Fellows Program, ensuring scalability, security, and exceptional user experience.

**Next Actions:**
1. Technical review and approval
2. Security audit of specifications
3. Performance baseline establishment
4. Development team kickoff with these specifications