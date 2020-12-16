# Kipplist API

Kipplist API is a Nodejs Express REST API which provides CRUD functionality of Todos along with Authentication.

### Base URL

```
https://feather-api.herokuapp.com
```

## API ENDPOINTS

## Auth 🔐

```
/auth
```

#### POST - SignUp 😎✨

```
/auth/signUp
```

**POST** request to /auth/signUp with specified body will register new user.

##### Password criteria

- At least 8 characters—the more characters, the better.
- Atleast one uppercase and lowercase letter.
- A mixture of letters and numbers.
- Inclusion of at least one special character from [!, @, #, $, %, ^, &, *]

```json
{
  "firstName": "Jon",
  "lastName": "Doe",
  "email": "jondoe@mail.com",
  "password": "JonDoee@123",
  "confirmPassword": "JonDoee@123"
}
```

#### POST - SignIn 🧐

```
/auth/signIn
```

**POST** request to /auth/signIn with specified body will login new user and set JWT token inside Cookie.

```json
{
  "email": "jondoe@mail.com",
  "password": "JonDoee@123"
}
```

## Todos 📃

- ##### For operations with todo endpoint, request header 🔑 must be present with Bearer Token as `authorization` generated using JWT token assigned to user upon signIn.
- ##### This can be done by setting Bearer Token inside `authorization` of `req.headers`.
- ##### If using Postman learn how to set JWT token as Bearer token inside Request header from [here](https://medium.com/@iroshan.du/set-bearer-token-as-environment-variable-in-postman-for-all-apis-13277e3ebd78).

### GET - Fetch Todos 🧾

```
/todos
```

A simple **GET** request on /todos will return all todos in database.

```
/todos/:id
```

**GET** request on /todos with specified id in params will return todos with specific id.

### POST - Create new Todo ✒️

```
/todos
```

**POST** request on /todos with valid request body will create new todos.

##### **todoTitle and todoContent are required\***

#### Request Body

```json
{
  "todoTitle": "POST Req",
  "todoContent": "Will create new Todo"
}
```

### PATCH - Update Todo ⚙️

```
/todos:id
```

**PATCH** request on /todos with specified id in params and request body with specified key value will update specified blog.

```json
{
  "todoTitle": "PATCH Req",
  "todoContent": "Will update Todo",
  "todoCompleted": true / false
}
```

#### DELETE - Delete Todo ❌

**DELETE** request with specified id will delete the todo from database.

```
/todos/:id
```

### Directory Tree

```
.
├── app.js
├── config.env
├── config.sample.env
├── package.json
├── package-lock.json
├── README.md
└── src
    ├── configuration
    │   └── config.js
    ├── controllers
    │   └── blogsController.js
    ├── data
    │   └── blogs.json
    ├── helpers
    │   └── validateLinks.js
    ├── middlewares
    │   ├── checkBlogId.js
    │   ├── responses
    │   │   ├── sendErrorResponse.js
    │   │   └── sendSuccessResponse.js
    │   └── validateRequestBody.js
    ├── Models
    │   ├── Blog.js
    │   ├── BlogLink.js
    │   └── ErrorResponse.js
    └── routes
        └── blogsRouter.js
```

### Installation

#### Kipplist requires [Node.js](https://nodejs.org/) v12+ to run.

Install the dependencies and devDependencies and start the server.
Create config.env by refering config.sample.env

```sh
$ npm install
$ npm run dev
```

For production environments...

```sh
$ npm install --production
$ NODE_ENV=production npm run start
```

##### POSTMAN Collection Link - [Feather API](https://www.getpostman.com/collections/555c3129555e05068655)

##### Deployed on Heroku - [https://feather-api.herokuapp.com/](https://feather-api.herokuapp.com/)
