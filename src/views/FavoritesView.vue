<template>
  <Header />
  <div class="favorites-view">
    <SearchBar />
    <div class="content">
      <h2>Favorite Games</h2>
      <div v-if="favoriteGames.length > 0" class="game-cards">
        <GameCard
          v-for="game in favoriteGames"
          :key="game.id"
          :game="game"
          @game-clicked="handleGameClick"
        />
      </div>
      <div v-else class="no-favorites">
        You haven't added any games to your favorites yet.
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import GameCard from '../components/GameCard.vue';
import SearchBar from '../components/SearchBar.vue';

const BASE_URL = 'https://api.rawg.io/api';
const API_KEY = 'API_KEY_HERE';

export default {
  name: 'FavoritesView',
  components: {
    Header,
    Footer,
    GameCard,
    SearchBar
  },
  data() {
    return {
      favoriteGames: []
    };
  },
  mounted() {
    this.loadFavoriteGames();
  },
  methods: {
    loadFavoriteGames() {
      const favorites = JSON.parse(localStorage.getItem('favoriteGames') || '[]');
      this.fetchGamesByIds(favorites);
    },
    async fetchGamesByIds(ids) {
      for (const id of ids) {
        try {
          const game = await this.fetchGameDetails(id);
          this.favoriteGames.push(game);
        } catch (error) {
          console.error('Error fetching game details:', error);
        }
      }
    },
    fetchGameDetails(id) {
      const GAME_DETAILS_URL = `${BASE_URL}/games/${id}?key=${API_KEY}`;
      
      return axios.get(GAME_DETAILS_URL)
        .then(response => {
          const gameData = response.data;
          return {
            id: gameData.id,
            name: gameData.name,
            released: gameData.released,
            background_image: gameData.background_image,
          };
        })
        .catch(error => {
          console.error('Error fetching game details:', error);
          throw error;
        });
    },
    handleGameClick(gameId) {
      this.$router.push({ name: 'SinglePageView', params: { id: gameId } });
    },
    saveToFavorites(gameId) {
      const favorites = JSON.parse(localStorage.getItem('favoriteGames') || '[]');
      if (!favorites.includes(gameId)) {
        favorites.push(gameId);
        localStorage.setItem('favoriteGames', JSON.stringify(favorites));
      }
    }
  }
};
</script>

<style scoped>
.favorites-view {
  background-color: #22313f;
  color: white;
  padding: 20px;
}

.content {
  margin-top: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.game-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
}

.no-favorites {
  font-style: italic;
  color: #ccc;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px; 
  border-radius: 8px;
  height: 67vh;
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
