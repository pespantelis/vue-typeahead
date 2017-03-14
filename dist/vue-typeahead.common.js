'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _vue = require('vue');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      items: [],
      query: '',
      current: -1,
      loading: false,
      query_count: 0,
      query_results: {},
      selectFirst: false,
      queryParamName: 'q'
    };
  },


  computed: {
    hasItems: function hasItems() {
      return this.items.length > 0;
    },
    isEmpty: function isEmpty() {
      return !this.query;
    },
    isDirty: function isDirty() {
      return !!this.query;
    }
  },

  methods: {
    update: function update() {
      var _this2 = this;

      if (!this.query) {
        return this.reset();
      }

      if (this.minChars && this.query.length < this.minChars) {
        return;
      }

      this.loading = true;
      this.query_count++;

      this.fetch().then(function (response) {
        if (_this2.query) {
          var data = response.data;
          data = _this2.prepareResponseData ? _this2.prepareResponseData(data) : data;
          var to_replace = _this.src;
          if (_this.queryParamName) {
            to_replace += '?' + _this.queryParamName + '=';
          }
          var search_string = decodeURIComponent(response.url.replace(to_replace, '').replace(/\+/g, '%20'));
          _this.query_results[search_string] = data;
          _this.query_count--;
          _this.current = -1;
          _this.loading = false;
          if (_this.query_count <= 0) {
            data = _this.query_results[_this.query];
            _this.items = _this.limit ? data.slice(0, _this.limit) : data;
          }

          if (_this2.selectFirst) {
            _this2.down();
          }
        }
      });
    },
    fetch: function fetch() {
      if (!this.$http) {
        return _vue.util.warn('You need to provide a HTTP client', this);
      }

      if (!this.src) {
        return _vue.util.warn('You need to set the `src` property', this);
      }

      var src = this.queryParamName ? this.src : this.src + this.query;

      var params = this.queryParamName ? (0, _assign2.default)((0, _defineProperty3.default)({}, this.queryParamName, this.query), this.data) : this.data;

      return this.$http.get(src, { params: params });
    },
    reset: function reset() {
      this.items = [];
      this.query_results = {};
      this.query_count = 0;
      this.query = '';
      this.loading = false;
    },
    setActive: function setActive(index) {
      this.current = index;
    },
    activeClass: function activeClass(index) {
      return {
        active: this.current === index
      };
    },
    hit: function hit() {
      if (this.current !== -1) {
        this.onHit(this.items[this.current]);
      }
    },
    up: function up() {
      if (this.current > 0) {
        this.current--;
      } else if (this.current === -1) {
        this.current = this.items.length - 1;
      } else {
        this.current = -1;
      }
    },
    down: function down() {
      if (this.current < this.items.length - 1) {
        this.current++;
      } else {
        this.current = -1;
      }
    },
    onHit: function onHit() {
      _vue.util.warn('You need to implement the `onHit` method', this);
    }
  }
};
