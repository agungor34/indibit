FROM node:18
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
# CMD ["npm", "start"]
CMD ["node", "app.cjs"]