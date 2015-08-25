# VueTypeahead

See a live demo [here](http://pespantelis.github.io/vue-typeahead/).

## Usage

### NPM
Available through npm as `vue-typeahead`.
```js
Vue.use(require('vue-resource'))
require('vue-typeahead')
```

### Direct include
You can also directly include it with a `<script>` tag when you have included Vue and VueResource globally.

## Use in templates
Then you can do this:
```html
<typeahead src="..." on-hit="{{goToPlace}}" limit="5" inline-template>
    <div>
        <typeahead-input></typeahead-input>
        <ul v-show="hasItems">
            <li v-repeat="items" v-class="active: isActive($index)" v-on="mousedown: hit, mousemove: setActive($index)">
                <span v-html="name"></span>
            </li>
        </ul>
    </div>
</typeahead>
```
> You should specify the `src` and `on-hit` attributes

## Properties
**src:** The source url.

**limit:** Limit the number of items which is shown at the list.

**onHit:** The callback function which is triggered when the user hits on an item.

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
VueTypeahead is released under the MIT Licence. See the bundled LICENSE file for details.
