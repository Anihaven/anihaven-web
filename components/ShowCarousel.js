import { gql, useQuery } from "@apollo/client"
import styles from "../styles/Home.module.sass"
import { Carousel } from "react-bootstrap"

export default function ShowCarousel(props) {
    // Get currently popular shows, and newly added content from graphql (like, limit of 3-5 or smthn)
    const show_query = gql`
        query getCarouselContent {
            getAllContent {
                titleId
                shortdescription
                banner {
                    id
                    format
                    type
                    storage {
                        name
                        endpoint
                    }
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
            }
        }
    `
    const { data, loading, error } = useQuery(show_query)

    if (loading) {
        return <h2>Loading...</h2>
    }

    if (error) {
        console.error(error)
        return null
    }

    const shows = data.getAllContent.slice(0, 4)
    console.log(shows)
    //ddd

    return (
        <div className={styles.carousel + " container-fluid p-0"}>
            <Carousel controls={false}>
                {shows.map(function(show) {
                    let bannerURL = "/assets/missing_banner.svg"
                    if (show && show.banner && show.banner.url) {
                        bannerURL = show.banner.url
                    }
                    return (
                        <Carousel.Item>
                            <a href={"/content/"+show.titleId}>
                                <div className={styles.carouselGradient}>
                                    <img
                                        className="d-block"
                                        src={bannerURL}
                                        alt={show.title.english}
                                    />
                                </div>
                            </a>
                            <Carousel.Caption>
                                <h3>{show.title.english}</h3>
                                <p>{show.shortdescription}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )
                })}
            </Carousel>
        </div>
    )
}