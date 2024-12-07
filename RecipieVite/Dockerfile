FROM node:alpine AS development
#FROM node:20-alpine AS development # would be better
WORKDIR /aaron-final
# Installing dependencies
COPY ./package*.json /aaron-final/

RUN npm install
# Copying all the files in our project
COPY . .
ENV VITE_API_URL=http://aaron-recipie-api.duckdns.org/
ENV VITE_REDIRECT_URL=https://aaron-recipie-vite.duckdns.org/
RUN npm run test
RUN npm run build

FROM nginx 

COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=development /aaron-final/dist /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]