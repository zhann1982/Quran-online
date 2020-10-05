let curr_surah_num = 0;
let response;

const url = `http://api.alquran.cloud/v1/surah/${curr_surah_num+1}/ar.alafasy`;

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        response = JSON.parse(this.responseText);
        
        document.getElementById('surah_name').innerHTML = response.data.name;

        let element = '';
        for (let i=0; i<response.data.numberOfAyahs; i++) {
            element += `<p class="ayah_text">${response.data.ayahs[i].text} <span class="ayah_num">${i+1}</span></p>`;
            element += `<audio class="audio_tag"
                            controls
                            src="${response.data.ayahs[i].audio}">
                                Your browser does not support the
                                <code>audio</code> element.
                        </audio>`;
        }
        document.getElementById('surah_ayahs').innerHTML = element;
    } 
}
xhr.open('GET', url, true);
xhr.send(null);