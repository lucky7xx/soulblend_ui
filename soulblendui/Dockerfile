FROM node:18.17.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
# RUN npm install react-slick
# RUN npm install slick-carousel
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
