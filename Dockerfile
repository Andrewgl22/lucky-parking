# ---- Build React App ----
FROM node:alpine AS react-build
WORKDIR /app
COPY ./client/package*.json ./  
RUN npm install
COPY ./client ./
ENV NODE_OPTIONS="--openssl-legacy-provider"
RUN npm run build

# comment for test again one more again 22

# ---- Build Server App ----
FROM node:alpine AS server-build
WORKDIR /app
COPY ./server/package*.json ./
RUN npm install
COPY ./server ./

# changed naming

# ---- Nginx Setup ----
FROM nginx:alpine
# Copy React build and Nginx default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/

# Copy server files
WORKDIR /app
COPY --from=server-build /app .

# Add a startup script
COPY ./start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 80

CMD ["/start.sh"]
