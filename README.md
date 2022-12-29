# personal-book-library

A personal library to store all your progress on reading books. Built using Express.js, Vite. It also comes with a simple logging utility that logs errors happened inside the server.

## Getting Started

To get started with this projects, you would require:

- Docker
- MongoDB (docker image)
- Express.js
- NodeJS
- Vite

### Starting up backend

Creating `mongodb` Docker container:

```
docker run -d -p 27017:27017 --name=books-app mongo
```

Start the Express.js server

```
npm run dev
```

### Starting up frontend

```
cd frontend
npm run dev
```

These commands will set you up for a nice dev journey.

Feel free to use this repo as a template for your project or so.

## License

The license ownership of this project is held by Haneen Mahdin.
