const url = "http://api.alquran.cloud/v1/quran/ar.alafasy";

var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myArr = JSON.parse(this.responseText);
    myFunction(myArr);
  }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(arr) {
  var out = arr.edition;
  
  document.getElementById("test").innerHTML = out;
}

console.log("test");