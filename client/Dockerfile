# Use a lighter version of Node as a parent image
FROM node:10.13.0
# Set the working directory to /client
WORKDIR /client
# copy package.json into the container at /client
COPY package*.json /client/
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /client
COPY . /client/

ENV NODE_ENV=production

# Make port 3000 available to the world outside this container
EXPOSE 3001
# Run the app when the container launches
CMD ["npm", "start"]