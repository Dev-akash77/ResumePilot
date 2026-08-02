# ResumePilot

AI-powered Resume Builder built with a Production-Ready Microservices Architecture.

ResumePilot helps students and freshers create professional, ATS-friendly resumes using AI. The platform combines resume generation, ATS analysis, secure authentication, payments, caching, event-driven communication, and scalable infrastructure into a real-world SaaS application.

---

# Table of Contents

- Overview
- Features
- Architecture
- Microservices
- Technology Stack
- Infrastructure
- Project Structure
- Prerequisites
- Environment Variables
- Running the Project
- Docker Deployment
- API Gateway
- Redis
- RabbitMQ
- AI Integration
- Payment System
- Security
- Performance
- Future Improvements
- Author
- License

---

# Overview

ResumePilot is designed as a production-ready SaaS platform rather than a traditional CRUD application.

The project demonstrates modern backend engineering practices including:

- Microservices Architecture
- API Gateway Pattern
- Event-Driven Communication
- Redis Caching
- Rate Limiting
- Dockerized Deployment
- AI Integration
- Payment Integration
- Database Per Service Pattern

Every backend service runs independently inside Docker containers and communicates through RabbitMQ.

---

# Features

## Authentication

- OTP Email Authentication
- JWT Access Tokens
- Secure Login
- Protected Routes

---

## Resume Builder

- AI Resume Summary
- ATS Resume Analysis
- Resume Management
- Resume Editing
- Resume History

---

## AI Features

- Google Gemini Integration
- Resume Summary Generation
- ATS Suggestions
- Content Improvement

---

## Credits System

- Free Credits on Registration
- Resume Credit Consumption
- Credit Tracking
- Razorpay Payment Integration

---

## User Experience

- Live Resume Preview
- Responsive Design
- Progressive Web App
- Modern SaaS UI
- Smooth Animations

---

# Architecture

```
                    Client
                       │
                       │
               API Gateway
                       │
 ───────────────────────────────────────

      Auth Service
      Profile Service
      Resume Service
      Payment Service
      Notification Service

 ───────────────────────────────────────

           RabbitMQ Event Bus

 ───────────────────────────────────────

 MongoDB    PostgreSQL    Redis
```

The API Gateway acts as the single entry point.

All backend services communicate asynchronously using RabbitMQ.

Each service owns its own database.

---

# Microservices

## API Gateway

Responsibilities

- Authentication Middleware
- Route Forwarding
- Rate Limiting
- Request Validation
- Redis Caching
- JWT Verification

---

## Auth Service

Responsibilities

- User Registration
- OTP Verification
- Login
- JWT Generation

Database

MongoDB

---

## Profile Service

Responsibilities

- User Profile
- Personal Information
- Skills
- Education
- Experience

Database

MongoDB

---

## Resume Service

Responsibilities

- Resume CRUD
- AI Summary
- ATS Analysis
- Resume Templates

Database

MongoDB

---

## Payment Service

Responsibilities

- Razorpay Integration
- Credit Purchase
- Transaction History

Database

PostgreSQL

---

## Notification Service

Responsibilities

- OTP Emails
- Payment Emails
- Resume Notifications

Communication

RabbitMQ Consumer

---

# Technology Stack

## Frontend

- React
- Redux Toolkit
- TanStack Query
- Tailwind CSS
- Framer Motion
- React Router

---

## Backend

- Node.js
- Express.js
- JWT Authentication

---

## AI

- Google Gemini API

---

## Database

- MongoDB
- PostgreSQL

---

## Infrastructure

- Docker
- Docker Compose
- Redis
- RabbitMQ
- Nginx (Optional)

---

## Payments

- Razorpay

---

# Infrastructure

ResumePilot is completely containerized.

Every service runs independently using Docker.

```
Client

↓

API Gateway

↓

Microservices

↓

MongoDB
PostgreSQL
Redis
RabbitMQ
```

---

# Project Structure

```
ResumePilot/

client/

server/

gateway/

services/
│
├── auth-service
├── profile-service
├── resume-service
├── payment-service
└── notification-service

docker-compose.yml

README.md
```

---

# Prerequisites

Before running the project make sure you have

- Docker
- Docker Compose

No local MongoDB or Redis installation is required.

Everything runs inside Docker.

---

# Environment Variables

Each service contains its own `.env` file.

Example

```
PORT=

JWT_SECRET=

MONGODB_URI=

POSTGRES_URI=

REDIS_HOST=

REDIS_PORT=

RABBITMQ_URL=

GEMINI_API_KEY=

RAZORPAY_KEY_ID=

RAZORPAY_SECRET=

SMTP_HOST=

SMTP_USER=

SMTP_PASS=
```

---

# Running the Project

Clone the repository

```bash
git https://github.com/Dev-akash77/ResumePilot.git
```

Move into the project

```bash
cd resumepilot
```

Create environment files

```
gateway/.env

services/auth-service/.env

services/profile-service/.env

services/resume-service/.env

services/payment-service/.env

services/notification-service/.env
```

---

# Docker Deployment

Build every service

```bash
docker compose build
```

Start the complete application

```bash
docker compose up
```

Run in detached mode

```bash
docker compose up -d
```

Stop all containers

```bash
docker compose down
```

Rebuild after changes

```bash
docker compose up --build
```

---

# API Gateway

The gateway is responsible for

- Authentication
- JWT Verification
- Request Routing
- Redis Caching
- Rate Limiting
- API Protection

All client requests go through the gateway.

No service is directly exposed.

---

# Redis

Redis is used for

- API Response Caching
- Gateway Rate Limiting
- Faster Read Operations
- Reduced Database Load

Benefits

- Lower latency
- Better scalability
- Higher throughput

---

# RabbitMQ

RabbitMQ provides asynchronous communication between services.

Examples

User Registered

↓

Notification Service sends Welcome Email

Payment Completed

↓

Credits Updated

↓

Notification Email Sent

Services remain loosely coupled and independently scalable.

---

# AI Integration

ResumePilot uses Google Gemini for

- Resume Summary Generation
- ATS Resume Suggestions
- Professional Content Improvement

The AI service is integrated inside the Resume Service.

---

# Payment System

Payment processing is handled using Razorpay.

Features

- Credit Purchase
- Transaction History
- Secure Payment Verification

Financial data is stored in PostgreSQL for ACID compliance.

---

# Security

ResumePilot includes multiple security layers.

- JWT Authentication
- Protected APIs
- Rate Limiting
- Redis Cache Protection
- Input Validation
- Secure Password Hashing
- Environment Variable Isolation
- Payment Verification

---

# Performance

Performance optimizations include

- Redis Caching
- API Gateway
- Database Per Service
- Asynchronous Events
- Stateless Services
- Dockerized Deployment

---

# Future Improvements

- Resume PDF Export
- Multiple Resume Templates
- AI Interview Preparation
- AI Job Matching
- Recruiter Dashboard
- Portfolio Generator
- Resume Analytics
- Kubernetes Deployment
- CI/CD Pipeline
- Monitoring with Prometheus & Grafana

---

# Author

Akash Biswas

Full Stack Developer

AI • Microservices • Cloud • System Design

GitHub

https://github.com/Dev-akash77

LinkedIn

https://www.linkedin.com/in/akash-biswas-486435289/

---

# License

This project is licensed under the MIT License.

Feel free to use, modify, and contribute.