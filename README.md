Task Management API (Node.js + MySQL + Sequelize)

A full-featured task management backend built with
 **Node.js**, **Express**, **Sequelize**, and **MySQL**, with support for **user authentication**, **Cloudinary image uploads**, and **JWT-based protected routes**.

## Features

**User Registration & Login** with JWT
- **Profile image upload** to Cloudinary
- **Task CRUD operations**
- **User-specific task fetching**
- **Auth middleware** to protect routes
- MySQL & Sequelize ORM for data handling
- RESTful API structure

## APi End Points


- auth
http://localhost:3000/api/v1/auth/register
http://localhost:3000/api/v1/auth/login

- tasks
http://localhost:3000/api/v1/tasks/create
http://localhost:3000/api/v1/tasks/update/1
http://localhost:3000/api/v1/tasks/deletebyid/1
http://localhost:3000/api/v1/tasks/getalltask

- user
http://localhost:3000/api/v1/users/getUserTasks/user_id/tasks
