export default {
  data () {
    return {
      items: [],
      query: '',
      current: 0,
      loading: false
    }
  },

  computed: {
    hasItems () {
      return this.items.length > 0
    },

    isEmpty () {
      return !this.query && !this.loading
    },

    isDirty () {
      return !!this.query && !this.loading
    }
  },

  methods: {
    update () {
      if (!this.query) {
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
            this.current = 0
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

    isActive (index) {
      return this.current == index
    },

    hit () {
      this.onHit(this.items[this.current])
    },

    up () {
      if (this.current > 0) this.current--
    },

    down () {
      if (this.current < this.items.length-1) this.current++
    }
  }
}
