import CarouselList from "./CarouselList";

const carouselList = {
    install: function(Vue) {
        Vue.component("CarouselList", CarouselList)
    }
}
// global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(carouselList)
}

// 导出模块
export default CarouselList