
# Step 1: Use an official Node.js runtime as a parent image
FROM node:lts

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy the package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Step 4: Install the project dependencies
RUN npm install --production

# Step 5: Copy the rest of the application files to the working directory
COPY . .

# Step 6: Expose the port your app runs on (default: 3000 for Express apps)
EXPOSE 3000

# Step 7: Define the command to run your app
CMD ["npm", "start"]
