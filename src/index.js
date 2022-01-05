const express = require("express");
const cors = require("cors");
const movies = require("./data/movies.json");

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});
server.get("/users", (req, res) => {
  const filterByGender = req.query.gender;
  const filteredmovies = movies.filter((movie) => {
    return filterByGender === ""
      ? movie
      : movie.gender.includes(filterByGender);
  });
  const response = {
    success: true,
    movies: filteredmovies,
  };
  res.json(response);
});
