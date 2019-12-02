const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
var SpotifyWebApi = require('spotify-web-api-node');

var client_id = "15db5a5f73854fbaa5d4da1d7cb15123"
var client_secret = "66ff80f04fab4d45800f5e304466e8ff"

var spotifyApi = new SpotifyWebApi({
    clientId: "15db5a5f73854fbaa5d4da1d7cb15123",
    clientSecret:"66ff80f04fab4d45800f5e304466e8ff"
    // redirectUri:"localhost/auth"
})
spotifyApi.setAccessToken('BQB9xnmj8J4D5Oz1ZtthlU5oMYYqvnCGe-a_dh18PnmD0CBdnT_W1xxaW7egbsRFjwAM1fFjGUUR-o_VXBDScT2usbpq6-xoFbP83CN82X1Vf6qWpl4A3-va57HTxdP00mq4QZ7tWERvQg')


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

app.get("/new", (req,res)=>{
    res.sendFile(__dirname+"/web/nodes.html")
})

app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/web/index.html") 
})

app.listen(port, ()=>{
    console.log("Listening on "+port)
})

function getPreview(id){
    return new Promise((resolve,reject)=>{
        spotifyApi.getArtistTopTracks(id, 'NZ').then(function(data) {
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

