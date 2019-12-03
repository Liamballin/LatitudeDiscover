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

function randomArtist(){
    console.log("Getting random artist")
    $.ajax({
        url:"/random",
        success:function(data){
            console.log(data)
            startMap(data)
        }
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

function getInfoPaneData(id){
    return new Promise((resolve,reject)=>{
        $.ajax({
            url:"/info/"+id,
            success: function(data){
                renderInfoPane(data);
                resolve();
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
    var genre;
    if(data.genres[0] != undefined){
        genre = data.genres[0]
    }else{
        genre="";
    }

    r.label = data.name+"\n"+genre;

    r.genre = genre;
    if(data.images[0] != undefined){
        r.image = data.images[0].url;
    }else{
        r.image ="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRyG1pllAcOZLO2j7zgS9IceYndTwS-BKpi7Gwam95nowy_a7sl"
    }
    r.shape = "circularImage";
    r.exploded = true;
    r.id = 0;

    rootArtist = r;
}

function renderInfoPane(data){
    console.log(data)
    console.log("Rendering info pane")
    document.getElementById("info_header").style.backgroundImage = "url("+data.images[0].url+")";
    $("#info_title").html(data.name);
    $("#info_genre").html((data.genres))
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

function explodeNode(id){
    loadNewArtist(id) // render graph
    getInfoPaneData(id) //get info for infoPane
}

var player;
var playerState = "pause";
var intervals = [];

function playerManage(int){
    if(player != undefined){
        
       
    }
}

function playPreview(data){
    // console.log(data)
    if(data.tracks[0] != undefined){
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
    }else{
        playerState = "play";
        playPause()
    }
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