var serviceURL = 'https://aggregate-job-scraper.herokuapp.com/search/'


function fetchJobs(){
  document.getElementById('submitSearch').addEventListener('click', function(event){
    var description = document.getElementById('description').value;
    var location = document.getElementById('location').value;
    var distance = document.getElementById('distance').value;
    var req = new XMLHttpRequest();
    req.open("GET", serviceURL + description + '/' + location + '/' + distance, true);
    req.addEventListener("load", function(){
      var data = JSON.parse(req.responseText);
      displayJobs(1, data.jobs[0].title, data.jobs[0].updated_at, data.jobs[0].absolute_url);
      displayJobs(2, data.jobs[1].title, data.jobs[1].updated_at, data.jobs[1].absolute_url);
      displayJobs(3, data.jobs[2].title, data.jobs[2].updated_at, data.jobs[2].absolute_url);
      //console.log(data.jobs[0]);
    })
    req.send(null);
    //window.open("http://127.0.0.1:8080/resultsPage.html",'_self');
    event.preventDefault();
    })
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
  fetchJobs()
})
