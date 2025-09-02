# Overview

This is a full-stack e-commerce application for sustainable fashion (thrift/secondhand clothing marketplace) built with React frontend and Express.js backend. The application allows users to browse products, search by category, add items to cart, and complete purchases. It focuses on promoting sustainable fashion by facilitating the sale of pre-owned clothing items.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with bottom navigation design
- **State Management**: TanStack React Query for server state and custom hooks for local state
- **UI Framework**: shadcn/ui components built on Radix UI primitives with Tailwind CSS
- **Mobile-First Design**: Optimized for mobile experience with responsive layouts

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API endpoints for products and cart management
- **Session Management**: Session-based cart storage using session IDs
- **Data Layer**: Abstract storage interface with in-memory implementation for development
- **Error Handling**: Centralized error handling middleware with structured responses

## Database Schema
- **Products Table**: Stores clothing items with fields for name, description, price, condition, size, category, and image URL
- **Cart Items Table**: Links products to user sessions with quantity tracking
- **Session-Based Cart**: Cart items are associated with session IDs rather than user accounts

## Development Environment
- **Hot Module Replacement**: Vite dev server with custom middleware integration
- **Code Organization**: Monorepo structure with shared types between client and server
- **Build Process**: Separate builds for client (Vite) and server (esbuild) with production deployment support

## Key Features
- Product browsing with category filtering and search functionality
- Shopping cart with quantity management and persistent session storage
- Product detail modals with comprehensive item information
- Toast notifications for user feedback
- Mobile-optimized navigation with bottom tab bar

# External Dependencies

## Database
- **Drizzle ORM**: Type-safe database queries with PostgreSQL dialect
- **Neon Database**: Serverless PostgreSQL database (via @neondatabase/serverless)

## UI/UX Libraries
- **Radix UI**: Comprehensive component primitives for accessibility
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Touch-friendly carousel components

## Development Tools
- **TypeScript**: Static type checking across the entire stack
- **Vite**: Fast build tool and development server
- **ESBuild**: Fast JavaScript bundler for server builds
- **PostCSS**: CSS processing with Autoprefixer

## Third-Party Services
- **Unsplash**: Image hosting service for product photos
- **Replit**: Development environment with specialized plugins and runtime error handling