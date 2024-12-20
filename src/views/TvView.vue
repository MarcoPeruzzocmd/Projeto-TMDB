<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import { useGenreStore } from '@/stores/genre'
import { useRouter } from 'vue-router'
const router = useRouter()

const genreStore = useGenreStore()
const tvs = ref([])
const isLoading = ref(false)

const listTvs = async (genreId) => {
  const response = await api.get('discover/tv', {
    params: {
      with_genres: genreId,
      language: 'pt-BR',
    },
  })
  tvs.value = response.data.results
}

onMounted(async () => {
  isLoading.value = true
  await genreStore.getAllGenres('tv')
  isLoading.value = false
})
function openTv(tvId) {
  router.push({ name: 'TvDetails', params: { tvId } });
}
const watchtv = (tv) => {
  alert(`Assistindo ${tv.name}`);
}
</script>

<template>
  <h1>Programas de TV</h1>
  <ul class="genre-list">
    <li
      v-for="genre in genreStore.genres"
      :key="genre.id"
      class="genre-item"
      @click="listTvs(genre.id)"
    >
      {{ genre.name }}
    </li>
  </ul>

  <div class="tv-list">
    <div v-for="tv in tvs" :key="tv.id" class="tv-card">
      <img :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`" :alt="tv.name"/>
      <div class="tv-details">
        <p class="tv-title"> {{ tv.name }}</p>
        <p class="tv-release-date">( {{ tv.first_air_date }} )</p>
      </div>
      <div class="button-assistir">
        <button class="assistir-button" @click="watchtv">ASSISTIR</button>
        <button class="detalhes-button"  @click="openTv(tv.id)">DETALHES</button>
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
  margin-bottom: 2rem;
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

.tv-list {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: center;
}

.tv-card {
  width: 15rem;
  height: 31rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
  background-color: #d2d1d1;
}

.tv-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
}

.tv-details {
  padding: 0 0.5rem;

}

.tv-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
  text-align: center;
  margin-top: 10px;
}
.tv-release-date{
  text-align: center;
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