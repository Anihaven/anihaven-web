import styles from "../styles/Home.module.sass"
import { gql, useQuery } from "@apollo/client"

export default function ContentList(props) {
    // Show component
    function Show(showElement) {
        // Can break rule #1 of hooks
        // const [isHovered, setHovered] = useState(false)
        let poster_src = "/assets/missing_poster.svg"

        if (showElement.loading) {
            return (
                <div className={"d-flex justify-content-center px-1"} key={showElement.id}>
                    <div className={styles.contentPoster + " rounded"}
                        /*onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}*/>
                        <a>
                            <div className={styles.contentPosterHover} /*<style={isHovered ? {opacity: 100 } : {opacity: 0}}*/>
                                <h5/>
                                <p/>
                            </div>
                            <img
                                className={"d-block"}
                                src={poster_src}
                                alt="Loading..."
                            />
                        </a>
                    </div>
                </div>
            )
        }

        if (showElement.poster && showElement.poster.url) {
            poster_src = showElement.poster.url
        }

        return (
            <div className={"d-flex justify-content-center px-1"} key={showElement.titleId}>
                <div className={styles.contentPoster + " rounded"}
                     /*onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}*/>
                    <a href={"/content/"+showElement.titleId}>
                        <div className={styles.contentPosterHover} /*<style={isHovered ? {opacity: 100 } : {opacity: 0}}*/>
                            <h5>{showElement.title.english}</h5>
                            <p>{showElement.shortdescription}</p>
                        </div>
                        <img
                            className={"d-block"}
                            src={poster_src}
                            alt={showElement.title.english}
                        />
                    </a>
                </div>
            </div>
        )
    }

    // Get shows depending on type provided (props.type) from graphql
    const show_query = gql`
        query getContentListContent {
            content {
                titleId
                shortdescription
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
                poster {
                    url
                }
            }
        }
    `
    const { data, loading, error } = useQuery(show_query)

    if (loading) {
        const fakeShows = [{id: "1", loading: true}, {id: "2", loading: true}, {id: "3", loading: true},
            {id: "4", loading: true}, {id: "5", loading: true}, {id: "6", loading: true},
            {id: "7", loading: true}]
        return (
            <div className={styles.websiteContent + " mt-4"}>
                <div className={styles.contentListContainer + " container p-0"}>
                    <div className="row"><h5 className="col-12">{props.listTitle}</h5></div>
                    <div className={styles.contentList + " d-flex"}>
                        {fakeShows.map(Show)}
                    </div>
                    <div className={styles.contentListSpacer}/>
                </div>
            </div>
        )
    }

    if (error) {
        console.error(error)
        return null
    }

    const shows = data.content.slice(0, 4)

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