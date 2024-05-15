<template>
    <Header />
  <div class="single-page-view">
    <MyLoader :loading="loading" />
    <div class="hero-image" :style="{ backgroundImage: 'url(' + game.background_image + ')' }"></div>
    <div class="content">
      <router-link to="/" class="go-back-button">Go Back</router-link>
      <div class="game-details" v-if="!loading">
        <h1>{{ game.name }}</h1>
        <p class="release-date"><strong>Release Date:</strong> {{ game.released }}</p>
        <h2>Description:</h2>
        <div class="description" v-html="game.description"></div>
      </div>
      <div class="screenshots-carousel" v-if="!loading">
        <h2>Screenshots:</h2>
        <div class="carousel">
          <div class="carousel-item" v-for="screenshot in screenshots" :key="screenshot.id">
            <img :src="screenshot.image" alt="Screenshot">
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import MyLoader from '../components/MyLoader.vue';

const BASE_URL = 'https://api.rawg.io/api';
const API_KEY = 'API_KEY_HERE';

export default {
  name: 'SinglePageView',
  components: {
    Header,
    Footer,
    MyLoader,
  },
  data() {
    return {
      game: {},
      screenshots: [],
      loading: true, 
    };
  },
  created() {
    this.fetchGameDetails();
    this.fetchGameScreenshots();
  },
  methods: {
    async fetchGameDetails() {
      const gameId = this.$route.params.id;
      try {
        const response = await axios.get(`${BASE_URL}/games/${gameId}?key=${API_KEY}`);
        this.game = response.data;
        this.loading = false;
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    },
    async fetchGameScreenshots() {
      const gameId = this.$route.params.id;
      try {
        const response = await axios.get(`${BASE_URL}/games/${gameId}/screenshots?key=${API_KEY}`);
        this.screenshots = response.data.results;
      } catch (error) {
        console.error('Error fetching game screenshots:', error);
      }
    }
  }
}
</script>

<style scoped>
.single-page-view {
  background-color: #22313f;
  color: white;
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hero-image {
  width: 80%;
  height: 600px;
  background-size: cover;
  background-position: center;
}

.content {
  margin-top: 20px;
  width: 100%;
  max-width: 80%;
}

.game-details {
  width: 100%;
  margin-bottom: 25px;
}

.game-details h1 {
  font-size: 25px;
  margin-bottom: 10px;
}

.release-date,
.description {
  font-size: 20px;
  margin-bottom: 10px;
}

.screenshots-carousel {
  margin-top: 20px;
  width: 100%;
}

.screenshots-carousel h2 {
  font-size: 25px;
  margin-bottom: 10px;
}

.carousel {
  display: flex;
  overflow-x: auto;
  width: 100%;
  margin-bottom: 20px;
}

.carousel-item {
  flex: 0 0 auto;
  margin-right: 5px;
}

.carousel-item img {
  max-width: 100%;
  height: 400px;
}

.go-back-button {
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #084872;
  color: white;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.go-back-button:hover {
  background-color: #1c4661;
}

@media (max-width: 768px) {
  .hero-image {
    height: 400px;
  }

  .game-details h1 {
    font-size: 20px;
  }

  .release-date,
  .description {
    font-size: 16px;
  }

  .carousel-item img {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .hero-image {
    height: 300px;
  }

  .game-details h1 {
    font-size: 18px;
  }

  .release-date,
  .description {
    font-size: 14px;
  }

  .carousel-item img {
    height: 200px;
  }
}
</style>
