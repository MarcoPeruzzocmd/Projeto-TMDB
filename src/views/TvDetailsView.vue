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
</script>

<template>

    <div class="main">
        <div class="content">
            <img :src="`https://image.tmdb.org/t/p/w185${tvStore.currenttv.poster_path}`"
                :alt="tvStore.currenttv.name" />

            <div class="details">
                <h1>Programa de TV: {{ tvStore.currenttv.name }}</h1>
                <p>{{ tvStore.currenttv.tagline }}</p>
                <p>{{ tvStore.currenttv.overview }}</p>
                <p>Orçamento: ${{ tvStore.currenttv.budget }}</p>
                <p>Avaliação: {{ tvStore.currenttv.vote_average }}</p>
            </div>
        </div>
    </div>

    <p>Produtoras</p>
    <div class="companies">
        <template v-for="company in tvStore.currenttv.production_companies" :key="company.id">
            <img v-if="company.logo_path" :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`"
                :alt="company.name" />
            <p v-else>{{ company.name }}</p>
        </template>
    </div>

</template>

<style scoped>
.companies {
    display: flex;
    flex-direction: row;
    column-gap: 3rem;
    align-items: center;
    margin-bottom: 2rem;
}
</style>