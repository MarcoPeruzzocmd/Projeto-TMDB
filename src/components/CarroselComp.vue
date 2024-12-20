<script setup>
import { computed, onMounted, ref } from 'vue'
import { useMovieStore } from '@/stores/filme';
import MovieDetailsView from '@/views/MovieDetailsView.vue';

const movieStore = useMovieStore()
const currentIndex = ref(0)

const imagens = computed(() => {
  return movieStore.movies.map(movie => movie.backdrop_path)
})

const imagemProxima = () => {
  currentIndex.value = (currentIndex.value + 1) % imagens.value.length
}

const imagemAnterior = () => {
  currentIndex.value = (currentIndex.value - 1 + imagens.value.length) % imagens.value.length
}

onMounted(async () => {
  await movieStore.getMoreMovies()
})
</script>

<template>
  <div class="carousel">
    <div
      class="back-img"
      :style="{ backgroundImage: 'url(https://image.tmdb.org/t/p/w1280' + imagens[currentIndex] + ')' }"
    ></div>

    <div class="sobrepor">
      <div class="content">
        <h1>{{ movieStore.movies[currentIndex]?.title }}</h1>
        <div class="buttons">
          <button class="black-button">Assistir</button>
        </div>
      </div>
    </div>

    <button @click="imagemAnterior" class="botao-anterior">←</button>
    <button @click="imagemProxima" class="botao-proxima">→</button>

  </div>
</template>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.carousel {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.back-img {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 0.5s ease-in-out;
  filter: blur(2.5px);
}

.sobrepor {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  color: white;
  text-align: center;
}

h1 {
  font-size: 3rem;
  font-weight: 1000;
  border: 2px black;
}


.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
}

.black-button {
  background-color: white;
  color: black;
  border: none;
}

.botao-anterior,
.botao-proxima {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2rem;
  border: none;
  padding: 15px;
  cursor: pointer;
  border-radius: 50%;
}

.botao-anterior {
  left: 20px;
}

.botao-proxima {
  right: 20px;
}
</style>
