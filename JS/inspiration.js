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
      for(var col of Object.values(imgs)){
        for(var item of Object.values(col)){
          getByClass("row")[0].innerHTML +=
            "<div class='grid-item'><div class='card'>"+
            "<div class='card-image' style='"+item[2]+"'><img class='responsive-img' size='100%' "+
            "src='"+item[1]+"'><a href="+item[0]+">Ver no Pinterest</a>"+
            "</div><div class='frase'><div class='card-content flow-toggle'>"+
            "<p>...</p></div><div class='card-action'></div>"+
            "</div></div></div>";
        }
      }
      getFrases();
    }
  };
  setStyle(getByClass("icone"), "display: 'initial'");

  getFrases = function() {
    //Requisitando informações do arquivo Frases.txt e recebendo na result
    var frax = Ajax.send("Frases.txt", "GET");
    frax.onreadystatechange = function() {
      if(Ajax.isReady(this)){
        var i = 1;
        var result = frax.responseText;
        [...getByClass("frase")].forEach(function(elem) {
          var x = Math.round(Math.random() * 100);
          var posini = result.indexOf(x + ")");
          var texto = result.substr(posini);
          var final = texto.indexOf(" - ");
          var Frase = texto.substring(0, final);
          var autor = texto.substring(final);
          autor = autor.substring(
            autor.indexOf(" ")+3, autor.indexOf(",")
          );
          var link = "<a class='red-text' href='https://www.google.com.br/"+
          "search?q=" + autor + "'>" + autor + "</a>";
          Frase = Frase.replace(x + ")", "");
          //Modificando texto do elemento com esta id para o texto do resultado
          elem.getElementsByTagName("p")[0].innerHTML = Frase;
          var a = elem.getElementsByClassName("card-action");
          a[0].innerHTML = link;
          i++;
        });
      }
    };
  };

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

  var $container = getByClass("grid");
  imagesLoaded($container, function() {
    getByClass("grid-item")[0].style.display = 'block';
  });
  $(".icone.second").hover(function(){
    $(this).toggleClass('active');
  })
  $(".icone.third").on('click', function(){
    $(".card-content, .card-action").toggleClass('dark');
  })
});
