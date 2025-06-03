## Authentication service

The idea of this service is to simply validate  
jwt tokens and learn more about the process.  
We will be using this [RFC](https://datatracker.ietf.org/doc/html/rfc7519) as a reference and also
this npm [library](https://www.npmjs.com/package/jsonwebtoken) to validate the tokens accordingly  

#### Admin Features

- We could implement admin operations like to revoke a user's refresh token (remove it from record) - TBD

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