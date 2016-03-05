# VueTypeahead

See a live demo [here](http://pespantelis.github.io/vue-typeahead/).

## Install

#### NPM
Available through npm as `vue-typeahead`.
```
npm install --save vue-typeahead
```
> Also, you need to install the [`vue-resource`](https://github.com/vuejs/vue-resource) plugin.

## Configuration
```js
import VueTypeaheadMixin from 'vue-typeahead'
import VueTypeaheadTemplate from '...'

Vue.component('typeahead', {
  template: VueTypeaheadTemplate,     // optional if you use inline-template
  mixins: [VueTypeaheadMixin],
  data () {
    return {
      src: '...',                     // required
      data: {},                       // optional
      limit: 5,                       // optional
      minChars: 3,                    // optional
      onHit (item) {                  // required
        // ...
      },
      prepareResponseData (data) {    // optional
        // data = ...
        return data;
      }
    }
  }
});
```

## Use in templates

#### Import template
You could import the template by set the `template` key like above.

#### Inline template
```html
<typeahead inline-template>
    <div class="typeahead">
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
            <li v-for="item in items" :class="activeClass($index)" @mousedown="hit" @mousemove="setActive($index)">
                <span class="name" v-text="item.name"></span>
            </li>
        </ul>
    </div>
</typeahead>
```

## Options
**template:** Import template from separate file.

**src:** The source url.

**data** The data that would be sent by request.

**limit:** Limit the number of items which is shown at the list.

**onHit:** The callback function which is triggered when the user hits on an item.

**prepareResponseData** The callback function which is triggered when the response data are received.

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
