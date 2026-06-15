<template>
  <section class="agregar-view">
    <div class="agregar-left">
      <img :src="imagenAgregar" alt="Elementos relacionados con el cine" />
    </div>

    <div class="agregar-right">
      <div class="agregar-contenido animate__animated animate__fadeIn">
        <h2>FILMORY</h2>
        <p class="subtitulo-form">Llevá un registro de tus películas:</p>

        <PeliculaForm @guardar-pelicula="guardarPelicula" />
      </div>
    </div>
  </section>
</template>

<script>
import PeliculaForm from '../components/PeliculaForm.vue'
import imagenAgregar from '../assets/img/hero_cinema.jpg'

export default {
  name: 'AgregarView',

  components: {
    PeliculaForm,
  },

  data() {
    return {
      peliculas: [],
      imagenAgregar,
    }
  },

  mounted() {
    this.cargarPeliculas()
  },

  methods: {
    cargarPeliculas() {
      const datosGuardados = localStorage.getItem('filmory_peliculas')

      if (datosGuardados) {
        this.peliculas = JSON.parse(datosGuardados)
      }
    },

    guardarPelicula(nuevaPelicula) {
      this.peliculas.push(nuevaPelicula)
      localStorage.setItem('filmory_peliculas', JSON.stringify(this.peliculas))
    },
  },
}
</script>
