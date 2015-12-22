if (typeof require === 'function') {
  var Vue = require('vue')
}

Vue.component('typeahead', {
  props: {
    query: {
      type: String,
      twoWay: true,
      default: ""
    },
    placeholder: {
      type: String,
    },
    limit: {
      type: Number,
      default: 5
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
      current: 0,
      loading: false
    }
  },

  template: 
      `<div>
          <input class="typeahead" type="text" autocomplete="off" v-model="query" placeholder={{placeholder}} @keydown.down="down" @keydown.up="up" @keyup.enter="hit" @input="update" @keyup.esc="reset" @blur="reset"/>
          <ul v-show="hasItems">
            <li v-for="item in items" track-by="$index" :class="{active: isActive($index)}" @mousedown="hit", @mousemove="setActive($index)">
                {{item}}
            </li>
          </ul>
      </div>`,

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

      var xhr = new XMLHttpRequest()
      var courses = [];
      xhr.open('GET', this.src + this.query)
      xhr.onload = function () {
          data = JSON.parse(xhr.responseText)
          data = this.prepareData ? this.prepareData(data) : data
          this.items = !!this.limit ? data.slice(0, this.limit) : data
          this.loading = false;
          this.current = 0;
        }.bind(this)
      xhr.send()
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
});
