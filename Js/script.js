const d = document;
const $artist = d.getElementById("artist");
const $template = d.getElementById("artist-template").content;
const $inputArtist = d.getElementById("searchArtist");
const $inputSong = d.getElementById("searchSong");
const $fragment = d.createDocumentFragment();
const $fragmentSong = d.createDocumentFragment();

d.addEventListener("click", async e => {
    if(e.target.matches("#btn")){
        try{
            let $artistTemplate  = "";
            let $songTemplate = "";
            let query = $inputArtist.value.toLowerCase();
            let api = `https://theaudiodb.com/api/v1/json/1/search.php?s=${query}`;
            let res = await fetch(api);
            let json = await res.json();
            let data = json.artists;
            console.log(data);

            if(!res.ok) throw {status: res.status, statusText: res.statusText};
            
            data.forEach(el => {
                $template.querySelector("h3").textContent = el.strArtist;
                $template.querySelector("p").textContent =  el.strBiographyES ? el.strBiographyES : "No esta disponible la Biografia del artista";
                $template.querySelector("img").src = el.strArtistFanart + "/" + "preview";
                $template.querySelector("img").alt = el.strArtist;
                let $cloneArtist = d.importNode($template, true);
                $fragment.appendChild($cloneArtist);
                })
                           
            $artist.innerHTML = "";
            $artist.appendChild($fragment);

            let querySong = $inputSong.value.toLowerCase();
            let apiLyrics = `https://api.lyrics.ovh/v1/${query}/${querySong}?`;
            let resSong = await fetch(apiLyrics);
            let jsonSong = await resSong.json();
            //console.log(jsonSong);
            if(!resSong.ok) throw {status: res.status, statusText: res.statusText};

            $template.querySelector("h4").textContent = querySong.toUpperCase();
            $template.querySelector(".lyrics").textContent = jsonSong.lyrics;
            let $clone = d.importNode($template, true);
            $fragmentSong.appendChild($clone); 
            
            $artist.innerHTML = "";
            $artist.appendChild($fragmentSong);
        
            

        }catch(err){
            let message = err.statusText || "No existen datos para esta búsqueda";
                $artist.innerHTML = `<p> Error ${err.status}: ${message}</p>`;
        }
    }
})