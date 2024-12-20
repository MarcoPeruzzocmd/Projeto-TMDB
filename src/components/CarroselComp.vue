<template>
  <div v-if="movieStore.loading">Carregando filmes...</div>
  <div class="carrossel" v-else>
    <div
      class="fundo-imagem"
      :style="{ backgroundImage: 'url(https://image.tmdb.org/t/p/w1280' + imagens[currentIndex] + ')' }"
    ></div>

    <div class="sobrepor">
      <div class="conteudo">
        <h1>{{ movieStore.movies[currentIndex]?.title }}</h1>
        <p class="ano">
          {{ movieStore.movies[currentIndex]?.release_date?.slice(0, 4) }}
        </p>
        <div class="botoes">
          <button @click="assistirFilme" class="botao-vermelho">Assistir</button>
          <button @click="alternarFavorito(movieStore.movies[currentIndex])" :class="{'favorito': eFavorito(movieStore.movies[currentIndex])}" class="botao-transparente">
            {{ eFavorito(movieStore.movies[currentIndex]) ? 'Remover dos favoritos' : 'Adicionar à Lista' }}
          </button>
        </div>
      </div>
    </div>

    <button @click="imagemAnterior" class="botao-anterior">←</button>
    <button @click="imagemProxima" class="botao-proxima">→</button>

    <div class="pontos">
      <span
        v-for="(imagem, index) in imagens"
        :key="index"
        :class="['ponto', { ativo: index === currentIndex }]"
        @click="irParaImagem(index)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useMovieStore } from '@/stores/movies'

const movieStore = useMovieStore()
const currentIndex = ref(0)

// Computed property para pegar os caminhos das imagens
const imagens = computed(() => {
  return movieStore.movies.map(movie => movie.backdrop_path)
})

// Métodos para controlar o carrossel
const imagemProxima = () => {
  currentIndex.value = (currentIndex.value + 1) % imagens.value.length
}

const imagemAnterior = () => {
  currentIndex.value = (currentIndex.value - 1 + imagens.value.length) % imagens.value.length
}

const irParaImagem = (index) => {
  currentIndex.value = index
}

const assistirFilme = () => {
  console.log("Assistir filme:", movieStore.movies[currentIndex.value].title)
}

const alternarFavorito = (movie) => {
  if (eFavorito(movie)) {
    movieStore.unfavoriteMovie(movie)
  } else {
    movieStore.favoriteMovie(movie)
  }
}

const eFavorito = (movie) => {
  return movieStore.isFavorite(movie)
}

// Quando o componente for montado, carregar filmes
onMounted(async () => {
  console.log("Iniciando o carregamento dos filmes...")
  await movieStore.getMoreMovies()
  console.log("Filmes carregados:", movieStore.movies)
  console.log("Estado de carregamento (loading):", movieStore.loading)
})
</script>

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

.carrossel {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.fundo-imagem {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 0.5s ease-in-out;
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

.conteudo {
  color: white;
  text-align: center;
}

h1 {
  font-size: 2rem;
  margin: 0;
}

.ano {
  font-size: 1rem;
  margin: 10px 0;
}

.botoes {
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

.botao-vermelho {
  background-color: #f44336;  /* Cor vermelha */
  color: white;
  border: none;
  transition: 0.3s ease-in-out;
}

.botao-vermelho:hover {
  background-color: #d32f2f;  /* Cor vermelha mais escura */
}

.botao-transparente {
  background-color: #070707;
  color: #c1c1c1;
  border: none;
  border: 1px solid #c1c1c1;
  transition: 0.3s ease-in-out;
}

.botao-transparente:hover {
  background-color: #c1c1c1;
  color: black;
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

.pontos {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
}

.ponto {
  width: 12px;
  height: 12px;
  margin: 0 5px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  cursor: pointer;
}

.ponto.ativo {
  background-color: #fff;
}
</style>
