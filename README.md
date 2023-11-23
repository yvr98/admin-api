# Setup Instructions for Dashboard API

## Prerequisites

Ensure you have Node.js,npm,and PostgreSQL

## Installation

1. Clone the repository:
2. Navigate to the cloned directory
3. run npm install
4. Add required details to config.json and db.config.json (postgres details)
5. Make sure you have PostgreSQL installed and running.
   Create a database that matches the name given in config.json and db.config.json

Run the commands:
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

Start the server:
npm start

The server will start on `http://localhost:3001`

## Verifying the Setup

After starting the server, you should be able to access [http://localhost:3001/api/some-endpoint](http://localhost:3001/api/some-endpoint) to verify that the setup is correct.

Endpoints: employees,companies

## Troubleshooting

- If you encounter a database connection error, ensure that PostgreSQL is running and your config files contains the correct database credentials.
