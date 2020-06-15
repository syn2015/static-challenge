<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" />
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" />
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span><span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import star from 'components/star/star';

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false
    };
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    hideDetail() {
      this.detailShow = false;
    }
  },
  // lifetime,created
  // 对应后台数据的type
  // 减，折，特，票，保
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  components: {
    star
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
// 引用处理2x和3x的适配
@import '../../common/stylus/mixin';

.header {
  position: relative;
  overflow: hidden;
  color: #fff;
  // 搭配全屏蒙版的的filter属性
  background: rgba(7, 17, 27, 0.5);
  // 内容容器
  .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;
    // 头像
    .avatar {
      display: inline-block;
      // 对齐，和蜂鸟
      vertical-align: top;

      img {
        border-radius: 2px;
      }
    }
    // 品牌和粥品
    .content {
      display: inline-block;
      margin-left: 16px;

      .title {
        margin: 2px 0 8px 0;
        // 品牌
        .brand {
          display: inline-block;
          // 垂直对齐
          vertical-align: top;
          width: 30px;
          height: 18px;
          bg-image('brand');
          background-size: 30px 18px;
          background-repeat: no-repeat;
        }
          // 州
        .name {
          margin-left: 6px;
          font-size: 16px;
          line-height: 18px;
          font-weight: bold;
        }
      }
      // 蜂鸟
      .description {
        margin-bottom: 10px;
        line-height: 12px;
        font-size: 12px;
      }
      // 减，在线
      .support {
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          // 减
          &.decrease {
            bg-image('decrease_1');
          }
          // 折
          &.discount {
            bg-image('discount_1');
          }
          // 保
          &.guarantee {
            bg-image('guarantee_1');
          }
          //  票
          &.invoice {
            bg-image('invoice_1');
          }
          // 特
          &.special {
            bg-image('special_1');
          }
        }
        // 在线
        .text {
          line-height: 12px;
          font-size: 10px;
        }
      }
    }
    // 5个
    .support-count {
      position: absolute;
      right: 12px;
      bottom: 14px;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
      border-radius: 14px;
      background: rgba(0, 0, 0, 0.2);
      text-align: center;

      .count {
        vertical-align: top;
        font-size: 10px;
      }

      .icon-keyboard_arrow_right {
        margin-left: 2px;
        // 重新line-height,覆盖通用的line-height:1;
        line-height: 24px;
        font-size: 10px;
      }
    }
  }
   //蒙版：公告
  .bulletin-wrapper {
    // 两个span连着，因为换行符的存在会有间隙。解决：不换行或者font-size:0,font-size的副作用是省略号会消失
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: rgba(7, 17, 27, 0.2);
    // 公告
    .bulletin-title {
      display: inline-block;
      vertical-align: top;
      // margin-top的计算：(28px-12px)/2
      margin-top: 8px;
      width: 22px;
      height: 12px;
      bg-image('bulletin');
      background-size: 22px 12px;
      background-repeat: no-repeat;
    }
    // 公告文字
    .bulletin-text {
      vertical-align: top;
      margin: 0 4px;
      font-size: 10px;
    }
    // 右箭头
    .icon-keyboard_arrow_right {
      position: absolute;
      font-size: 10px;
      right: 12px;
      top: 8px;
    }
  }
//  全屏遮罩
  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    // 滤镜属性
    filter: blur(10px);
  }
  // 商品详情
  .detail {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // 超出屏幕高度不滚动
    overflow: auto;
    // 毛玻璃效果
    // backdrop-filter CSS 属性可以让你为一个元素后面区域添加图形效果（如模糊或颜色偏移）。 因为它适用于元素背后的所有元素，为了看到效果，必须使元素或其背景至少部分透明。
    backdrop-filter: blur(10px);
    opacity: 1;
    background: rgba(7, 17, 27, 0.8);
    // 定义动画
    // v-enter-active：定义进入过渡生效时的状态。
    // v-leave-active：定义离开过渡生效时的状态。
    &.fade-enter-active, &.fade-leave-active {
      transition: all 0.5s;
      // transition: all 5s;
    }
    // v-enter：定义进入过渡的开始状态。
    &.fade-enter, &.fade-leave-active {
      opacity: 0;
      background: rgba(7, 17, 27, 0);
    }
    // 前半场动画
    //  &.fade-enter, &.fade-leave {
    //   opacity: 0;
    //   background: rgba(7, 17, 27, 0);
    // }
  // css sticky footer布局，容器一，需要清除浮动
    .detail-wrapper {
      width: 100%;
      // 和视口一样高
      min-height: 100%;
    // 内容区域
      .detail-main {
        margin-top: 64px;
        padding-bottom: 64px;
        // 粥品
        .name {
          line-height: 16px;
          text-align: center;
          font-size: 16px;
          font-weight: 700;
        }
        // 星级
        .star-wrapper {
          margin-top: 18px;
          padding: 2px 0;
          text-align: center;
        }
        // 优惠信息
        .title {
          display: flex;
          width: 80%;
          margin: 28px auto 24px auto;

          .line {
            // 等分
            flex: 1;
            position: relative;
            top: -6px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }

          .text {
            padding: 0 12px;
            font-weight: 700;
            font-size: 14px;
          }
        }
        // 在线支付
        .supports {
          width: 80%;
          margin: 0 auto;
          // 每一项
          .support-item {
            padding: 0 12px;
            margin-bottom: 12px;
            font-size: 0;

            &:last-child {
              margin-bottom: 0;
            }
            // 减
            .icon {
              display: inline-block;
              width: 16px;
              height: 16px;
              vertical-align: top;
              margin-right: 6px;
              background-size: 16px 16px;
              background-repeat: no-repeat;

              &.decrease {
                bg-image('decrease_2');
              }

              &.discount {
                bg-image('discount_2');
              }

              &.guarantee {
                bg-image('guarantee_2');
              }

              &.invoice {
                bg-image('invoice_2');
              }

              &.special {
                bg-image('special_2');
              }
            }

            .text {
              line-height: 16px;
              font-size: 12px;
            }
          }
        }
        // 商家公告
        .bulletin {
          width: 80%;
          margin: 0 auto;

          .content {
            padding: 0 12px;
            line-height: 24px;
            font-size: 12px;
          }
        }
      }
    }
  // 容器二
    .detail-close {
      position: relative;
      width: 32px;
      height: 32px;
      margin: -64px auto 0 auto;
      clear: both;
      font-size: 32px;
    }
  }
}
</style>