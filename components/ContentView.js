import { gql, useQuery, useLazyQuery  } from "@apollo/client"
import styles from "../styles/ContentView.module.sass"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import videojs from 'video.js'
import 'videojs-youtube'
import 'video.js/dist/video-js.css'


export default function ContentView(props) {
    const router = useRouter()
    const [isWatching, setIsWatching] = useState(false)

    ContentView.getInitialProps = ({ query }) => {
        return { query }
    }

    // Effect to load a video on page load, if you load the page with a watchId (?watch=3)
    useEffect(() => {
        console.log("useEffect")
        if (!isWatching) {
            // First of all, let's see if there is a videoId, to enable watching
            const { watch } = router.query

            // console.log("videoId:", videoId)
            // if (videoId === undefined) {
            //     console.log("undefined")
            //     const params = new URLSearchParams(window.location.search)
            //     if (params.has("watch")) {
            //         console.log("has watch")
            //         videoId = params.get("watch")
            //     }
            // }
            // console.log("titleId:", titleId)
            // if (titleId === undefined) {
            //     console.log("undefined")
            //     titleId = window.location.pathname.replace("/content/", "")
            // }

            console.log("titleId:", props.titleId)
            console.log("query.watch:", watch)
            console.log("videoPlayer:", document.getElementsByClassName(styles.videoPlayer)[0])
            // console.log(document.body.innerHTML.toString())

            if (watch !== undefined) {
                console.log("not undefined")

                console.log("videoId:", watch)
                console.log("titleId:", props.titleId)

                watchVideo(watch)
            }
        }
    }, [props.titleId, router.query.watch, document.getElementsByClassName(styles.videoPlayer)[0]])

    // Video player options
    let videoJsOptions = {
        id: "player",
        techOrder: ['youtube'],
        autoplay: true,
        controls: true,
        fluid: true,
        preload: "auto",
        sources: [
            {
                src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                type: 'video/youtube'
            }
        ]
    }

    // Listen to new video elements and props
    // useEffect(() => {
    //     console.log("video.js onEffect")
    //     // console.log(videoElement.innerHTML)
    //     console.log(videoJsOptions)
    //     if (!videoElement) return
    //     const player = videojs(videoElement, videoJsOptions)
    //     return () => {
    //         player.dispose()
    //     }
    // }, [videoJsOptions, videoElement])

    // Future query to fetch a video
    const VIDEO_QUERY = gql`
        query getVideoStorage($videoId: ID!) {
            video(id: $videoId) {
                id
                videostorage {
                    format
                    url
                }
            }
        }
    `
    const [getVideo, { loading: videoLoading, data: videoData }] = useLazyQuery(VIDEO_QUERY)

    function addVideoPlayer() {
        // Remove old player
        stopPlaying()

        // Add new
        if (videoData && videoData.video && videoData.video[0]) {
            const video = videoData.video[0]
            // Default techorder and sources
            let techOrder = ['youtube']
            let sources = [
                {
                    src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                    type: 'video/youtube'
                }
            ]

            // Parse new sources, if any
            if (video.videostorage && video.videostorage.length > 0) {
                console.log("has storage")
                techOrder = []
                sources = []
                video.videostorage.map((videoStore) => {
                    switch (videoStore.format) {
                        case "mp4":
                            techOrder.push("html5")
                            sources.push({src: videoStore.url, type: "video/mp4"})
                            break
                        default:
                            console.log("shit, format not in format switch")
                            break
                    }
                })
            }
            else {
                console.log("video has no storage")
            }

            // Add the video player
            console.log("Adding video player")
            if (document) {
                console.log("Document found")
                let videoPlayer = document.getElementsByClassName(styles.videoPlayer)[0]
                if (videoPlayer) {
                    console.log("Video player container found")
                    let vjsPlayer = videoPlayer.getElementsByClassName(styles.videoJSPlayer)[0]
                    if (!vjsPlayer) {
                        console.log("no vjs player, creating")
                        vjsPlayer = document.createElement("div")
                        vjsPlayer.setAttribute("data-vjs-player", "")
                        vjsPlayer.setAttribute("key", video.id)
                        vjsPlayer.className = styles.videoJSPlayer

                        videoPlayer.appendChild(vjsPlayer)
                    }

                    if (vjsPlayer) {
                        console.log("vjsPlayer found")

                        videoJsOptions.techOrder = techOrder
                        videoJsOptions.sources = sources
                        videoJsOptions.id = video.id

                        console.log(videoJsOptions)

                        let playerElem = document.createElement("video")
                        playerElem.className = styles.videoJSPlayer + " video-js vjs-default-skin vjs-big-play-centered"
                        playerElem.playsInline

                        // const player = Player({...videoJsOptions})

                        // let player = document.createElement("iframe")
                        // player.className = "embed-responsive-item"
                        // player.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&autoplay=1"
                        // player.allowFullscreen
                        //
                        if (!playerElem) return

                        console.log(playerElem)

                        console.log("adding video player")
                        vjsPlayer.appendChild(playerElem)


                        // Start playing
                        const player = videojs(playerElem, videoJsOptions)
                    } else {
                        console.log("no vjsplayer")
                    }
                }

            }
        }
    }

    useEffect(() => {
        console.log("VideoFetch Effect - Video:", videoData)
        addVideoPlayer()
    }, [videoData, videoLoading])

    // Watch video function
    function watchVideo(videoId) {
        setIsWatching(true)

        console.log("router push: " + videoId.toString())
        router.push("/content/[titleId]?watch=" + videoId.toString(),
            "/content/" + props.titleId + "?watch=" + videoId.toString(),
            {shallow: true}).then(r => console.log("Router push:", r))

        // Get content source
        console.log("get video")
        getVideo({
            variables: {videoId: videoId}, onCompleted({data}) {
                console.log("completed")
                const video = data.video.slice(0, 4)
                console.log(video)
            }
        })

        if (videoData) {
            addVideoPlayer()
        }

        console.log("videoLoading:", videoLoading)
        console.log("videoData:", videoData)

        // Return false to avoid page refresh
        return false
    }

    // Clear the player
    function stopPlaying() {
        console.log("stop playing")

        // remove the video player
        try {
            const player = videojs(videoJsOptions.id)
            console.log(player)
            if (player) {
                console.log("player found for stopping")
                player.dispose()
                console.log(player)
            }
        }
        catch (e) {
            console.log(e)
        }
        try {
            const player = videojs(document.getElementsByClassName(styles.videoJSPlayer)[0])
            console.log(player)
            if (player) {
                console.log("player found for stopping in elements")
                player.dispose()
                console.log(player)
            }
        }
        catch (e) {
            console.log(e)
        }

        // Check if the video player stuff is still there even after disposal
        let videoPlayer = document.getElementsByClassName(styles.videoPlayer)[0]
        if (videoPlayer && videoPlayer.innerHTML) {
            videoPlayer.innerHTML = ""
        }
    }

    // Function called when user wants to stop watching, by clicking the exit button
    function stopWatching() {
        console.log("stop watching")

        // remove the video player
        stopPlaying()

        // set the query watch to undefined, otherwise it won't disappear on first rerender
        router.query.watch = undefined
        // set is watching to false to remove the container
        setIsWatching(false)
        // push back to normal content site
        router.push("/content/[titleId]",
            "/content/" + props.titleId,
            { shallow: true }).then(r => console.log("Router push:", r))
    }

    function Content() {
        const SHOW_QUERY = gql`
            query getContentPageContent($titleId: String!) {
                content(titleId: $titleId) {
                    description
                    banner {
                        url
                    }
                    title {
                        english
                        romaji
                        native
                    }
                    format
                    studios {
                        name
                    }
                    tags
                    videos {
                        id
                        episode
                        season
                        title
                        thumbnail {
                            url
                        }
                    }
                }
            }
        `

        let background_banner = "/assets/missing_banner.svg"

        // Query to fetch a show
        const { data: showData, loading: showLoading, error: showError } = useQuery(SHOW_QUERY, {
            variables: {
                titleId: props.titleId
            }
        })

        if (showLoading) {
            console.log("Fetching show data...")
            const videos = [1, 2, 3, 4, 5]
            return (
                <>
                    <div className={styles.contentInformationContainer}>
                        {/*The Banner*/}
                        <img className={styles.contentBanner} src={background_banner} alt="Show Banner"/>
                    </div>

                    <div className={styles.contentVideosContainer + " container pt-5"}>
                        {/* Only show videos if it is not a movie (movies only have 1 video)*/}
                        {showVideos &&
                        <div className={styles.contentVideos + " d-flex flex-wrap"}>
                            {videos.map(video => {
                                // console.log(video)
                                let thumbnail = "/assets/missing_banner.svg"

                                return (
                                    <div className={styles.contentVideo} key={video}>
                                        <div className={styles.contentThumbnail}>
                                            <img src={thumbnail} alt="Loading..."/>
                                        </div>
                                        <div className={styles.contentVideoInformation}>
                                            <span className={styles.contentVideoTitle}>
                                                Loading...
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        }
                    </div>
                </>
            )
        }

        if (showError) {
            console.error(showError)
            return null
        }

        console.log(showData)

        if (!showData) {
            console.log("no data")
            return null
        }

        const show = showData.content[0]

        if (!show) {
            console.log("No show found")
            return null
        }

        console.log(show)

        if (show && show.title && show.title.english) {
            document.title = "Anihaven - " + show.title.english
        }

        if (show && show.banner && show.banner.url) {
            background_banner = show.banner.url
        }

        const showVideos = (show && (show.format !== "MOVIE"))

        return (
            <>
                <div className={styles.contentInformationContainer}>
                    {/*The Banner*/}
                    <img className={styles.contentBanner} src={background_banner} alt={show.title.english}/>
                    <div className="container">
                        <div className={styles.contentBannerOverlay}>
                            {/* Content Title and Short Information */}
                            <div className={styles.contentInformation}>
                                <h2>{show.title.english}</h2>
                                <p>{show.description}</p>
                            </div>
                            <div className={styles.contentButtons}>
                                {/* Some kind of function to check the user for played videos, and play the next/resume from last played */}
                                <button>Play</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.contentVideosContainer + " container pt-5"}>
                    {/* Only show videos if it is not a movie (movies only have 1 video)*/}
                    {showVideos &&
                    <div className={styles.contentVideos + " d-flex flex-wrap"}>
                        {(show.videos).map(video => {
                            // console.log(video)
                            let thumbnail = "/assets/missing_banner.svg"
                            if (video && video.thumbnail && video.thumbnail.url) {
                                thumbnail = video.thumbnail.url
                            }

                            let episodeTitle = "Video ID: " + video.id.toString()
                            let episodeNumber = episodeTitle
                            if (video) {
                                if (video.title) {
                                    episodeTitle = video.title
                                    if (video.episode) {
                                        episodeNumber = "Episode " + video.episode.toString()
                                    }
                                }
                                else if (video.episode) {
                                    // Don't include season, would look weird for the episode context thingy
                                    episodeTitle = "Episode " + video.episode.toString()
                                    episodeNumber = episodeTitle
                                }
                            }

                            return (
                                <div className={styles.contentVideo} key={video.id}>
                                    <div className={styles.contentThumbnail}>
                                        <a onClick={() => {return watchVideo(video.id)}}>
                                            <img src={thumbnail} alt={episodeTitle}/>
                                        </a>
                                    </div>
                                    <div className={styles.contentVideoInformation}>
                                        <a onClick={() => {return watchVideo(video.id)}} className={styles.contentVideoTitle}>
                                            {episodeTitle}
                                        </a>
                                        <br/>
                                        <a onClick={() => {return watchVideo(video.id)}} className={styles.contentVideoEpisodeNumber}>
                                            {episodeNumber}
                                        </a>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    }
                </div>
            </>
        )
    }

    console.log("isWatching:", isWatching)

    console.log("render")
    return (
        <div className={styles.contentViewContainer + " container-fluid p-0"}>
            <div style={{display: isWatching ? "flex" : "none"}} className={styles.videoPlayerContainer + " justify-content-center align-items-center"}>
                <div className={styles.videoPlayerInnerContainer + " col-md-10"}>
                    <button className={styles.videoExitButton} onClick={stopWatching}>Exit</button>
                    <div className={styles.videoPlayer + " embed-responsive"}>
                        {/*<iframe className="embed-responsive-item" src={contentSource} allowFullScreen/>*/}
                        <div className={styles.videoJSPlayer} data-vjs-player>
                            <video id="player"/>
                        </div>
                    </div>
                </div>
            </div>

            <Content/>
        </div>
    )
}