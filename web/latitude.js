var rootArtist = {};
//label (name-genre)
//image
//exploded = true;
//genre
//shape

function loaded(){
    // var a = loadArtist("43ZHCT0cAZBISjO8DG9PnE")
    document.getElementById("mynetwork").addEventListener("blur",()=>{
        console.log("Lost focus ")
    })
	document.getElementById("searchBar").addEventListener('input', ()=>{
		search(document.getElementById("searchBar").value)
	})
}

function startMap(data){
    document.getElementById("searchBar").value = data.name;
    $("#searchResults").html("")
    var startId = data.id
    getArtistInfo(data.id).then(()=>{
        loadArtist(startId);
        loadPreview(startId)
    })

}

function getArtistInfo(id){
    return new Promise((resolve,reject)=>{
        $.ajax({
            url:"/info/"+id,
            success:function(data){
                createRoot(data)
                resolve()
            }
        })
    })
}

function renderSearchResults(data){
	$("#searchResults").html("");
	var list = data.artists.items;
	var max;
	if(list.length > 5){
		max = 5;
	}else{
		max = list.length;
	}
	for(i = 0; i < max; i++){
		var res = document.createElement("div")
		var nameNode = document.createTextNode(list[i].name)
		var name = document.createElement("h1");
		name.className = "result_artist"
		name.appendChild(nameNode);

		var genreNode = document.createTextNode(list[i].genres[0])
		var genre = document.createElement("h1");
		
		genre.appendChild(genreNode)
		genre.className = "result_genre"
		
		
		
		res.id = list[i].id;
		res.className = "searchResult";
		res.appendChild(name)
		if(genre.innerHTML != undefined && genre.innerHTML != "undefined"){
			res.appendChild(genre)
		}
		res.onclick = function(){
			startMap({id:this.id,name:this.childNodes[0].innerHTML})
		}
		document.getElementById("searchResults").appendChild(res)
	}
}

function createRoot(data){
    var r = {};
    r.label = data.name+"\n"+data.genres[0];
    r.genre = data.genres[0];
    r.image = data.images[0].url;
    r.shape = "circularImage";
    r.exploded = true;
    r.id = 0;

    rootArtist = r;
}

function search(query){
	if(query.length > 0){
	$.ajax({
		url:"/search/"+query,
		success:function(data){
			// console.log(data)
			renderSearchResults(data)
		}
	})
}
}

function loadArtist(id){
    $.ajax({
        url:"/getArtist/"+id,
        success:function(data){
            render(data.artists)
        }
    })
}

function loadPreview(id){
	$.ajax({
		url:"/preview/"+id,
		success:function(data){
			playPreview(data)
		}
	})
}

function loadNewArtist(id){
    $.ajax({
        url:"/getArtist/"+id,
        success:function(data){
            renderNew(data.artists)
        }
    })
}

var player;
var playerState = "pause";

function playPreview(data){
    console.log(data)
	var name = data.tracks[0].name;
	var artist = data.tracks[0].artists[0].name;

	$("#preview_artist").html(artist);
    $("#preview_song").html(name);
    
    document.getElementById("preview_artist").onclick=function(){
        console.log("Clocked")
        var win = window.open(data.tracks[0].external_urls.spotify, '_blank');
        win.focus();
    }
    document.getElementById("preview_song").onclick=function(){
        console.log("Clocked")
        var win = window.open(data.tracks[0].external_urls.spotify, '_blank');
        win.focus();
    }


	if(player != undefined){
		player.pause()
	}
	var url = (data.tracks[0].preview_url)
    player = new Audio(url);
	// player.play();
    playerState = "pause"
    playPause()
}

function playPause(){
	if(playerState == "play"){
		player.pause()
		playerState = "pause";
        // document.getElementById("playPauseImg").src = "assets/button_play.png";
        $("#playSymbol").html("⏵")
	}else{
		player.play();
		playerState = "play"
        // document.getElementById("playPauseImg").src = "assets/button_pause.png";
        $("#playSymbol").html("⏸")
	}		

}