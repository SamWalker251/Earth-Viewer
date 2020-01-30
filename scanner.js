var counter=0;
var interval;
var imgArray=[];
var numQueries;
var httpCounter=0;
function startScan()
{
    var queryString = "https://api.nasa.gov/planetary/earth/assets?lon="+document.getElementById("long").value+"&lat="+document.getElementById("lat").value+"&begin=2001-02-01&api_key="
    queryString = queryString +  document.getElementById("apiKey").value;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", queryString,true);
    xhttp.onreadystatechange = function(){
        console.log(this.readyState);
        if (this.readyState == 4 && this.status == 200) {
            
            stored = xhttp.response;
            console.log(JSON.parse(stored));
            stored = JSON.parse(stored);
            numQueries = stored.count;
            console.log(numQueries);
            while(counter<numQueries){
                retrieveImages(stored.results[counter].date.slice(0,10));
                counter++; 
            }
        }
    }
    xhttp.send();
    while (httpCounter<numQueries){
    }
    leCount = 0;
    var interval = setInterval(function(){
        if(httpCounter == numQueries){
            document.getElementById("image").src = imgArray[leCount];
            leCount++;
            console.log("leCount:"+leCount)
            if (leCount == imgArray.length){
                clearInterval(interval);
                console.log(imgArray);
            }
        }
    },2000);
}
function retrieveImages(date){
    console.log(date);
    var xhttp2 = new XMLHttpRequest();
    var queryString = "https://api.nasa.gov/planetary/earth/imagery/?lon="+document.getElementById("long").value+"&lat="+document.getElementById("lat").value+"&date="+date+"&cloud_score=True&dim=0.05&api_key="+ document.getElementById("apiKey").value;
    xhttp2.open("GET", queryString,true);
    xhttp2.onreadystatechange = function(){
        if (this.readyState == 4 && (this.status == 200||this.status ==429)) {
            result = xhttp2.response;
            result = JSON.parse(result);
            console.log(result);
            
            if (result.cloud_score<0.3){
                imgArray.push(result.url);
                console.log(result.url);
            }
            
            console.log(httpCounter);
            console.log(numQueries);
            
            document.getElementById("progressbar").style.width=(httpCounter/(numQueries-1))*100 +"%"





            httpCounter++
        }
    }
    xhttp2.send();
}




