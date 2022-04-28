<template>
  <div class="carousel-list" ref="outBox">
    <ul
      class="move-box"
      ref="moveBox"
      :style="{ top: moveCount + 'px' }"
      @mouseleave="mouseLeaveHandle"
    >
      <li
        v-for="(item, indexOut) in visibleData"
        @click="clickOneLine(indexOut)"
        :class="{
          'active-carousel-line': activeLine === indexOut,
          'scroll-line': true,
        }"
        :style="{ height: `${oneLineHeight}px` }"
        @mouseenter="mouseEnterHandle"
        :key="item.key"
      >
        <span
          v-for="(itemIn, index) in visibleData[indexOut].row"
          :style="{
            width: !!configTrue.columnWidth[index]
              ? configTrue.columnWidth[index]
              : '60px',
            'text-align': !!configTrue.textAlign[index]
              ? configTrue.textAlign[index]
              : 'center',
            height: `${oneLineHeight}px`,
            lineHeight: `${oneLineHeight}px`,
          }"
          :key="itemIn.key"
          >{{ itemIn.text }}</span
        >
      </li>
    </ul>
  </div>
</template>

<script>
let visibleDataNum = 0;
//待解决：1key；2数据多的时候
export default {
  name: "CarouselList",
  props: {
    originData: {
      type: Array,
      default () {
        return [
          {
            key: 1,
            row: [
              { text: `text1 1`, key: `text1` },
              { text: `text2 2`, key: `text2` },
              { text: `text3 3`, key: `text3` },
            ],
          },
          {
            key: 2,
            row: [
              { text: `text1 10`, key: `text1` },
              { text: `text2 20`, key: `text2` },
              { text: `text3 30`, key: `text3` },
            ],
          },
          {
            key: 3,
            row: [
              { text: `text1 11`, key: `text1` },
              { text: `text2 21`, key: `text2` },
              { text: `text3 31`, key: `text3` },
            ],
          },
          {
            key: 4,
            row: [
              { text: `text1 12`, key: `text1` },
              { text: `text2 23`, key: `text2` },
              { text: `text3 33`, key: `text3` },
            ],
          }, {
            key: 5,
            row: [
              { text: `text1 13`, key: `text1` },
              { text: `text2 23`, key: `text2` },
              { text: `text3 33`, key: `text3` },
            ],
          },
          {
            key: 6,
            row: [
              { text: `text1 14`, key: `text1` },
              { text: `text2 24`, key: `text2` },
              { text: `text3 34`, key: `text3` },
            ],
          },
        ];
      },
    },
    config: {
      type: Object,
      speed: {
        type: Number,
        default: 2,
        require: false,
      },
      columnWidth: {
        type: Array,
        require: false,
        default () {
          return [];
        },
      },
      textAlign: {
        type: Array,
        require: false,
        default () {
          return [];
        },
      },
      clickStop: {
        type: Boolean,
        default: true,
      },
    },
  },
  data () {
    return {
      allData: this.originData,
      step: 0, //动作次数
      moveCount: 0,
      oneLoopHeight: 0,
      idRAF: "",
      timerPauseAuto: "",
      timerLastStop: "",
      lastClickItem: "",
      activeLine: "",
      isNowClickStop: false,
      visibleData: [],
      scrollLineNum: 0, //滚动掉了多少行
      allLineNum: 0, //一共多少行
      oneLineHeight: 20,
      allDataWithTail: [],
    };
  },
  computed: {
    configTrue () {
      return Object.assign(
        {
          speed: 20,
          columnWidth: [],
          textAlign: [],
          clickStop: true,
          clickStopTime: "4000",
          hoverStop: true,
        },
        this.config
      );
    },
  },
  created () {
    //console.log(this.config);
    //make more data
    //TODO
    // this.allData = [];
    // for (let i = 0; i < 14; i++) {
    // this.allData.push({
    // key: i,
    // row: [
    // { text: `text1 ${i}`, key: `text${i}1` },
    // { text: `text2 ${i}`, key: `text${i}2` },
    // { text: `text3 ${i}`, key: `text${i}3` },
    // ],
    // });
    // }
  },
  mounted () {
    this.visibleData = this.allData.slice(0, visibleDataNum);
    this.allLineNum = this.allData.length;
    console.log(this.allData, this.visibleData, this.allLineNum);
    this.$nextTick(() => {
      this.oneLoopHeight = this.$refs.moveBox.offsetHeight / 2;
      this.getSize();
      this.getLoopData();
      this.carousel();
    });
  },
  methods: {
    getLoopData () {
      this.allDataWithTail = this.allData.concat(
        this.allData.slice(0, visibleDataNum - 2)
      );
    },
    getSize () {
      visibleDataNum = this.$refs.outBox.clientHeight / this.oneLineHeight + 1;
      console.log(visibleDataNum);
    },
    mouseEnterHandle () {
      if (this.configTrue.hoverStop) {
        window.cancelAnimationFrame(this.idRAF);
      }
    },
    mouseLeaveHandle () {
      if (this.configTrue.hoverStop && !this.isNowClickStop) {
        this.idRAF = requestAnimationFrame(this.carousel);
      }
    },
    carousel () {
      this.isNowClickStop = false;
      this.activeLine = "";
      if (this.scrollLineNum == this.allLineNum - 1) {
        // console.log("one time");
        //scroll total allData
        this.scrollLineNum = 0;
        this.visibleData = this.allDataWithTail.slice(
          this.scrollLineNum,
          visibleDataNum + this.scrollLineNum
        );
        this.moveCount = 0;
        this.idRAF = requestAnimationFrame(this.carousel);
      } else {
        // console.log("------aa");
        if (
          this.step ===
          Math.floor(this.oneLineHeight / (this.configTrue.speed * 0.1))
        ) {
          // console.log("1");
          // console.log(
          // this.step,
          // oneLineHeight / (this.configTrue.speed * 0.5)
          // );
          //这一帧到了一个row的高度，顿一下的效果
          window.cancelAnimationFrame(this.idRAF);
          this.step = 0;
          this.countPause();
          //此处换掉数据并复原位置
          this.scrollLineNum++;
          this.visibleData = this.allDataWithTail.slice(
            this.scrollLineNum,
            visibleDataNum + this.scrollLineNum
          );
          this.moveCount = 0;
        } else {
          // console.log("2");
          this.moveCount = this.moveCount - this.configTrue.speed * 0.1;
          this.idRAF = requestAnimationFrame(this.carousel);
          this.step++;
        }
      }
    },
    countStopRunAgain () {
      let that = this;
      clearTimeout(this.timerPauseAuto);
      this.timerLastStop = setTimeout(
        that.carousel,
        that.configTrue.clickStopTime
      );
    },
    countPause () {
      // console.log("countPause");
      let that = this;
      this.timerPauseAuto = setTimeout(that.carousel, "1000");
    },
    clickOneLine (index) {
      this.activeLine = index;
      if (this.configTrue.clickStop) {
        this.isNowClickStop = true;
        // this.cancelAF()
        window.cancelAnimationFrame(this.idRAF);
        if (!!this.timerLastStop) {
          clearTimeout(this.timerLastStop);
        }
        this.countStopRunAgain();
      }
      console.log(this.allData[index]);
      this.$emit("clickcurrent", this.allData[index]);
    },
  },
};
</script>

<style scoped>
.carousel-list {
  display: inline-block;
  width: 250px;
  height: 80px !important;
  top: 20px;
  background: #fffd9c;
  position: relative;
  overflow: hidden;
}

.move-box {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  padding: 0;
  margin: 0;
}

li {
  display: flex;
  justify-content: space-around;
  /* height: 20px; */
  width: 250px;
}
span {
  display: inline-block;
  /* height: 20px;
line-height: 20px; */
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
}

li:hover {
  background: #ffc66c;
}

.active-carousel-line {
  background: #ffc66c;
}
</style>