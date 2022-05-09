import Vue from 'vue'
import App from './App.vue'
import CarouselBoard from './lib/index.js'
Vue.use(CarouselBoard)
new Vue({
  el: '#app',
  render: h => h(App)
})
