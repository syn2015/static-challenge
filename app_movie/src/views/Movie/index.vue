<template>
  <div id="main">
    <Heador title="movie电影" />
    <div id="content">
      <div class="movie_menu">
        <router-link class="city_name" tag="div" to="/movie/city">
          <span>{{$store.state.city.nm}}</span>
          <i class="iconfont icon-lower-triangle"></i>
        </router-link>
        <div class="hot_swtich">
          <router-link class="hot_item" tag="div" to="/movie/nowPlaying">正在热映</router-link>
          <router-link class="hot_item" tag="div" to="/movie/comingSoon">即将上映</router-link>
        </div>
        <router-link class="search_entry" tag="div" to="/movie/search">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <!-- <MessageBox /> -->
    <TabBar />
    <!-- 命名路由 -->
    <router-view name="detail" />
  </div>
</template>

<script>
import Heador from "@/components/Header";
import TabBar from "@/components/TabBar";
// messageBox
// import MessageBox from "@/components/JS/MessageBox";
import { messageBox } from "@/components/JS";
export default {
  name: "Movie",
  data() {
    return {
      isLoading: true
    };
  },
  components: {
    Heador,
    TabBar
    // MessageBox
  },
  mounted() {
    // 延迟
    setTimeout(() => {
      this.axios.get("/api/getLocation").then(res => {
        var msg = res.data.msg;
        if (msg === "ok") {
          var nm = res.data.data.nm;
          var id = res.data.data.id;
          // 和上次位置相同则停止显示弹窗
          // == 双等判断
          if (this.$store.state.city.id == id) {
            return;
          }
          messageBox({
            title: "定位",
            content: nm,
            cancel: "取消",
            ok: "切换定位",
            handleOk() {
              window.localStorage.setItem("nowNm", nm);
              window.localStorage.setItem("nowId", id);
              window.location.reload();
            }
          });
        }
      });
    }, 3000);
  }
};
</script>

<style  scoped lang="scss" >
#content {
  flex: 1;
  overflow: auto;
  margin-bottom: 50px;
  position: relative;
  display: flex;
  flex-direction: column;
  .movie_menu {
    width: 100%;
    height: 45px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    z-index: 10;
    .city_name {
      margin-left: 20px;
      height: 100%;
      line-height: 45px;
      &.router-link-active {
        color: #ef4238;
        border-bottom: 2px #ef4238 solid;
      }
    }
    .hot_swtich {
      display: flex;
      height: 100%;
      line-height: 45px;
    }
    .hot_item {
      font-size: 15px;
      color: #666;
      width: 80px;
      text-align: center;
      margin: 0 12px;
      font-weight: 700;
      &.router-link-active {
        color: #ef4238;
        border-bottom: 2px #ef4238 solid;
      }
    }
    .search_entry {
      margin-right: 20px;
      height: 100%;
      line-height: 45px;
      &.router-link-active {
        color: #ef4238;
        border-bottom: 2px #ef4238 solid;
      }
      i {
        font-size: 24px;
        color: red;
      }
    }
  }
}
</style>