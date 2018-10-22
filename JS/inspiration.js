getById = function(id, root) {
	root = root || document;
	return root.getElementById(id);
};
getByClass = function(clas, root) {
	root = root || document;
	return root.getElementsByClassName(clas);
};
getByTag = function(tag, root) {
	root = root || document;
	return root.getElementsByTagName(tag);
};
// Set ou update css de elementos
setStyle = function(els, value) {
	for (var el of [...els]){
		el.style.cssText += ";" + value;
	}
};
//Ajax object construído
var Ajax = {
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
document.addEventListener('DOMContentLoaded', function(){
  var imgx = Ajax.send("imgs.json", "GET");
  imgx.onreadystatechange = function() {
    if(Ajax.isReady(this)){
      var imgs = JSON.parse(imgx.responseText);
      // percorre colunas de todas
      for(var col of Object.values(imgs)){
        // percorre imagem da coluna
        for(var item of Object.values(col)){
          // adiciona ao DOM
          getByClass("row")[0].innerHTML +=
            `<div class='grid-item'>
              <div class='card'>
                <div class='card-image' style="${item[2]}">
                  <img class='responsive-img' size='100%' src='${item[1]}'>
                  <a target="_blank" href="${item[0]}">Ver no Pinterest</a>
                </div>
                <div class='frase'>
                  <div class='card-content flow-toggle'>
                    <p>...</p>
                  </div>
                  <div class='card-action'></div>
                </div>
              </div>
            </div>`;
        }
      }
      getFrases();
    }
  };
  setStyle(getByClass("icone"), "display: 'initial'");

  getFrases = function() {
    //Requisitando informações do arquivo Frases.txt e recebendo na result
    var frax = Ajax.send("Frases.json", "GET");
    frax.onreadystatechange = function() {
      if(Ajax.isReady(this)){
        var Frases = JSON.parse(frax.responseText);
        [...getByClass("frase")].forEach(function(elem) {
          var sorted = sortNew(Frases);
          sorted = sorted ? sorted : sortNew(Frases);
          var frase = sorted[0];
          var autor = sorted[1];
          var link = `
          <a class='red-text' href='https://www.google.com.br/search?q=${autor}'>
            ${autor}
          </a>`;
          // trocando texto do elemento pela frase
          getByTag("p", elem)[0].innerHTML = frase;
          getByClass("card-action", elem)[0].innerHTML = link;
        });
        isLoaded();
      }
    };
  };

  var sorteados = [];
  function sortNew(Frases) {
    // sorteando
    var x = Math.round(Math.random() * 100);
    if (!sorteados.includes(x)) {
      sorteados.push(x);
      return Frases[x];
    }
    else {
      return sortNew(Frases);
    }
  }

  var i = 0;
  var icones = [getById('maiszoom'), getById('menoszoom')];
  var percs = ['25%', '33%', '50%'];
  [...icones].forEach(function(elem) {
    elem.addEventListener('click', function(){
      var mais = elem == icones[0];
      i = mais ? ++i : --i;
      i = i < 1 ? 0 : (i > 1 ? 2 : i);
      setStyle(getByClass("grid-item"), "width: " + percs[i]);
    });
  });

  var $container = getByClass("grid")[0];
  function isLoaded() {
    imagesLoaded($container, function() {
      var grids = getByClass("grid-item", $container);
      for (var i = 0, j = 0; i <= 44; i++) {
        j = j < 3 ? ++j : 0;
        setStyle([grids[i]],
          `top: ${(i > 3 ?
            parseInt(grids[i-4].style.top.replace('px', '')) +
              parseInt(grids[i-4].offsetHeight) : 0)+"px"};
          left: ${j*25 + '%'};`);
      }
      $container.style.opacity = '1';
    });
  }
  function toggle(elem, clas) {
    elem = getByClass(elem);
    for (var el of [...elem]) {
      el.classList.toggle(clas);
    }
  }
  var third = getByClass('third')[0];
  third.addEventListener('click', function(){
    toggle('card-content', 'dark');
    toggle('card-action', 'dark');
  });
});
