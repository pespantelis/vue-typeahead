import { util } from 'vue'

export default {
  data () {
    return {
      items: [],
      query: '',
      current: -1,
      loading: false,
      queryParamName: 'q'
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
    update () {
      if (!this.query) {
        return this.reset()
      }

      if (this.minChars && this.query.length < this.minChars) {
        return
      }

      this.loading = true

      this.fetch().then((response) => {
        if (this.query) {
          let data = response.data
          data = this.prepareResponseData ? this.prepareResponseData(data) : data
          this.items = this.limit ? data.slice(0, this.limit) : data
          this.current = -1
          this.loading = false
        }
      })
    },

    fetch () {
      if (!this.$http) {
        return util.warn('You need to install the `vue-resource` plugin', this)
      }

      if (!this.src) {
        return util.warn('You need to set the `src` property', this)
      }

      if (!this.queryParamName && this.src.substr(-1) !== '/') {
        this.src += '/'
      }

      const src = this.queryParamName
        ? this.src
        : this.src + this.query

      const params = this.queryParamName
        ? Object.assign({ [this.queryParamName]: this.query }, this.data)
        : this.data

      return this.$http.get(src, params)
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
        active: this.current === index
      }
    },

    hit () {
      if (this.current !== -1) {
        this.onHit(this.items[this.current])
      }
    },

    up () {
      if (this.current > 0) {
        this.current--
      } else if (this.current === -1) {
        this.current = this.items.length - 1
      } else {
        this.current = -1
      }
    },

    down () {
      if (this.current < this.items.length - 1) {
        this.current++
      } else {
        this.current = -1
      }
    },

    onHit () {
      util.warn('You need to implement the `onHit` method', this)
    }
  }
}
