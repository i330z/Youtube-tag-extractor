import { useState } from 'react'
import './App.css'

function App() {
  const [youtubeTags, setYoutubeTags] = useState('')
  const [youtubeLink, setYoutubeLink] = useState('')
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY
  const getVideoId = async () => {
    const url = youtubeLink.split('/').pop()

    const baseURL = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&fields=items(snippet(title,description,tags))&part=snippet&id=${url}`
    try {
      const res = await fetch(baseURL)
      const data = await res.json()
      const tags = data.items[0].snippet.tags
      console.log(tags)
      if(tags.length != 0){
        setYoutubeTags(tags)
      } else {
        setYoutubeTags('NO TAGS FOUND')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      <h1>YOUTUBE TAG EXTRACTOR</h1>
      <div>
        <input type="text" placeholder='Enter Youtube URL' onChange={(e) => setYoutubeLink(e.target.value)} style={{ width:'600px', marginBottom:'20px', padding:'10px 5px' }} />
      </div>
      
      <button onClick={getVideoId}>GET VIDEO TAG</button>

      <h2>ALL Tags</h2>
      <textarea name="" id="" cols="100" rows="10" value={youtubeTags} readOnly></textarea>
    </div>
  )
}

export default App
