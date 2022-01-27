const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// set template engine middlewares

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});
//CONFIGURAR SERVIDOR DE ESTÁTICOS
const staticServerPath = "./src/public-react";
server.use(express.static(staticServerPath));

//CONFIGURAR BASE DE DATOS
const db = new Database("./src/db/database.db", {
  verbose: console.log,
});

//TOMA PELICULAS DE BASE DE DATOS
server.get("/movies", (req, res) => {
  //SELECCIONAR QUERY
  const query = db.prepare(`SELECT * FROM movies`);
  //EJECUTAR QUERY
  const responseBD = query.all();
  res.json({ movies: responseBD });
});

server.get("/users", (req, res) => {
  // filter
  let filteredByGenderMovies = [];
  if (req.query.gender === "") {
    filteredByGenderMovies = movies;
  } else {
    filteredByGenderMovies = movies.filter(
      (movie) => movie.gender === req.query.gender
    );
  }
  // sort
  const sort = req.query.sort === "asc" ? "desc" : "asc";
  const sortedMovies = filteredByGenderMovies.sort((movieA, movieB) => {
    if (sort === "desc") {
      if (movieA.title < movieB.title) {
        return -1;
      } else if (movieA.title > movieB.title) {
        return 1;
      } else {
        return 0;
      }
    } else {
      if (movieA.title < movieB.title) {
        return 1;
      } else if (movieA.title > movieB.title) {
        return -1;
      } else {
        return 0;
      }
    }
  });

  res.json({
    success: true,
    movies: sortedMovies,
  });
});
