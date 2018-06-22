$(document).ready(function() {
  $(".grid-item").hide();
  var mark = $(".row").html();
  var numimage = mark.substring(mark.indexOf("/")+1, mark.indexOf("."))-1;

  for(var i = numimage; i>=1; i--){
    var img = i+".jpg";
    if(i==8||i==15||i==16){img = i+".gif";}
    $(".row").append("<div class='grid-item col s6 m4 l3'><div class='card hoverable'><div class='card-image'><img class='materialboxed' size='100%' data-caption='Programe <code> e Desenvolva' src='card/"+img+"'></div><div class='frase'><div class='card-content flow-toggle'><p class='flow-text'>...</p></div><div class='card-action'></div></div></div></div>");
    //Inicialização do Material Boxed
    $(".materialboxed").materialbox();
    //$('.grid-item').hide();
  }
  $(".icone").show();
  $(".button-collapse").sideNav();
  $(".flow-toggle").on('click', function(){
   $(this).children().toggleClass("flow-text");
 });
  var i=0;
  $('#maiszoom').on('click', function(){
    i += 1;
    i = i > 1 ? 2 : i;
    var tamnovo = i == 1 ? '33%' : '50%';
    $('.grid-item').css('width', tamnovo);
    $('.grid').masonry();
  });
  $('#menoszoom').on('click', function(){
    i -= 1;
    i = i < 1 ? 0 : i;
    var tamnovo = i == 0 ? '25%' : '33%';
    $(".grid-item").css('width', tamnovo);
    $(".grid").masonry();
  });

  $('.exibir').on('click', function(){
    if($('.image:hidden')){
      $('.image').slideDown();
    } else { 
      $('.image').slideUp();
    }
  });
  //Requisitando informações do arquivo Frases.txt e recebendo na result
  $.ajax({
    url: "Frases.txt",

    success: function(result){
      $(".frase").each(function(){
        var x = Math.floor((Math.random() * 96) + 1);
        var posini = result.indexOf(x+")");
        var texto = result.substr(posini);
        var final = texto.indexOf(" - ");
        var Frase = texto.substring(0, final);
        var autor = texto.substring(final);
        autor = autor.substring(autor.indexOf(" ")+3, autor.indexOf(","));
        var link = "<a class='red-text' href='https://www.google.com.br/search?q="+autor+"'>"+autor+"</a>";
        Frase = Frase.replace(x+")", "");
  	          //Modificando texto do elemento com esta id para o texto do resultado
             $(this).find("p").html(Frase);
             $(this).children(".card-action").html(link);
           });
  }});

  var $container = $('.grid');
  $container.imagesLoaded( function() {
    $('.grid-item').fadeIn(1000);
    $container.masonry({
      itemSelector: '.grid-item',
      //columnwidth: 100,
      //gutter: 20,
      //isFitWidth: true
    });
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
/*$(function(){
  var imagens = [
    'background/Universe5.png',
    'background/Universe1.jpg',
    'background/Universe2.jpg',
    'background/Universe6.jpg'
  ],
  index = 0,
  maxImagens = imagens.length - 1;
  var timer = setInterval(function() {
    var imagemAtual = imagens[index];
    index = (index == maxImagens) ? 0 : ++index;
    $('body').css({
      'background-image':'url('+imagemAtual+')',
      'transition': 'background 1500ms ease'
    });
  }, 3500);
});*/