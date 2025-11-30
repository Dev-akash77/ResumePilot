# BASE IMAGE
FROM node:20-alpine

# SET WORKING DIRECTORY
WORKDIR /app
 
# COPY PACKAGE FILE
COPY package*.json ./

# INSTALL DEPENDENCIES
# RUN npm install --production
RUN npm install 

# COPY APP SOURCE CODE
COPY . .

# Ensure the Logs directory exists
RUN mkdir -p ./src/Logs

# EXPOSE PORT 4004
EXPOSE 4004

# START THE SERVICE
# CMD [ "node","server.js" ]
CMD ["npm","run","dev"]
