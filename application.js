var fonts = [{'font-family': 'Leckerli One, cursive'},
{'font-family': 'Chewy, cursive'}, {'font-family': 'Cabin Sketch, cursive'}, {'font-family': 'Pacifico, cursive'},
{'font-family': 'Montserrat, sans-serif'}];
var fontIndex = 0;



$(document).ready(function(){
  var $body = $('body');
  //$body.html('');
        //how can I determine when new tweets are generated? and then display them
        //also what is the timeline suppose to have?
  //have an global index of where I last read from
  loadTweets();
  
  $('#More').on('click',function() {
      console.log('button clicked');
      loadTweets();

  });

  
  //clicks on the whole box
  $('#tweet-list').on('click', '.tweet' , seeTimeLine);



  $('#tweet-list').on('mouseleave', '.tweet',function() {
    //toggle class highlighted
    $(this).removeClass('highlighted');
    $(this).find('.user').css('color', 'black')
    $(this).animate({'top': '0px'}, 100);

  });

  $('#tweet-list').on('mouseenter', '.tweet' ,function() {
    //toggle class highlighted
    $(this).addClass('highlighted');
    $(this).find('.user').css('color', '#2E86C1')
    $(this).animate({'top': '-5px'}, 100);
  });

  //on clsoe button hide
  $('.close').on('click', function() {
    $('.PopUpBack').hide();
    $('.Tweets').html('');
  });

  $('.newPostLink').on('click', function() {
    $('.Post').slideDown();
    $(this).hide();
  });

  $('#PostCancel').on('click', function() {
    $('.Post').hide();
    $('.newPostLink').show();
    $('#userNameInput').val("");
    $('#ContentInput').val("");
  });

  $('#NewPostSubmit').on('click', SubmitEventHandler);
  
  $('body').keypress(function(e){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    // console.log(keycode == '13');

    if ($('.Post').is(":visible") && keycode == '13') {
      console.log('calls func');
      SubmitEventHandler();
    }
  });

  // Change the fonts when the logo is clicked
  $('.logo').on('click', function() {
    if (fontIndex === fonts.length) {
      fontIndex = 0;
    }
    console.log(fontIndex);
    $('.logo').css(fonts[fontIndex]);
    fontIndex++;
  });
});

/******************* Event handler for loading the Tweets on Home Page ***********************/

function loadTweets() {
  //instead of deleting streams.home, I can make a new list that copies the streams.home and read and deletes from there
  //if there is something new I add it to the list
  var index = 0;
  while(index <= streams.home.length - 1){
    var tweet = streams.home[index];
    var createdDate = tweet.created_at;
    var month = createdDate.getMonth() + 1;
    var day = createdDate.getDate();
    var hour =  createdDate.getHours();
    var min = createdDate.getMinutes();
    var sec = createdDate.getSeconds();
    var finalDate = month + '/'+ day + ', ' + hour +':' + min + ':' +sec;

    var $tweet = $('<li></li>').addClass('tweet');
    $tweet.append($('<h2></h2>').addClass('user'),
    $('<p></p>').addClass('date'), $('<p></p>').addClass('post'),
    $('<ul></ul>').addClass('timeline'));

    $tweet.find(".user").text('@' + tweet.user);
    $tweet.find(".post").text(tweet.message);
    $tweet.find(".date").text('Posted On: ' + finalDate);
    $tweet.prependTo($("#tweet-list"));
    index += 1;
  }
  emptyProcessedStream();
}

function emptyProcessedStream() {
  streams.home = [];
}

/******************* Event handler for seeing the TimeLine ***********************/

function seeTimeLine() {
  $('.Tweets').html('');
  // Get User's name and find all the tweets of user
  var userName = $(this).find('.user').text().substring(1);
  var tweetsOfUser = streams.users[userName];
  //Go through all the tweets of the user
  for (var i = 0; i < tweetsOfUser.length; i++) {
    var CurTweet = tweetsOfUser[i];
    var createdDate = CurTweet.created_at;
    var month = createdDate.getMonth() + 1;
    var day = createdDate.getDate();
    var hour =  createdDate.getHours();
    var min = createdDate.getMinutes();
    var finalDate = month + '/'+ day + ', ' + hour +':' + min;
    $('.Tweets-Container').find('h3').text(userName + "'s Activities");
    var $a = $('<li></li>').addClass('usertweet');
    $a.append($('<p></p>').addClass('date'), $('<p></p>').addClass('post'));
    $a.find('.date').text('Posted on: ' + finalDate);
    $a.find('.post').text(CurTweet.message);
    $('.Tweets').prepend($a);
  }
  //After constructing the timeline, show it
  $('.PopUpBack').show();
}

/******************* Event handler for the Submit Button (for Posting) ***********************/

function SubmitEventHandler(){
    //read the username and post
    var userName = $('#userNameInput').val();
    var content = $('#ContentInput').val();
    if (streams.users[userName] === undefined) {
      streams.users[userName] = [];
    }
     
    var date = new Date();
    var tweet = {};
    tweet.user = userName;
    tweet.message = content;
    tweet.created_at = date;
    addTweet(tweet);


    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour =  date.getHours();
    var min = date.getMinutes();
    var finalDate = month + '/'+ day + ', ' + hour +':' + min;

    var $tweet = $('<li></li>').addClass('tweet');

    $tweet.append($('<h2></h2>').addClass('user'),
    $('<p></p>').addClass('date'), $('<p></p>').addClass('post'),
    $('<ul></ul>').addClass('timeline'));

    $tweet.find(".user").text('@' + userName);
    $tweet.find(".post").text(content);
    $tweet.find(".date").text('Posted On: ' + finalDate);
    $tweet.prependTo($("#tweet-list"));
    $('.Post').hide();
    $('.newPostLink').show();
    $('#userNameInput').val("");
    $('#ContentInput').val("");
}
