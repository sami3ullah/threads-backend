# Setup

1. `npm install`
2. `docker container up`
3. setup your env file, check env.template 
4. `npx prisma migrate dev --name initial_setup`

## Some Docker commands

### list all the containers
`docker ps -la`

### get inside of a docker container
`docker exec -it CONTAINER_ID bash`

## How to your docker container database, postgres in our case

1. Run `docker exec -it CONTAINER_ID bash`
2. Login as superuser `su postgres` // this is in our case
3. run psql `psql`
4. list all db's `\l`
5. connect to a db `\c DB_NAME`

# if you want to create a docker env without docker compose
## creating a test env for mongodb
### -dit -> detached 
`docker run --name test-mongo -dit -p 27017:27017 --rm mongo:4.4.1`

## connect to the container after that
`docker exec -it test-mongo mongo`