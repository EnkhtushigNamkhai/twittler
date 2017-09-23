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

  $('.newPostLink').on('click', function() {
    $('.Post').slideDown();
    $(this).hide();
  });

  $('#PostCancel').on('click', function() {
    $('.Post').hide();
    $('.newPostLink').show();
  });

  $('#NewPostSubmit').on('click', function(){
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


    var month = date.getMonth();
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
    //create a date element
    //create tweet object
    //add to streams.users[username] the tweet
    
    //create a new node
    //add to html prepend? not append
  });




});

function loadTweets() {
  //instead of deleting streams.home, I can make a new list that copies the streams.home and read and deletes from there
  //if there is something new I add it to the list
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var createdDate = tweet.created_at;
    var month = createdDate.getMonth();
    var day = createdDate.getDate();
    var hour =  createdDate.getHours();
    var min = createdDate.getMinutes();
    var finalDate = month + '/'+ day + ', ' + hour +':' + min;

    var $tweet = $('<li></li>').addClass('tweet');

    $tweet.append($('<h2></h2>').addClass('user'),
     $('<p></p>').addClass('date'), $('<p></p>').addClass('post'),
      $('<ul></ul>').addClass('timeline'));

    $tweet.find(".user").text('@' + tweet.user);
    $tweet.find(".post").text(tweet.message);
    $tweet.find(".date").text('Posted On: ' + finalDate);
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
      var createdDate = CurTweet.created_at;
      var month = createdDate.getMonth();
      var day = createdDate.getDate();
      var hour =  createdDate.getHours();
      var min = createdDate.getMinutes();
      var finalDate = month + '/'+ day + ', ' + hour +':' + min;
      $('.Tweets-Container').find('h3').text(userName + "'s Activities");
      var $a = $('<li></li>').addClass('usertweet');
      $a.append($('<p></p>').addClass('date'), $('<p></p>').addClass('post'));
      $a.find('.date').text('Posted on: ' + finalDate);
      $a.find('.post').text(CurTweet.message);

      $('.Tweets').append($a);
    }
    $('.PopUpBack').show();
    
    // loadUserTweet(tweetsOfUser);  
}
