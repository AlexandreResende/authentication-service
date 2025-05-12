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
- remove scope from user - DONE
- add scopes on token generation - DONE
- add input validation - create validator class  that will receive the input and a Joi schema to be processed - DONE
- refresh the access token - /refresh endpoint - DONE

- stack trace being logged on tokenService when a token error occurs. Can we handle that to avoid this being logged?

#### Admin Features

- We could implement admin operations like to revoke a user's refresh token (remove it from record)

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