<template>
  <section class="biblioteca-view">
    <h2 class="titulo-seccion">MIS PELÍCULAS</h2>

    <div v-if="peliculas.length === 0" class="mensaje-vacio">
      <p>Todavía no agregaste ninguna película a tu biblioteca.</p>

      <RouterLink to="/agregar" class="boton-principal"> Agregar primera película </RouterLink>
    </div>

    <div v-else class="columnas-peliculas">
      <div
        class="columna-estado"
        v-for="columna in columnas"
        :key="columna.estado"
        @dragover.prevent
        @drop="cambiarEstadoPorDrop(columna.estado)"
      >
        <h3>{{ columna.titulo }}</h3>

        <PeliculaCard
          v-for="pelicula in peliculasPorEstado(columna.estado)"
          :key="pelicula.id"
          :pelicula="pelicula"
          @empezar-drag="empezarDrag"
          @eliminar-pelicula="eliminarPelicula"
          @guardar-edicion="actualizarPelicula"
        />
      </div>
    </div>
  </section>
</template>

<script>
import PeliculaCard from '../components/PeliculaCard.vue'

import inceptionPoster from '../assets/img/inception_poster.webp'
import titanicPoster from '../assets/img/titanic_poster.jpg'
import cocoPoster from '../assets/img/coco_poster.jpg'
import interstellarPoster from '../assets/img/interstellar_poster.jpg'
import midsommarPoster from '../assets/img/midsommar_poster.jpg'
import laLaLandPoster from '../assets/img/la_la_land_poster.jpg'
import spidermanPoster from '../assets/img/spiderman_poster.jpg'
import se7enPoster from '../assets/img/se7en_poster.jpg'
import avengersPoster from '../assets/img/avengers_poster.webp'
import superbadPoster from '../assets/img/superbad_poster.jpg'
import aftersunPoster from '../assets/img/aftersun_poster.jpg'
import hamiltonPoster from '../assets/img/hamilton_poster.jpg'

export default {
  name: 'BibliotecaView',

  components: {
    PeliculaCard,
  },

  data() {
    return {
      peliculas: [],
      peliculaArrastrada: null,

      columnas: [
        { titulo: 'Viendo ahora', estado: 'viendo' },
        { titulo: 'Visto', estado: 'visto' },
        { titulo: 'Quiero ver', estado: 'quiero' },
      ],
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
      } else {
        this.peliculas = [
          {
            id: 1,
            titulo: 'Inception',
            director: 'Christopher Nolan',
            generos: ['Acción', 'Ciencia ficción'],
            productora: 'Warner Bros',
            estado: 'viendo',
            fecha: '',
            puntuacion: null,
            comentario: 'Muy interesante.',
            imagen: inceptionPoster,
          },
          {
            id: 2,
            titulo: 'Titanic',
            director: 'James Cameron',
            generos: ['Drama', 'Romance'],
            productora: '20th Century',
            estado: 'visto',
            fecha: '2024-03-15',
            puntuacion: 4,
            comentario: 'Un clásico.',
            imagen: titanicPoster,
          },
          {
            id: 3,
            titulo: 'Coco',
            director: 'Lee Unkrich',
            generos: ['Animación', 'Musical'],
            productora: 'Pixar Animation',
            estado: 'quiero',
            fecha: '',
            puntuacion: null,
            comentario: 'Quiero verla después.',
            imagen: cocoPoster,
          },
          {
            id: 4,
            titulo: 'Interstellar',
            director: 'Christopher Nolan',
            generos: ['Ciencia ficción', 'Drama', 'Aventura'],
            productora: 'Warner Bros',
            estado: 'quiero',
            fecha: '',
            puntuacion: null,
            comentario: '',
            imagen: interstellarPoster,
          },
          {
            id: 5,
            titulo: 'Midsommar',
            director: 'Ari Aster',
            generos: ['Terror', 'Suspenso'],
            productora: 'A24',
            estado: 'quiero',
            fecha: '',
            puntuacion: null,
            comentario: '',
            imagen: midsommarPoster,
          },
          {
            id: 6,
            titulo: 'La La Land',
            director: 'Damien Chazelle',
            generos: ['Musical', 'Romance', 'Drama'],
            productora: 'Otro',
            estado: 'quiero',
            fecha: '',
            puntuacion: null,
            comentario: '',
            imagen: laLaLandPoster,
          },
          {
            id: 7,
            titulo: 'Spider-Man: Into the Spider-Verse',
            director: 'Bob Persichetti',
            generos: ['Animación', 'Acción', 'Aventura'],
            productora: 'Columbia Pictures',
            estado: 'quiero',
            fecha: '',
            puntuacion: null,
            comentario: '',
            imagen: spidermanPoster,
          },
          {
            id: 8,
            titulo: 'Se7en',
            director: 'David Fincher',
            generos: ['Suspenso', 'Drama'],
            productora: 'Otro',
            estado: 'quiero',
            fecha: '',
            puntuacion: null,
            comentario: '',
            imagen: se7enPoster,
          },
          {
            id: 9,
            titulo: 'Avengers: Infinity War',
            director: 'Anthony y Joe Russo',
            generos: ['Acción', 'Aventura', 'Ciencia ficción'],
            productora: 'Marvel',
            estado: 'quiero',
            fecha: '',
            puntuacion: null,
            comentario: '',
            imagen: avengersPoster,
          },
          {
            id: 10,
            titulo: 'Superbad',
            director: 'Greg Mottola',
            generos: ['Comedia'],
            productora: 'Columbia Pictures',
            estado: 'quiero',
            fecha: '',
            puntuacion: null,
            comentario: '',
            imagen: superbadPoster,
          },
          {
            id: 11,
            titulo: 'Aftersun',
            director: 'Charlotte Wells',
            generos: ['Familiar', 'Drama', 'Otro'],
            productora: 'A24',
            estado: 'quiero',
            fecha: '',
            puntuacion: null,
            comentario: '',
            imagen: aftersunPoster,
          },
          {
            id: 12,
            titulo: 'Hamilton',
            director: 'Thomas Kail',
            generos: ['Musical', 'Drama', 'Familiar'],
            productora: 'Disney',
            estado: 'quiero',
            fecha: '',
            puntuacion: null,
            comentario: '',
            imagen: hamiltonPoster,
          },
        ]

        this.guardarEnLocalStorage()
      }
    },

    actualizarPelicula(datos) {
      const index = this.peliculas.indexOf(datos.original)

      if (index !== -1) {
        this.peliculas[index] = datos.nuevo
        this.guardarEnLocalStorage()
      }
    },

    guardarEnLocalStorage() {
      localStorage.setItem('filmory_peliculas', JSON.stringify(this.peliculas))
    },

    peliculasPorEstado(estado) {
      return this.peliculas.filter((pelicula) => pelicula.estado === estado)
    },

    empezarDrag(pelicula) {
      this.peliculaArrastrada = pelicula
    },

    cambiarEstadoPorDrop(nuevoEstado) {
      if (!this.peliculaArrastrada) {
        return
      }

      this.aplicarEstado(this.peliculaArrastrada, nuevoEstado)
      this.peliculaArrastrada = null
      this.guardarEnLocalStorage()
    },

    aplicarEstado(pelicula, nuevoEstado) {
      pelicula.estado = nuevoEstado

      if (nuevoEstado === 'visto') {
        pelicula.fecha = new Date().toISOString().split('T')[0]
      } else {
        pelicula.fecha = ''
        pelicula.puntuacion = null
      }
    },

    eliminarPelicula(id) {
      const confirmar = confirm('¿Querés eliminar esta película de tu biblioteca?')

      if (confirmar) {
        this.peliculas = this.peliculas.filter((pelicula) => pelicula.id !== id)
        this.guardarEnLocalStorage()
      }
    },
  },
}
</script>
