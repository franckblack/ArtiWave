# BLOG
## INSTALLATION
### 1. Local
#### Database
- Install MongoDb Compass and Mongosh shell.  
[MongoDb shell download](https://www.mongodb.com/try/download/shell)  
[MongoDb Compass download](https://www.mongodb.com/try/download/compass)  
- Create database with Mongosh:
```shell
mongosh
```
```shell
use blog
```
```shell
db.createCollection("users")
```
```shell
db.createCollection("articles")
```
[MongoDb create a database documentation](https://www.mongodb.com/docs/manual/core/databases-and-collections/)
- Create an authentication
```shell
mongosh
```
```shell
use blog
```
```shell
db.createUser({ user: "Admin", pwd: "nimda", roles: [{ role: "readWrite", db: "blog" }] })
```
[MongoDb create a user documentation](https://www.mongodb.com/docs/manual/tutorial/create-users/)
***
- Connexion to database
##### 1. Connexion with Mongosh:
```shell
db.auth("Admin","nimda")
```
##### 2. Or connexion with MongoDb VsCode extension:
![Connexion MongoDb VsCode extension step 1](https://github.com/EmmanuelLefevre/img/blob/main/MongoDb%20VsCode%20extension%20connexion%20step%201.png)
![Connexion MongoDb VsCode extension step 2](https://github.com/EmmanuelLefevre/img/blob/main/MongoDb%20VsCode%20extension%20connexion%20step%202.png)
***
#### Clone and install project
```shell
git clone
```
```shell
npm install
```
#### Generate keys for JWT
```shell
mkdircd _certs
```
```shell
openssl genrsa -out pvt.pem 4096
```
```shell
openssl rsa -in pvt.pem -outform PEM -pubout -out pub.pem
```
#### Check keys
```shell
openssl rsa -check -in _certs/pvt.pem
```


### 2. Docker
