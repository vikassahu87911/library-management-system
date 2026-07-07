1- got to folder and open cmd
2- type git config --global user.name "vikas87911"
3- type git config --global user.email "vikassahu1542002@gmail.com"
4- type git init
5- type git config --global color.ui auto
6- type git clone (paste kink copied from git repository)
7- type git remote add origin (paste copied link from github repo)
8- in terminal in vs code - type git status
9- git add .
10- git commit -m "testing"
11- git push
# library-management-system

    this is a library management api backend for the management of users and the books

# routes and the endpoints
## /users
get: get all the list of users in the system
post: register a new user

## /users(id)
get: get a user by their id
put: updating a user by their id
delete: deleting a user by their id (check if the user still has an issued book) && (is any fine/panelty to be collected)

## /users/subscription-details/{id}
get: get a user subscription details by their id
    >>date of subscription
    >>valid till
    >>fine if any?

## /books
get: get all the books in the system
post:add a new book to the system

## /books/{id}
get: get a book by its id
put: update a book by its id
delete: delete a book by its id

## /books/issued
get: get all the issued books

## /books/issued/withfine
get: get all issued books with their fine amount

## subscription types
    >>basic (3 months)
    >>standard (6 months)
    >>premium (12 months)

>> if a user missed the renewl date then user should be collected with $100
>> if a user missed his subscription then user is charged with $100
>> if a user missed both renewl and subscription then user is charged with $200

npm i mongoose
npm i mongodb

#mongo db
mongodb+srv://vikassahu1542002_db_user:<db_password>@cluster0.ibtk0tx.mongodb.net/?appName=Cluster0
WskMOgIqTpIlEkvl
mongodb+srv://vikassahu1542002_db_user:<WskMOgIqTpIlEkvl>@cluster0.ibtk0tx.mongodb.net/?appName=Cluster0

npm i dotenv

## MVC aRCHITECTURE
    >>M: Model (Structure of our MongoDb)
    >>V: View (Frontend)
    >>c: controllers (Brain/logic of a route)

### DTO ( Data transfer Object)