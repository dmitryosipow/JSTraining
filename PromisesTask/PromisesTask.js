
var url = "http://54.72.3.96:3000/techtalks/";

var testObj = {
  "date": "5\/6\/2014",
  "title": "AJAX",
  "lector": [
    "alena_karaba"
  ],
  "location": "K1\/3",
  "description": "some description",
  "level": "D1-D5",
  "notes": "dmitry osipov test",
  "attendees": [
    "alena_karaba"
  ],
  "tags": [
    "ajax",
    "xmlhttprequest",
    "promises"
  ]
};

var textArea = document.getElementById('displayTxt');
var lectorsList = document.getElementById('lectorsInfoList');

function getRequest() {
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

function postRequest(object) {
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function() {
      if (request.status == 200) {
        var response= JSON.parse(request.response);
        resolve(response);
      } else {
        reject(Error(request.statusText));
      }
    };
    request.onerror = function() {
      reject(Error("Error posting data."));
    };
    request.send(JSON.stringify(object));
  });
}

function updateRequest(specificId,object) {
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('PUT', url + specificId);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function() {
      if (request.status == 200) {
        var response= JSON.parse(request.response);
        response._id = specificId;
        resolve(response);
      } else {
        reject(Error(request.statusText));
      }
    };
    request.onerror = function() {
      reject(Error("Error posting data."));
    };
    object.notes+=Math.random()*1000; //update with random number
    request.send(JSON.stringify(object));
  });
}

function deleteRequest(specificId) {
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('DELETE', url + specificId);
    request.onload = function() {
      if (request.status == 200) {
        var response= JSON.parse(request.response);
        resolve(response);
      } else {
        reject(Error(request.statusText));
      }
    };
    request.onerror = function() {
      reject(Error("Error deleting data."));
    };
    request.send(); // send the request
  });
}

//first part

getRequest().then(function(data){
  textArea.value+='-----Reading data-------: \n';
  textArea.value+= data;
  return postRequest(testObj);
}).then(function(data){
  textArea.value+="\n -----Updating record---- " + data._id;
  return updateRequest(data._id,testObj);
}).then(function(data){
  textArea.value+="\n -----Deleting record---- " + data._id;
  return deleteRequest(data._id);
});


function getRequestLectorInfo(name) {
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://54.72.3.96:3000/attendees/' + name);
    request.onload = function() {
      if (request.status == 200) {
        console.log("got info " + request.response);
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    };
    request.onerror = function() {
      reject(Error("Error getting data." + name));
    };
    request.send(); // send the request
  });
}

//second part
getRequest().then(function(data){

  var info = JSON.parse(data);
  var lectors = [];
  var lectorPromises = [];
  for(var i = 0 ; i < info.length; i++){
    if(info[i].lector instanceof Array && lectors.indexOf(info[i].lector[0]) == -1){
      lectors.push(info[i].lector[0]);
      lectorPromises.push(getRequestLectorInfo(info[i].lector[0]));
    }
  }

  Promise.all(lectorPromises).then(function(dataArr){
    console.log(dataArr);
    dataArr.forEach(function(data){
      var dataObj = JSON.parse(data);
      if(dataObj){
        var li = document.createElement('li');
        li.innerHTML = dataObj['full_name'] + '   (' + dataObj['email'] + ')';
        lectorsList.appendChild(li);
      }
    });
  },function(err){
    console.log("Error during getting lectors info");
  });
});



