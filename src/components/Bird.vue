<template>
  <div
    class="bird"
    :style="{
      top: this.topOfBird2Str,
      backgroundPositionX: backgroundPositionX2Str
    }"
  ></div>
</template>

<script>
export default {
  data() {
    return {
      topOfBird: 0,
      backgroundPositionX: 0,
      birdStepY: 0
    };
  },
  props: {
    isStartGame: Boolean,
    isActive: Boolean,

    isStartbirdJump: { type: Boolean, default: true },
    isStartbirdFly: { type: Boolean, default: true },
    minTopOfBird: { type: Number, default: 0 },
    maxTopOfBird: { type: Number, default: 50 }
  },
  methods: {
    startbirdJump() {
      this.topOfBird =
        this.topOfBird === this.maxTopOfBird
          ? this.minTopOfBird
          : this.maxTopOfBird;
    },
    birdfly() {
      if (this.backgroundPositionX <= -60) {
        this.backgroundPositionX = 0;
      } else this.backgroundPositionX -= 30;
    }
  },
  computed: {
    topOfBird2Str: function() {
      return this.topOfBird + "px";
    },
    backgroundPositionX2Str: function() {
      return this.backgroundPositionX + "px";
    }
  },
  watch: {
    isActive: {
      handler(newVal) {
        if (newVal) {
          if (this.isStartbirdJump) {
            this.startbirdJump();
          }
          if (this.isStartbirdFly) {
            this.birdfly();
          }
        }
      },
      immediate: true
    }
  }
};
</script>

<style scoped lang="scss">
.bird {
  position: absolute;
  left: 50%;
  width: 30px;
  height: 30px;
  transform: translateX(-50%);
  background-image: url("../assets/img/birds.png");
  transition: top 0.3s linear;
}
</style>
