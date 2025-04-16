# node.js image with Alpine Linux for a lightweight container
FROM node:23.11-alpine

# Working directory inside the container
WORKDIR /app

# copying package.json and package-lock.json to the working directory
COPY package*.json ./

# Installing dependencies
RUN npm install

# Copying the rest of the application code to the working directory
COPY . .

# Exposing port 5000 for the application
EXPOSE 5000

# Starting the application
CMD ["npm", "run", "dev"]
