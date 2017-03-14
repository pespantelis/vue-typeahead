import { util } from 'vue'

export default {
  data () {
    return {
      items: [],
      query: '',
      current: -1,
      loading: false,
      query_count: 0,
      query_results: {},
      selectFirst: false,
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
      this.query_count++

      this.fetch().then((response) => {
        if (this.query) {
          let data = response.data
          data = this.prepareResponseData ? this.prepareResponseData(data) : data
          let to_replace = _this.src
          if (_this.queryParamName) {
            to_replace += '?' + _this.queryParamName + '='
          }
          let search_string = decodeURIComponent(response.url.replace(to_replace, '').replace(/\+/g, '%20'))
          _this.query_results[search_string] = data
          _this.query_count--
          _this.current = -1
          _this.loading = false
          if (_this.query_count <= 0) {
            data = _this.query_results[_this.query]
            _this.items = _this.limit ? data.slice(0, _this.limit) : data
          }

          if (this.selectFirst) {
            this.down()
          }
        }
      })
    },

    fetch () {
      if (!this.$http) {
        return util.warn('You need to provide a HTTP client', this)
      }

      if (!this.src) {
        return util.warn('You need to set the `src` property', this)
      }

      const src = this.queryParamName
        ? this.src
        : this.src + this.query

      const params = this.queryParamName
        ? Object.assign({ [this.queryParamName]: this.query }, this.data)
        : this.data

      return this.$http.get(src, { params })
    },

    reset () {
      this.items = []
      this.query_results = {}
      this.query_count = 0
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
