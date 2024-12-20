<script setup></script>

<template>
  <body>
    
    <header>
      <nav>
        <img src="/public/Group 26.png" alt="">
        <router-link to="/">Home</router-link>
        <router-link to="/filmes">Filmes</router-link>
        <router-link to="/tv">Programas de TV</router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </body>
</template>

<style scoped>
*{
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

body{
  background-color: #1B1B1B;
}
 header {
  height: 5rem;
  display: flex;
  background-color: #1E1E1E;
  color: #fff;
  font-size: 1.2rem;
  padding-left: 2rem;
}
img{
  width: 150px;
  height: 30px;
}
nav {
  column-gap: 2rem;
  margin-bottom: 0;
  display: flex;
  align-items: center;
}

nav a {
  text-decoration: none;
  color: #fff;
}
</style>