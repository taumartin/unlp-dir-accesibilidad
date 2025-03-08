FROM node:20.18
WORKDIR /api

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 3000
CMD ["npm", "run", "start:docker"]
