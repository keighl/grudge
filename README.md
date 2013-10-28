# Grudge

A simple plugin for displaying a modal. Adds a backdrop, a container, a close button, and throws your content inside of it. Style as you'd like.

## Usage

```js
$('.cheese-button').grudge({
  speed : 250,
  callbacks : {
    content : function () {
      return "The cheesiest cheese ever.";
    }
  }
});
```

## Init Options

The defaults:

```js
{
  speed : 250,
  classes : {
    backdrop : "grudge-backdrop",
    inner    : 'grudge-inner',
    close    : 'grudge-close'
  },
  callbacks : {
    content      : function () {},
    pre_launch   : function () {},
    post_launch  : function () {},
    pre_dismiss  : function () {},
    post_dismiss : function () {}
  }
}
```

## Methods

* init    - `$("select").grudge(OPTIONS)`
* destroy - `$("select").grudge('destroy')`

### What It Builds

```html
<div class="grudge-backdrop"></div>
<div class="grudge-inner">
  <!-- Contents of `callbacks.content` -->
  <a class="grudge-close" href="#"></a>
</div>
```

### Example CSS

```css
.grudge-backdrop {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1040;
  background: rgba(0,0,0,0.3);
}

.grudge-inner {
  display: none;
  position: absolute;
  top: 10%;
  left: 50%;
  width: 520px;
  padding: 20px;
  margin-left: -280px;
  background-color: white;
  z-index: 2040;
}

.grudge-close {
  position: absolute;
  top: -13px;
  left: -13px;
  background-image: url("btn_close.png");
  height: 25px;
  width: 25px;
  cursor: pointer;
}
```