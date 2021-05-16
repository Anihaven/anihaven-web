import styles from '../styles/Home.module.sass'
import HeadComponent from '../components/head'
import FooterComponent from '../components/footer'
import NavbarComponent from '../components/navbar'
import { useMediaQuery } from 'react-responsive'
import ClientOnly from "../components/ClientOnly"
import ShowCarousel from "../components/ShowCarousel"
import ContentList from "../components/ContentList"

export default function Home() {
    const isBigScreen = useMediaQuery({ query: '(min-width: 550px)' })

    // const dev_shows = [{"title": "Example 1", "short_description": "Nulla vitae elit libero, a pharetra augue mollis interdum.", "content_id": 420, "poster": "/dev/Poster1.jpg", "big_image": "/dev/Series1.png"},
    //     {"title": "Example 2", "short_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "content_id": 69, "poster": "/dev/Poster2.jpg", "big_image": "/dev/Series2.png"},
    //     {"title": "Example 3", "short_description": "Praesent commodo cursus magna, vel scelerisque nisl consectetur.", "content_id": 360, "poster": "/dev/Poster3.png", "big_image": "/dev/Series3.png"},
    //     {"title": "Example 4", "short_description": "Praesent commodo cursus magna, vel scelerisque nisl consectetur.", "content_id": 360, "poster": "/dev/Poster3.png", "big_image": "/dev/Series4.jpg"},
    //     {"title": "Example 5", "short_description": "Praesent commodo cursus magna, vel scelerisque nisl consectetur.", "content_id": 360, "poster": "/dev/Poster3.png", "big_image": "/dev/Series3.png"},
    //     {"title": "Example 6", "short_description": "Praesent commodo cursus magna, vel scelerisque nisl consectetur.", "content_id": 360, "poster": "/dev/Poster3.png", "big_image": "/dev/Series3.png"},
    //     {"title": "Example 7", "short_description": "Praesent commodo cursus magna, vel scelerisque nisl consectetur.", "content_id": 360, "poster": "/dev/Poster3.png", "big_image": "/dev/Series3.png"},
    //     {"title": "Example 8", "short_description": "Praesent commodo cursus magna, vel scelerisque nisl consectetur.", "content_id": 360, "poster": "/dev/Poster3.png", "big_image": "/dev/Series3.png"},
    //     {"title": "Example 9", "short_description": "Praesent commodo cursus magna, vel scelerisque nisl consectetur.", "content_id": 360, "poster": "/dev/Poster3.png", "big_image": "/dev/Series3.png"},
    //     {"title": "Example 10", "short_description": "Praesent commodo cursus magna, vel scelerisque nisl consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur.", "content_id": 360, "poster": "/dev/Poster3.png", "big_image": "/dev/Series3.png"}]

    return (
        <>
            <HeadComponent title="Anihaven - Home"/>

            <NavbarComponent/>

            <div className={styles.dashboardContentContainer}>
                {isBigScreen &&
                    <ClientOnly>
                        <ShowCarousel/>
                    </ClientOnly>
                }
                {/* \/ Sometimes the website bugged out, and replaced the ShowCarousel with the 30px div, so just seperated them instead of ? : */}
                {!isBigScreen && <div style={{height: "30px"}}/>}

                <main className="container py-3">
                    <ClientOnly>
                        <ContentList listTitle="Popular right now" type="trending"/>
                        <ContentList listTitle="Action" type="tag-action"/>
                        <ContentList listTitle="Isekai" type="tag-isekai"/>
                    </ClientOnly>
                </main>
            </div>

            <FooterComponent/>
        </>
    )
}
