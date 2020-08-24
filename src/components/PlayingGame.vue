<template>
  <div class="playingGame" @click="handleGameClick">
    <div class="score">{{ score }}</div>
    <div class="location">
      <div v-for="(pipe, i) in pipeData" class="pipe" :key="i">
        <div
          class="pipeUp"
          :style="{ top: addPx(pipe.upY), left: addPx(pipe.left) }"
        ></div>
        <div
          class="pipeDown"
          :style="{ top: addPx(pipe.downY), left: addPx(pipe.left) }"
        ></div>
      </div>
      <div class="locateY" :style="{ top: locateY2Str }">
        <Bird
          :isStartGame="isStartGame"
          :isActive="isActive"
          :isStartbirdJump="false"
        ></Bird>
      </div>
    </div>
  </div>
</template>

<script>
import Bird from "./Bird";
export default {
  data() {
    return {
      locateY: 0,
      dropStepY: 0,
      bodyHeight: 1000,
      pipeYDistance: 150,
      pipeData: [],
      pipeLength: 10,
      score: 0,
      currentPipeIndex: 0,
      isClick: false
    };
  },
  components: { Bird },
  methods: {
    handleGameClick() {
      if (!this.isClick) this.isClick = true;
      this.dropStepY = -10;
    },
    dropLocateY() {
      this.locateY += ++this.dropStepY;
    },
    judgeKnock() {
      this.judgeBoundary();

      this.judgePipe();
    },
    judgeBoundary() {
      if (this.locateY <= this.minTop || this.locateY >= this.maxTop) {
        this.failGame();
      }
    },
    judgeSinglePipe(pipe) {
      if (pipe.left <= 15 && pipe.left >= -67) {
        if (
          !(this.locateY >= pipe.upY + 852 && this.locateY + 30 <= pipe.downY)
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
        this.pipeData[i].left -= this.backgroundMoveSpeed;
      }
    },
    addPx(num) {
      return num + "px";
    },
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
    isStartGame: Boolean,
    handleTimes: Number,
    appClick: Boolean,
    backgroundMoveSpeed: { type: Number, default: 5 }
  },
  mounted() {
    this.bodyHeight = document.body.scrollHeight;
    for (let i = 0; i < this.pipeLength; i++) {
      this.pipeData.push(this.createPipe(300 * (i + 1)));
    }
  },
  computed: {
    isActive() {
      return this.handleTimes % 10 === 0;
    },
    locateY2Str() {
      return this.locateY + "px";
    },
    minTop() {
      return -(this.bodyHeight / 2 - 10);
    },
    maxTop() {
      return this.bodyHeight / 2 + 10;
    }
  },
  watch: {
    handleTimes() {
      if (this.isClick) {
        this.pipeMove();
        this.dropLocateY();
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
    .locateY {
      position: absolute;
    }
  }
}
</style>
