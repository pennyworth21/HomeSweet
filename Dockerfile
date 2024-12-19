# Build stage
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Add package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
ARG REACT_APP_API_URL
ARG REACT_APP_ENV=production
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy build files
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -q --spider http://localhost/ || exit 1

# Add labels
LABEL maintainer="Inflow Team" \
      version="1.0.0" \
      description="Inflow Frontend Application"

# Set environment variables
ENV NODE_ENV=production \
    NGINX_WORKER_PROCESSES=auto \
    NGINX_WORKER_CONNECTIONS=1024

# Create non-root user
USER nginx

# Add volume for nginx cache
VOLUME ["/var/cache/nginx"]

# Add volume for logs
VOLUME ["/var/log/nginx"]

# Add volume for static files
VOLUME ["/usr/share/nginx/html/static"]

# Set working directory
WORKDIR /usr/share/nginx/html

# Copy entrypoint script
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
