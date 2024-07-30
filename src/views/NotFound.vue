<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="page-notfound">
          <div class="page-notfound_content">
            <div class="page-notfound_content_circle">
              <span class="page-notfound_content_circle_text_1">Oops...</span>
              <span class="page-notfound_content_circle_text_2">Page not foud</span>
              <span class="page-notfound_content_circle_text_3">You will be redirected to the <br></br> home page in <span id="countdown">5</span> seconds.</span>
            </div>
            <div class="page-notfound_content_circle_2"></div>
            <div class="page-notfound_content_circle_3"></div>
          </div>
        </div>
      </v-col>
    </v-row>


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

<style scoped lang="scss">

.page {
  &-notfound {
    &_content {
      display: grid;
      align-content: center;
      justify-items: center;
      height: 100vh;
      width: 100vw;
      position:relative;

      &_circle {
        border-radius: 50%;
        background-color: #F1F9FE;
        align-self: center;
        border: 4px solid #bbdefb;
        display: grid;
        width: 170px;
        height: 170px;
        position: relative;
        z-index: 2;

        &_text {
          &_1 {
            font-family: 'Concert One', sans-serif;
            font-weight: 800;
            font-size: 80px;
            color: #2799FB;
            margin: 0 auto;
            margin-left: -30px;
          }

          &_2 {
            font-family: 'Concert One', sans-serif;
            font-weight: 600;
            font-size: 30px;
            color: #2799FB;
            position: absolute;
            margin: 0 auto;
            bottom: 0;
            width: 200px;
            margin-left: -10px;
            margin-bottom: 20px;
          }

          &_3 {
            font-family: 'Concert One', sans-serif;
            font-weight: 400;
            font-size: 18px;
            color: #2799FB;
            position: absolute;
            margin: 0 auto;
            bottom: -50px;
            width: 300px;
            margin-left: -65px;
            text-align: center;
            line-height: 18px;
          }
        }

        &_2 {
          position: absolute;
          z-index: 1;
          width: 600px;
          height: 600px;
          background-color: #BDE0FE;
          border-radius: 50%;
          border: 4px solid #b8ddfd;
          bottom: 40px;
          left: -30px;
        }

        &_3 {
          position: absolute;
          z-index: 0;
          width: 800px;
          height: 800px;
          background-color: #F1F9FE;
          border-radius: 50%;
          border: 4px solid #ecf5fb;
          bottom: -90px;
          left: -180px;
        }

      }
    }
  }
}

</style>
