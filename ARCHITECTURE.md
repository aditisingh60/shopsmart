# ShopSmart Architecture & Workflow

## Overview
ShopSmart is a modern e-commerce application built with a React frontend and an Express backend.

## Architecture
- **Frontend**: React (Vite), React Router, Vitest for testing.
- **Backend**: Node.js, Express, Jest for testing.
- **Database**: [TBD - placeholder for DB info]

## CI/CD Workflow
We use GitHub Actions for our CI/CD pipeline:
1. **CI**: On every push and PR, we run:
   - Linting (ESLint)
   - Unit Tests (Jest/Vitest)
   - Frontend Build
2. **CD**: On every push to `main`, we deploy to an AWS EC2 instance.

## Design Decisions
- **Modularity**: Components are organized by feature area (ui, layout, product, etc.).
- **Idempotency**: All setup scripts (`setup.sh`) are idempotent, ensuring they can be run multiple times without side effects.
- **Automated Updates**: Dependabot is configured to keep dependencies up-to-date.

## Challenges
- Integrating GitHub Actions with EC2 required secure SSH key management.
- Ensuring a consistent linting ruleset across frontend and backend.
