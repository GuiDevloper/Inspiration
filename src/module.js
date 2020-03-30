/**
*   MIT License
*   Copyright (c) 2019 Guilherme Correia
**/

  // get element by Id
  export function getById(id, root) {
    return (root || document).getElementById(id);
  }

  // get element by class
  export function getByClass(clas, root)  {
    return (root || document).getElementsByClassName(clas);
  }

  // get element by tag
  export function getByTag(tag, root) {
    return (root || document).getElementsByTagName(tag);
  }

  // Set ou update css de elementos
  export function setStyle(els, value) {
    for (var el of Array.from(els)) {
      el.style.cssText += ";" + value;
    }
  }

  // Get length de svg
  export function getLength(els) {
    var len = 0;
    for (var el of Array.from(els).values()) {
      len += el.tagName == "path" ? el.getTotalLength() :
        (2 * Math.PI) * el.getAttribute('r');
    }
    return len;
  }

  // Ajax object construído
  Ajax = {
    'send': function(url, type) {
      var xhr = new XMLHttpRequest();
      xhr.open(type, url, true);
      xhr.send(null);
      return xhr;
    },
    'isReady': function($this) {
      return $this.readyState == 4 && $this.status == 200;
    }
  };
  export var Ajax;

  // width of screen
  export function widthBody() {
    return window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  }
