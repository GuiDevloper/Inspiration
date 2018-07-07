document.addEventListener('DOMContentLoaded', function(){
  var getById = function (id){
    return document.getElementById(id);
  }
  var getByClass = function (clas){
    return document.getElementsByClassName(clas);
  }
  function setCSS(els, value){
    for (var el of els){
      el.style.cssText += ";" + value;
    }
  }
// function que realiza fade em element
function fade(type, el, duration){
  var s = el.style, step = 25/(duration || 300);
  function delay() {
    if (type == 'in') {
      s.display = isFull() ? "none" : s.display;
    } else {
      s.opacity = isFull() ? 1 : s.opacity;
    }
    //Se realiza callback
    !isFull() ? setTimeout(delay, 25) : '';
    //Se esta finalizado
    function isFull(){
      return (s.opacity -= step) < 0 || (parseFloat(s.opacity) + step) > 1;
    };
  };
};

  
  setCSS(getByClass("grid-item"), "display: none");
  var mark = getByClass("row")[0].innerHTML;
  var numimage = mark.substring(
    mark.indexOf("/") + 1, mark.indexOf(".")
  ) - 1;

  for(var i = numimage; i>=1; i--){
    var img = i + ".jpg";
    if(i==8 || i==15 || i==16){
      img = i+".gif";
    }
    getByClass("row")[0].innerHTML += 
      "<div class='grid-item'><div class='card hoverable'>"+
      "<div class='card-image'><img class='materialboxed' size='100%' "+
      "data-caption='Programe <code> e Desenvolva' src='card/"+img+"'>"+
      "</div><div class='frase' id='frase"+i+"'><div class='card-content flow-toggle'>"+
      "<p class='flow-text'>...</p></div><div class='card-action' id='card-action"+i+"'></div>"+
      "</div></div></div>";
    //Inicialização do Material Boxed
    $(".materialboxed").materialbox();
  }
  setCSS(getByClass("icone"), "display: 'initial'");
  //getByClass("button-collapse")[0].sideNav();
  [...getByClass("flow-toggle")].forEach(function(elem) {
    elem.addEventListener('click', function(){
      this.children.toggleClass("flow-text");
    });
  });
  
  var i=0;
  getById('maiszoom').addEventListener('click', function(){
    i += 1;
    i = i > 1 ? 2 : i;
    var tamnovo = i == 1 ? '33%' : '50%';
    setCSS(getByClass("grid-item"), "width: " + tamnovo);
    getByClass('grid').masonry();
  });
  getById('menoszoom').addEventListener('click', function(){
    i -= 1;
    i = i < 1 ? 0 : i;
    var tamnovo = i == 0 ? '25%' : '33%';
    setCSS(getByClass("grid-item"), "width: " + tamnovo);
    getByClass('grid').masonry();
  });
  [...getByClass("exibir")].forEach(function(elem) {
    elem.addEventListener('click', function(){
      if($('.image:hidden')){
        $('.image').slideDown();
      } else { 
        $('.image').slideUp();
      }
    })
  });
var xhr = new XMLHttpRequest();
//Ajax object construído
var Ajax = {
  'send': function(url, type){
    xhr.open(type, url, true);
    xhr.send(null);
  },
  'isReady': function($this){
    return $this.readyState == 4 && $this.status == 200;
  }
};
  //Requisitando informações do arquivo Frases.txt e recebendo na result
  Ajax.send("Frases.txt", "GET");
  xhr.onreadystatechange = function() {
    if(Ajax.isReady(this)){
      var i = 1;
      [...getByClass("frase")].forEach(function(elem) {
        var x = Math.round(Math.random() * 100);
        var result = xhr.responseText;
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

  var $container = getByClass("grid");
  imagesLoaded($container, function() {
    //fade("in", getByClass("grid-item"), 1000);
    getByClass("grid-item")[0].style.display = 'block';
    $('.grid').masonry({
      itemSelector: '.grid-item',
      columnwidth: '.grid-sizer',
      //isFitWidth: true,
      percentPosition: true
      //originTop: false
    })
    //msnry.layout();
  });
}); 
/*$(".card.hoverable").on({
    mouseenter: function() {
    var tamNovo = $(this).css('height');
    $('.frase').css('height', tamNovo);
    $(this).find('.card-image').slideUp();
    $(this).find('.frase').slideDown();
  }, mouseleave: function() {
    $(this).find('.frase').slideUp();
    $(this).find('.card-image').slideDown();
  } 
});*/