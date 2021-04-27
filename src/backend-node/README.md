# Libraries used

- [`express`](https://www.npmjs.com/package/express) - to serve the application request and response
- [`body-parser`](https://www.npmjs.com/package/body-parser) - to convert the request body data to JavaScript objects
- [`morgan`](https://www.npmjs.com/package/morgan) - to add logging capabilities
- [`cors`](https://www.npmjs.com/package/cors) - to allow request coming from other origins
- [`@azure/cosmos`](https://www.npmjs.com/package/@azure/cosmos) - to work with Azure Cosmos Database
- [`multer`](https://www.npmjs.com/package/multer) - for handling `multipart/form-data` that are used for image uploads

# Creating a RSA256 (Private and Public RSA Key pair) for JWT tokens

```
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
# Don't add passphrase
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
```

# References

- [Azure Cosmos with Nodejs](https://docs.microsoft.com/en-us/azure/cosmos-db/sql-api-nodejs-application)
- [Handling Authentication in NodeJS](https://codeburst.io/handling-authentication-in-nodejs-express-with-passport-part-3-authentication-and-authorization-8e07d819a113)
