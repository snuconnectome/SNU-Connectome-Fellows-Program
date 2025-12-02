"""
Connectome Fellows Program Dashboard
=====================================

Streamlit-based dashboard for program management and monitoring.

Run with: streamlit run src/web/dashboard/app.py
"""

import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime, date
from pathlib import Path
import json
import sys

# Add src to path
sys.path.insert(0, str(Path(__file__).parent.parent.parent.parent))

from src.core.fellow.models import Fellow, FellowStatus, Department
from src.core.fellow.manager import FellowManager
from src.core.mentor.models import Mentor


# Page config
st.set_page_config(
    page_title="Connectome Fellows Dashboard",
    page_icon="🧠",
    layout="wide",
    initial_sidebar_state="expanded",
)

# Custom CSS
st.markdown("""
<style>
    .main-header {
        font-size: 2.5rem;
        font-weight: bold;
        color: #1E3A5F;
        text-align: center;
        margin-bottom: 2rem;
    }
    .metric-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 1.5rem;
        border-radius: 10px;
        color: white;
        text-align: center;
    }
    .metric-value {
        font-size: 2.5rem;
        font-weight: bold;
    }
    .metric-label {
        font-size: 0.9rem;
        opacity: 0.9;
    }
    .section-header {
        font-size: 1.5rem;
        font-weight: 600;
        color: #1E3A5F;
        margin-top: 2rem;
        margin-bottom: 1rem;
        border-bottom: 2px solid #667eea;
        padding-bottom: 0.5rem;
    }
</style>
""", unsafe_allow_html=True)


def load_sample_data():
    """Load sample data for demonstration."""
    # Sample fellows data
    fellows_data = [
        {
            "id": "F2025-001",
            "name": "김철수",
            "department": "전기정보공학부",
            "status": "active",
            "cohort": 2025,
            "mentor": "유신재 교수",
            "research_area": "BrainLM",
            "score": 88,
            "publications": 1,
            "presentations": 2,
        },
        {
            "id": "F2025-002",
            "name": "이영희",
            "department": "심리학과",
            "status": "active",
            "cohort": 2025,
            "mentor": "Uri Hasson",
            "research_area": "Language-Brain Alignment",
            "score": 92,
            "publications": 2,
            "presentations": 3,
        },
        {
            "id": "F2025-003",
            "name": "박민준",
            "department": "의과대학",
            "status": "active",
            "cohort": 2025,
            "mentor": "박기태 박사",
            "research_area": "Brain-JEPA",
            "score": 85,
            "publications": 0,
            "presentations": 1,
        },
        {
            "id": "F2025-004",
            "name": "정수진",
            "department": "자유전공학부",
            "status": "active",
            "cohort": 2025,
            "mentor": "유신재 교수",
            "research_area": "Multimodal Brain FM",
            "score": 90,
            "publications": 1,
            "presentations": 2,
        },
        {
            "id": "F2025-005",
            "name": "최현우",
            "department": "컴퓨터공학부",
            "status": "active",
            "cohort": 2025,
            "mentor": "Uri Hasson",
            "research_area": "Generative Brain Models",
            "score": 87,
            "publications": 1,
            "presentations": 1,
        },
    ]
    return pd.DataFrame(fellows_data)


def load_budget_data():
    """Load budget tracking data."""
    return {
        "total_budget": 424600000,
        "spent": 156200000,
        "categories": {
            "학생 장학금": {"budget": 205000000, "spent": 80000000},
            "멘토 사례비": {"budget": 39000000, "spent": 15000000},
            "장비/인프라": {"budget": 125000000, "spent": 45000000},
            "운영비": {"budget": 55600000, "spent": 16200000},
        }
    }


def main():
    """Main dashboard application."""
    
    # Header
    st.markdown('<h1 class="main-header">🧠 SNU Connectome Fellows Program</h1>', unsafe_allow_html=True)
    st.markdown(
        '<p style="text-align: center; color: #666; font-size: 1.1rem;">'
        'Neuroscience Foundation Models 연구 인재 양성 프로그램'
        '</p>',
        unsafe_allow_html=True
    )
    
    # Sidebar
    with st.sidebar:
        st.image("https://via.placeholder.com/200x80?text=Connectome+Lab", use_column_width=True)
        st.markdown("---")
        
        page = st.radio(
            "Navigation",
            ["📊 Overview", "👥 Fellows", "🎓 Mentors", "💰 Budget", "📈 Research Progress", "🔧 Settings"]
        )
        
        st.markdown("---")
        st.markdown("**Quick Actions**")
        if st.button("📝 New Application Review"):
            st.session_state.show_review = True
        if st.button("📧 Send Newsletter"):
            st.toast("Newsletter scheduled!")
        
        st.markdown("---")
        st.markdown(f"*Last updated: {datetime.now().strftime('%Y-%m-%d %H:%M')}*")
    
    # Load data
    fellows_df = load_sample_data()
    budget_data = load_budget_data()
    
    # Main content based on page selection
    if page == "📊 Overview":
        render_overview(fellows_df, budget_data)
    elif page == "👥 Fellows":
        render_fellows(fellows_df)
    elif page == "🎓 Mentors":
        render_mentors()
    elif page == "💰 Budget":
        render_budget(budget_data)
    elif page == "📈 Research Progress":
        render_research_progress(fellows_df)
    elif page == "🔧 Settings":
        render_settings()


def render_overview(fellows_df: pd.DataFrame, budget_data: dict):
    """Render overview page."""
    
    # KPI Metrics
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric(
            label="Active Fellows",
            value=len(fellows_df[fellows_df['status'] == 'active']),
            delta="2 this year"
        )
    
    with col2:
        st.metric(
            label="Total Publications",
            value=fellows_df['publications'].sum(),
            delta="+3 this quarter"
        )
    
    with col3:
        avg_score = fellows_df['score'].mean()
        st.metric(
            label="Average Score",
            value=f"{avg_score:.1f}",
            delta="+2.5 vs last quarter"
        )
    
    with col4:
        budget_pct = budget_data['spent'] / budget_data['total_budget'] * 100
        st.metric(
            label="Budget Utilization",
            value=f"{budget_pct:.1f}%",
            delta=None
        )
    
    st.markdown("---")
    
    # Charts row
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown('<h3 class="section-header">Fellows by Department</h3>', unsafe_allow_html=True)
        dept_counts = fellows_df['department'].value_counts()
        fig = px.pie(
            values=dept_counts.values,
            names=dept_counts.index,
            color_discrete_sequence=px.colors.qualitative.Set2
        )
        fig.update_layout(margin=dict(t=20, b=20, l=20, r=20))
        st.plotly_chart(fig, use_container_width=True)
    
    with col2:
        st.markdown('<h3 class="section-header">Research Area Distribution</h3>', unsafe_allow_html=True)
        area_counts = fellows_df['research_area'].value_counts()
        fig = px.bar(
            x=area_counts.index,
            y=area_counts.values,
            color=area_counts.values,
            color_continuous_scale='Viridis'
        )
        fig.update_layout(
            xaxis_title="Research Area",
            yaxis_title="Fellows",
            showlegend=False,
            margin=dict(t=20, b=20, l=20, r=20)
        )
        st.plotly_chart(fig, use_container_width=True)
    
    # Recent activity
    st.markdown('<h3 class="section-header">Recent Activity</h3>', unsafe_allow_html=True)
    
    activities = [
        {"date": "2025-12-01", "type": "📄", "description": "김철수 - NeurIPS workshop paper submitted"},
        {"date": "2025-11-28", "type": "🎓", "description": "이영희 - Princeton visit completed"},
        {"date": "2025-11-25", "type": "💻", "description": "박민준 - Brain-JEPA v0.2 released"},
        {"date": "2025-11-20", "type": "🏆", "description": "정수진 - Best poster award at OHBM"},
        {"date": "2025-11-15", "type": "📊", "description": "Q3 evaluation completed for all fellows"},
    ]
    
    for act in activities:
        st.markdown(f"**{act['date']}** {act['type']} {act['description']}")


def render_fellows(fellows_df: pd.DataFrame):
    """Render fellows management page."""
    
    st.markdown('<h2 class="section-header">Fellows Management</h2>', unsafe_allow_html=True)
    
    # Filters
    col1, col2, col3 = st.columns(3)
    with col1:
        status_filter = st.selectbox("Status", ["All", "active", "on_leave", "graduated"])
    with col2:
        dept_filter = st.selectbox("Department", ["All"] + list(fellows_df['department'].unique()))
    with col3:
        search = st.text_input("Search", placeholder="Search by name or ID...")
    
    # Apply filters
    filtered_df = fellows_df.copy()
    if status_filter != "All":
        filtered_df = filtered_df[filtered_df['status'] == status_filter]
    if dept_filter != "All":
        filtered_df = filtered_df[filtered_df['department'] == dept_filter]
    if search:
        filtered_df = filtered_df[
            filtered_df['name'].str.contains(search, case=False) |
            filtered_df['id'].str.contains(search, case=False)
        ]
    
    # Display table
    st.dataframe(
        filtered_df,
        use_container_width=True,
        hide_index=True,
        column_config={
            "score": st.column_config.ProgressColumn(
                "Score",
                min_value=0,
                max_value=100,
                format="%d",
            ),
            "publications": st.column_config.NumberColumn("Publications", format="%d 📄"),
            "presentations": st.column_config.NumberColumn("Presentations", format="%d 🎤"),
        }
    )
    
    # Fellow detail panel
    st.markdown("---")
    selected_fellow = st.selectbox("Select Fellow for Details", filtered_df['id'].tolist())
    
    if selected_fellow:
        fellow = filtered_df[filtered_df['id'] == selected_fellow].iloc[0]
        
        col1, col2 = st.columns([1, 2])
        
        with col1:
            st.markdown(f"### {fellow['name']}")
            st.markdown(f"**ID:** {fellow['id']}")
            st.markdown(f"**Department:** {fellow['department']}")
            st.markdown(f"**Mentor:** {fellow['mentor']}")
            st.markdown(f"**Research:** {fellow['research_area']}")
        
        with col2:
            # Performance chart
            performance_data = {
                "Category": ["Research", "Publications", "Participation", "Collaboration", "Initiative"],
                "Score": [85, 90, 88, 82, 87],  # Sample scores
            }
            fig = px.bar(
                performance_data,
                x="Category",
                y="Score",
                color="Score",
                color_continuous_scale="RdYlGn",
                range_color=[0, 100]
            )
            fig.update_layout(
                title="Performance Breakdown",
                yaxis_range=[0, 100],
                showlegend=False
            )
            st.plotly_chart(fig, use_container_width=True)


def render_mentors():
    """Render mentors page."""
    
    st.markdown('<h2 class="section-header">Mentor Network</h2>', unsafe_allow_html=True)
    
    mentors = [
        {
            "name": "유신재 교수",
            "affiliation": "Brookhaven National Laboratory",
            "expertise": "Brain Imaging, Biomarkers",
            "fellows": 2,
            "hours": 45,
            "status": "🟢 Active"
        },
        {
            "name": "박기태 박사",
            "affiliation": "Brookhaven National Laboratory",
            "expertise": "Computational Neuroscience, ML",
            "fellows": 1,
            "hours": 32,
            "status": "🟢 Active"
        },
        {
            "name": "Uri Hasson",
            "affiliation": "Princeton University",
            "expertise": "Language-Brain, Neural Communication",
            "fellows": 2,
            "hours": 28,
            "status": "🟢 Active"
        },
    ]
    
    for mentor in mentors:
        with st.expander(f"{mentor['status']} **{mentor['name']}** - {mentor['affiliation']}"):
            col1, col2, col3 = st.columns(3)
            col1.metric("Current Fellows", mentor['fellows'])
            col2.metric("Mentoring Hours", mentor['hours'])
            col3.write(f"**Expertise:** {mentor['expertise']}")
            
            st.markdown("**Activities:**")
            st.markdown("- Monthly 1:1 sessions")
            st.markdown("- Quarterly seminars")
            st.markdown("- Paper review support")


def render_budget(budget_data: dict):
    """Render budget page."""
    
    st.markdown('<h2 class="section-header">Budget Management</h2>', unsafe_allow_html=True)
    
    # Summary
    total = budget_data['total_budget']
    spent = budget_data['spent']
    remaining = total - spent
    
    col1, col2, col3 = st.columns(3)
    col1.metric("Total Budget", f"₩{total:,.0f}")
    col2.metric("Spent", f"₩{spent:,.0f}")
    col3.metric("Remaining", f"₩{remaining:,.0f}")
    
    # Budget by category
    st.markdown("### Budget by Category")
    
    categories = budget_data['categories']
    
    for cat_name, cat_data in categories.items():
        progress = cat_data['spent'] / cat_data['budget']
        col1, col2 = st.columns([3, 1])
        with col1:
            st.progress(progress, text=f"{cat_name}: ₩{cat_data['spent']:,.0f} / ₩{cat_data['budget']:,.0f}")
        with col2:
            st.write(f"{progress*100:.1f}%")
    
    # Spending trend chart
    st.markdown("### Monthly Spending Trend")
    
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    spending = [15, 18, 22, 25, 30, 35, 40, 45, 50, 55, 60, 65]  # Cumulative (millions)
    
    fig = go.Figure()
    fig.add_trace(go.Scatter(
        x=months,
        y=spending,
        mode='lines+markers',
        fill='tozeroy',
        line=dict(color='#667eea', width=3),
        marker=dict(size=8)
    ))
    fig.update_layout(
        yaxis_title="Cumulative Spending (Million ₩)",
        xaxis_title="Month",
        showlegend=False
    )
    st.plotly_chart(fig, use_container_width=True)


def render_research_progress(fellows_df: pd.DataFrame):
    """Render research progress page."""
    
    st.markdown('<h2 class="section-header">Research Progress Tracker</h2>', unsafe_allow_html=True)
    
    # Research milestones
    st.markdown("### Active Research Projects")
    
    projects = [
        {
            "title": "BrainLM Korean Adaptation",
            "lead": "김철수",
            "progress": 65,
            "status": "On Track",
            "next_milestone": "ICLR 2026 submission"
        },
        {
            "title": "Language-Brain Alignment Study",
            "lead": "이영희",
            "progress": 80,
            "status": "Ahead",
            "next_milestone": "Nature Neuro revision"
        },
        {
            "title": "Brain-JEPA Multimodal Extension",
            "lead": "박민준",
            "progress": 45,
            "status": "On Track",
            "next_milestone": "NeurIPS 2026 workshop"
        },
    ]
    
    for proj in projects:
        with st.container():
            col1, col2 = st.columns([3, 1])
            with col1:
                st.markdown(f"**{proj['title']}** (Lead: {proj['lead']})")
                st.progress(proj['progress'] / 100)
                st.caption(f"Next: {proj['next_milestone']}")
            with col2:
                if proj['status'] == "On Track":
                    st.success(proj['status'])
                elif proj['status'] == "Ahead":
                    st.info(proj['status'])
                else:
                    st.warning(proj['status'])
        st.markdown("---")
    
    # Publication pipeline
    st.markdown("### Publication Pipeline")
    
    pipeline = {
        "In Progress": ["BrainLM Korean Dataset Paper", "Multimodal Review Article"],
        "Under Review": ["Language-Brain Alignment (Nature Neuro)", "Brain-JEPA Extension (arXiv)"],
        "Accepted": ["Foundation Models in Neuroscience (Book Chapter)"],
        "Published": ["ICLR Workshop 2025 Paper", "OHBM Abstract 2025"],
    }
    
    cols = st.columns(4)
    for i, (stage, papers) in enumerate(pipeline.items()):
        with cols[i]:
            st.markdown(f"**{stage}**")
            for paper in papers:
                st.markdown(f"- {paper}")


def render_settings():
    """Render settings page."""
    
    st.markdown('<h2 class="section-header">Settings</h2>', unsafe_allow_html=True)
    
    tab1, tab2, tab3 = st.tabs(["Program Settings", "API Configuration", "Notifications"])
    
    with tab1:
        st.markdown("### Program Configuration")
        
        st.number_input("Maximum Fellows per Year", value=10, min_value=1, max_value=20)
        st.number_input("Base Monthly Stipend (₩)", value=2000000, step=100000)
        st.number_input("AI Budget per Fellow (USD)", value=500, step=50)
        
        st.markdown("### Evaluation Weights")
        col1, col2 = st.columns(2)
        with col1:
            st.slider("Research Progress", 0, 100, 40)
            st.slider("Publications", 0, 100, 20)
            st.slider("Participation", 0, 100, 20)
        with col2:
            st.slider("Collaboration", 0, 100, 10)
            st.slider("Initiative", 0, 100, 10)
    
    with tab2:
        st.markdown("### AI API Keys")
        st.text_input("Anthropic API Key", type="password", value="sk-ant-***")
        st.text_input("OpenAI API Key", type="password", value="sk-***")
        st.text_input("Google API Key", type="password", value="AIza***")
        st.text_input("DeepSeek API Key", type="password", value="sk-***")
        
        if st.button("Save API Keys"):
            st.success("API keys saved successfully!")
    
    with tab3:
        st.markdown("### Notification Settings")
        st.checkbox("Email notifications for new applications", value=True)
        st.checkbox("Slack notifications for milestone completions", value=True)
        st.checkbox("Weekly digest emails", value=True)
        st.checkbox("Budget alerts (>80% utilization)", value=True)


if __name__ == "__main__":
    main()

