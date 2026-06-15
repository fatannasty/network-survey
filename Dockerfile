FROM nginx:1.27-alpine

LABEL maintainer="fatannasty@gmail.com"
LABEL description="Network Site Survey - Self-hosted web app"
LABEL version="1.0.0"

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy app files
COPY app/ /usr/share/nginx/html/

# Copy custom nginx config
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Set correct permissions
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
