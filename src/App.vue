<template>

<!-- <header>
  THIS IS THE HEADER
</header> -->

<body>
  <div class="main-container">
    <div class="main-container__logo">
      <img src="./assets/images/logo-with-mascot.svg" alt="logo">
    </div>
    <div class="main-container__form">
      <BudgetForm />
    </div>
  </div>
</body>

<!-- <footer>
  THIS IS THE FOOTER
</footer> -->

</template>

<script>
import BudgetForm from "./components/BudgetForm.vue"

export default {
  name: "App",
  components: {
    BudgetForm
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 50px;
  height: 100vh;
  display: flex;
}

.main-container__logo {
  img {
    width: 300px;
    height: 300px;
  }
}

</style>
