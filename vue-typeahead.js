import Vue from 'vue'

export default {
  data () {
    return {
      items: [],
      query: '',
      current: 0,
      loading: false
    }
  },

  ready () {
    if (! this.$http) {
      this.warn('`vue-resource` plugin')
    }

    if (! this.src) {
      this.warn('`src` property')
    }

    if (! this.onHit) {
      this.warn('`onHit` method')
    }
  },

  computed: {
    hasItems () {
      return this.items.length > 0
    },

    isEmpty () {
      return !this.query
    },

    isDirty () {
      return !!this.query
    }
  },

  methods: {
    warn (msg) {
      Vue.util.warn('Typeahead requires the ' + msg)
    },

    update () {
      if (! this.query) {
        this.reset()
        return
      }

      this.loading = true

      this.$http.get(this.src, Object.assign({q:this.query}, this.data))
        .then(function (response) {
          if (this.query) {
            var data = response.data
            data = this.prepareResponseData ? this.prepareResponseData(data) : data
            this.items = !!this.limit ? data.slice(0, this.limit) : data
            this.current = null
            this.loading = false
          }
        }.bind(this))
    },

    reset () {
      this.items = []
      this.query = ''
      this.loading = false
    },

    setActive (index) {
      this.current = index
    },

    activeClass (index) {
      return {
        active: this.current == index
      }
    },

    hit () {
      this.onHit(this.items[this.current])
    },

    up () {
      if (this.current > 0)
        this.current--
      else
        this.current = null
    },

    down () {
      if (null === this.current)
        this.current = 0
      else if (this.current < this.items.length-1)
        this.current++
    }
  }
}
