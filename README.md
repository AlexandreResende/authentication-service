## Authentication service

The idea of this service is to simply validate  
jwt tokens and learn more about the process.  
We will be using this [RFC](https://datatracker.ietf.org/doc/html/rfc7519) as a reference and also
this npm [library](https://www.npmjs.com/package/jsonwebtoken) to validate the tokens accordingly  

## To be implemented

- user control
- cryptography on password - DONE
- update password
- application scope on token generation
- add scope/remove scope from user
- remove user
- generate access token and refresh token - DONE
- refresh the access token
- create a error middleware to handle responses status code (throw new Error(NOT_FOUND)) -> statusCode 404 - message to be sent to middleware

- revoke refresh token
  - this will be implemented by adding a sessionId inside the jwt access and refresh token. This way if the user's token  
  gets revoked, it will need to change the session (log out and login again) and send a new sessionId to generate the tokens  
  a blacklist table will be created that will store all the sessionIds and check it when necessary (this will be changed to redis in the future)  

## What is being used

- Node.js + express
- sqlite3
- Prisma ORM
- JWT tokens

## Adding Prisma ORM to project

- npx prisma init --datasource-provider sqlite --output ./  
- after creating the schema run the migrations  
  - npx prisma migrate dev --name init  
- to generate the prisma client run the following command
  - npx prisma generate