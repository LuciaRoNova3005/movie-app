const express = require("express");
const cors = require("cors");
const movies = require("./data/movies.json");

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// set template engine middlewares
app.set("view engine", "ejs");

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
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
    if (sort === "asc") {
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
