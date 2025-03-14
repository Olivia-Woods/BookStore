# Use the official Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json before installing dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all other files
COPY . .

# Expose port 5001
EXPOSE 5001

# Start the server
CMD ["npm", "start"]