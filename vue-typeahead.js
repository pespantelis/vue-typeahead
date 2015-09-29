if (typeof require === 'function') {
  var Vue = require('vue')
}

Vue.component('typeahead', {
  replace : false, // importent so I can attach a click event listener
  props: {
    data: {
      type: Object
    },
    min: {
      type: Number,
      default: 0
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
  attached : function() {
    this.$el.addEventListener('click', this.clickRoot);
  },
  beforeDestroy : function() {
    this.$el.removeEventListener('click', this.clickRoot);
  },

  data: function () {
    return {
      items: [],
      query: '',
      current: 0,
      loading: false,
      show: false,
      error : false
    };
  },

  components: {
    typeaheadInput: {
      inherit: true,
      template: '<input type="text" autocomplete="off" v-model="query" v-on="keydown: down|key \'down\', keydown: up|key \'up\', keydown: hit|key \'enter\', keydown: onReset|key \'esc\', focus : focus"/>'
    }
  },
  watch : {
    query : function(v, o){
      if (v && v.length > this.min)
        this.update();
      else {
        this.loading = false;
        if (!!o && !v){
          this.onReset()
        }
      }
    },
    show : function (v, o) {
      if (this.show) {
          window.document.addEventListener('click', this.outSideClickEvent);
      } else {
          window.document.removeEventListener('click', this.outSideClickEvent);
      }
    }
  },
  computed: {
    hasItems: function () {
      return this.items.length > 0;
    },

    isEmpty: function () {
      return !this.query && !this.loading;
    },

    isDirty: function () {
      return !!this.query && !this.loading;
    }
  },
  methods: {
    update: function () {
      if (!this.query) {
        this.reset();
        return;
      }

      this.loading = true;

      this.$http.get(this.src, Object.assign({q:this.query}, this.data))
        .success(function (data) {
          this.error = false;
          if (this.query) {
            this.loading = false;
            data = this.prepareData ? this.prepareData(data) : data;
            if (Array.isArray(data)){
              this.current = 0;
              this.items = !!this.limit ? data.slice(0, this.limit) : data;
              this.show = (data.length > 0);
            }
          }
        }.bind(this))
        .error(function(){
            this.onReset();
            this.error = true;
        }.bind(this));
    },

    onReset: function() {
      this.reset();
      this.onHit(null);
    },

    reset: function () {
      this.items = [];
      this.query = '';
      this.loading = false;
      this.show = false;
    },

    setActive: function (index) {
      this.current = index;
    },

    isActive: function (index) {
      return this.current == index;
    },

    focus: function(e){
      if (this.items.length > 0)
        this.show = true;
    },

    hit: function () {
      var resp = this.onHit(this.items[this.current]);
      this.show = false;
      if (resp === false){
        this.reset();
      }
    },

    up: function () {
      if (this.current > 0) this.current--
    },

    down: function () {
      if (this.current < this.items.length-1) this.current++
    },

    clickRoot : function(e){
      if (this.show)
        e.stopPropagation();
    },

    outSideClickEvent : function(event) {
      this.show = false;
    }

  }
})
