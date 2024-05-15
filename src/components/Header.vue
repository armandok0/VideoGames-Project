<template>
  <header class="header">
    <div class="centered-container">
      <div class="logo-container">
        <router-link to="/" class="logo-link">
          <img alt="Logo" src="@/assets/images/heart-logo.svg" class="logo">
          <span class="logo-text">GameBay</span>
        </router-link>
      </div>
    </div>
    <router-link to="/favorites" class="favorites" :class="{ 'active': $route.path === '/favorites' }">
      <div class="favorites-content">
        <img alt="Favorite" src="@/assets/images/heart-logo.svg" class="favorite-icon">
        <p class="favorites-text">Favorites</p>
      </div>
    </router-link>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent'
}
</script>

<style scoped>
.header {
  background-color: #22313f;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.centered-container {
  flex: 1;
  display: flex;
  justify-content: center;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 30px;
  margin-right: 10px;
}

.favorite-icon {
  width: 30px;
  margin-right: 10px;
}

.favorites-content {
  display: flex;
  align-items: center;
}

.logo-text,
.favorites-text {
  font-size: 1.1em;
}

.logo-link,
.favorites {
  text-decoration: none;
  color: inherit;
}

.logo-link:hover,
.favorites:hover {
  opacity: 0.8;
}
</style>
