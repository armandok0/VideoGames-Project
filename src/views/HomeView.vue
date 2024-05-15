<template>
  <div class="home">
    <MyLoader :loading="loading" />
    <div v-if="!loading">
      <Header />
      <div class="content">
        <SearchBar />
        <div class="section">
          <h2>Upcoming Games</h2>
          <div class="game-cards">
            <GameCard v-for="game in upcomingGames" :key="game.id" :game="game" @game-clicked="handleGameClick" />
          </div>
        </div>
        <div class="section">
          <h2>Popular Games</h2>
          <div class="game-cards">
            <GameCard v-for="game in popularGames" :key="game.id" :game="game" @game-clicked="handleGameClick" />
          </div>
        </div>
        <div class="section">
          <h2>New Games</h2>
          <div class="game-cards">
            <GameCard v-for="game in newGames" :key="game.id" :game="game" @game-clicked="handleGameClick" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import SearchBar from '../components/SearchBar.vue';
import GameCard from '../components/GameCard.vue';
import MyLoader from '../components/MyLoader.vue'; 

const BASE_URL = 'https://api.rawg.io/api';
const API_KEY = 'API_KEY_HERE';

export default {
  name: 'HomeView',
  components: {
    Header,
    Footer,
    SearchBar,
    GameCard,
    MyLoader,
  },
  data() {
    return {
      searchQuery: '',
      upcomingGames: [],
      popularGames: [],
      newGames: [],
      loading: true,
    };
  },
  created() {
    this.retrieveGamesFromStorage();
    if (!this.upcomingGames.length || !this.popularGames.length || !this.newGames.length) {
      this.fetchGames();
    } else {
      this.loading = false;
    }
  },
  methods: {
    async fetchGames() {
      const currentDate = new Date().toISOString().split('T')[0];
      const lastYearDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0];
      const nextYearDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0];
      const queries = [
        `${BASE_URL}/games?key=${API_KEY}&dates=${currentDate},${nextYearDate}&ordering=-added&page_size=10`,
        `${BASE_URL}/games?key=${API_KEY}&dates=${lastYearDate},${currentDate}&ordering=-rating&page_size=10`,
        `${BASE_URL}/games?key=${API_KEY}&dates=${lastYearDate},${currentDate}&ordering=-released&page_size=10`,
      ];

      try {
        const responses = await Promise.all(queries.map(query => axios.get(query)));
        this.upcomingGames = responses[0].data.results;
        this.popularGames = responses[1].data.results;
        this.newGames = responses[2].data.results;
        this.saveGamesToStorage();
        this.loading = false;
      } catch (error) {
        console.error('Error fetching games:', error);
        this.loading = false;
      }
    },
    retrieveGamesFromStorage() {
      this.upcomingGames = this.retrieveFromStorage('upcomingGames');
      this.popularGames = this.retrieveFromStorage('popularGames');
      this.newGames = this.retrieveFromStorage('newGames');
    },
    retrieveFromStorage(key) {
      const savedGames = sessionStorage.getItem(key);
      return savedGames ? JSON.parse(savedGames) : [];
    },
    saveGamesToStorage() {
      sessionStorage.setItem('upcomingGames', JSON.stringify(this.upcomingGames));
      sessionStorage.setItem('popularGames', JSON.stringify(this.popularGames));
      sessionStorage.setItem('newGames', JSON.stringify(this.newGames));
    },
    handleGameClick(gameId) {
      this.$router.push({ name: 'SinglePageView', params: { id: gameId } });
    },
  },
};
</script>

<style scoped>
.home {
  background-color: #22313f;
  color: white;
  padding: 20px;
}

.content {
  margin-top: 20px;
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
