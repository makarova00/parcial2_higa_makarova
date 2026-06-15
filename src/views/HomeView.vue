<template>
  <section class="home-view animate__animated animate__fadeIn">
    <div class="home-texto">
      <h2>Bienvenido a Filmory</h2>

      <p>
        Filmory es una aplicación para registrar películas vistas, películas que se están viendo y
        películas que el usuario quiere ver más adelante.
      </p>

      <p>
        La temática fue elegida porque muchas personas consumen películas en diferentes plataformas
        y necesitan organizar sus recomendaciones, opiniones y puntuaciones en un solo lugar.
      </p>

      <div class="home-botones">
        <RouterLink to="/agregar" class="boton-principal">Agregar película</RouterLink>
        <RouterLink to="/biblioteca" class="boton-secundario">Ver biblioteca</RouterLink>
      </div>
    </div>

    <div class="home-imagen">
      <img :src="heroCinema" alt="Elementos relacionados con el cine" />
    </div>
  </section>
</template>

<script>
import heroCinema from '../assets/img/hero_cinema.jpg'

export default {
  name: 'HomeView',

  data() {
    return {
      heroCinema,
    }
  },
}
</script>
