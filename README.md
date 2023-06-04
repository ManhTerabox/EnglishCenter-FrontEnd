### Project Description

The project is a web-based school management system that helps to manage teachers, students, classes, and subjects.
The system can also be used for generating essential reports regarding teacher, student, class, and subject details.

### Technologies

As for the main technology stack, the system is developed with MERN stack. As for other tools and technologies,
Azure Boards is used for planning and managing the project, Git and GitHub for version control management,
SonarQube for continuous inspection of code quality, and Selenium for testing the system functionalities and interfaces.

### Getting Started

#### Prerequisite

- [Git](https://git-scm.com/downloads) installed
- [Node](https://nodejs.org/en/download/) and [NPM](https://nodejs.org/en/download/) installed
- MongoDB (locally or [Atlas](https://www.mongodb.com/cloud/atlas))

#### Setting up the Backend

- Setup environment variables
  - Add a `.env` file in the root directory with `MONGO_USER, MONGO_PASSWORD, DB_NAME`.
  - If you want to use MongoDB Atlas and don't know how to get the connection string, [refer this](https://docs.mongodb.com/guides/cloud/connectionstring/).
- Install the dependencies with NPM. &#8594; `npm i`
- Run the server
  - Development mode &#8594; `npm run dev` (server will run on port 8000)
  - Normal &#8594; `node index.js`

#### Setting up the Frontend

- Install the dependencies with NPM. &#8594; `npm i`
- Available scripts
  - `npm start`\
    Runs the app in the development mode.\
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
  - `npm test`\
    Launches the test runner in the interactive watch mode.
  - `npm run build`\
    Builds the app for production to the `build` folder.
