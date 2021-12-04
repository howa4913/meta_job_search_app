var serviceURL = 'https://aggregate-job-scraper.herokuapp.com/search/'


function callService(){
  document.getElementById('submitSearch').addEventListener('click', function(event){
    
    //assign payload variables
    var description = document.getElementById('description').value;
    var location = document.getElementById('location').value;
    var distance = document.getElementById('distance').value;
    var maxResults = document.getElementById('results').value;

    var req = new XMLHttpRequest();
    //asynchronous call to microservice
    req.open("GET", serviceURL + description + '/' + location + '/' + distance, true);
    
    req.addEventListener("load", function(){
      var data = JSON.parse(req.responseText);
      displayJobs(1, data.jobs[0].title, data.jobs[0].updated_at, data.jobs[0].absolute_url);
      displayJobs(2, data.jobs[1].title, data.jobs[1].updated_at, data.jobs[1].absolute_url);
      displayJobs(3, data.jobs[2].title, data.jobs[2].updated_at, data.jobs[2].absolute_url);
    })
    req.send(null);
    event.preventDefault();
    })
}


function createNewList(params){
  var list = document.createElement('ul');
  document.getElementById('resultSection').appendChild(list);
  list.append(createBulletPt('Title: ', params[0]));
  list.append(createBulletPt('Posted Date: ', parmas[1]));
  list.append(createBulletPt('URL: ', params[2]));
}

function createBulletPt(header, val){
  var bullet = document.createElement('li');
  bullet.textContent = header + val
  return bullet
}


function displayJobs(listing, val1, val2, val3){
  var section = document.getElementById('result' + listing);
  var list = document.createElement('ul');
  var bullet1 = document.createElement('li');
  var bullet2 = document.createElement('li');
  var bullet3 = document.createElement('li');
  section.appendChild(list);
  bullet1.textContent = 'Title: ' + val1;
  bullet2.textContent = 'Posted Date: ' + val2;
  bullet3.textContent = 'URL: ' + val3;
  section.appendChild(bullet1);
  section.appendChild(bullet2);
  section.appendChild(bullet3);
}


document.addEventListener("DOMContentLoaded", function(){
  callService()
})
