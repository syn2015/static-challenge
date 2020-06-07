<template>
  <div id="main">
    <Heador title="我的movie" />
    <div id="content">
      <Login />
    </div>
    <TabBar />
  </div>
</template>

<script>
import Heador from "@/components/Header";
import TabBar from "@/components/TabBar";
import Login from "@/components/Login";
export default {
  name: "Mine",
  components: {
    Heador,
    TabBar,
    Login
  }
};
</script>

<style  scoped>
</style>