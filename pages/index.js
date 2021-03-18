import styles from '../styles/Home.module.sass'
import HeadComponent from '../components/head'
import FooterComponent from '../components/footer'
import NavbarComponent from '../components/navbar'
import { Carousel } from 'react-bootstrap'
import { useMediaQuery } from 'react-responsive'
import {useState} from "react";

export default function Home() {
    const isBigScreen = useMediaQuery({ query: '(min-width: 550px)' })

    const dev_shows = [{"title": "Example 1", "short_description": "Nulla vitae elit libero, a pharetra augue mollis interdum.", "content_id": 420, "poster": "/dev/Poster1.jpg", "big_image": "/dev/Series1.png"},
        {"title": "Example 2", "short_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "content_id": 69, "poster": "/dev/Poster2.jpg", "big_image": "/dev/Series2.png"},
        {"title": "Example 3", "short_description": "Praesent commodo cursus magna, vel scelerisque nisl consectetur.", "content_id": 360, "poster": "/dev/Poster3.png", "big_image": "/dev/Series3.png"},
        {"title": "Example 4", "short_description": "Praesent commodo cursus magna, vel scelerisque nisl consectetur.", "content_id": 360, "poster": "/dev/Poster3.png", "big_image": "/dev/Series4.jpg"},
        {"title": "Example 5", "short_description": "Praesent commodo cursus magna, vel scelerisque nisl consectetur.", "content_id": 360, "poster": "/dev/Poster3.png", "big_image": "/dev/Series3.png"},
        {"title": "Example 6", "short_description": "Praesent commodo cursus magna, vel scelerisque nisl consectetur.", "content_id": 360, "poster": "/dev/Poster3.png", "big_image": "/dev/Series3.png"},
        {"title": "Example 7", "short_description": "Praesent commodo cursus magna, vel scelerisque nisl consectetur.", "content_id": 360, "poster": "/dev/Poster3.png", "big_image": "/dev/Series3.png"},
        {"title": "Example 8", "short_description": "Praesent commodo cursus magna, vel scelerisque nisl consectetur.", "content_id": 360, "poster": "/dev/Poster3.png", "big_image": "/dev/Series3.png"},
        {"title": "Example 9", "short_description": "Praesent commodo cursus magna, vel scelerisque nisl consectetur.", "content_id": 360, "poster": "/dev/Poster3.png", "big_image": "/dev/Series3.png"},
        {"title": "Example 10", "short_description": "Praesent commodo cursus magna, vel scelerisque nisl consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur.", "content_id": 360, "poster": "/dev/Poster3.png", "big_image": "/dev/Series3.png"}]


    function ShowCarousel(props) {
        // Get currently popular shows, and newly added content from graphql (like, limit of 3-5 or smthn)
        const shows = [dev_shows[0], dev_shows[1], dev_shows[2]]
        return (
            <div className={styles.carousel + " container-fluid p-0"}>
                <Carousel controls={false}>
                    {shows.map(function (value) {
                        return (
                            <Carousel.Item>
                                <a href={"/watch/"+value.content_id}>
                                    <div className={styles.carouselGradient}>
                                        <img
                                            className="d-block"
                                            src={value.big_image}
                                            alt={value.title}
                                        />
                                    </div>
                                </a>
                                <Carousel.Caption>
                                    <h3>{value.title}</h3>
                                    <p>{value.short_description}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
            </div>
        )
    }

    function ContentList(props) {
        // Show component
        function Show(showElement) {
            const [isHovered, setHovered] = useState(false)

            return (
                <div className={"d-flex justify-content-center px-1"}>
                    <div className={styles.contentPoster + " rounded"}
                         onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                        <a href={"/watch/"+showElement.content_id}>
                            <div className={styles.contentPosterHover} style={isHovered ? {opacity: 100 } : {opacity: 0}}>
                                <h5>{showElement.title}</h5>
                                <p>{showElement.short_description}</p>
                            </div>
                            <img
                                className={"d-block"}
                                src={showElement.poster}
                                alt={showElement.title}
                            />
                        </a>
                    </div>
                </div>
            )
        }

        // Get shows depending on type provided (props.type) from graphql
        const shows = dev_shows
        return (
            <div className={styles.websiteContent + " mt-4"}>
                <div className={styles.contentListContainer + " container p-0"}>
                    <div className="row"><h5 className="col-12">{props.listTitle}</h5></div>
                    <div className={styles.contentList + " d-flex"}>
                        {shows.map(Show)}
                    </div>
                    <div className={styles.contentListSpacer}/>
                </div>
            </div>
        )
    }

    return (
        <div>
            <HeadComponent title="Anihaven - Home"/>

            <NavbarComponent/>

            <div className={styles.dashboardContentContainer}>
                {isBigScreen && <ShowCarousel/>}
                {/* \/ Sometimes the website bugged out, and replaced the ShowCarousel with the 30px div, so just seperated them instead of ? : */}
                {!isBigScreen && <div style={{height: "30px"}}/>}

                <main className="container py-3">
                    <ContentList listTitle="Popular right now" type="trending"/>
                    <ContentList listTitle="Action" type="tag-action"/>
                    <ContentList listTitle="Isekai" type="tag-isekai"/>
                </main>
            </div>

            <FooterComponent/>
        </div>
    )
}
