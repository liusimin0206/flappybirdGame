<template>
  <div id="app" :style="{ backgroundPositionX: backgroundMoveXStr }">
    <StartGame
      :handleTimes="this.handleTimes"
      @StartGame="handleStartGame"
      v-if="!isStartGame && !isOverGame"
    ></StartGame>
    <PlayingGame
      :handleTimes="this.handleTimes"
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
import StartGame from "@/components/StartGame";
import EndGame from "@/components/EndGame";
import PlayingGame from "@/components/PlayingGame";
export default {
  name: "App",
  components: { StartGame, EndGame, PlayingGame },
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
  created() {
    this.init();
  },
  computed: {
    backgroundMoveXStr: function() {
      return this.backgroundMoveX + "px";
    }
  },
  methods: {
    init() {
      this.handleTimes = 0;
      this.timer = setInterval(() => {
        this.handleTimes++;
        this.backgroundMoveX -= this.backgroundMoveSpeed;
      }, 30);
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
    }
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
  transition: background-position-x 0.03s linear;
  overflow: hidden;
}
</style>
