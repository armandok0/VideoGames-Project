<template>
  <div class="game-card" @click="handleClick">
    <div class="game-image" :style="{ backgroundImage: 'url(' + game.background_image + ')' }">
      <div class="game-details">
        <h3>{{ game.name }}</h3>
        <p class="release-date">Release Date: {{ game.released }}</p>
        <span class="heart-icon" :class="{ 'favorited': isFavorited }" @click.stop="toggleFavorite"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isFavorited: false
    };
  },
  mounted() {
    this.isFavorited = this.checkFavorite();
  },
  methods: {
    handleClick() {
      this.$emit('game-clicked', this.game.id);
    },
    toggleFavorite() {
      this.isFavorited = !this.isFavorited;
      this.updateFavorites();
    },
    checkFavorite() {
      const favorites = JSON.parse(localStorage.getItem('favoriteGames') || '[]');
      return favorites.includes(this.game.id);
    },
    updateFavorites() {
      let favorites = JSON.parse(localStorage.getItem('favoriteGames') || '[]');
      if (this.isFavorited) {
        favorites.push(this.game.id);
      } else {
        favorites = favorites.filter(id => id !== this.game.id);
      }
      localStorage.setItem('favoriteGames', JSON.stringify(favorites));
    }
  }
};
</script>

<style scoped>
.game-card {
  position: relative;
  width: calc(25% - 20px);
  margin-bottom: 40px; 
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}

.game-image {
  width: 100%;
  height: 250px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.game-details {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 16px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  font-size: 14px;
}

.game-details h3 {
  margin-top: 0;
  margin-bottom: 8px;
  font-size: 14px; 
  font-weight: bold; 
}

.game-details p {
  margin: 0;
  font-size: 12px;
}

.release-date {
  color: #fff;
}

.heart-icon {
  position: absolute;
  top: 20px;
  right: 5px;
  width: 24px; 
  height: 24px; 
  background-image: url('../assets/svg/heart-icon-white.svg');
  background-size: cover;
  cursor: pointer;
}

.heart-icon.favorited {
  background-image: url('../assets/svg/heart-icon-pink.svg');
}
</style>
