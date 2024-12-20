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
      <img :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`" :alt="tv.name" @click="openTv(tv.id)" />
      <div class="tv-details">
        <p class="tv-title"> {{ tv.name }}</p>
        <p class="tv-release-date">( {{ tv.first_air_date }} )</p>
      </div>
      <div class="button-assistir">
        <button @click="watchtv">Assistir</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1{
  text-align: center;
  margin: 50px;
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
  background-color: #5d6424;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  align-self: center;
  color: #fff;
  display: flex;
  justify-content: center;
  border: none;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #7d8a2e;
  box-shadow: 0 0 0.5rem #5d6424;
}

.tv-list {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: center;
}

.tv-card {
  width: 15rem;
  height: 30rem;
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
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.button-assistir > button{
  width: 200px;
  height: 30px;
  background-color: #837b7b25;
  border: none;
  cursor: pointer;
  border-radius: 7px;
  font-size: 15px;
  font-weight: bold;
}
.button-assistir > button:hover{
  background-color: #22212125;
}
</style>