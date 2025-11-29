# BASE IMAGE
FROM node:20-alpine

# SET WORKING DIRECTORY
WORKDIR /app
 
# COPY PACKAGE FILE
COPY package*.json ./

# INSTALL DEPENDENCIES
RUN npm install --production

# COPY APP SOURCE CODE
COPY . .

# Ensure the Logs directory exists
RUN mkdir -p ./src/Logs

# EXPOSE PORT 4001
EXPOSE 4003

# START THE SERVICE
# CMD [ "node","server.js" ]
CMD ["npm","run","dev"]
