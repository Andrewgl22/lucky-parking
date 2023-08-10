# Use a base image (like Node, Python, etc.)
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the app port
EXPOSE 8080

# Start the app
CMD [ "npm", "start" ]
