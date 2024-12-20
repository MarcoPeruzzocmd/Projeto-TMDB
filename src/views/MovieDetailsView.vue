<script setup>
import { defineProps, onMounted } from 'vue';
import { useMovieStore } from '@/stores/movie';
const movieStore = useMovieStore();
import { useRoute } from 'vue-router'
const route = useRoute()

onMounted(async () => {
  const id = route.params.movieId
  await movieStore.getMovieDetail(id);
});

const watchtv = (tv) => {
  alert(`Assistindo o filme`);
}

</script>

<template>
  <div class="main">
    <div class="content">
      <div class="imagem">
        <img class="imagemFilme" :src="`https://image.tmdb.org/t/p/w500${movieStore.currentMovie?.poster_path}`"
          :alt="movieStore.currentMovie?.title" />
      </div>
      <div class="details">
        <h1 class="titulo">Filme: {{ movieStore.currentMovie?.title }}</h1>
        <div class="resto">
          <p>{{ movieStore.currentMovie?.tagline }}</p>
          <h2>Descrição:</h2>
          <p>{{ movieStore.currentMovie?.overview }}</p>
          <p>Orçamento: R${{ movieStore.currentMovie?.budget }}</p>
        </div>
        <div class="avaAss">
          <p>Avaliação: {{ movieStore.currentMovie?.vote_average }}</p>
          <button @click="watchtv">Assistir</button>
        </div>
        <div class="companies">
          <template v-for="company in movieStore.currentMovie?.production_companies" :key="company.id">
            <img v-if="company.logo_path" :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`"
              :alt="company.name" />
            <p v-else>{{ company.name }}</p>
          </template>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.companies {
  display: flex;
  justify-content: space-evenly;
}

.avaAss {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8%;
}

.content {
  display: flex;
  gap: 10px;
  margin: 5%;
}

.details,
p {
  color: white;
  font-weight: 900;
}

button {
  cursor: pointer;
  width: 200px;
  color: white;
  background-color: transparent;
  border-radius: 5px;
  border: 1px solid;
  height: 40px;
  font-size: 15px;
  font-weight: bold;
}

button:hover {
  background-color: white;
  color: black;
}

.imagemFilme {
  border: 2px Solid black;
  border-radius: 10px;
}

.resto {
  margin: 20% 0 15%;
}
</style>