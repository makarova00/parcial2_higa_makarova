<template>
  <article
    class="pelicula-card"
    :class="pelicula.puntuacion === 5 ? 'pelicula-favorita' : ''"
    draggable="true"
    @dragstart="empezarDrag"
  >
    <div v-if="editando" class="modo-edicion">
      <div class="poster-editar">
        <img :src="datosEdicion.imagen || imagenDefault" alt="Póster de la película" />

        <label class="btn-cambiar-poster">
          ✎
          <input type="file" accept="image/*" @change="cargarPosterEdicion" />
        </label>
      </div>

      <input
        type="text"
        v-model.trim="datosEdicion.titulo"
        class="input-inline"
        placeholder="Título"
      />

      <input
        type="text"
        v-model.trim="datosEdicion.director"
        class="input-inline"
        placeholder="Director"
      />

      <div class="chips chips-edicion">
        <label class="chip" v-for="genero in generos" :key="genero">
          <input type="checkbox" v-model="datosEdicion.generos" :value="genero" />
          <span>{{ genero }}</span>
        </label>
      </div>

      <select v-model="datosEdicion.productora" class="input-inline">
        <option disabled value="">Productora</option>
        <option v-for="productora in productoras" :key="productora" :value="productora">
          {{ productora }}
        </option>
      </select>

      <textarea
        v-model.trim="datosEdicion.comentario"
        class="input-inline"
        placeholder="Comentario"
      ></textarea>

      <div class="botones-edicion">
        <button type="button" class="btn-guardar-inline" @click="guardarEdicion">Guardar</button>

        <button type="button" class="btn-cancelar-inline" @click="cancelarEdicion">Cancelar</button>
      </div>
    </div>

    <div v-else>
      <button type="button" class="btn-eliminar" @click="eliminarPelicula">×</button>

      <button type="button" class="btn-editar" @click="iniciarEdicion">✎</button>

      <img
        :src="pelicula.imagen || imagenDefault"
        :alt="'Póster de ' + pelicula.titulo"
        class="poster"
      />

      <div class="pelicula-info">
        <h3>{{ textoMayusculas(pelicula.titulo) }}</h3>

        <p v-if="pelicula.director"><strong>Director:</strong> {{ pelicula.director }}</p>

        <p>
          <strong>Géneros:</strong>
          {{ pelicula.generos && pelicula.generos.length ? pelicula.generos.join(', ') : '-' }}
        </p>

        <p><strong>Productora:</strong> {{ pelicula.productora || '-' }}</p>

        <p v-if="pelicula.estado === 'visto' && pelicula.fecha" class="fecha-card-wrap">
          <strong>Vista el:</strong> {{ formatearFecha(pelicula.fecha) }}
        </p>

        <div v-if="pelicula.estado === 'visto'" class="rating">
          <span
            v-for="n in 5"
            :key="n"
            class="estrella"
            :class="n <= pelicula.puntuacion ? 'activa' : ''"
            @click="actualizarPuntuacion(n)"
          >
            ★
          </span>
        </div>

        <p v-if="pelicula.comentario"><strong>Comentario:</strong> {{ pelicula.comentario }}</p>
      </div>
    </div>
  </article>
</template>

<script>
import imagenDefault from '../assets/img/card-poster.jpg'

export default {
  name: 'PeliculaCard',

  props: {
    pelicula: {
      type: Object,
      required: true,
    },
  },

  emits: ['empezar-drag', 'eliminar-pelicula', 'guardar-edicion'],

  data() {
    return {
      editando: false,
      datosEdicion: {},
      imagenDefault,

      productoras: [
        'Warner Bros',
        'Universal Pictures',
        '20th Century',
        'Columbia Pictures',
        'Disney',
        'Pixar Animation',
        'Marvel',
        'Netflix',
        'A24',
        'Otro',
      ],

      generos: [
        'Acción',
        'Aventura',
        'Comedia',
        'Drama',
        'Terror',
        'Suspenso',
        'Romance',
        'Documental',
        'Musical',
        'Familiar',
        'Otro',
        'Ciencia ficción',
        'Animación',
      ],
    }
  },

  methods: {
    empezarDrag() {
      if (!this.editando) {
        this.$emit('empezar-drag', this.pelicula)
      }
    },

    eliminarPelicula() {
      this.$emit('eliminar-pelicula', this.pelicula.id)
    },

    iniciarEdicion() {
      this.editando = true

      this.datosEdicion = {
        ...this.pelicula,
        generos: this.pelicula.generos ? [...this.pelicula.generos] : [],
      }
    },

    guardarEdicion() {
      this.$emit('guardar-edicion', {
        original: this.pelicula,
        nuevo: { ...this.datosEdicion },
      })

      this.editando = false
      this.datosEdicion = {}
    },

    cancelarEdicion() {
      this.editando = false
      this.datosEdicion = {}
    },

    cargarPosterEdicion(event) {
      const archivo = event.target.files[0]

      if (!archivo) {
        return
      }

      const lector = new FileReader()

      lector.onload = () => {
        this.datosEdicion.imagen = lector.result
      }

      lector.readAsDataURL(archivo)
    },

    actualizarPuntuacion(numero) {
      const nuevaPelicula = {
        ...this.pelicula,
        puntuacion: this.pelicula.puntuacion === numero ? null : numero,
      }

      this.$emit('guardar-edicion', {
        original: this.pelicula,
        nuevo: nuevaPelicula,
      })
    },

    formatearFecha(fecha) {
      if (!fecha) {
        return ''
      }

      return fecha.split('-').reverse().join('/')
    },

    textoMayusculas(texto) {
      if (!texto) {
        return ''
      }

      return texto.toUpperCase()
    },
  },
}
</script>
