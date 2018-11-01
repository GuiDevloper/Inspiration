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
// width of screen
var widthBody = function() {
  return window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;
};
window.addEventListener('resize', function() {
  loadGrid();
});
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
          getByClass("grid")[0].innerHTML +=
            `<div class='grid-item'>
              <div class='card'>
                <div class='image' style="${item[2]}">
                  <img class='responsive-img' size='100%' src='${item[1]}'>
                  <a target="_blank" href="${item[0]}">Ver no Pinterest</a>
                </div>
                <div class='frase'>
                  <div class='content flow-toggle'>
                    <p>...</p>
                  </div>
                  <div class='action'></div>
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
          <a class='red-text'  target="_blank" href='https://www.google.com.br/search?q=${autor}'>
            ${autor}
          </a>`;
          // trocando texto do elemento pela frase
          getByTag("p", elem)[0].innerHTML = frase;
          getByClass("action", elem)[0].innerHTML = link;
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
  var percs = [25, 33, 50, 100];
  [...icones].forEach(function(elem) {
    elem.addEventListener('click', function(){
      var mais = elem == icones[0];
      i = mais ? ++i : --i;
      i = i < 1 ? 0 : (i > 2 ? 3 : i);
      setStyle(getByClass("grid-item"), `width: ${percs[i]}%`);
      // Reload positions
      loadGrid([i == 0 ? 3 : (i == 1 ? 2 : (i == 2 ? 1 : 0))+1, percs[i]]);
    });
  });

  var $container = getByClass("grid")[0];
  function isLoaded() {
    imagesLoaded($container, function() {
      loadGrid();
      $container.style.opacity = '1';
    });
  }
  // recarrega cards em grid
  window.loadGrid = function(preWid) {
    var grids = getByClass("grid-item", $container);
    var width = widthBody();
    // recebe vezes e % baseado no tamanho da tela
    var cWid = preWid ? preWid : (width > 1000 ? [4, 25] : (
      width > 769 ? [3, 33] :
        (width > 381 ? [2, 50] : [1, 100])
    ));
    // muda tamanho da fonte caso necessário
    setStyle(getByTag("body"),
      `font-size: ${width < 381 ? 0.9 : 1.2 }rem;`
    );
    for (var i = 0, j = 0; i <= 44; i++) {
      // usa armazenados, pega anteriores
      setStyle([grids[i]],
        `top: ${(i > (cWid[0]-1) ?
          parseInt(grids[i - cWid[0]].style.top.replace('px', '')) +
          parseInt(grids[i - cWid[0]].offsetHeight) : 0) + "px"};
          left: ${j * cWid[1] + '%'};`);
      // ++ se vezes atual for menor que o vezes armazenado
      j = j < (cWid[0]-1) ? ++j : 0;
    }
  };
  function toggle(elem, clas) {
    elem = getByClass(elem);
    for (var el of [...elem]) {
      el.classList.toggle(clas);
    }
  }
  var third = getByClass('third')[0];
  third.addEventListener('click', function(){
    toggle('content', 'dark');
    toggle('action', 'dark');
  });
});
