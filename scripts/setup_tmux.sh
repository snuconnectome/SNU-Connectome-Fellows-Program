#!/bin/bash
#
# SNU Connectome Fellows Program - Tmux Session Setup
# ====================================================
# 
# 이 스크립트는 프로젝트 개발을 위한 tmux 세션을 생성합니다.
# 
# 사용법:
#   ./scripts/setup_tmux.sh
#   또는
#   bash scripts/setup_tmux.sh
#

SESSION_NAME="connectome-fellows"
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# 세션이 이미 존재하는지 확인
if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
    echo "⚠️  세션 '$SESSION_NAME'이 이미 존재합니다."
    echo "연결하려면: tmux attach -t $SESSION_NAME"
    echo "기존 세션을 종료하고 새로 만들까요? (y/N)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        tmux kill-session -t "$SESSION_NAME"
    else
        exit 0
    fi
fi

# 새 세션 생성 (첫 번째 윈도우는 자동으로 생성됨)
tmux new-session -d -s "$SESSION_NAME" -n "dev" -c "$PROJECT_ROOT"
sleep 0.5  # 세션 생성 대기

# 윈도우 0: Main Development (메인 개발)
tmux send-keys -t "$SESSION_NAME:dev" "cd $PROJECT_ROOT" C-m
tmux send-keys -t "$SESSION_NAME:dev" "echo '🧠 SNU Connectome Fellows Program - Development Shell'" C-m
tmux send-keys -t "$SESSION_NAME:dev" "clear" C-m

# 윈도우 1: Dashboard (Streamlit 대시보드)
tmux new-window -t "$SESSION_NAME" -n "dashboard" -c "$PROJECT_ROOT"
tmux send-keys -t "$SESSION_NAME:dashboard" "cd $PROJECT_ROOT" C-m
tmux send-keys -t "$SESSION_NAME:dashboard" "echo '📊 Streamlit Dashboard - 실행하려면: streamlit run src/web/dashboard/app.py'" C-m

# 윈도우 2: API Server (FastAPI 서버 - 필요시)
tmux new-window -t "$SESSION_NAME" -n "api" -c "$PROJECT_ROOT"
tmux send-keys -t "$SESSION_NAME:api" "cd $PROJECT_ROOT" C-m
tmux send-keys -t "$SESSION_NAME:api" "echo '🚀 FastAPI Server - 실행하려면: uvicorn src.web.api:app --reload'" C-m

# 윈도우 3: Tests (테스트 실행)
tmux new-window -t "$SESSION_NAME" -n "tests" -c "$PROJECT_ROOT"
tmux send-keys -t "$SESSION_NAME:tests" "cd $PROJECT_ROOT" C-m
tmux send-keys -t "$SESSION_NAME:tests" "echo '🧪 Tests - 실행하려면: pytest'" C-m

# 윈도우 4: Git & Logs (Git 작업 및 로그 모니터링)
tmux new-window -t "$SESSION_NAME" -n "git" -c "$PROJECT_ROOT"
tmux send-keys -t "$SESSION_NAME:git" "cd $PROJECT_ROOT" C-m
tmux send-keys -t "$SESSION_NAME:git" "echo '📝 Git Operations & Logs'" C-m

# 윈도우 5: Research Models (연구 모델 개발)
tmux new-window -t "$SESSION_NAME" -n "research" -c "$PROJECT_ROOT"
tmux send-keys -t "$SESSION_NAME:research" "cd $PROJECT_ROOT" C-m
tmux send-keys -t "$SESSION_NAME:research" "echo '🔬 Research Models (BrainLM, JEPA, Multimodal)'" C-m

# 메인 윈도우로 돌아가기
tmux select-window -t "$SESSION_NAME:dev"

# 세션 정보 출력
echo ""
echo "✅ Tmux 세션 '$SESSION_NAME'이 생성되었습니다!"
echo ""
echo "📋 윈도우 목록:"
echo "   0. dev       - 메인 개발 환경"
echo "   1. dashboard - Streamlit 대시보드"
echo "   2. api       - FastAPI 서버"
echo "   3. tests     - 테스트 실행"
echo "   4. git       - Git 작업 및 로그"
echo "   5. research  - 연구 모델 개발"
echo ""
echo "🔗 세션에 연결하려면:"
echo "   tmux attach -t $SESSION_NAME"
echo ""
echo "⌨️  유용한 단축키:"
echo "   Ctrl+b + 숫자    - 윈도우 전환"
echo "   Ctrl+b + c       - 새 윈도우 생성"
echo "   Ctrl+b + %       - 세로 분할"
echo "   Ctrl+b + \"       - 가로 분할"
echo "   Ctrl+b + d       - 세션 분리 (detach)"
echo ""

# 세션에 자동 연결할지 물어보기
echo "지금 세션에 연결하시겠습니까? (Y/n)"
read -r response
if [[ ! "$response" =~ ^([nN][oO]|[nN])$ ]]; then
    tmux attach -t "$SESSION_NAME"
fi

