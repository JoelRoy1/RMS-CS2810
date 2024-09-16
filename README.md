Welcome, find here some general information regarding our Restaurant Management System.

### Project Outline

This project is a Restaurant Management System created for the client, Oaxaca, A Mexican restaurant by Group 9 for CS2810. 
The System is run using Docker and is built on the PERN stack (PostgreSQL, ExpressJS, ReactJS & NodeJS).


### Setup

Please download Docker Desktop for your OS from [here](https://www.docker.com). 
Windows users will have to install WSL2 before installing Docker, see [here](https://learn.microsoft.com/en-us/windows/wsl/install).


### Useful Commands

I recommend using Git Bash as your terminal if on Windows, see [here](https://gitforwindows.org) 

```
//This command is used to build and run our docker images/containers.
//Use this to run the program anytime a change has been made on the local machine.
docker compose up -d --build 

//This command is used to remove our docker containers.
docker compose down 

//This command is used to remove our docker containers, images and volumes.
docker compose down --rmi -v

//This command is used to clean our docker system of unneeded files.
docker system prune
```

## React info

You do not need to install anything locally to run react as the Docker container will install all dependencies. 
The react frontend is running on `port 3000`. 
Once starting the server you can visit the website on your computer at [http://localhost:3000/](http://localhost:3000/).

## Node.js/Express.js info

The Node/Express backend api is running on `port 9000`.

### Setup

We are using Node.js version `20.11.0 LTS`. Please download from [here](https://nodejs.org/en). 
Express.js and other dependencies will be automatically installed.

### Conventions

To find general coding conventions followed for this project please look at the google javascript style guide [here](https://google.github.io/styleguide/jsguide.html).

## Postgres info

Postgres communicates on `port 5432`. 
We can edit our postgresdb through the backend using http GET/POST, or through a .sql script or through a .sh script within the db folder.

### Setup

Postgres is run on a docker container so althought we don't need to install it locally you can find it [here](https://www.postgresql.org/download/).

### Conventions

Regarding tables names, case, etc, the prevalent convention is:

SQL keywords: UPPER CASE 
identifiers (names of databases, tables, columns, etc): lower_case_with_underscores

For example:

>UPDATE my_table SET name = 5;

## Project structure / git

The project will contain 3 folders, client, server and db. containing the files for each part of the project. 
The main development branch will be found [here](https://gitlab.cim.rhul.ac.uk/TeamProject09/TeamProject09/-/tree/development) 
When making changes to the project please create a new feature branch and once changes have been finalized, after discussion, this can be merged with the dev branch. 
**Do not commit to the main branch** as this is only for production releases. 
Please only edit files within the folder respective to the part of the app you are working on. 

### Conventions

Please see [here](https://gist.github.com/tonibardina/9290fbc7d605b4f86919426e614fe692) for good git commit conventions.

## Extra info

For backend people you can install postman [here](https://www.postman.com/downloads/). 
This will let us make request straight to the api from our local machine to test if requests are working without having to use the frontend. 

The project can also be run manually without docker if you like however if you edit the project to be hosted locally 
please **do not commit** these changes to git as it will mess it up for others. 

I recommend using Visual Studio Code as your text editor for this project, see [here](https://code.visualstudio.com). 
Find [here](https://code.visualstudio.com/docs/nodejs/extensions) some interesting extensions that will help with node.js development in VSC.
Find [here](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) gitlens which is a good extension for git in VSC.

# Initial Project Setup

## Please follow these instructions to set up the project.

- clone the git repo [here](https://gitlab.cim.rhul.ac.uk/TeamProject09/TeamProject09/-/tree/development).
- these following steps are optional but **useful/recommended** for local editing of the project. 
- change directory into the client and run `npm install` this may take a sec.
- change directory into the server and run `npm install` this may take a sec.
- these following steps are **necessary** to get docker working.
- Make sure Docker desktop is running.
- change directory to the root of the project and run `docker compose up -d --build`

The docker containers should now be up and running. 
visit [http://localhost:3000/](http://localhost:3000/) to see the website running.