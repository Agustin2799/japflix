document.addEventListener("DOMContentLoaded", () => {
    const apiPelis = "https://japceibal.github.io/japflix_api/movies-data.json";
    const btnBuscar = document.getElementById("btnBuscar");
    const contPelis = document.getElementById("lista");
    const inputPelis = document.getElementById("inputBuscar");
    let copiaApiPelis;

    fetch(apiPelis)
        .then(response => response.json())
        .then(data => {
            copiaApiPelis = data;
        })
        .catch(error => {
            console.error('Error:', error);
        })

    btnBuscar.addEventListener("click", () => {
        const palabra = inputPelis.value.toLowerCase();
        const matchNames = copiaApiPelis.filter((pelicula) =>
            pelicula.title.toLowerCase().includes(palabra) ||
            pelicula.tagline.toLowerCase().includes(palabra) ||
            pelicula.genres.some(genre => genre.name.toLowerCase().includes(palabra))
        );

        if (matchNames.length > 0) {
            contPelis.innerHTML = ''; // Limpia los resultados anteriores.
            matchNames.forEach(pelicula => {
                let newLi = document.createElement("li");
                newLi.innerHTML = `<span><h3>${pelicula.title}</h3><h6>${pelicula.tagline}</h6></span> <span class="derecha">${mostrarEstrellas(parseInt(pelicula.vote_average))}</span>`;
                contPelis.appendChild(newLi);

                newLi.addEventListener("click", () => {
                    const offcanvas = document.getElementById("offcanvasRight");
                    const offcanvasInstance = new bootstrap.Offcanvas(offcanvas);

                    const genresContainer = document.createElement("div"); // Crea un contenedor para los géneros.

                    pelicula.genres.forEach((genre, index) => {
                        const genreP = document.createElement("p"); // Crea un elemento p para el nombre del género.
                        genreP.textContent = (index > 0 ? " - " : "") + genre.name; // Asigna el nombre del género al contenido del p.
                        genresContainer.appendChild(genreP); // Agrega el p al contenedor.
                    });
                    const partes = pelicula.release_date.split("-");
                    const anio = partes[0];

                    offcanvas.innerHTML = ` <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="titloPeli">${pelicula.title}</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <p>${pelicula.overview}</p>
      <p>${genresContainer.textContent}</p>
      </div>
      <div class="dropdown">
  <button id="drop" class="btn btn-secondary dropdown-toggle float-end" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button>
  <ul class="dropdown-menu">
  <li class="dropdown-item">Year:${anio}</li>
  <li class="dropdown-item">Runtime:${pelicula.runtime}</li>
<li class="dropdown-item">Budget:$${pelicula.budget}</li>
    <li class="dropdown-item">Revenue:$${pelicula.revenue}</li>

  </ul>
</div>
    `
                    offcanvasInstance.show();
                });
            });

        } else {
            contPelis.innerHTML = '<p>No se encontraron películas.</p>'; // Manejar caso sin resultados.
        }
    });
});
function mostrarEstrellas(numEstrellas) {
    numRedondo = Math.round(numEstrellas / 2);
    switch (numRedondo) {
        case 1:
            return "⭐"
            break
        case 2:
            return "⭐⭐"
            break
        case 3:
            return "⭐⭐⭐"
            break
        case 4:
            return "⭐⭐⭐⭐"
            break
        case 5:
            return "⭐⭐⭐⭐⭐"
            break
        default:
            return ""
    }
}
