import "@babel/polyfill";
import Vue from 'vue'
import header from './header.vue';

new Vue({
    render: h => h(header)
}).$mount('#app-entry')