
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


getRequest().then(function(data){
  console.log(data);
  return postRequest(testObj);
}).then(function(data){
  console.log("/////////////");
  console.log("updating record " + data._id);
  return updateRequest(data._id,testObj);
}).then(function(data){
  console.log("/////////////");
  console.log("deleting record " + data._id);
  return deleteRequest(data._id);
});



