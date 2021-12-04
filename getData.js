//global variable to hold URL for microservice
var serviceURL = 'https://aggregate-job-scraper.herokuapp.com/search/'


function callService(){
  document.getElementById('submitSearch').addEventListener('click', function(event){
    
    //assign payload variables
    var payload = generatePayload();
    var maxResults = document.getElementById('results').value;
  

    var req = new XMLHttpRequest();
    //asynchronous call to microservice
    req.open("GET", serviceURL + payload[0] + '/' + payload[1] + '/' + payload[2], true);
    req.addEventListener("load", function(){
      clearResults();
      var data = JSON.parse(req.responseText);
      // create a list of data for each result to be displayed
      for(var i = 0; i < maxResults; i++){
        createNewList(polishContent(data, i));
      }
    })
    req.send(null);
    event.preventDefault();
    })
}

function generatePayload(){
  var description = document.getElementById('description').value;
  var location = document.getElementById('location').value;
  var distance = document.getElementById('distance').value;
  return [description, location, distance];
}

function createBulletPt(header, val){
  var bullet = document.createElement('li');
  bullet.textContent = header + val;
  return bullet;
}

function createNewList(params){
  var list = document.createElement('ul');
  document.getElementById('resultSection').appendChild(list);
  list.append(createBulletPt('Title: ', params[0]));
  list.append(createBulletPt('Posted Date: ', params[1]));
  list.append(createBulletPt('URL: ', params[2]));
}

function polishContent(data, resultNumber){
  var jobTitle = data.jobs[resultNumber].title;
  var jobDate = data.jobs[resultNumber].updated_at.slice(0,10);
  var jobUrl = data.jobs[resultNumber].absolute_url;
  return [jobTitle, jobDate, jobUrl];
}


function clearResults(){
  section = document.getElementById('resultSection');
  while (section.firstChild){
    section.removeChild(section.firstChild);
  }
}

document.addEventListener("DOMContentLoaded", function(){
  callService()
})
