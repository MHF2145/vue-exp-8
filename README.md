# vue-exp-8

<br>

## How to Run the Project

<br>

### Server Side
- Setup the node first
```
npm install
```

- Ubah knexfile.js menjadi seperti ini
```
// Update with your config settings.
require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    migrations: {
      directory: './migrations'
    }
  }
};
```

- Setup the database in the .env file
```
DB_HOST=127.0.0.1
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
```

- Run the migrations
```
npx knex migrate:latest
```

- Run the backend
```
node index.js
```

<br>

### Client side
- Setup First
```
npm install
```

- Run the frontend
```
npm run serve
```
