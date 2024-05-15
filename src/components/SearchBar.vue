<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search for Game Titles.."
      class="search-input"
      @input="debouncedSearch"
    />
    <button @click="searchAndRedirect" class="search-button">Search</button>
    <button v-if="searchQuery" @click="clearSearch" class="clear-button">Clear</button>
    <div v-if="error" class="error">Error: {{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios';
import { debounce } from 'lodash';

const BASE_URL = 'https://api.rawg.io/api';
const API_KEY = 'API_KEY_HERE';

export default {
  name: 'SearchBar',
  data() {
    return {
      searchQuery: '',
      loading: false,
      error: ''
    };
  },
  methods: {
    async searchAndRedirect() {
      const query = this.searchQuery.trim();
    
      if (!query) {
        this.$router.push({ name: 'Home' });
        return;
      }
      this.loading = true;
      try {
        const response = await axios.get(`${BASE_URL}/games?key=${API_KEY}&search=${query}&page_size=10`);
        this.$emit('search', response.data.results);
        this.$router.push({ name: 'SearchResult', query: { q: query } });
      } catch (error) {
        console.error('Error fetching games:', error);
        this.error = 'Failed to fetch games. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
    clearSearch() {
      this.searchQuery = '';
      this.$router.push({ name: 'Home' });
    },
    debouncedSearch: debounce(function() {
      this.searchAndRedirect();
    }, 500)
  }
}
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-input {
  width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

.search-button {
  padding: 10px 20px;
  background-color: #ff6b81;
  border: 1px solid #ff6b81;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  margin-right: 5px;
}

.clear-button {
  padding: 10px 20px;
  background-color: #ccc;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: black;
  cursor: pointer;
  margin-left: 5px;
}

.loading {
  margin-top: 10px;
}

.error {
  margin-top: 10px;
  color: red;
}
</style>
