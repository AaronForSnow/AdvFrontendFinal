FROM node:alpine AS development
#FROM node:20-alpine AS development # would be better
WORKDIR /react-app
# Installing dependencies
COPY ./package*.json /react-app

RUN npm install
# Copying all the files in our project
COPY . .
ENV VITE_API_URL=http://aaron-recipie-api.duckdns.org/Ingredient/getall
RUN npm run build

FROM nginx 

COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=development /react-app/dist /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]