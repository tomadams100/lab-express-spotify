const express = require('express')

const router = express.Router()
require('dotenv').config()


// require spotify-web-api-node package here:
const SpotifyWebApi = require('spotify-web-api-node')


// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  
  // Retrieve an access token
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));



router.get("/artist-search",(req,res)=>{
  const queryString = req.query.artist
  spotifyApi
  .searchArtists(queryString)
  .then((response)=>{
    const artistArr = response.body.artists.items
    console.log("Data from API: ",response)
    res.render("artist-search",{artist:artistArr})
  })
  .catch(error=>console.log(error))
})

router.get("/albums/:artistId",(req,res)=>{
  const artistId = req.params.artistId
  spotifyApi
  .getArtistAlbums(artistId)
  .then((response)=>{
    console.log("API Albums Response: ",response)
    const albumsArr = response.body.items
    console.log("API Albums Arr: ",albumsArr[0])
    res.render("albums-list",{albums:albumsArr})
  })
})

router.get("/",(req,res)=>{
  res.render("index")
})

module.exports = router