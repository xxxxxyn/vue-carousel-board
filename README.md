#### Update Info

0428：更换一个实现方法，使用虚拟滚动，主要解决数据量大的时候的性能问题。
0509：解决条数太少报错问题

### 简介 vue-carousel-board Intro

List rotate one by one 

轮播表，点击可以暂停获取行数据，速度可调节，有列宽等配置项。
Carousel list that can be stopped by click and rerun after a few seconds; Speed, each column width etd. can be set.




#### 开始 Start

npm install vue-carousel-board

main.js内引入
import CarouselBoard from 'vue-carousel-board'
Vue.use(CarouselBoard)

#### 使用 Usage


```
//列表的数据，数组格式
//data of the list
:data="data"
//轮播的配置，详见例子
//config of carouselList, see example for detail
:config='config'
//example:
              data:[
          {
            key: 1,
            row: [
              { text: `text1 1`, key: `text1` },
              { text: `text2 2`, key: `text2` },
              { text: `text3 3`, key: `text3` },
            ],
          },
              ],
              config:{
                  speed:1,//速度调节，越大越快--Number
                  clickStop:true,//点击是否暂停--Boolean
                  clickStopTime:'4000',//点击暂停毫秒数--String
                  columnWidth:["10vw","50px","80px"],//各个列宽,要使用什么单位都行--Array
                  textAlign:["center","left","left"],//各列文字对齐方式--Array
                  hoverStop:true,//鼠标进入是否暂停
              },
//点击获取该行数据事件。接收的第一个参数就是点击行数据
@clickcurrent=''
```

