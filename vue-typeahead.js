if (typeof require === 'function') {
  var Vue = require('vue')
}

Vue.component('typeahead', {
  props: {
    data: {
      type: Object
    },
    limit: {
      type: Number,
      default: 0
    },
    onHit: {
      type: Function,
      required: true
    },
    prepareData: {
      type: Function
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
      current: 0,
      loading: false
    }
  },

  components: {
    typeaheadInput: {
      inherit: true,
      template: "<input type=\"text\" autocomplete=\"off\" v-model=\"query\" v-on=\"keydown: down|key 'down', keydown: up|key 'up', keydown: hit|key 'enter', keydown: reset|key 'esc', blur: reset, input: update\"/>"
    }
  },

  computed: {
    hasItems: function () {
      return this.items.length > 0
    },

    isEmpty: function () {
      return !this.query && !this.loading
    },

    isDirty: function () {
      return !!this.query && !this.loading
    }
  },

  methods: {
    update: function () {
      if (!this.query) {
        this.reset()
        return
      }

      this.loading = true

      this.$http.get(this.src, Object.assign({q:this.query}, this.data))
        .success(function (data) {
          if (this.query) {
            data = this.prepareData ? this.prepareData(data) : data
            this.items = !!this.limit ? data.slice(0, this.limit) : data
            this.current = 0
            this.loading = false
          }
        }.bind(this))
    },

    reset: function () {
      this.items = []
      this.query = ''
      this.loading = false
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
