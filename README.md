# Regulix

A comprehensive regulation and compliance management platform that helps organizations track, analyze, and stay compliant with evolving regulatory requirements.

## Features

- **Regulation Tracking** - Monitor and track regulatory changes across multiple jurisdictions
- **Company Management** - Manage multiple companies and their compliance profiles
- **Action Items** - Track compliance-related tasks and deadlines with countdown timers
- **Regulatory Digests** - Curated summaries of relevant regulations for quick insights
- **Dashboard** - Real-time overview of compliance status and critical deadlines
- **User Authentication** - Secure authentication and role-based access control
- **Relevance Scoring** - AI-powered relevance scoring for regulations

## Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite for fast development and builds
- TailwindCSS for styling
- shadcn/ui components
- React Query for data fetching
- React Hook Form for form management

**Backend:**
- FastAPI (Python)
- PostgreSQL database
- SQLAlchemy ORM
- Redis for caching
- Celery for async tasks
- JWT authentication

## Quick Start

### Frontend

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

### Backend

```bash
# Install dependencies
pip install -r requirements.txt

# Set up environment variables
# Create a .env file with necessary configuration

# Run the server
python server/main.py
```

## Project Structure

```
src/               # Frontend React application
├── components/    # Reusable React components
├── pages/        # Page components
├── hooks/        # Custom React hooks
├── api/          # API communication layer
├── store/        # State management
└── utils/        # Utility functions

server/          # FastAPI backend
├── src/
│   ├── auth/     # Authentication
│   ├── companies/# Company management
│   └── regulations/ # Regulation management
└── main.py       # Application entry point
```

## License

Proprietary - All rights reserved
