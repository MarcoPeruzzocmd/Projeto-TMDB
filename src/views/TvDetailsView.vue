<script setup>
import { defineProps, onMounted } from 'vue';
import { usetvStore } from '@/stores/tv'; // Certifique-se de usar a store correta
const tvStore = usetvStore(); // Corrigido o nome da variável

const props = defineProps({
    tvId: {
        type: Number,
        required: true,
    },
});

onMounted(async () => {
    await tvStore.gettvDetail(props.tvId);
});
const watchtv = (tv) => {
  alert(`Assistindo o filme`);
}
</script>

<template>

    <div class="main">
        <div class="content">
            <div class="imagem">
                <img class="imagemFilme" :src="`https://image.tmdb.org/t/p/w500${tvStore.currenttv.poster_path}`"
                    :alt="tvStore.currenttv.name" />
            </div>
            <div class="details">
                <h1 class="titulo">Programa de TV: {{ tvStore.currenttv.name }}</h1>
                <div class="resto">
                    <p>{{ tvStore.currenttv.tagline }}</p>
                    <p>{{ tvStore.currenttv.overview }}</p>
                    <p>Orçamento: ${{ tvStore.currenttv.budget }}</p>
                </div>
                <div class="avaAss">
                    <p>Avaliação: {{ tvStore.currenttv.vote_average }}</p>
                    <button @click="watchtv">Assistir</button>
                </div>
                <div class="companies">
                    <template v-for="company in tvStore.currenttv.production_companies" :key="company.id">
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