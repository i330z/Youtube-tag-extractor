export const extractTags = async (id) =>{
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY

    const baseURL = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&fields=items(snippet(title,description,tags))&part=snippet&id=${id}`
    try {
        const res = await fetch(baseURL)
        const data = await res.json()
        const tags = data.items[0].snippet.tags
        console.log(tags)
        if(tags.length != 0){
          return tags
        } else {
          return 'NO TAGS FOUND'
        }
      } catch (error) {
        console.log(error)
      }
}