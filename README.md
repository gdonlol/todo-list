# TodoList
Basic task management application created using the MERN stack

## Features
- Add/delete items in lists
- Add/delete lists
- Edit list name/desc
- Account authentication system

## Usage:
1. **Clone repository**: Start by cloning the repository to your local machine using Git.
2. **Install dependencies**: Navigate to both the frontend and backend directories in your terminal or command prompt, then run `npm install` to install the required dependencies for each part of the application.
3. **Create environment file**: In the backend directory, create a file named `.env`. This file will store sensitive information such as database connection URLs and secret keys.
4. **Configure MongoDB URL**: Inside the `.env` file, set up a MongoDB connection URL using the format `MONGOURL='<URL HERE>'`. Replace `<URL HERE>` with the actual URL of your MongoDB database cluster.
5. **Set secret key**: Also in the `.env` file, define a secret key for use in account token authentication. Use the format `SECRET='<any string>'`, replacing `<any string>` with a string of your choice.
6. **Start the application**: Once you've configured the environment variables, you can start the application by running `npm start` in the root directory of the project. This command will launch both the frontend and backend servers, allowing you to access the application in your web browser.

## Demo:
https://github.com/gdonlol/todo-list/assets/66427508/b3114910-66bd-4738-8303-59174057c55b

My first solo fullstack MERN app :)
Very bare-bones features and it could definitely do better security wise. Maybe I'll update it in the future but I have so many other project ideas that are a lot more interesting than the good old todo list 😂

Updates:
02/23/2024:
- Added token authentication for security
- Added limits for lists (max 10/user) and items in lists (max 50/list, each max 100 chars)
- Fixed bug where deleting a list does not clear it's items from database
