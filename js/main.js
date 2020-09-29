const url = "http://api.alquran.cloud/v1/quran/ar.alafasy";
let curr_surah_num = 0;
let response;

let goto = function(num) {
  let element = "";
  element +=  `<div class="surah_block surah-${num}">
                <h3 class="surah_title">${response.data.surahs[num].englishName}</h3>`;
  for (let j = 0; j < response.data.surahs[num].ayahs.length; j++) {
    element += `<p class="ayah_text">${response.data.surahs[num].ayahs[j].text}</p>`;
    element += `<audio
                    controls
                    src="${response.data.surahs[num].ayahs[j].audio}">
                        Your browser does not support the
                        <code>audio</code> element.
                </audio>`;
  }
  element += `</div>`;
  document.getElementById("current_surah").innerHTML = element;
}

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      response = JSON.parse(this.responseText);

      // Create "current surah" block. Default is Al-Fatiha
      goto(curr_surah_num);

      // List of surahs for aside block
      let list = `<ul class="list_surahs">`;
      for (let i = 0; i < response.data.surahs.length; i++) {
        list += `<li onclick="goto(${i})">Surah ${i+1}: ${response.data.surahs[i].englishName}</li>`;
      }
      list += `</ul>`;
      document.getElementById("list_of_surahs").innerHTML = list;
    }

    // let link = document.getElementsByTagName("link");
    // link.href = link.href + "?id=" + new Date().getMilliseconds();

    
}
xhr.open('GET', url, true);
xhr.send(null);