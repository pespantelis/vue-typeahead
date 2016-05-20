import Vue from 'vue'
import VueResource from 'vue-resource'
import Typeahead from './Typeahead.vue'

Vue.use(VueResource)

new Vue({
  el: 'body',
  components: {
    Typeahead
  }
})
