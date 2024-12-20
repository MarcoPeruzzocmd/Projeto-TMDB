import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/plugins/axios';

export const usetvStore = defineStore('tv', () => {
  const state = reactive({
    currenttv: {}, // Corrigido nome para ser consistente
  });

  const currenttv = computed(() => state.currenttv);

  const gettvDetail = async (tvId) => {
    try {
      const response = await api.get(`tv/${tvId}`);
      state.currenttv = response.data;
    } catch (error) {
      console.error('Erro ao carregar detalhes do programa de TV:', error);
    }
  };

  return { currenttv, gettvDetail };
});
