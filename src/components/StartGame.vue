<template>
  <div class="startGame">
    <div class="title">
      <Bird
        :isStartGame="isStartGame"
        :isActive="isActive"
        :isStartbirdJump="!isStartGame"
        :minTopOfBird="0"
        :maxTopOfBird="50"
      ></Bird>
      <div
        class="startGameButton"
        @click="startGame"
        :class="[switchtruthiness ? 'white' : 'blue']"
      >
        开始游戏
      </div>
    </div>
  </div>
</template>

<script>
import Bird from "./Bird";
export default {
  data() {
    return {
      isStartGame: false,

      switchtruthiness: true
    };
  },
  components: {
    Bird
  },
  props: {
    handleTimes: Number
  },
  methods: {
    startGame() {
      this.isStartGame = true;
      this.$emit("StartGame", true);
    },
    startBound() {
      this.switchtruthiness = !this.switchtruthiness;
    }
  },
  watch: {
    isActive: function(newVal) {
      if (newVal) {
        this.startBound();
      }
    }
  },
  computed: {
    topOfBirdStr: function() {
      return this.topOfBird + "px";
    },
    isActive() {
      return this.handleTimes % 10 === 0;
    }
  }
};
</script>

<style scoped lang="scss">
.startGame {
  .title {
    position: absolute;
    width: 150px;
    height: 150px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .startGameButton {
      position: absolute;
      width: 150px;
      height: 60px;
      line-height: 60px;
      left: 50%;
      top: 90px;
      transform: translateX(-50%);
      text-align: center;
      font-weight: bolder;
      transition: all 0.3s linear;
      cursor: pointer;
      user-select: none;
    }
    .startGameButton.white {
      color: #fff;
      font-size: 24px;
    }
    .startGameButton.blue {
      color: #09f;
      font-size: 36px;
    }
  }
}
</style>
