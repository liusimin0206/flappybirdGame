<template>
  <div class="playingGame" @click="handleGameClick">
    <div class="score">{{ score }}</div>
    <div class="location">
      <div v-for="(pipe, i) in pipeData" class="pipe" :key="i">
        <div
          class="pipeUp"
          :style="{
            top: num2strAddPx(pipe.upY),
            left: num2strAddPx(pipe.left)
          }"
        ></div>
        <div
          class="pipeDown"
          :style="{
            top: num2strAddPx(pipe.downY),
            left: num2strAddPx(pipe.left)
          }"
        ></div>
      </div>
      <Bird
        ref="Bird"
        :class="{ nojump: true }"
        :style="{
          top: num2strAddPx(this.topOfBird)
        }"
      ></Bird>
    </div>
  </div>
</template>

<script>
import Bird from "./Bird";
import { num2strAddPx } from "../tools";
export default {
  data() {
    return {
      topOfBird: 0,
      maxTopOfBird: 50,
      minTopOfBird: 0,
      dropStepY: 0,
      bodyHeight: 1000,
      pipeYDistance: 150,
      pipeData: [],
      pipeLength: 10,
      score: 0,
      currentPipeIndex: 0,
      isClick: false,
      pipeWidth: 52,
      speedX: 5
    };
  },
  components: { Bird },
  methods: {
    handleGameClick() {
      if (!this.isClick) this.isClick = true;
      this.dropStepY = -10;
    },
    // 匀加速下落
    droptopOfBird() {
      this.topOfBird += ++this.dropStepY;
    },
    judgeKnock() {
      this.judgeBoundary();
      this.judgePipe();
    },
    // 检测是否超出上下界限
    judgeBoundary() {
      if (this.topOfBird <= this.minTop || this.topOfBird >= this.maxTop) {
        this.failGame();
      }
    },
    // 检测是否撞上单对柱子
    judgeSinglePipe(pipe) {
      if (pipe.left <= 30 && pipe.left >= -this.pipeWidth) {
        if (
          !(
            this.topOfBird >= pipe.upY + 852 &&
            this.topOfBird + 30 <= pipe.downY
          )
        ) {
          this.failGame();
        }
      }
    },
    judgePipe() {
      this.judgeSinglePipe(this.pipeData[this.currentPipeIndex]);
    },
    isPassCurrentPipe() {
      return this.pipeData[this.currentPipeIndex].left < -67;
    },
    failGame() {
      //   console.log("game over");
      this.$emit("gameOver", false, this.score);
    },
    createPipe(X) {
      let downY = Math.floor(Math.random() * (this.maxTop - 70)) + 20;
      let upY = downY - this.pipeYDistance - 850;
      return { upY, downY, left: X };
    },
    pipeMove() {
      for (var i = 0; i < this.pipeLength; i++) {
        this.pipeData[i].left -= this.speedX;
      }
    },
    num2strAddPx,
    addDeletePipe() {
      //   移除第一根柱子;
      let firstPipe = this.pipeData.shift();
      //   添加最后一根柱子
      this.pipeData.push(
        this.createPipe(firstPipe.left + 300 * this.pipeLength)
      );
    }
  },
  props: {
    isStartGame: { type: Boolean, default: true }
  },
  mounted() {
    this.bodyHeight = document.body.scrollHeight;
    for (let i = 0; i < this.pipeLength; i++) {
      this.pipeData.push(this.createPipe(300 * (i + 1)));
    }
  },
  computed: {
    minTop() {
      return -(this.bodyHeight / 2 - 10);
    },
    maxTop() {
      return this.bodyHeight / 2 + 10;
    },
    time30: function() {
      return this.$store.state.counter;
    }
  },
  watch: {
    time30(val) {
      this.$parent.moveBackground(this.speedX);
      if (this.isClick) {
        this.pipeMove();
        this.droptopOfBird();
        if (this.pipeData[0].left <= -1000) {
          this.addDeletePipe();
          this.currentPipeIndex--;
        }
        this.judgeKnock();
        if (this.isPassCurrentPipe()) {
          this.score++;
          this.currentPipeIndex++;
        }
      }
      if (val % 10 == 0) {
        this.$refs.Bird.flapWings();
      }
    }
  }
};
</script>

<style scoped lang="scss">
.playingGame {
  height: 100%;
  .score {
    z-index: 1;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 20px;
    font-weight: bolder;
    color: #fff;
    user-select: none;
  }
  .location {
    position: absolute;
    width: 30px;
    height: 30px;
    left: 25%;
    top: 50%;
    transform: translate(-50%, -50%);
    .pipeUp {
      position: absolute;
      width: 52px;
      height: 852px;
      background-image: url("../assets/img/pipe2.png");
    }
    .pipeDown {
      position: absolute;
      width: 52px;
      height: 852px;
      background-image: url("../assets/img/pipe1.png");
    }
    .bird {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    .bird.nojump {
      transition: all 0s ease 0s;
    }
  }
}
</style>
