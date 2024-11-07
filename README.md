# vue-exp-8

<br>

## How to Run the Project

<br>

### Server Side
- Setup the database in the .env file
```
DB_HOST=127.0.0.1
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
```

- initiate the Knex configuration
```
npx knex init
```

- Run the migrations
```
npx knex migrate:latest
```

<br>

### Client side

- First run the command to install required package
```
npm install
```

- Serve the frontend
```
npm run serve
```