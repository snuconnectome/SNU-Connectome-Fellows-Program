#!/bin/bash

# SNU Connectome Fellows Program - Auto Deploy Script
# ===================================================
#
# This script automates GitHub repository creation and Vercel deployment

set -e

echo "🚀 SNU Connectome Fellows Program - Auto Deploy"
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored message
print_message() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if required tools are installed
check_requirements() {
    print_info "Checking requirements..."

    if ! command -v git &> /dev/null; then
        print_error "Git is not installed. Please install Git first."
        exit 1
    fi

    if ! command -v gh &> /dev/null; then
        print_warning "GitHub CLI is not installed. Installing..."
        # Install GitHub CLI
        if [[ "$OSTYPE" == "darwin"* ]]; then
            brew install gh
        elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
            curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
            sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg
            echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
            sudo apt update
            sudo apt install gh
        fi
    fi

    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi

    print_message "All requirements satisfied!"
}

# GitHub Authentication
authenticate_github() {
    print_info "Checking GitHub authentication..."

    if ! gh auth status &> /dev/null; then
        print_warning "Not authenticated with GitHub. Please authenticate:"
        gh auth login
    fi

    print_message "GitHub authentication verified!"
}

# Create GitHub organization (optional)
create_organization() {
    print_info "Checking if organization 'transconnectome' exists..."

    if ! gh api orgs/transconnectome &> /dev/null; then
        print_warning "Organization 'transconnectome' not found."
        read -p "Do you want to create it? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            print_info "Creating organization 'transconnectome'..."
            # Note: Organization creation via API requires special permissions
            print_warning "Please create the organization manually at: https://github.com/organizations/new"
            print_warning "Organization name: transconnectome"
            read -p "Press enter when organization is created..."
        else
            print_info "Will create repository under your personal account instead."
            REPO_OWNER=$(gh api user --jq '.login')
        fi
    else
        print_message "Organization 'transconnectome' found!"
        REPO_OWNER="transconnectome"
    fi
}

# Create GitHub repository
create_repository() {
    print_info "Creating GitHub repository..."

    REPO_NAME="snu-connectome-fellows"

    if [[ -z "$REPO_OWNER" ]]; then
        REPO_OWNER=$(gh api user --jq '.login')
    fi

    # Check if repository already exists
    if gh repo view "$REPO_OWNER/$REPO_NAME" &> /dev/null; then
        print_warning "Repository $REPO_OWNER/$REPO_NAME already exists!"
        read -p "Do you want to continue with existing repo? (y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    else
        print_info "Creating repository $REPO_OWNER/$REPO_NAME..."

        if [[ "$REPO_OWNER" == "transconnectome" ]]; then
            gh repo create "$REPO_OWNER/$REPO_NAME" \
                --public \
                --description "SNU Connectome Fellows Program - 차세대 신경과학 인재 양성을 위한 서울대학교 커넥톰 펠로우십 프로그램" \
                --homepage "https://snu-connectome-fellows.vercel.app"
        else
            gh repo create "$REPO_NAME" \
                --public \
                --description "SNU Connectome Fellows Program - 차세대 신경과학 인재 양성을 위한 서울대학교 커넥톰 펠로우십 프로그램" \
                --homepage "https://snu-connectome-fellows.vercel.app"
        fi

        print_message "Repository created successfully!"
    fi

    export REPO_URL="https://github.com/$REPO_OWNER/$REPO_NAME"
    export VERCEL_URL="https://snu-connectome-fellows.vercel.app"
}

# Initialize Git and push to GitHub
setup_git_and_push() {
    print_info "Setting up Git and pushing to GitHub..."

    # Initialize git if not already done
    if [ ! -d .git ]; then
        git init
        git branch -M main
    fi

    # Configure git user if not set
    if [ -z "$(git config user.email)" ]; then
        git config user.email "connectome@snu.ac.kr"
        git config user.name "SNU Connectome Lab"
    fi

    # Add remote if not exists
    if ! git remote get-url origin &> /dev/null; then
        git remote add origin "$REPO_URL"
    fi

    # Create .gitignore if not exists
    if [ ! -f .gitignore ]; then
        cat > .gitignore << EOF
# Dependencies
node_modules/
*/node_modules/

# Environment variables
.env
.env.local
.env.production
.env.staging
*.env

# Build outputs
.next/
*/dist/
*/build/
*/.next/

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# Editor directories and files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Temporary folders
tmp/
temp/

# Docker
.dockerignore

# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
venv/
EOF
    fi

    # Add all files
    git add .

    # Create comprehensive commit message
    git commit -m "🚀 Initial commit: SNU Connectome Fellows Program

✨ Features implemented:
- 🌐 Complete bilingual website (Korean/English)
- 👥 Mentor network interface with matching system
- 🔬 Research project tracking and management
- 📊 Administrative dashboard with analytics
- 📝 Multi-step application system with validation
- ♿ WCAG 2.1 AA accessibility compliance
- 🚀 Performance optimization with Core Web Vitals
- 🐳 Production-ready deployment configuration
- 🧪 Comprehensive test suite (Jest + Playwright)
- 🔒 Security and authentication (NextAuth.js)

🛠️ Tech Stack:
- Next.js 14 with App Router
- TypeScript + Tailwind CSS
- React Hook Form + Zod validation
- Framer Motion animations
- Docker containerization
- CI/CD with GitHub Actions

🌐 Live Demo: $VERCEL_URL
📖 Documentation: Complete deployment guides
🎯 Ready for production deployment"

    # Push to GitHub
    print_info "Pushing to GitHub..."
    git push -u origin main

    print_message "Code pushed to GitHub successfully!"
    print_info "Repository URL: $REPO_URL"
}

# Deploy to Vercel
deploy_to_vercel() {
    print_info "Starting Vercel deployment..."

    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
        print_warning "Vercel CLI not installed. Installing..."
        npm install -g vercel
    fi

    cd website

    # Initialize Vercel project
    print_info "Configuring Vercel project..."

    # Create vercel project configuration
    cat > .vercel/project.json << EOF
{
  "projectId": "",
  "orgId": ""
}
EOF

    # Set up environment variables
    print_warning "Please set up the following environment variables in Vercel:"
    echo ""
    echo "NEXTAUTH_URL=https://snu-connectome-fellows.vercel.app"
    echo "NEXTAUTH_SECRET=your-super-secret-key-min-32-characters"
    echo "DATABASE_URL=postgresql://username:password@host:port/database"
    echo "GOOGLE_CLIENT_ID=your-google-client-id"
    echo "GOOGLE_CLIENT_SECRET=your-google-client-secret"
    echo ""

    read -p "Press enter when environment variables are set in Vercel dashboard..."

    # Deploy to Vercel
    print_info "Deploying to Vercel..."
    vercel --prod --yes

    cd ..

    print_message "Vercel deployment completed!"
}

# Setup database (Supabase)
setup_database() {
    print_info "Setting up database..."

    print_warning "Database setup required:"
    echo "1. Go to https://supabase.com"
    echo "2. Create a new project"
    echo "3. Copy the DATABASE_URL"
    echo "4. Add it to Vercel environment variables"
    echo ""

    read -p "Press enter when database is set up..."

    print_message "Database setup completed!"
}

# Setup OAuth (Google)
setup_oauth() {
    print_info "Setting up Google OAuth..."

    print_warning "Google OAuth setup required:"
    echo "1. Go to https://console.cloud.google.com"
    echo "2. Create a new project or select existing"
    echo "3. Enable Google+ API"
    echo "4. Create OAuth 2.0 credentials"
    echo "5. Add authorized redirect URIs:"
    echo "   - https://snu-connectome-fellows.vercel.app/api/auth/callback/google"
    echo "   - http://localhost:3000/api/auth/callback/google (for development)"
    echo "6. Copy Client ID and Client Secret"
    echo "7. Add them to Vercel environment variables"
    echo ""

    read -p "Press enter when OAuth is set up..."

    print_message "OAuth setup completed!"
}

# Create quick setup script for local development
create_local_dev_script() {
    print_info "Creating local development script..."

    cat > start-dev.sh << 'EOF'
#!/bin/bash

echo "🚀 Starting SNU Connectome Fellows Program - Development"
echo "======================================================="

cd website

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Copy environment file if needed
if [ ! -f ".env.local" ]; then
    echo "⚙️ Setting up environment..."
    cp .env.example .env.local
    echo ""
    echo "⚠️ Please edit .env.local with your values:"
    echo "   - NEXTAUTH_SECRET (generate a random 32+ character string)"
    echo "   - DATABASE_URL (your Supabase database URL)"
    echo "   - GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET"
    echo ""
    read -p "Press enter when .env.local is configured..."
fi

echo "🏃 Starting development server..."
npm run dev
EOF

    chmod +x start-dev.sh

    print_message "Local development script created: ./start-dev.sh"
}

# Main execution
main() {
    echo ""
    print_info "🧠 SNU Connectome Fellows Program - Auto Deploy Script"
    print_info "======================================================="
    echo ""

    check_requirements
    authenticate_github
    create_organization
    create_repository
    setup_git_and_push

    # Optional deployments
    read -p "Do you want to deploy to Vercel now? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        setup_database
        setup_oauth
        deploy_to_vercel
    fi

    create_local_dev_script

    echo ""
    print_message "🎉 Deployment completed successfully!"
    echo ""
    print_info "📋 What's been created:"
    print_info "  ✅ GitHub Repository: $REPO_URL"
    print_info "  ✅ Complete website with all features"
    print_info "  ✅ CI/CD pipeline with GitHub Actions"
    print_info "  ✅ Production-ready Docker configuration"
    print_info "  ✅ Local development script: ./start-dev.sh"
    echo ""
    print_info "🌐 Next steps:"
    print_info "  1. Set up environment variables in Vercel"
    print_info "  2. Configure database (Supabase recommended)"
    print_info "  3. Set up Google OAuth"
    print_info "  4. Deploy to Vercel"
    echo ""
    print_info "🚀 Your website will be live at: https://snu-connectome-fellows.vercel.app"
    echo ""
    print_message "Happy coding! 🎉"
}

# Run main function
main "$@"