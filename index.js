const express = require('express')
const app = express()
const port = 3000
var SpotifyWebApi = require('spotify-web-api-node');

var client_id = "15db5a5f73854fbaa5d4da1d7cb15123"
var client_secret = "66ff80f04fab4d45800f5e304466e8ff"

var spotifyApi = new SpotifyWebApi({
    clientId:client_id,
    clientSecret:client_secret
    // redirectUri:"localhost/auth"
})
spotifyApi.setAccessToken('BQBxN7Vl4hv_mwdxdMqRAwpv1OwMd_E_zY3r3mf92i8wgJRynVYolmLwwD-DwxDL9ZRwUDt0bIowtLbeDm4c4njfaMqBFFRs0iPja-UdOHDnX51SoqhxQmoAJJuqOWIFsRF7-O1Be2GjxA')


app.get("/getArtist/:id", (req,res)=>{
    getArtist(req.params.id).then(data=>{
        res.send(data)
    })
    
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

