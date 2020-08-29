<template>
  <div id="app" :style="{ backgroundPositionX: num2strAddPx(backgroundMoveX) }">
    <StartGame
      @StartGame="handleStartGame"
      v-if="!isStartGame && !isOverGame"
    ></StartGame>
    <PlayingGame
      :isStartGame="isStartGame"
      :backgroundMoveSpeed="backgroundMoveSpeed"
      v-if="isStartGame && !isOverGame"
      @gameOver="handleGameOver"
    ></PlayingGame>
    <EndGame
      v-if="!isStartGame && isOverGame"
      @restart="restart"
      :lastScore="lastScore"
    ></EndGame>
  </div>
</template>

<script>
import { num2strAddPx } from "./tools";
export default {
  name: "App",
  components: {
    StartGame: () => import("@/components/StartGame"),
    EndGame: () => import("@/components/EndGame"),
    PlayingGame: () => import("@/components/PlayingGame")
  },
  data() {
    return {
      backgroundMoveSpeed: 2,
      backgroundMoveX: 0,
      handleTimes: 0,
      isStartGame: false,
      timer: 0,
      isOverGame: false,
      lastScore: -1
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$store.commit("reset");
      this.timer = setInterval(() => {
        this.$store.commit("increment");
        if (!this.isStartGame) {
          this.moveBackground();
        }
      }, 30);
    },
    moveBackground() {
      this.backgroundMoveX -= this.backgroundMoveSpeed;
    },
    handleStartGame(val) {
      this.isStartGame = val;
      this.backgroundMoveSpeed = 5;
    },
    // eslint-disable-next-line no-unused-vars
    handleGameOver(val, score) {
      this.isOverGame = !val;
      this.isStartGame = val;
      this.lastScore = score;
      clearInterval(this.timer);
    },
    restart() {
      this.init();
      this.isStartGame = true;
      this.isOverGame = false;
    },
    num2strAddPx
  }
};
</script>

<style lang="scss">
#app {
  position: relative;
  height: 100%;
  background-image: url("./assets/img/sky1.png");
  // background-position-x: 0;
  background-repeat: repeat-x;
  background-size: auto 100%;
  // background-repeat: no-repeat;
  background-attachment: fixed;
  // transition: background-position-x 0.03s linear;
  overflow: hidden;
}
</style>
