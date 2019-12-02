const express = require('express')
const app = express()
const port = 3000
var SpotifyWebApi = require('spotify-web-api-node');

var client_id = "15db5a5f73854fbaa5d4da1d7cb15123"
var client_secret = "66ff80f04fab4d45800f5e304466e8ff"

var spotifyApi = new SpotifyWebApi({
    clientId: "15db5a5f73854fbaa5d4da1d7cb15123",
    clientSecret:"66ff80f04fab4d45800f5e304466e8ff"
    // redirectUri:"localhost/auth"
})
spotifyApi.setAccessToken('BQBzkCU1IPgwMkXNP2uk9nIivBi-nu9u2TIUYJUL5Mt0hEEZXfKrx_ymou8sFynOdZs4HRL3ElyPlRC0Yq_Mn7BXSA3U8DqY4jIeYB6T8v1b-ZQZQy9kUjk-4bCoLJDr4kWadARlJ3et_A')


app.get("/getArtist/:id", (req,res)=>{
    getArtist(req.params.id).then(data=>{
        res.send(data)
    }).catch(error=>{
        console.log(error)
        res.send("EROOR HOMIE")
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

