#!/bin/sh

# Start Node.js App
node /app/server/index.js &

# Start nginx
nginx -g "daemon off;"
