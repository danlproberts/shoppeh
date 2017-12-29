var searchDelay = 500;
var resultDelay = 750;
var resultIncrement = 250;

$(document).ready(function() {

  $('#search-form').submit(searchPressed);

  $('.panel').click(function() {
  $(this).toggleClass('panel-default--selected rubber');
  $(this).delay(100).animate({
    // left: "+=500%"
  }, 600, "swing", function() {
    // $('.panel').animate({
    //   opacity: 0
    // }, 600, "linear");
  });
  });
  // var results = $('.search-results');

  var helpResult =  htmlFromResultItem(
    '"Results will appear here!"',
    'Example example example.',
    ''
  );
  var firstItem = `
    ${helpResult}
  `;
  var results = $('.search-results');

  results.html('');
  results.children().each(function() {
    var me = $(this);
    animateIn( me );
  });


});

function searchPressed(e) {
  if(e) e.preventDefault();

  var search = $('#main-search-form').val();
  var results = $('.search-results');
  var helptxt = $('.help-text')

  document.getElementById("search-value").innerHTML = search

  // TODO: Change this info for help
  var helpResult = htmlFromResultItem(
    'Need extra help?',
    'We can help you within 24 hours.',
    '',
    ''
  );
  results.html('');


  console.log(helpResult);

  // Initial animation
  $('body').removeClass('push-down');
  helptxt += '"' + search + '"'
  $('.help-text').show();

    var host = 'http://localhost:5000';
    //var host = 'http://192.168.1.239:8080';
    var url = host + "/search_api?query=" + search;

    // Query search api
    $.get(url, function(res) {

      // Present data
      var html = '';
      if( typeof res === 'object') {
        res.forEach(function(item) {
          if (typeof item === 'string') {

            document.getElementById("search-count").innerHTML = item

          } else {

            html += htmlFromResultItem(item.name, item.des, item.img, item.link);

          }
        });


      //document.getElementById("search-count").innerHTML = ;

      }

      results.html(html);
      results.children().each(function() {
        var me = $(this);
        setTimeout( function(){ animateIn( me ); }, resultDelay);
        resultDelay += resultIncrement;
      });
    });
  };

function htmlFromResultItem(name, description, img, link) {

  var desvalue = '<p class="des">' + description + '</p>'
  var imgvalue = '<p class="image"><img src="' + img + '" height="200"></img></p>'
  var linkvalue = '<a href="' + link + '" target="_blank"><div class="row">'

  if (description === undefined) {
    var desvalue = ""
  }
  if (link === undefined) {
    var linkvalue = ""
  }
  if (img === undefined) {
    var imgvalue = ""
  }
  return ''
    + '<div class="panel panel-default animated hide anim-target fadeIn">'
    + linkvalue
    + '<div class="col-xs-8">'
    + '<div class="panel-body">'
    + '<h3>' + name + '</h3>'
    + desvalue
    + imgvalue
    + '</div>'
    + '</div>'
    + '</div></a>'
    + '</div>'
}

function animateIn(panel) {
  panel.removeClass('hide');
}
