## Authentication service

The idea of this service is to simply validate  
jwt tokens and learn more about the process.  
We will be using this [RFC](https://datatracker.ietf.org/doc/html/rfc7519) as a reference and also
this npm [library](https://www.npmjs.com/package/jsonwebtoken) to validate the tokens accordingly  

## To be implemented

- user control
- cryptography on password - DONE
- update password - DONE
- generate access token and refresh token - DONE
- create a error middleware to handle responses status code (throw new Error(NOT_FOUND)) - DONE
- remove user - DONE
- add scope to user - DONE (pending an enum of scopes and validate the incoming scopes)
- remove scope from user
- application scope on token generation
- refresh the access token - /refresh endpoint
- add input validation

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

## Notes

- sqlite does not support scalar lists. Because of that the `scopes` field inside the user model  
  will be typed as a string and inside the Entity it will be converted into an array of strings.  
  Scalar lists are only supported on DBs that natively support it, like Postgresql.