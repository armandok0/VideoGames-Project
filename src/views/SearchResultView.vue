<template>
  <div class="search-result">
    <Header/>
    <div class="content">
      <SearchBar @search="handleSearch" :initial-query="query"/>
      <div class="section">
        <h2>Search Results</h2>
        <div v-if="loading" class="loading">Loading...</div>
        <div v-else-if="searchResults.length > 0" class="game-cards">
          <GameCard v-for="game in searchResults" :key="game.id" :game="game" @game-clicked="handleGameClick"/>
        </div>
        <div v-else class="no-results">
          No results found.
        </div>
        <div v-if="error" class="error">{{ error }}</div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import SearchBar from '../components/SearchBar.vue'
import GameCard from '../components/GameCard.vue'

export default {
  name: 'SearchResultView',
  components: {
    Header,
    Footer,
    SearchBar,
    GameCard
  },
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      searchResults: [],
      loading: false,
      error: ''
    };
  },
  methods: {
    handleSearch(searchResults) {
      this.searchResults = searchResults;
    },
    handleGameClick(gameId) {
    this.$router.push({ name: 'SinglePageView', params: { id: gameId } });
  }
  }

}
</script>


<style scoped>
.search-result {
  background-color: #22313f;
  color: white;
  padding: 20px;
}

.content {
  margin-top: 20px;
  min-height: 100vh;
}

.section {
  margin-top: 40px;
}

.game-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
}

.no-results {
  font-style: italic;
  color: #ccc;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px; 
  border-radius: 8px;
  height: 65vh;
}

@media screen and (max-width: 1024px) {
  .game-card {
    width: calc(33.333% - 20px); 
  }
}

@media screen and (max-width: 768px) {
  .game-card {
    width: calc(50% - 20px); 
  }
}

@media screen and (max-width: 480px) {
  .game-card {
    width: calc(100% - 20px);
  }
}
</style>
