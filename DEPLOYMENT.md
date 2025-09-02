# BigCommerce Migration Tool - Deployment Guide

This guide explains how to deploy the BigCommerce Migration Tool using the same deployment strategy as the Aigumind website.

## Deployment Files Added

The following files have been added to enable deployment:

### 1. `Dockerfile`
- Multi-stage Docker build (deps → builder → runner)
- Uses Node.js 22 Alpine base image
- Optimized for production deployment
- Exposes port 3000

### 2. `captain-definition`
- Captain deployment configuration
- Points to the Dockerfile for containerization

### 3. `.dockerignore`
- Excludes unnecessary files from Docker build context
- Improves build performance and security

### 4. Updated `package.json`
- Modified start script to use `$PORT` environment variable
- Enables dynamic port binding for containerized deployment

### 5. Updated `src/config/index.js`
- Added environment variable support for configuration
- Makes the application more flexible for different environments

## Environment Variables

The following environment variables can be configured:

- `NEXT_PUBLIC_API_BASE_URL`: Base URL for API calls
- `NEXT_PUBLIC_S3_BUCKET_URL`: S3 bucket URL for file uploads
- `NEXT_PUBLIC_STRIPE_PUBLIC_KEY`: Stripe public key for payments
- `PORT`: Port number for the application (automatically set by deployment platform)

## Deployment Steps

1. **Build the Docker image:**
   ```bash
   docker build -t big-commerce-migration-tool .
   ```

2. **Test locally:**
   ```bash
   docker run -p 3000:3000 big-commerce-migration-tool
   ```

3. **Deploy to Captain:**
   - Push your code to the repository
   - Captain will automatically detect the `captain-definition` file
   - The deployment will use the Dockerfile to build and run the application

## Configuration

Before deployment, ensure you have:

1. **Environment Variables:** Set the required environment variables in your deployment platform
2. **API Endpoints:** Update the API base URL to point to your production backend
3. **S3 Configuration:** Configure S3 bucket URL if file uploads are needed
4. **Stripe Keys:** Set up Stripe public key if payment functionality is required

## Differences from Aigumind Website

The migration tool has been configured to match the Aigumind website deployment with these key differences:

- **Additional Dependencies:** Redux, Axios, Crypto-js, Framer Motion, etc.
- **Configuration:** Environment variable support for API endpoints
- **Functionality:** Migration-specific features and components

## Troubleshooting

1. **Build Issues:** Ensure all dependencies are properly listed in `package.json`
2. **Port Issues:** Verify the `$PORT` environment variable is being passed correctly
3. **API Issues:** Check that `NEXT_PUBLIC_API_BASE_URL` is set to the correct production URL
4. **Environment Variables:** Ensure all required environment variables are configured in your deployment platform

## Security Notes

- Never commit `.env` files to the repository
- Use environment variables for sensitive configuration
- The `.dockerignore` file excludes sensitive files from the Docker build
- API keys and secrets should be managed through your deployment platform's environment variable system
