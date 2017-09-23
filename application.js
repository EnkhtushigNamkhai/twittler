$(document).ready(function(){
  var $body = $('body');
  //$body.html('');
        //how can I determine when new tweets are generated? and then display them
        //also what is the timeline suppose to have?
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



});

function loadTweets() {
  //instead of deleting streams.home, I can make a new list that copies the streams.home and read and deletes from there
  //if there is something new I add it to the list
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var createdDate = tweet.created_at;

    var $tweet = $('<li></li>').addClass('tweet');

    $tweet.append($('<h2></h2>').addClass('user'),
     $('<p></p>').addClass('date'), $('<p></p>').addClass('post'),
      $('<ul></ul>').addClass('timeline'));

    $tweet.find(".user").text('@' + tweet.user);
    $tweet.find(".post").text(tweet.message);
    $tweet.find(".date").text('Posted On: ' + tweet.created_at);
    //$(".tweet-list").append($tweet);
    $tweet.appendTo($("#tweet-list"));
    index -= 1;
  }
  emptyProcessedStream();
}

function emptyProcessedStream() {
  streams.home = [];
}

function seeTimeLine() {
   //get the user that was clicked
    //go through streams.users[username].push(newTweet);
    //list of the tweets of the user = streams.users[username]
    //display the list of tweets

    $('.Tweets').html('');
    var userName = $(this).find('.user').text().substring(1);
    // console.log(userName);
    var tweetsOfUser = streams.users[userName];

    for (var i = 0; i < tweetsOfUser.length; i++) {
      var CurTweet = tweetsOfUser[i];
      $('.Tweets-Container').find('h3').text(userName + "'s TimeLine");
      var $a = $('<li></li>').addClass('usertweet');
      $a.append($('<p></p>').addClass('date'), $('<p></p>').addClass('post'));
      $a.find('.date').text('Posted on: ' + CurTweet.created_at);
      $a.find('.post').text(CurTweet.message);

      $('.Tweets').append($a);
    }
    $('.PopUpBack').show();
    
    // loadUserTweet(tweetsOfUser);  
}
