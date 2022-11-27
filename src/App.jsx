import { useState } from 'react'
import { extractTags } from './functions/extractTags'
import './App.css'

function App() {
  const [youtubeTags, setYoutubeTags] = useState([])
  const [youtubeURL, setYoutubeURL] = useState('')
  const [youtubeLinks, setYoutubeLinks] = useState([])
  const [youtubeId, setYoutubeId] = useState([])



  const addYoutubeLinks = () => {
    setYoutubeLinks(links => [...links, youtubeURL])
    setYoutubeURL('')
   
    const extId = extractId(youtubeURL)
    setYoutubeId(id => [...id, extId ])
  
   
  }
  


  const extractVidTags = async () => {
    
    youtubeId.forEach (async (link) => {
      const extTags = await extractTags(link)
      console.log(extTags)
      setYoutubeTags(id => [...id, extTags ])
    })
   

    
    // const tags = await extractTags(id)
   
    // setYoutubeTags(tags)
    
  }

  const extractId = (url) => {
    return url.split('/').pop()
  }

  return (
    <div className="App">
      <h1>YOUTUBE TAG EXTRACTOR</h1>
      <div>
        <input type="text" placeholder='Enter Youtube URL' value={youtubeURL} onChange={(e) => setYoutubeURL(e.target.value)} style={{ width:'600px', marginBottom:'20px', padding:'10px 5px' }} />
        <button onClick={addYoutubeLinks}>Add</button>
      </div>
      {
        youtubeLinks.map((link,index) => (
          <p key={link}>{index+1}. {link}</p>
        ))
      }


      <button onClick={extractVidTags}>GET VIDEO TAG</button>

      <h2>ALL Tags</h2>
      {
        youtubeTags.map((tag,index) => (
          <textarea name="" id="" cols="100" rows="10" key={index} value={tag} readOnly></textarea>
        ))
      }
    </div>
  )
}

export default App
