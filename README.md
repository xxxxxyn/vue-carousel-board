#### vue-carousel-list
List rotate one by one 

轮播表，点击可以暂停，速度可调节，有列宽等配置项




##### 开始

npm i vue-carousel-list

yarn add vue-carousel-list

暂时只能按需引入，不能全局引入

```
import CarouselList from 'vue-carousel-list'
......
components:{
            CarouselList
        },
```



##### 使用

```
//一行行的数据，数组格式
:data="data"
//轮播的配置，详见例子
:config='config'
//example:
              data:[
                  ['a','b','c'],
                  ['a1','b1','c1'],
                  ['a2','b2','c2'],
                  ['a3','b3','c3']
              ],
              config:{
                  speed:1,//速度调节，越大越快
                  clickStop:true//点击是否暂停
                  columnWidth:["10vw","50px","80px"],//各个列宽
                  textAlign:["center","left","left"],//各列文字对齐方式
              },
//点击获取该行数据事件。接收的第一个参数就是点击行
@clickcurrent=''
```

