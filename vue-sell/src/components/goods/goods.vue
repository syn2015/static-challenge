<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}"
              @click="selectMenu(index,$event)" :key="index">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="food-list food-list-hook" :key="index">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li @click="selectFood(food,$event)" v-for="(food,subindex) in item.foods" class="food-item border-1px" :key="subindex">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span><span class="old"
                                                                  v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol @add="addFood" :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- shopCart组件 -->
      <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice"
                :minPrice="seller.minPrice"></shopcart>
    </div>
    
    <food @add="addFood" :food="selectedFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from 'components/shopcart/shopcart';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import food from 'components/food/food';

  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [], // 保存每个food-item的高度clientHeight
        scrollY: 0,
        selectedFood: {}
      };
    },
    computed: {
      // 遍历index实现双向联动
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          // 判断区间height1和height2
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          // 排除最后一个的可能
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created() {
      // 减，折，特，保
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          // 解决vue异步更新数据的bug
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
    },
    methods: {
      selectMenu(index, event) {
        // better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true。
        // vue2.x,访问原始的 DOM 事件。可以用特殊变量 $event 把它传入方法
        // pc端不存在_constructed属性
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        // better-scroll组件,scrollToElement(el, time, offsetX, offsetY, easing) 滚动到指定的目标元素。
        this.foodsScroll.scrollToElement(el, 300);
      },
      selectFood(food, event) {
        // event参数
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      },
      addFood(target) {
        this._drop(target);
      },
      _drop(target) {
        // 体验优化,异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
        });
      },
      // 初始化滑动组件
      _initScroll() {
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });

        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          // 获取实时的位置
          probeType: 3
        });

        this.foodsScroll.on('scroll', (pos) => {
          // 先获取整数再去绝对值
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      // 计算高度,双向联动
      _calculateHeight() {
        // food-list-hook,没有实际效果,用来js选择
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    },
    components: {
      shopcart,
      cartcontrol,
      food
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
    // 等分，缩放，占位空间
      flex: 0 0 80px
      // 兼容性考虑ios设备
      width: 80px
      background: #f3f5f7
      .menu-item
      // 垂直居中，且内容可能有一行到两行
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        // 菜单激活样式
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          // background rgb(240,20,20);
          font-weight: 700
          .text
            border-none()
        // 减
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
         // 菜单名称   
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          // 1px border
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px

    
    .foods-wrapper
      flex: 1
      // 热销榜
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      // 
      .food-item
        display: flex
        margin: 18px
        // 使用padding
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        // 去掉最后一个1px border和margin-bottom
        &:last-child
          border-none()
          margin-bottom: 0
        // 图片
        .icon
        // 固定宽度57px
          flex: 0 0 57px
          margin-right: 10px
        // 商品详情
        .content
          flex: 1
          // 皮蛋
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          // 咸粥
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          // 咸粥
          .desc
            line-height: 12px
            margin-bottom: 8px
          // 月售,好评
          .extra
            .count
              margin-right: 12px
          // 价格
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          // 购买+号
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>