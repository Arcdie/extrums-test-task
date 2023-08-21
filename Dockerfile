FROM node:20
COPY package.json ./backend
RUN npm install
COPY . .
EXPOSE 3000
RUN npm run build:backend
CMD ["node", "build/backend/src/app.js"]
# CMD ["pm2-runtime", "build/server.js"]
