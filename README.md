# TodoList
Basic task management application created using the MERN stack

## Features
- Add/delete items in lists
- Add/delete lists
- Edit list name/desc
- Account system

## Usage:
1. Clone repository
2. Install dependencies in both frontend and backend `npm install`
3. In backend, connect your MongoDB database cluster url in .env using `MONGOURL='<URL HERE>'`
4. Add secret to .env using `SECRET='<any string>'`
5. Run with `npm start`

First solo fullstack MERN app :)
Very bare-bones features and it could definitely do better security wise. Maybe I'll update it in the future but I have so many other project ideas that are a lot more interesting than the good old todo list 😂

Updates:
02/23/2024:
- Added token authentication for security
- Added limits for lists (max 10/user) and items in lists (max 50/list, each max 100 chars)
- Fixed bug where deleting a list does not clear it's items from database
