function requireFields() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var name = document.getElementById('name').value;
  var age = document.getElementById('age').value;
  var location = document.getElementById('location').value;
  var phone = document.getElementById('phone').value;

  if (username == '' || password == '' || name == '' || age == '' || location == '' || phone == '') {
    alert("All fields must be filled in");
    return false;
  } else {
    return true;
  }
  
}

function clickEventRegister() {
  if (requireFields() === true) {
    register();
  }
}

function incorrectUser() {
  alert("Incorrect username or password");
}

function showPostEntry() {
   var x = document.getElementById('post_entry');
   var y = document.getElementById('ride_entry');
   if (y.style.display === 'block') {
      y.style.display = 'none';
   }
   if (x.style.display === 'block') {
      x.style.display = 'none';
   } else {
      x.style.display = 'block';
   }
}

function showRideEntry() {
   var x = document.getElementById('post_entry');
   var y = document.getElementById('ride_entry');
   if (x.style.display === 'block') {
      x.style.display = 'none';
   }
   if (y.style.display === 'block') {
      y.style.display = 'none';
   } else {
      y.style.display = 'block';
   }
}

function showImageEntry() {
   var x = document.getElementById('image_entry');
   var y = document.getElementById('video_entry');
   if (y.style.display === 'block') {
      y.style.display = 'none';
   }
   if (x.style.display === 'block') {
      x.style.display = 'none';
   } else {
      x.style.display = 'block';
   }
}

function showVideoEntry() {
   var x = document.getElementById('image_entry');
   var y = document.getElementById('video_entry');
   if (x.style.display === 'block') {
      x.style.display = 'none';
   }
   if (y.style.display === 'block') {
      y.style.display = 'none';
   } else {
      y.style.display = 'block';
   }
}

function hideLogin() {
   $('#login').css({
      "display" : "none"
   });
   $('#button_logout').css({
      "display" : "block"
   });
}

function showLogin() {
   document.getElementById('username').value = '';
   document.getElementById('password').value = '';
   $('#button_logout').css({
      "display" : "none"
   });
   $('#login').css({
      "display" : "block"
   });
}

function clearPostEntry() {
  document.getElementById('post_entry_box').value = '';
}

function moreInfo() {
  var x = document.getElementById('information');
  var y = document.getElementById('button_showMore');
  var z = document.getElementById('button_register');
  var r = document.getElementById('login_inputs');
  var t = document.getElementById('login_text');
    x.style.display = 'block';
    y.style.display = 'none';
    z.style.display = 'inline-block';
    r.style.height = '258px';
    t.innerHTML = 'Register';
    
}

function lessInfo() {
  var x = document.getElementById('information');
  var y = document.getElementById('button_showMore');
  var z = document.getElementById('button_register');
  var r = document.getElementById('login_inputs');
  var t = document.getElementById('login_text');
    x.style.display = 'none';
    y.style.display = 'inline-block';
    z.style.display = 'none';
    r.style.height = '128px';
    t.innerHTML = 'Login';

  document.getElementById('name').value = '';
  document.getElementById('age').value = '';
  document.getElementById('location').value = '';
  document.getElementById('phone').value = '';
    
}

function isLoggedIn() {
  var url1 = "http://localhost:8080/dashboard";
    $.ajax({url:url1, dataType: "text", success: function(data) {
      var dataString = data.toString();
      if (dataString !== "Hey you are not logged in") {
        hideLogin();
      }
    }, error: function(errorThrown) {
      alert(errorThrown);
    }
  })
}

function login(event, button_login) {
   var username = document.getElementById("username").value;
   var password = document.getElementById("password").value;
   current_user = username;

   var data = { "username" : username,
                "password" : password
              }

   $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/login',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function(data) {
         alert("Welcome " + username);
         hideLogin();
      }, error: function(errorThrown) {
         alert(errorThrown);
         incorrectUser();
      }
   });
}

function register(event, button_register) {
   var username = document.getElementById('username').value;
   var password = document.getElementById('password').value;
   var name = document.getElementById('name').value;
   var age = document.getElementById('age').value;
   var location = document.getElementById('location').value;
   var phone = document.getElementById('phone').value;

   var data = { "username" : username,
                "password" : password,
                "name" : name,
                "age" : age,
                "location" : location,
                "phone" : phone
                
              }

   $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/register',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function(data) {
         alert("Account successfully created! You may now log in.");
         lessInfo();
      }, error: function(errorThrown) {
          alert("This username already exists");
      }
   });
}

function logout(event, button_logout) {
   $.ajax({
      type: 'GET',
      url: 'http://localhost:8080/logout',

      success: function() {
         alert("Successfully logged out");
         showLogin();
      }, error: function(errorThrown) {
         alert(errorThrown);
      }
   });
}

function createPost() {
  var url1 = "http://localhost:8080/dashboard";
    $.ajax({url:url1, dataType: "text", success: function(data) {
      var dataString = data.toString();
      if (dataString !== "Hey you are not logged in") {
        var dataArray = data.split("*");
        var post_user = dataArray[1];
        var post_content = document.getElementById('post_entry_box').value;
        console.log(post_content.length);
        if (post_content.length > 1200) {
          alert("Posts are limited to 1200 characters")
        } else {
          var data = { "post_content" : post_content,
                       "post_user" : post_user
                     }

          $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/post',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(data) {
              alert("Post successfully posted");
              clearPostEntry();
              window.location.reload();
              loadPosts();
            }, error: function(errorThrown) {
              alert(errorThrown);
            }
          });
        }
      } else {
      alert("You must log in to make a post");
      }
    }, error: function(errorThrown) {
      alert(errorThrown);
    }
  })

    
  //}
}

function loadPosts() {
  var url2 = "http://localhost:8080/postData";
    $.ajax({url:url2, dataType: "text", success: function(data) {
      var dataArray = data.split("*");
      //console.log(dataArray);
      var count = (dataArray.length-1)/3;
      var i = dataArray.length - 1;

      for (count, i; count > 0, i > 0; --count, i = i - 3) {
        $('#post' + count).css({
            "display" : "block"
          });
        //$("#post" + count).append(dataArray[i - 3]);
        $("#user" + count).append(dataArray[i - 2]);
        $("#content" + count).append(dataArray[i - 1]);
        
      }
    }, error: function(errorThrown) {
      alert(errorThrown);
    }
    })
}

function loadMyPosts() {
  var url2 = "http://localhost:8080/myPostData";
    $.ajax({url:url2, dataType: "text", success: function(data) {
      var dataArray = data.split("*");
      var count = (dataArray.length-1)/3;
      var i = dataArray.length - 1;

      for (count, i; count > 0, i > 0; --count, i = i - 3) {
        $('#post' + count).css({
            "display" : "block"
          });
        //$("#post" + count).append(dataArray[i - 3]);
        $("#user" + count).append(dataArray[i - 2]);
        $("#content" + count).append(dataArray[i - 1]);
        
      }
    }, error: function(errorThrown) {
      alert(errorThrown);
    }
    })
}

function loadMyAccount() {
  var url1 = "http://localhost:8080/dashboard";
    $.ajax({url:url1, dataType: "text", success: function(data) {
      var dataString = data.toString();
      if (dataString !== "Hey you are not logged in") {
        var dataArray = data.split("*");
        var username = dataArray[1];
        var url2 = "http://localhost:8080/userData/" + username;
          $.ajax({url:url2, dataType: "text", success: function(data) {
            var dataArray = data.split(/[\n:]+/);
            $("#name").append(dataArray[3]);
            $("#age").append(dataArray[5]);
            $("#location").append(dataArray[7]);
            $("#phone").append(dataArray[9]);
          }, error: function(errorThrown) {
            alert(errorThrown);
          }
          })
      } else {
        alert("You must be logged in to see Account");
        window.location = "http://localhost:8080/index.html";
      }
    }, error: function(errorThrown) {
    alert(errorThrown);
    }
    })
}

// function loadAccount(user) {
//   var username = user;
//         var url2 = "http://localhost:8080/userData/" + username;
//           $.ajax({url:url2, dataType: "text", success: function(data) {
//             var dataArray = data.split(/[\n:]+/);
//             $("#name_target").innerHTML = dataArray[3];
//             $("#age").append(dataArray[5]);
//             $("#location").append(dataArray[7]);
//             $("#phone").append(dataArray[9]);
//           }, error: function(errorThrown) {
//             alert(errorThrown);
//           }
//           }) 
// }

function navigateToAccount() {
  document.getElementById("user1").onclick = function(){
    var user = document.getElementById("user1").innerHTML;
    window.location = "http://localhost:8080/userData/" +user;
    
  }
  document.getElementById("user2").onclick = function(){
    var user = document.getElementById("user2").innerHTML;
    window.location = "http://localhost:8080/userData/" + user;
  }
  document.getElementById("user3").onclick = function(){
    var user = document.getElementById("user3").innerHTML;
    window.location = "http://localhost:8080/userData/" + user;
  }
  document.getElementById("user4").onclick = function(){
    var user = document.getElementById("user4").innerHTML;
    window.location = "http://localhost:8080/userData/" + user;
  }
  document.getElementById("user5").onclick = function(){
    var user = document.getElementById("user5").innerHTML;
    window.location = "http://localhost:8080/userData/" + user;
  }
  document.getElementById("user6").onclick = function(){
    var user = document.getElementById("user6").innerHTML;
    window.location = "http://localhost:8080/userData/" + user;
  }
  document.getElementById("user7").onclick = function(){
    var user = document.getElementById("user7").innerHTML;
    window.location = "http://localhost:8080/userData/" + user;
  }
  document.getElementById("user8").onclick = function(){
    var user = document.getElementById("user8").innerHTML;
    window.location = "http://localhost:8080/userData/" + user;
  }
  document.getElementById("user9").onclick = function(){
    var user = document.getElementById("user9").innerHTML;
    window.location = "http://localhost:8080/userData/" + user;
  }
  document.getElementById("user10").onclick = function(){
    var user = document.getElementById("user10").innerHTML;
    window.location = "http://localhost:8080/userData/" + user;
  }
}