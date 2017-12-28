var searchDelay = 500;
var resultDelay = 750;
var resultIncrement = 250;

var userLocation = {};

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
    'www.gsk.com'
  );
  var firstItem = `
    ${helpResult}
  `;
  var results = $('.search-results');

  results.html(firstItem);
  results.children().each(function() {
    var me = $(this);
    animateIn( me );
  });


});

function searchPressed(e) {
  if(e) e.preventDefault();

  var search = $('#main-search-form').val();
  var results = $('.search-results');

  // TODO: Change this info for help
  var helpResult = htmlFromResultItem(
    'Need extra help?',
    'We can help you within 24 hours.',
    'mailto:support@donotpay.co.uk'
  );
  results.html('');


  console.log(helpResult);

  // Initial animation
  $('body').removeClass('push-down');
  $('.help-text').show();

    //var host = 'https://donotpay-search-master.herokuapp.com';
    var host = 'http://localhost:5000';
    var url = host;

    // Query search api
    $.get(url, function(res) {

      // Present data
      var html = '';
      if( typeof res === 'object') {
        res.forEach(function(item) {
          html += htmlFromResultItem(item.name, item.stock);
        });
      }

      results.html(html + helpResult + typeof res);
      results.children().each(function() {
        var me = $(this);
        setTimeout( function(){ animateIn( me ); }, resultDelay);
        resultDelay += resultIncrement;
      });
    });
  };

function htmlFromResultItem(name, description, link) {
  return ''
    + '<div class="panel panel-default animated flipInX hide anim-target rubberBand">'
    + '<div class="row">'
    + '<div class="col-xs-8">'
    + '<div class="panel-body">'
    + '<h3>' + name + '</h3>'
    + '<p>' + description + '</p>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '</div>'
}

function animateIn(panel) {
  panel.removeClass('hide');
}