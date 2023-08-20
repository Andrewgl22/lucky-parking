# ---- Build React App ----
FROM node:alpine AS react-build
WORKDIR /app
COPY ./client/package*.json ./  
RUN npm install
COPY ./client ./
RUN npm run build

# comment for test again

# ---- Build Server App ----
FROM node:alpine AS server-build
WORKDIR /app
COPY ./server/package*.json ./
RUN npm install
COPY ./server ./

# changed naming

# ---- Nginx Setup ----
FROM nginx:alpine
COPY --from=react-build /app/build /usr/share/nginx/html

# Copy Nginx default.conf with configurations for reverse proxy (assuming you have one)
COPY ./nginx/default.conf /etc/nginx/conf.d/

# Copy server node modules and other files
WORKDIR /app
COPY --from=server-build /app .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
