<template>
  <div id="main">
      <Heador title="movie影院" />
      <TabBar />
  </div>
</template>

<script>
import Heador from "@/components/Header";
import TabBar from "@/components/TabBar";
export default {
  name: "Cinema",
  components: {
    Heador,
    TabBar
  }
};
</script>

<style lang="sass">

</style>