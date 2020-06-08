<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroller",
  data() {
    return {};
  },
  props: {
    handleToScroll: {
      type: Function,
      default: function() {}
    },
    handleToTouchEnd: {
      type: Function,
      default: function() {}
    }
  },
  methods: {
    toScrollTop(y) {
      this.scroll.scrollTo(0, y);
    }
  },
  mounted() {
    var scroll = new BScroll(this.$refs.wrapper, {
      tap: true,
      // 滚动时派发scroll事件
      probeType: 1
    });
    scroll.on("scroll", pos => {
      this.handleToScroll(pos);
    });

    scroll.on("touchEnd", pos => {
      this.handleToTouchEnd(pos);
    });
    // 变为全局对象scroll
    this.scroll = scroll;
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
}
</style>