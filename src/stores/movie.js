import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useMovieStore = defineStore('movie', () => {
  const state = reactive({
    movies: [],  
    favorites: [],  
    loading: false,  
    error: null,  
    currentMovie: {},
  })

  const movies = computed(() => state.movies)
  const currentMovie = computed(() => state.currentMovie);


  const listMovies = async (genreId) => {
    state.loading = true
    state.error = null
    state.movies = []  

    try {
      const response = await api.get('discover/movie', {
        params: {
          with_genres: genreId,
          language: 'pt-BR',
          page: 1,
        },
      })
      state.movies = response.data.results
    } catch (err) {
      state.error = 'Erro ao carregar filmes'
    } finally {
      state.loading = false
    }
  }
  const getMovieDetail = async (movieId) => {
    const response = await api.get(`movie/${movieId}`);
    state.currentMovie = response.data;
  };
  const getMoreMovies = async () => {
    state.loading = true
    state.error = null

    try {
      const genres = [
        { id: 35, name: 'comedia' },
        { id: 12, name: 'aventura' },
        { id: 28, name: 'acção' },
        { id: 99, name: 'documento' },
      ]
      let allMovies = []
      
      for (let i = 1; i <= genres.length; i++) {
        const response = await api.get('discover/movie', {
          params: {
            with_genres: genres[i - 1].id,
            language: 'pt-BR',
            page: i,
          },
        })
        allMovies = [...allMovies, ...response.data.results]
      }

      state.movies = allMovies.slice(0, 50)  
    } catch (err) {
      state.error = 'Erro ao carregar filmes'
    } finally {
      state.loading = false
    }
  } 
  return { 
    movies, 
    listMovies, 
    getMoreMovies, 
    currentMovie, 
    getMovieDetail,
  }
})