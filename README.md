# MernTuto

This is a MERN stack tutorial where I learn how to use MongoDB, Express, React and Node.js to create a full stack web application. The application is a simple task manager where you can add, edit and delete notes.

## Installation

To install the application, you need to have Node.js and npm installed on your computer. Then, you can clone the repository and install the dependencies in both the client and server folders.

```bash
git clone https://github.com/urielduana/MernTuto
cd MernTuto
cd backend
npm install
cd ../frontend
npm install
```

## Usage

To run the application, you need to have a MongoDB Atlas account and create a cluster. Then, you need to create a .env file in the backend folder and add the following environment variables:

```bash
MONGO_URI=<your-mongodb-uri>
PORT=5000
```

Finally, you can run the application by running the following commands in the backend and frontend folders:

```bash
cd backend
npm start
cd ../frontend
npm start
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
