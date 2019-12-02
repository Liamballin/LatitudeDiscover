function loaded(){
	// var a = loadArtist("43ZHCT0cAZBISjO8DG9PnE")
	document.getElementById("searchBar").addEventListener('input', ()=>{
		console.log("Typing..")
		search(document.getElementById("searchBar").value)
	})
}

function startMap(id){
	$("#search").css({"opacity":"0","pointer-events":"none"})
	var startId = id
	var a = loadArtist(startId);
	loadPreview(startId)
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
			startMap(this.id)
		}
		document.getElementById("searchResults").appendChild(res)
	}
}

function search(query){
	if(query.length > 0){
	$.ajax({
		url:"/search/"+query,
		success:function(data){
			console.log(data)
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
	var name = data.tracks[0].name;
	var artist = data.tracks[0].artists[0].name;

	$("#preview_artist").html(artist);
	$("#preview_song").html(name);


	if(player != undefined){
		player.pause()
	}
	console.log(data.tracks[0])
	var url = (data.tracks[0].preview_url)
    player = new Audio(url);
	player.play();
	playerState = "play"
}

function playPause(){
	if(playerState == "play"){
		player.pause()
		playerState = "pause";
		$("#playControl").html("▶️")
	}else{
		player.play();
		playerState = "play"
		$("#playControl").html("⏸")
	}		

}