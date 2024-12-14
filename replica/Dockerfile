FROM node:alpine
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
CMD ["npm", "start"]
# CMD ["node", "app.cjs"]