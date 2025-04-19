## Authentication service

The idea of this service is to simply validate  
jwt tokens and learn more about the process.  
We will be using this [RFC](https://datatracker.ietf.org/doc/html/rfc7519) as a reference and also
this npm [library](https://www.npmjs.com/package/jsonwebtoken) to validate the tokens accordingly  

## To be implemented

- user control
- cryptography on password
- update password
- application scope on token generation
- add scope/remove scope from user
- remove user
- generate access token and refresh token
- refresh the access token

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