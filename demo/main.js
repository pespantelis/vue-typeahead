import Vue from 'vue'
import Axios from 'axios'
import Typeahead from './Typeahead.vue'

Vue.prototype.$http = Axios

new Vue({
  el: '#demo',
  components: {
    Typeahead
  }
})
