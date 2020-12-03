import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import App from './App.vue'
import './styles.scss'

Vue.config.productionTip = false

Vue.use(VueCompositionAPI)

new Vue({
  render: h => h(App),
}).$mount('#app')
