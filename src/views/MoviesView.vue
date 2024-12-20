<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';
import { useGenreStore } from '@/stores/genre';
import { useRouter } from 'vue-router'
const router = useRouter()
const genreStore = useGenreStore();

function getGenreName(id) {
  const genero = genres.value.find((genre) => genre.id === id);
  return genero.name;
}
const isLoading = ref(false);
const genres = ref([]);

onMounted(async () => {
  isLoading.value = true;
  await genreStore.getAllGenres('movie');
  isLoading.value = false;
});
const movies = ref([]);

const listMovies = async (genreId) => {
  genreStore.setCurrentGenreId(genreId);
  isLoading.value = true;
  const response = await api.get('discover/movie', {
    params: {
      with_genres: genreId,
      language: 'pt-BR',
    },
  });
  movies.value = response.data.results;
  isLoading.value = false;
};
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');
function openMovie(movieId) {
  router.push({ name: 'MovieDetails', params: { movieId } });
}
</script>
<template>
  <h1>Filmes</h1>
  <ul class="genre-list">
    <li v-for="genre in genreStore.genres" :key="genre.id" @click="listMovies(genre.id)" class="genre-item"
      :class="{ active: genre.id === genreStore.currentGenreId }">

      {{ genre.name }}

    </li>>
  </ul>
  <loading v-model:active="isLoading" is-full-page />

  <div class="movie-list">
    <div v-for="movie in movies" :key="movie.id" class="movie-card">

      <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title"/>
      <div class="movie-details">
        <p class="movie-title">{{ movie.title }}</p>
        <p class="movie-release-date">( {{ formatDate(movie.release_date) }} )</p>
        <p class="movie-genres"> </p>
      </div>
      <div class="button-assistir">
        <button class="assistir-button" @click="watchtv">ASSISTIR</button>
        <button class="detalhes-button"  @click="openMovie(movie.id)" >DETALHES</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
h1{
  text-align: center;
  margin: 50px;
  color: white;
}
.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  padding: 0;
}

.genre-item {
  background-color: transparent;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  align-self: center;
  color: #fff;
  display: flex;
  justify-content: center;
  border: 1px solid;
}

.genre-item:hover {
  cursor: pointer;
  background-color: white;
  color: black;
  transition: 500ms;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: center;
}

.movie-card {
  width: 15rem;
  height: 31rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
  background-color: #d2d1d1;
}

.movie-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
}

.movie-details {
  padding: 0 0.5rem;
}

.movie-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
  text-align: center;
  margin-top: 10px;
}
.movie-release-date{
  text-align: center;

}
.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  margin-bottom: 2rem;
}
.button-assistir{
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.assistir-button{
  width: 200px;
  height: 30px;
  background-color: rgb(230, 36, 36);
  border: none;
  cursor: pointer;
  border-radius: 7px;
  font-size: 15px;
  font-weight: bold;
  
}

.assistir-button:hover{  
  background-color: rgb(138, 39, 39);
}
.detalhes-button{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 30px;
  border-radius: 7px;
  border: none;
  background-color: orange;
  font-weight: bold;
  margin-top: 7px;
  font-size: 15px;
  cursor: pointer;
}
.detalhes-button:hover{
  background-color: rgb(188, 128, 16);
}
</style>