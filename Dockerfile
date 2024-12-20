
# Step 1: Use an official Node.js runtime as a parent image
FROM oven/bun

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Step 4: Install the project dependencies

RUN bun install 

# Step 5: Copy the rest of :the application files to the working directory
COPY . .

# Step 7: Define the command to run your app


CMD bun --bun run build && bun --bun run start