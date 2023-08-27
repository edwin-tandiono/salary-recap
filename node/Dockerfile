FROM node:18

# Create app directory
WORKDIR D:\\Temp\\Docker

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Run app
EXPOSE 8080
CMD [ "npm", "run", "start" ]
