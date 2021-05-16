import { gql, useQuery } from "@apollo/client"
import styles from "../styles/ContentView.module.sass"
import { useRouter } from "next/router"
import { useState, useEffect, useCallback } from "react"
import videojs from 'video.js'
import 'videojs-youtube'


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
            console.log(document.body.innerHTML.toString())

            if (watch !== undefined) {
                console.log("not undefined")

                console.log("videoId:", watch)
                console.log("titleId:", props.titleId)

                watchVideo(watch)
            }
        }
    }, [props.titleId, router.query.watch, document.getElementsByClassName(styles.videoPlayer)[0]])

    // Video player hooks
    const [videoElement, setVideoElement] = useState(null)
    const onVideo = useCallback((elem) => {
        console.log("Setting video element: ", elem)
        setVideoElement(elem)
    }, [])

    let videoJsOptions = {
        techOrder: ['youtube'],
        autoplay: false,
        controls: true,
        fluid: true,
        sources: [
            {
                src: 'https://www.youtube.com/watch?v=IxQB14xVas0',
                type: 'video/youtube',
            },
        ],
    }

    // Listen to new video elements and props
    useEffect(() => {
        console.log("video.js onEffect")
        console.log(videoElement.innerHTML)
        console.log(videoJsOptions)
        if (!videoElement) return
        const player = videojs(videoElement, videoJsOptions)
        return () => {
            player.dispose()
        }
    }, [videoJsOptions, videoElement])

    // Watch video function
    function watchVideo(videoId) {
        setIsWatching(true)

        console.log("router push: " + videoId.toString())
        router.push("/content/[titleId]?watch=" + videoId.toString(),
            "/content/" + props.titleId + "?watch=" + videoId.toString(),
            { shallow: true }).then(r => console.log("Router push:", r))

        // Add the video player
        console.log("Adding video player")
        if (document) {
            console.log("Document found")
            let videoPlayer = document.getElementsByClassName(styles.videoPlayer)[0]
            if (videoPlayer) {
                console.log("Video player found")
                videoJsOptions.sources = [
                        {
                            src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                            type: 'video/youtube',
                        },
                    ]
                // const player = Player({...videoJsOptions})

                // let player = document.createElement("iframe")
                // player.className = "embed-responsive-item"
                // player.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&autoplay=1"
                // player.allowFullscreen
                //
                // console.log("adding video player")
                // videoPlayer.appendChild(player)
            }

        }

        // Return false to avoid page refresh
        return false
    }

    // Function called when user wants to stop watching, by clicking the exit button
    function stopWatching() {
        console.log("stop watching")

        // remove the video player
        if (document) {
            let videoPlayer = document.getElementsByClassName(styles.videoPlayer)[0]
            if (videoPlayer) {
                videoPlayer.innerHTML = ""
            }
        }

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
        const show_query = gql`
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

        const variables = {
            titleId: props.titleId
        }

        console.log("ContentView")

        let background_banner = "/assets/missing_banner.svg"

        const { data, loading, error } = useQuery(show_query, {
            variables: variables
        })

        if (loading) {
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

        if (error) {
            console.error(error)
            return null
        }

        console.log(data)

        if (!data) {
            console.log("no data")
            return null
        }

        const show = data.content[0]

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
                    <div className={styles.videoPlayer + " embed-responsive embed-responsive-16by9"}>
                        {/*<iframe className="embed-responsive-item" src={contentSource} allowFullScreen/>*/}
                        <div data-vjs-player>
                            <video ref={onVideo} className="video-js" playsInline/>
                        </div>
                    </div>
                </div>
            </div>

            <Content/>
        </div>
    )
}