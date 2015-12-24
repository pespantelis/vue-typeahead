import Vue from 'vue'
import VueResource from 'vue-resource'
import VueTypeaheadMixin from 'vue-typeahead'
import VueTypeaheadTemplate from '../template.html'

Vue.use(VueResource)

Vue.component('typeahead', {
  template: VueTypeaheadTemplate,
  mixins: [VueTypeaheadMixin],
  data () {
    return {
      limit: 5,
      src: 'http://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search',
      onHit (item) {
        window.location.href = 'http://twitter.com/' + item.screen_name
      }
    }
  }
});

new Vue({
  el: 'body'
})
