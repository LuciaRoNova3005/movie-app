// login

const getMoviesFromApi = (params) => {
  console.log(params);
  const queryParams = `?gender=${params.gender}&sort=${params.sort}`;
  console.log(queryParams);
  console.log("Se están pidiendo las películas de la app");

  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch("//localhost:4000/users/" + queryParams, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};
const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;
