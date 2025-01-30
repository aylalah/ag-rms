# Step 1: Use an official Node.js runtime as the base image
FROM node:20-alpine AS base

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Install dependencies
# Copy package.json and package-lock.json to optimize layer caching
COPY package.json ./

# Step 4: Install dependencies for both production and development
RUN bun install

# Step 5: Copy the rest of the app files
COPY . .

# Step 6: Build the app (runs the Remix build script)
RUN bun build

# Step 7: Create a production image by using a smaller runtime image
FROM node:20-alpine AS production

# Step 8: Set the working directory for the production container
WORKDIR /app

# Step 9: Copy only the necessary files from the build stage
COPY --from=base /app /app

# Step 10: Install production dependencies only
RUN npm install --only=production

# Step 11: Expose the port your app will run on
EXPOSE 3000

# Step 12: Start the app (using your Remix start script)
CMD ["npm", "run", "start"]

