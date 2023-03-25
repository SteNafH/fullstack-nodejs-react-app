# FullStack NodeJs and ReactJS App

## Introduction

This is a full-stack web application built using Node.js, Express, and React. The backend API is built using Node.js and
Express, and the frontend is built using React. The application allows users to view and manage products.

## Project Structure

```
src
├── configs
│   └── config.ts
├── controllers
│   ├── product.controller.ts
│   └── user.controller.ts
├── db
│   └── db-service.ts
├── loaders
│   ├── database.loader.ts
│   ├── express.loader.ts
│   └── routes.loader.ts
├── middlewares
│   └── auth.middleware.ts
├── models
│   ├── product.model.ts
│   └── user.model.ts
├── routes
│   ├── product.routes.ts
│   └── user.routes.ts
├── utils
│   ├── exceptions
│   │   └──...
│   └── ...
├── views
│   ├── components
│   │   └── ...
│   ├── contexts
│   │   └── ...
│   ├── hooks
│   │   └── ...
│   ├── pages
│   │   └── ...
│   ├── scss
│   │   └── ...
│   ├── App.tsx
│   ├── index.html
│   └── index.tsx
└── index.ts
```

Here's a brief description of what each folder/file contains:

- `src/configs/`: Folder containing configuration files for the application.
- `src/controllers/`: Folder containing controller logic for handling user requests.
- `src/db/`: Folder containing the class that interacts with the database.
- `src/loaders/`: Folder containing files that initialize different parts of the application.
- `src/middlewares`: Folder containing files that define middleware functions that can be used to modify requests or
  responses before they are handled by controllers.
- `src/models/`: Folder containing database models.
- `src/routes/`: Folder containing the routes for the application.
- `src/utils/`: Folder containing utility functions and classes.
- `src/views/`:  Folder containing files related to rendering views on the client-side.

## Installation

To install the project, follow these steps:

1. Clone the repository: `git clone https://gitlab.com/SteNaf/fullstack-nodejs-react-app.git`
2. Install dependencies: `npm install`

## Running the Application

To run the application, follow these steps:

- To run the development environment:
    - `npm run dev`
    - This command will start the development server and build the frontend with hot reloading enabled.
- To build the production version:
    - `npm run build`
    - This command will build the production version of the app, which will be output to the `dist/` folder.
- To start the production server:
    - `npm run start`
    - This command will build the production and then start it on your local machine.
- To run the tests:
  - `npm run test`
  - This command will run all tests written in the `tests/` folder.


## Configuration

The app uses a configuration file located at `src/configs/config.ts`. This file contains the app configuration options,
such as database credentials, server port, and JWT secret. Edit this file to change the app configuration.
