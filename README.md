# Blogify Journal

Blogify Journal is a multi-user blogging platform built with Node.js, Express, MongoDB, and EJS. It lets users create accounts, publish articles with cover images, and join conversations through comments in a clean server-rendered experience.

This project is a strong starter for anyone learning full-stack web development with Express and Mongoose while still being practical enough to showcase on GitHub as a complete publishing app.

## Project Description

Blogify Journal is designed as a lightweight content publishing platform where authenticated users can:

- create an account and sign in securely with JWT-based authentication
- write and publish blog posts
- upload blog cover images through ImageKit
- browse recent posts on the homepage
- read individual articles and participate through comments

The app uses server-side rendering with EJS, stores data in MongoDB with Mongoose, and manages authentication through signed cookies.

## Features

- User registration and login
- JWT authentication with HTTP-only cookies
- Create and publish blog posts
- Upload cover images with ImageKit
- View all blogs on the homepage in reverse chronological order
- Open individual blog pages with author details
- Add comments to blog posts
- Protected compose and comment routes
- Clean MVC-style folder structure for routes, models, services, and views

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- JWT
- Multer
- ImageKit
- Cookie Parser

## Folder Structure

```text
blogify/
|-- app.js
|-- middlewares/
|-- models/
|-- public/
|-- routes/
|-- services/
|-- views/
|-- package.json
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/blogify-journal.git
cd blogify-journal
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

Add the following environment variables:

```env
PORT=8000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

### 4. Start the development server

```bash
npm run dev
```

To run in normal mode:

```bash
npm start
```

The app will be available at:

```text
http://localhost:8000
```

## Environment Variables

| Variable | Description |
| --- | --- |
| `PORT` | Port for the Express server |
| `MONGO_URL` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign authentication tokens |
| `IMAGEKIT_PUBLIC_KEY` | ImageKit public key |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private key |
| `IMAGEKIT_URL_ENDPOINT` | ImageKit URL endpoint |

## Main Routes

| Route | Method | Purpose |
| --- | --- | --- |
| `/` | `GET` | Show all blog posts |
| `/user/signup` | `GET/POST` | Register a new user |
| `/user/signin` | `GET/POST` | Sign in a user |
| `/user/logout` | `GET` | Log out the current user |
| `/blog/compose` | `GET` | Open the blog creation page |
| `/blog` | `POST` | Publish a new blog post |
| `/blog/:id` | `GET` | View a single blog post |
| `/blog/comment/:blogId` | `POST` | Add a comment to a post |

## How It Works

- Authentication is handled using JWT tokens stored in cookies.
- Passwords are hashed before being saved to MongoDB.
- Blog posts and comments are stored as MongoDB documents.
- Cover images are uploaded from memory using Multer and then sent to ImageKit.
- EJS templates render the UI on the server side.

## Why This Project Stands Out

- Full-stack CRUD-style functionality with authentication
- Real media upload workflow using a cloud image service
- Clear separation of concerns across routes, models, middleware, and services
- Good portfolio project for Express, MongoDB, and server-rendered applications

## Future Improvements

- Rich text editor for blog writing
- User profile pages
- Edit and delete blog posts
- Like and bookmark functionality
- Search and category filters
- Admin moderation tools
- Pagination for blog listings
- Automated tests

## Author

Created by Aryan.

## License

This project is licensed under the ISC License.
