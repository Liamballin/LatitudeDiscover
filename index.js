const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
// var secrets;
const dotenv = require('dotenv');
dotenv.config();
console.log(process.env.CLIENT_ID)
console.log(process.env.CLIENT_SECRET)
var SpotifyWebApi = require('spotify-web-api-node');

app.use(express.static(__dirname + '/web'));
app.use(express.static(__dirname + '/web/assets'));



var spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
    // redirectUri:"localhost/auth"
})

setInterval(()=>{
    console.log("refresh token..")
    spotifyApi
  .clientCredentialsGrant()
  .then(d => spotifyApi.setAccessToken(d.body.access_token));
}, 600000)
spotifyApi
  .clientCredentialsGrant()
  .then(d => spotifyApi.setAccessToken(d.body.access_token));

app.get("/info/:id",(req,res)=>{
    console.log("app.get received: "+req.params.id)
    getArtistInfo(req.params.id).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
        console.log("ERROR GETTING ARTIST INFO")
        console.log("INPUT: "+req.params.id)
        res.send("ERROR GETTING ARTIST INFO")
    })
})

app.get("/getArtist/:id", (req,res)=>{
    getArtist(req.params.id).then(data=>{
        res.send(data)
    }).catch(error=>{
        console.log(error)
        res.send("ERROR GETTING ARTIST")
    })
})

app.get("/preview/:id", (req,res)=>{
    getPreview(req.params.id).then(data =>{
        res.send(data)
    }).catch(error=>{
        console.log(error)
        res.send("ERROR GETTING PREVIEW")
    })
})

app.get("/random",(req,res)=>{
    getRandomArtist().then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log("ERROR")
        console.log(err)
        res.send("ERROR")
    })
})

app.get("/search/:query", (req,res)=>{
    searchResults(req.params.query).then(data=>{
        res.send(data);
    }).catch(error=>{
        console.log(error);
        res.send("ERROR GETTING SEARCH RESULTS")
    })
})


app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/web/nodes.html")
})

app.listen(port, ()=>{
    console.log("Listening on "+port)
})

function getArtistInfo(id){
    return new Promise((resolve,reject)=>{
        console.log("Getting info with id: "+id)
        spotifyApi.getArtist(id).then(data=>{
            resolve(data.body)
        }, err=>{
            reject(err)
        })
    })
}

function searchResults(query){
    return new Promise((resolve, reject)=>{
        spotifyApi.searchArtists(query).then(function(data) {
            resolve(data.body);
            }, function(err) {
            reject(err);
        });
    })
}

function getRandomArtist(){
    return new Promise((resolve, reject)=>{

        var search = getRandomSearch()
        spotifyApi.searchArtists(search).then(function(allData) {
            console.log(allData)
            var options = {limit:1,offset:getRandomInt(allData.body.artists.total)}
            console.log(options)
            spotifyApi.searchArtists(search,options).then(art => {
                resolve(art.body.artists.items[0])
            }, err=>{
                reject(err)
            })
        }, function(err) {
            reject(err);
        });
    })
}

function getPreview(id){
    return new Promise((resolve,reject)=>{
        spotifyApi.getArtistTopTracks(id, 'US').then(function(data) {
            resolve(data.body);
        }, function(err) {
            reject(err);
        });
    })
}

function getArtist(id){
    return new Promise((resolve,reject)=>{
        console.log("Getting artist "+id)
        spotifyApi.getArtistRelatedArtists(id).then(
        function(data) {
          resolve(data.body);
        },
        function(err) {
          reject(err);
        }
      );
    })
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function getRandomSearch() {
    // A list of all characters that can be chosen.
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    
    // Gets a random character from the characters string.
    const randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
    let randomSearch = '';
  
    // Places the wildcard character at the beginning, or both beginning and end, randomly.
    switch (Math.round(Math.random())) {
      case 0:
        randomSearch = randomCharacter + '%';
        break;
      case 1:
        randomSearch = '%' + randomCharacter + '%';
        break;
    }
  
    return randomSearch;
  }