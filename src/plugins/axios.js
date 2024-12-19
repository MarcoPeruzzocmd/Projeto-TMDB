import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODBlNmVmZDFmNjM2YjQ1N2Q5ZWZmOTFjMWQyYmY2NCIsIm5iZiI6MTczNDM2Njg2MS41NjQsInN1YiI6IjY3NjA1NjhkYWNhMzU0OWU1NGY2NzdkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DxdjnF-rXRQBFWfpt6p35Oi-jmZwn5H4iUpa46q5BDQ`,
  },
});

export default api;