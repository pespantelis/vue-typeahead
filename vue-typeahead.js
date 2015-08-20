var Vue = require('vue')
Vue.use(require('vue-resource'))

Vue.component('typeahead', {
  props: {
    onHit: {
      type: Function,
      required: true
    },
    src: {
      type: String,
      required: true
    }
  },

  data: function () {
    return {
      items: [],
      query: '',
      current: 0
    }
  },

  components: {
    typeaheadInput: {
      template: require('./typeahead-input.html'),
      inherit: true
    }
  },

  computed: {
    hasItems: function () {
      return this.items.length > 0
    }
  },

  methods: {
    update: function () {
      this.$http.get(this.src, {q:this.query})
        .success(function (data) {
          this.items = data
          this.current = 0
        }.bind(this))
    },

    reset: function () {
      this.items = []
      this.query = ''
    },

    setActive: function (index) {
      this.current = index
    },

    isActive: function (index) {
      return this.current == index
    },

    hit: function () {
      this.onHit(this.items[this.current])
    },

    up: function () {
      if (this.current > 0) this.current--
    },

    down: function () {
      if (this.current < this.items.length-1) this.current++
    }
  }
})
