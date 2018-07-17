
$(document).ready(function() {
  
   var userNames = ["OgamingSC2", "cretetion", "freecodecamp", "storbeck", "noobs2ninjas","habathcx", "RobotCaleb", ];
  
   function result(pic, url, name, condition) {
     var img = '<img src="' + pic + '" class="logo" alt="logo" />';
     var username = '<a href="' + url + '" target="_blank">' + name + '</a>';
     var status = condition;
     var onOff = 'online';
     if (condition == "Offline") {
       status = '<em>Offline</em>';
       onOff = 'offline';
     } else {
       status;
     }
     var html = '<div class="channel-box ' + onOff + '"><div class="row"><div class="col-xs-4"><div class="channel-pic">' + img + '</div></div><div class="col-xs-4"><div class="channel-name">' + username + '</div></div><div class="col-xs-4"><div class="channel-stat col-sm-4"><em>' + status + '</em></div></div></div></div>';
     $("#channels").append(html);
   };

   function getStreamer(name) {
     var url = 'https://api.twitch.tv/kraken/streams/' + name + '?client_id=fqyful2jo8i7y6v9lbphpsbz27n13en';
     $.getJSON(url, function(data) {
       if (data.stream === null) {
         $.getJSON('https://api.twitch.tv/kraken/channels/' + name + '?client_id=fqyful2jo8i7y6v9lbphpsbz27n13en', function(data) {
           result(data.logo, data.url, name, "Offline");
         });
       } else {
         $.getJSON(url, function(data) {
           result(data.stream.channel.logo, data.stream.channel.url, name, data.stream.game);
         });
       }
     });
   };

   for (var i = 0; i < userNames.length; i++) {
     getStreamer(userNames[i]);
   };

   $("#all").on("click", function() {
     $(".offline").show();
     $(".online").show();
   })

   $("#offline").on("click", function() {
     $(".offline").show();
     $(".online").hide();
   });

   $("#online").on("click", function() {
     $(".online").show();
     $(".offline").hide();
   });

 });