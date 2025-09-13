FROM  node:20

WORKDIR /BackendAssignment
# the above line will create a folder named BackendAssignment in the container and set it as the working directory

COPY . .
# copy all the files from the current directory to the working directory in the container

RUN npm install
# to install all the dependencies mentioned in package.json

EXPOSE 3000

CMD ["npm","start"]
# to run the image of the docker file we will use this command


