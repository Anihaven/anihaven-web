import { useCallback, useEffect, useState } from "react"
import videojs from "video.js"
import 'videojs-youtube'

export default function Player(props) {
    const [videoEl, setVideoEl] = useState(null)
    const onVideo = useCallback((el) => {
        setVideoEl(el)
    }, [])

    useEffect(() => {
        if (videoEl == null) return
        const player = videojs(videoEl, props)
        return () => {
            player.dispose()
        }
    }, [props, videoEl])

    return (
        <>
            <div data-vjs-player>
                <video ref={onVideo} className="video-js" playsInline controls preload="auto"
                data-setup='{ "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}] }'/>
            </div>
        </>
    )
}