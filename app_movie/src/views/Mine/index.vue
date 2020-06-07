<template>
  <div id="main">
    <Heador title="我的movie" />
    <TabBar />
  </div>
</template>

<script>
import Heador from "@/components/Header";
import TabBar from "@/components/TabBar";
export default {
  name: "Mine",
  components: {
    Heador,
    TabBar
  }
};
</script>

<style  scoped>

 
</style>