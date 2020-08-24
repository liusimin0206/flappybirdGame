<template>
  <div class="endGame">
    <div class="mask"></div>
    <div class="title">
      <div class="over">Game over</div>
      <div class="result">Your Results:</div>
      <div class="final-score">{{ lastScore }}</div>
      <ul class="rank-list">
        <li v-for="(item, i) in showRecord" :key="i" class="rank-item">
          <span class="rank-degree" :class="rank2str(i + 1)">{{ i + 1 }}</span>
          <span class="rank-score">{{ item.score }}</span>
          <span class="rank-time">{{ item.time }}</span>
        </li>
      </ul>
      <div class="restart" @click="restart">重新开始</div>
    </div>
  </div>
</template>

<script>
import Store from "../assets/store";
export default {
  data() {
    return {
      gameRecording: [],
      rank2: ["first", "second", "third"]
    };
  },
  mounted() {
    this.gameRecording = Store.fetch();
    if (this.gameRecording === null) {
      this.gameRecording = [];
    }
    this.gameRecording.push(this.createAScoreRecord());
    this.sortGameRecording();
    this.save(this.gameRecording);
  },
  methods: {
    restart() {
      this.$emit("restart", true);
    },
    getDate: function() {
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate();
      var hour = d.getHours();
      var minute = d.getMinutes();
      var second = d.getSeconds();
      return `${year}.${month}.${day} ${hour}:${minute}:${second}`;
    },
    save(record) {
      Store.save(record);
    },
    createAScoreRecord() {
      return { score: this.lastScore, time: this.getDate() };
    },
    sortGameRecording() {
      this.gameRecording.sort(function(a, b) {
        return b.score - a.score;
      });
    },
    rank2str(rank) {
      if (rank > 3 || rank < 0) {
        return "";
      }
      return this.rank2[rank - 1];
    }
  },
  props: {
    lastScore: {
      type: Number
    }
  },
  computed: {
    showRecord() {
      return this.gameRecording.slice(0, 8);
    }
  }
};
</script>

<style scoped lang="scss">
.endGame {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  .mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0.7;
    background-color: #000;
    z-index: 2;
  }
  .title {
    position: absolute;

    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 3;
    .over {
      font-size: 36px;
      font-weight: bolder;
      color: red;
    }
    .result,
    .final-score {
      margin-top: 20px;
      color: #ff0;
      font-size: 20px;
      font-weight: bold;
    }
    .rank-list {
      margin-top: 20px;
      color: #09f;
    }
    .rank-item {
      height: 30px;
      line-height: 30px;
      margin-bottom: 10px;
      font-size: 12px;
    }
    .rank-degree {
      display: inline-block;
      width: 14px;
      height: 14px;
      margin-right: 10px;
      line-height: 14px;
      color: #fff;
      background-color: #8eb9f5;
    }
    .rank-degree.first {
      background-color: #f54545;
    }
    .rank-degree.second {
      background-color: #ff8547;
    }
    .rank-degree.third {
      background-color: #ffac38;
    }
    .rank-score {
      display: inline-block;
      width: 30px;
    }
    .restart {
      color: #09f;
      font-size: 18px;
      font-weight: bolder;
      cursor: pointer;
    }
  }
}
</style>
