var rememberTop = 0;

window.onscroll = (function(e) {
  parallaxScroll();
});

function parallaxScroll() {
  var scrollTop = (window.pageYOffset !== undefined) ?
    window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  var el = document.querySelector(".navigationMenu");
  var top = el.offsetTop;
  if(top && top < scrollTop ){
    rememberTop = top;
    el.classList.add('fixedMenu');
  }
  if(rememberTop && scrollTop < rememberTop){
    el.classList.remove('fixedMenu');
  }
}

//Promise for loading json
function getRequest(url) {
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = function() {
      if (request.status == 200) {
        resolve(request.response); // we get the data here, so resolve the Promise
      } else {
        reject(Error(request.statusText)); // if status is not 200 OK, reject.
      }
    };
    request.onerror = function() {
      reject(Error("Error getting data.")); // error occurred, so reject the Promise
    };
    request.send(); // send the request
  });
}

//load main site info and then articles
getRequest('mainInfo.json').then(function(response) {
  //parsing and templating main site info
  var data = JSON.parse(response);
  var compiled = _.template(
    "<li>" +
      "<a href='#'><%= title %></a>" +
      "</li>"
  );
  var toAppendString = "";
  for (var i = 0; i < data.navigationMenu.length; i++) {
    data.navigationMenu[i].title = data.navigationMenu[i].title.toUpperCase();
    toAppendString += compiled(data.navigationMenu[i]);
  }
  var div = document.querySelector(".navigationMenu").getElementsByTagName("ul")[0];
  div.innerHTML = toAppendString;
  div.childNodes[0].classList.add('selected');

  var tpl = document.getElementById('sideArticleTmp').textContent;
  compiled = _.template(tpl);
  toAppendString = "";
  for (var i = 0; i < data.sideInfo.length; i++) {
    toAppendString += compiled(data.sideInfo[i]);
  }
  var div = document.getElementsByTagName("aside")[0];
  div.innerHTML = toAppendString + div.innerHTML;
  return getRequest('posts.json');
}).then(function(response) {
    //after main site info parsing all articles
    var data = JSON.parse(response);
    var tpl = document.getElementById('articleTmp').textContent;
    var compiled = _.template(tpl);
    var toAppendString = "";
    for (var i = 0; i < data.length; i++) {
      toAppendString += compiled(data[i]);
    }
    var div = document.querySelector(".articles");
    div.innerHTML = toAppendString;
    var divTag = document.querySelector(".tags");
    var compiledTag = _.template(
      "<a href='#'><%= obj %></a>"
    );
    toAppendString = "";
    for (var i = 0; i < data[0].tags.length; i++) {
      toAppendString += compiledTag(data[0].tags[i]);
    }
    divTag.innerHTML = toAppendString;
  });
