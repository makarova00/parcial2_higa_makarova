<template>
  <section class="formulario-pelicula animate__animated animate__fadeIn">
    <div v-if="errores.length > 0" class="mensaje-error">
      <p><strong>¡Ups! Te faltan algunos datos:</strong></p>

      <ul>
        <li v-for="error in errores" :key="error">{{ error }}</li>
      </ul>
    </div>

    <div v-if="registroExitoso" class="mensaje-exito">
      <p>¡Tu película fue registrada con éxito!</p>
    </div>

    <form @submit.prevent="enviar" novalidate>
      <label> Título <span class="obligatorio">*</span> </label>

      <input v-model.trim="formData.titulo" type="text" placeholder="Título de la película" />

      <label>Director</label>

      <input v-model.trim="formData.director" type="text" placeholder="Nombre del director" />

      <label>Géneros</label>

      <div class="chips">
        <label class="chip" v-for="genero in generos" :key="genero.dato">
          <input v-model="formData.generos" type="checkbox" :value="genero.texto" />

          <span>{{ genero.texto }}</span>
        </label>
      </div>

      <label>Productora</label>

      <select v-model="formData.productora">
        <option disabled value="">Seleccionar</option>

        <option v-for="productora in productoras" :key="productora.dato" :value="productora.texto">
          {{ productora.texto }}
        </option>
      </select>

      <label> Estado <span class="obligatorio">*</span> </label>

      <select v-model="formData.estado">
        <option disabled value="">Seleccionar</option>

        <option v-for="estado in estados" :key="estado.dato" :value="estado.dato">
          {{ estado.texto }}
        </option>
      </select>

      <div v-if="formData.estado === 'visto'">
        <label>Fecha en que la viste</label>

        <input type="date" v-model="formData.fecha" />

        <label>Puntuación</label>

        <div class="rating">
          <span
            v-for="n in 5"
            :key="n"
            class="estrella"
            :class="n <= formData.puntuacion ? 'activa' : ''"
            @click="cambiarPuntuacion(n)"
          >
            ★
          </span>
        </div>
      </div>

      <label>Comentario</label>

      <textarea v-model.trim="formData.comentario"></textarea>

      <button type="submit">Enviar</button>
    </form>
  </section>
</template>

<script>
import defaultPoster from '../assets/img/card-poster.jpg'

export default {
  name: 'PeliculaForm',

  emits: ['guardar-pelicula'],

  data() {
    return {
      errores: [],
      registroExitoso: false,

      formData: {
        titulo: '',
        director: '',
        generos: [],
        productora: '',
        estado: '',
        fecha: '',
        puntuacion: null,
        comentario: '',
        imagen: '',
      },

      generos: [
        { texto: 'Acción', dato: 'accion' },
        { texto: 'Aventura', dato: 'aventura' },
        { texto: 'Comedia', dato: 'comedia' },
        { texto: 'Drama', dato: 'drama' },
        { texto: 'Terror', dato: 'terror' },
        { texto: 'Suspenso', dato: 'suspenso' },
        { texto: 'Romance', dato: 'romance' },
        { texto: 'Documental', dato: 'documental' },
        { texto: 'Musical', dato: 'musical' },
        { texto: 'Familiar', dato: 'familiar' },
        { texto: 'Ciencia ficción', dato: 'ciencia_ficcion' },
        { texto: 'Animación', dato: 'animacion' },
        { texto: 'Otro', dato: 'otro' },
      ],

      productoras: [
        { texto: 'Warner Bros', dato: 'warner' },
        { texto: 'Universal Pictures', dato: 'universal_pictures' },
        { texto: '20th Century', dato: '20th_century' },
        { texto: 'Columbia Pictures', dato: 'columbia_pictures' },
        { texto: 'Disney', dato: 'disney' },
        { texto: 'Pixar Animation', dato: 'pixar' },
        { texto: 'Marvel', dato: 'marvel' },
        { texto: 'Netflix', dato: 'netflix' },
        { texto: 'A24', dato: 'a24' },
        { texto: 'Otro', dato: 'otro' },
      ],

      estados: [
        { texto: 'Visto', dato: 'visto' },
        { texto: 'Viendo ahora', dato: 'viendo' },
        { texto: 'Quiero ver', dato: 'quiero' },
      ],
    }
  },

  methods: {
    cambiarPuntuacion(numero) {
      this.formData.puntuacion = this.formData.puntuacion === numero ? null : numero
    },

    validarFormulario() {
      this.errores = []

      if (!this.formData.titulo) {
        this.errores.push('El título de la película es obligatorio.')
      }

      if (!this.formData.estado) {
        this.errores.push('Seleccioná en qué estado se encuentra la película.')
      }

      return this.errores.length === 0
    },

    enviar() {
      this.registroExitoso = false

      if (!this.validarFormulario()) {
        return
      }

      const nuevaPelicula = {
        id: Date.now(),
        titulo: this.formData.titulo,
        director: this.formData.director,
        generos: [...this.formData.generos],
        productora: this.formData.productora,
        estado: this.formData.estado,
        fecha: this.formData.estado === 'visto' ? this.formData.fecha : '',
        puntuacion: this.formData.estado === 'visto' ? this.formData.puntuacion : null,
        comentario: this.formData.comentario,
        imagen: this.formData.imagen || defaultPoster,
      }

      this.$emit('guardar-pelicula', nuevaPelicula)

      this.formData = {
        titulo: '',
        director: '',
        generos: [],
        productora: '',
        estado: '',
        fecha: '',
        puntuacion: null,
        comentario: '',
        imagen: '',
      }

      this.registroExitoso = true

      setTimeout(() => {
        this.registroExitoso = false
      }, 3000)
    },
  },
}
</script>
