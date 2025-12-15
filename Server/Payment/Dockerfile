# BASE IMAGE
FROM node:20-alpine

# WORKDIR
WORKDIR /app

# COPY package files
COPY package*.json ./

# INSTALL DEPENDENCIES
RUN npm install

# COPY SOURCE
COPY . .

# BUILD TYPESCRIPT
# RUN npm run build

# EXPOSE PORT
EXPOSE 4005

# START APP
 # NOT FOR PRODUCTION
CMD ["npm", "run", "dev"]
