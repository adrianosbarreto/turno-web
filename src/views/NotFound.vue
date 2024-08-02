<template>
  <v-container>
    <div class="not-found pa-4">
      <h1>Oops!</h1>
      <p>The page you are looking for was not found.</p>
      <p>You will be redirected to the home page in <span id="countdown">5</span> seconds.</p>
    </div>

  </v-container>
</template>


<script>
export default {
  name: 'NotFound',
  mounted() {
    let countdown = 5;
    const countdownElement = document.getElementById('countdown');

    const interval = setInterval(() => {
      countdown -= 1;
      if (countdownElement) {
        countdownElement.textContent = countdown;
      }
      if (countdown === 0) {
        clearInterval(interval);
        this.$router.push('/home');
      }
    }, 1000);
  }
}
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f8f9fa;
}

h1 {
  font-size: 3em;
  margin-bottom: 0.5em;
  color: #343a40;
}

p {
  font-size: 1em;
  margin-bottom: 0.5em;
  color: #6c757d;
}
</style>
