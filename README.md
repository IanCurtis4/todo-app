# Todo App Setup

This guide will walk you through the steps to setup and run the Todo app.

## Prerequisites

- Node.js and npm (Node Package Manager) installed on your machine.
- SQLite installed on your machine.
- Angular CLI installed globally (`npm install -g @angular/cli`).

## Setup

1. **Clone the repository**: Clone the repository or download the ZIP file and extract it to a directory of your choice.

2. **Navigate to the project directory**: Use the command line to navigate into the main project directory.

3. **Install the dependencies**: Run `npm install` to install all the dependencies listed in the `package.json` file. This will install both server-side and client-side dependencies.

4. **Navigate to the server directory**: Use the command line to navigate into the `server` directory inside the main project directory.

5. **Install SQLite**: If not already installed, install SQLite on your machine. SQLite will be used for the database.

6. **Start the server**: Run `node server.js` to start the server. You should see a message indicating that the server is running and listening on a particular port (usually 3000).

7. **Navigate to the client directory**: Open a new command line window and navigate into the `app` directory inside the main project directory.

8. **Start the client**: Run `ng serve` to start the Angular client. You should see a message indicating that the client is compiled successfully and running on a particular port (usually 4200).

9. **Open the application**: Open a web browser and navigate to `localhost:4200` to view and interact with the application.

## Troubleshooting

If you encounter any errors during the setup, please verify that you have the necessary prerequisites installed. If the problem persists, try to delete the `node_modules` folder and the `package-lock.json` file (if present), and then run `npm install` again.

Please note that this setup assumes you are running the application locally. If you are deploying to a production environment, you may need to adjust the server and database configurations accordingly.
