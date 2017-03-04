# VueTypeahead

See a live demo [here](http://pespantelis.github.io/vue-typeahead/).

## Install

#### NPM
Available through npm as `vue-typeahead`.
```
npm install --save vue-typeahead
```
> Also, you need to install a HTTP client like [`axios`](https://github.com/mzabriskie/axios).

## Usage
If you are using `vue@1.0.22+`, you could use the new [`extends`](http://vuejs.org/api/#extends) property (see below).

Otherwise, the `mixins` way also works.

```html
<template>
  <div>
    <!-- optional indicators -->
    <i class="fa fa-spinner fa-spin" v-if="loading"></i>
    <template v-else>
      <i class="fa fa-search" v-show="isEmpty"></i>
      <i class="fa fa-times" v-show="isDirty" @click="reset"></i>
    </template>

    <!-- the input field -->
    <input type="text"
           placeholder="..."
           autocomplete="off"
           v-model="query"
           @keydown.down="down"
           @keydown.up="up"
           @keydown.enter="hit"
           @keydown.esc="reset"
           @blur="reset"
           @input="update"/>

    <!-- the list -->
    <ul v-show="hasItems">
      <!-- for vue@1.0 use: ($item, item) -->
      <li v-for="(item, $item) in items" :class="activeClass($item)" @mousedown="hit" @mousemove="setActive($item)">
        <span v-text="item.name"></span>
      </li>
    </ul>
  </div>
</template>

<script>
import VueTypeahead from 'vue-typeahead'

export default {
  extends: VueTypeahead, // vue@1.0.22+
  // mixins: [VueTypeahead], // vue@1.0.21-

  data () {
    return {
      // The source url
      // (required)
      src: '...',

      // The data that would be sent by request
      // (optional)
      data: {},

      // Limit the number of items which is shown at the list
      // (optional)
      limit: 5,

      // The minimum character length needed before triggering
      // (optional)
      minChars: 3,

      // Highlight the first item in the list
      // (optional)
      selectFirst: false,

      // Override the default value (`q`) of query parameter name
      // Use a falsy value for RESTful query
      // (optional)
      queryParamName: 'search'
    }
  },

  methods: {
    // The callback function which is triggered when the user hits on an item
    // (required)
    onHit (item) {
      // alert(item)
    },

    // The callback function which is triggered when the response data are received
    // (optional)
    prepareResponseData (data) {
      // data = ...
      return data
    }
  }
}
</script>

<style>
  li.active {
    /* ... */
  }
</style>
```

## Key Actions
**Down Arrow:** Highlight the previous item.

**Up Arrow:** Highlight the next item.

**Enter:** Hit on highlighted item.

**Escape:** Hide the list.

## States
**loading:** Indicates that awaits the data.

**isEmpty:** Indicates that the input is empty.

**isDirty:** Indicates that the input is not empty.
> Useful if you want to add icon indicators (see the demo)

## License
VueTypeahead is released under the MIT License. See the bundled LICENSE file for details.
