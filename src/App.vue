<template>
  <div class="app">
    <header class="header">
      <RouterLink to="/" class="logo">Filmory</RouterLink>

      <nav>
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/agregar">Agregar película</RouterLink>
        <RouterLink to="/biblioteca">Mi biblioteca</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>

    <footer>
      <p>Filmory — Registro personal de películas</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>
