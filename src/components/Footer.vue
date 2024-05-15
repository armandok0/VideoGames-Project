<template>
    <footer class="footer">
      <div class="footer-content">
        <div>&copy; {{ currentYear }} GameBay</div>
        <div class="logo-container">
          <img alt="Logo" src="@/assets/images/heart-logo.svg" class="logo">
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FooterComponent',
    data() {
      return {
        currentYear: new Date().getFullYear()
      };
    }
  }
  </script>
  
  <style scoped>
  .footer {
    background-color: #22313f;
    color: white;
    padding: 20px;
  }
  
  .footer-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .logo-container {
    margin-left: 10px;
  }
  
  .logo {
    width: 30px; 
  }
  </style>
  