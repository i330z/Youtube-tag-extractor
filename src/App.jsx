import { useState } from 'react'
import { extractTags } from './functions/extractTags'
import getVideoId from "get-video-id";
import './App.css'

function App() {
  const [youtubeTags, setYoutubeTags] = useState([])
  const [youtubeURL, setYoutubeURL] = useState('')
  const [youtubeLinks, setYoutubeLinks] = useState([])
  const [youtubeId, setYoutubeId] = useState([])
  const [commonTags, setCommonTags] = useState([])


  const addYoutubeLinks = () => {
    setYoutubeLinks(links => [...links, youtubeURL])
    setYoutubeURL('')

    // const extId = extractId(youtubeURL)
    const extId = getVideoId(youtubeURL).id
    setYoutubeId(id => [...id, extId])
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
      <h1>YOUTUBE TAG EXTRACTOR</h1>
      <div>
        <input type="text" placeholder='Enter Youtube URL' value={youtubeURL} onChange={(e) => setYoutubeURL(e.target.value)} style={{ width: '600px', marginBottom: '20px', padding: '10px 5px' }} />
        <button onClick={addYoutubeLinks}>Add URL</button>
      </div>
      
      <div style={{ textAlign: "left" }}>
        {
          youtubeLinks.map((link, index) => (
            <p key={link}>{index + 1}. {link}</p>
          ))
        }
      </div>


      <button onClick={extractVidTags}>GET VIDEO TAG</button>

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
