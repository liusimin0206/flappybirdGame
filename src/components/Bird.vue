<template>
  <div
    class="bird"
    :style="{
      backgroundPositionX: backgroundPositionX2Str
    }"
  ></div>
</template>

<script>
import { num2strAddPx } from "../tools";
export default {
  data() {
    return {
      backgroundPositionX: 0
    };
  },
  props: {
    isActive: { type: Boolean, default: true },
    isStartflapWings: { type: Boolean, default: true }
  },
  methods: {
    flapWings() {
      if (this.backgroundPositionX <= -60) {
        this.backgroundPositionX = 0;
      } else this.backgroundPositionX -= 30;
    }
  },
  computed: {
    backgroundPositionX2Str: function() {
      return num2strAddPx(this.backgroundPositionX);
    }
  }
};
</script>

<style scoped lang="scss">
.bird {
  width: 30px;
  height: 30px;

  background-image: url("../assets/img/birds.png");
  transition: top 0.3s linear;
}
</style>
