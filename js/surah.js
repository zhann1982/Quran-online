let curr_surah_num = 0;
let response, response2;

let goto = num => {
    let url = `http://api.alquran.cloud/v1/surah/${num+1}/ar.alafasy`;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            response = JSON.parse(this.responseText);
            
            document.getElementById('surah_name').innerHTML = response.data.name;

            let element = '';
            for (let i=0; i<response.data.numberOfAyahs; i++) {
                if (num==0 || num==8) {
                    element += `<p class="ayah_text">${response.data.ayahs[i].text} <span class="ayah_num">${i+1}</span></p>`;
                } else {
                    if (i==0) {
                        let ayah0 = (response.data.ayahs[i].text).replace('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ','');
                        element += `<p class="ayah_text">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>`;
                        element += `<p class="ayah_text">${ayah0} <span class="ayah_num">${i+1}</span></p>`;
                    } else {
                        element += `<p class="ayah_text">${response.data.ayahs[i].text} <span class="ayah_num">${i+1}</span></p>`;
                    }
                }
                
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
}

goto(curr_surah_num);

let url2 = `http://api.alquran.cloud/v1/meta`;

var xhr2 = new XMLHttpRequest();
xhr2.onreadystatechange = function() {
    if (xhr2.readyState == XMLHttpRequest.DONE) {
        response2 = JSON.parse(this.responseText);

        // List of surahs for aside block
        let list = `<h3>Surahs</h3><ul class="list_surahs">`;
        for (let i = 0; i < response2.data.surahs.count; i++) {
            list += `<li class="${(i==curr_surah_num)?'active':''}" onclick="goto(${i})">${i+1} - ${response2.data.surahs.references[i].englishName}</li>`;
        }
        list += `</ul>`;
        document.getElementById("list_of_surahs").innerHTML = list;

        let elementsArray = document.querySelectorAll("#list_of_surahs li");
        elementsArray.forEach(function(elem) {
            elem.addEventListener("click", function() {
                elementsArray.forEach(function(el){
                    el.classList.remove("active");
                });
                elem.classList.add("active");
            });
        });
    } 
}
xhr2.open('GET', url2, true);
xhr2.send(null);