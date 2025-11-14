FROM node:16-alpine
RUN apk update && apk upgrade && \
    apk add --no-cache bash git yarn python3 make g++ curl  && \
    yarn global add gatsby-cli@4.5.2
EXPOSE 8000 9000
#RUN apk update && \
#    apk add git yarn build-base autoconf automake libtool pkgconfig nasm curl && \
#    yarn global add gatsby-cli && \
#    gatsby options set package-manager yarn \
# RUN npm install -g gatsby-cli@4.5.2

#    apt install -y git curl yarn build-base autoconf automake libtool pkgconfig nasm &&  \
#    yarn global add gatsby-cli && \
#    gatsby options set package-manager yarn
WORKDIR /app
# RUN npm install -g npm
#RUN npm install -g yarnk
#RUN npm install -g n
#RUN n v16.13.1
#RUN npm update -g npm
