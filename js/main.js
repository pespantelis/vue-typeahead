var Vue = require('vue')
require('./vue-typeahead')

new Vue({
  el: 'body',

  methods: {
    goToProfile: function (item) {
        window.location.href = 'http://twitter.com/' + item.screen_name
    }
  }
})
