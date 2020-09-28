const url = "http://api.alquran.cloud/v1/quran/ar.alafasy";

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
       let response = JSON.parse(this.responseText);
       let element = "";

      for (let i=0; i<1; i++) {
        element +=  `<div class="surah_block surah-${i}"><h3 class="surah_title">${response.data.surahs[i].englishName}</h3>`;

        for (let j=0; j<response.data.surahs[i].ayahs.length; j++) {
          element += `<p class="ayah_text">${response.data.surahs[i].ayahs[j].text}</p>`;
          element += `<audio
                          controls
                          src="${response.data.surahs[i].ayahs[j].audio}">
                              Your browser does not support the
                              <code>audio</code> element.
                      </audio>`;
        }

        element += `</div>` 
      }

       document.getElementById("surahs").innerHTML = element;
    }
}
xhr.open('GET', url, true);
xhr.send(null);