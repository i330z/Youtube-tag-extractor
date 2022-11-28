import { useState } from 'react'
import { extractTags } from './functions/extractTags'
import getVideoId from "get-video-id";
import { format } from 'fecha'
import './App.css'

function App() {
  const [youtubeTags, setYoutubeTags] = useState([])
  const [youtubeURL, setYoutubeURL] = useState('')
  const [youtubeLinks, setYoutubeLinks] = useState([])
  const [youtubeId, setYoutubeId] = useState([])
  const [commonTags, setCommonTags] = useState([])
  const [searchResultsList, setSearchResultsList] = useState([])
  const [searchText, setSearchText] = useState("")
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY


  const addYoutubeLinks = () => {
    setYoutubeLinks(links => [...links, youtubeURL])
    setYoutubeURL('')

    // const extId = extractId(youtubeURL)
    const extId = getVideoId(youtubeURL).id
    setYoutubeId(id => [...id, extId])
  }

  const searchYoutube = async () => {

    const baseURL = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${searchText}&maxResults=10&part=snippet`
    const _searchResultsList = []
    
    try {
        const res = await fetch(baseURL)
        const data = await res.json()
        const videoIds = data.items.map(item => item.id.videoId)

        for(let id of videoIds) {
          let { items: [{ snippet, statistics }] } = await getVideoInfo(id)
          // console.log(snippet, statistics)
          _searchResultsList.push({
            id,
            channelTitle: snippet.channelTitle,
            description: snippet.description,
            publishedAt: snippet.publishedAt,
            tags: snippet.tags,
            title: snippet.title,
            thumbnail: snippet.thumbnails.high.url,
            viewCount: statistics.viewCount,
            likeCount: statistics.likeCount,
            commentCount: statistics.commentCount
          })
        }
        
        setSearchResultsList(_searchResultsList)
        console.log(_searchResultsList[0])
      } catch (error) {
        console.log(error)
      }
  }

  const getVideoInfo = async (id) => {
    const baseUrl = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${apiKey}&part=snippet,statistics`
    const res = await fetch(baseUrl)
    return res.json()
  }

  const extractVidTags = async () => {

    youtubeId.forEach(async (link) => {
      const extTags = await extractTags(link)
      console.log(extTags)
      setYoutubeTags(id => [...id, extTags])
    })
  }

  const extractId = (url) => {
    return url.split('/').pop()
  }


  const compareTags = () => {
    console.log('compare')
    try {
      const com = youtubeTags.reduce((p,c) => p.filter(e => c.some(el => el.toLowerCase() === e.toLowerCase())));
      console.log(com)
      setCommonTags(com)  
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      {/* <h1>YOUTUBE TAG EXTRACTOR</h1>
      <div>
        <input type="text" placeholder='Enter Youtube URL' value={youtubeURL} onChange={(e) => setYoutubeURL(e.target.value)} style={{ width: '600px', marginBottom: '20px', padding: '10px 5px' }} />
        <button onClick={addYoutubeLinks}>Add URL</button>
      </div> */}

      <h1>SEARCH FOR SOMETHING</h1>
      <div>
        <input type="text" placeholder='Enter search keywords' value={searchText} onChange={(e) => setSearchText(e.target.value)} style={{ width: '600px', marginBottom: '20px', padding: '10px 5px' }} />
        <button onClick={searchYoutube}>SEARCH</button>
      </div>      

      <div style={{ textAlign: "left" }}>
        {
          youtubeLinks.map((link, index) => (
            <p key={link}>{index + 1}. {link}</p>
          ))
        }
      </div>


      {/* <button onClick={extractVidTags}>GET VIDEO TAG</button> */}

      { !!searchResultsList && <strong>Top 10 Results</strong> } <br /><br />

      {
        searchResultsList.map(result => (
          <div key={result.id}>
            <img src={result.thumbnail} alt="" />
            <h3>{result.title}</h3>
            <h4 style={{ color:'orange' }}>by {result.channelTitle} | posted {format(new Date(result.publishedAt), 'mediumDate') }</h4>
            <p>👀 {result.viewCount}, ❤️ {result.likeCount}, 💬 {result.commentCount}</p>
            <p>{result.description}</p>
            <textarea name="" id="" cols="150" rows="5" value={result.tags} readOnly></textarea>
          </div>
        ))
      }

      {youtubeTags.length != 0 ? <h2>ALL Tags</h2> : ''}
      {
        youtubeTags.map((tag, index) => (
          <textarea name="" id="" cols="100" rows="10" key={index} value={tag} readOnly></textarea>
        ))
      }
      <div>
      {youtubeTags.length != 0 ? 
       <button onClick={compareTags}>Find Common Tags</button>
       : 
       ''}
      </div>

       {
        commonTags.map((tag,index) => (
          <textarea name="" id="" cols="100" rows="10" key={index} value={tag} readOnly></textarea>
        ))
       }
 
    </div>
  )
}

export default App
