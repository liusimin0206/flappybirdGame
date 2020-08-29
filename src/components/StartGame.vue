<template>
  <div class="startGame">
    <div class="title">
      <Bird
        ref="Bird"
        :style="{
          top: this.topOfBirdStr
        }"
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
import { num2strAddPx } from "../tools";
export default {
  data() {
    return {
      isStartGame: false,
      switchtruthiness: true,
      topOfBird: 0,
      maxTopOfBird: 50,
      minTopOfBird: 0
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
    // "开始游戏"文字变化
    startBound() {
      this.switchtruthiness = !this.switchtruthiness;
    },
    startbirdJump() {
      this.topOfBird =
        this.topOfBird === this.maxTopOfBird
          ? this.minTopOfBird
          : this.maxTopOfBird;
    }
  },
  computed: {
    topOfBirdStr: function() {
      return num2strAddPx(this.topOfBird);
    },

    time300: function() {
      return this.$store.getters.counter10;
    }
  },
  watch: {
    time300: function() {
      // "开始游戏"文字变化
      this.startBound();
      // 小鸟扇动翅膀
      this.$refs.Bird.flapWings();
      this.startbirdJump();
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
    .bird {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
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
