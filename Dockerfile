# Latest LTS Nodejs image.
FROM node:8

# Create the app directory
# then copy the package.json.
RUN mkdir -p /usr/src/centralrouter
WORKDIR /usr/src/centralrouter
COPY package.json /usr/src/centralrouter

# Install required dependencies,
# then copy the app bundle to the directory.
# For production, you might add --only=production attribute
# to npm install.
RUN npm install
COPY . /usr/src/centralrouter

# Expose the ports for Express.js and Socket.io
# And run the app.
EXPOSE 8080 8081
ENTRYPOINT npm start
