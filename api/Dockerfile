# Use a lighter version of Node as a parent image
FROM node:10.13.0
# Set the working directory to /api
WORKDIR /api
# copy package.json into the container at /api
COPY package*.json /api/
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /api
COPY . /api/

EXPOSE 8000
CMD ["npm", "start"]