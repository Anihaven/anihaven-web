import { gql, useQuery } from "@apollo/client"
import styles from "../styles/ContentView.module.sass"

export default function ContentView(props) {
    const show_query = gql`
        query getContentPageContent($titleId: String!) {
            getContentByTitleID(titleId: $titleId) {
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

    const { data, loading, error } = useQuery(show_query, {
        variables: variables
    })

    if (loading) {
        return <h2>Loading...</h2>
    }

    if (error) {
        console.error(error)
        return null
    }

    console.log(data)

    const show = data.getContentByTitleID

    console.log(show)

    let background_banner = "/assets/missing_banner.svg"
    if (show && show.banner && show.banner.url) {
        background_banner = show.banner.url
    }

    return (
        <div className="container-fluid p-0">
            <div className={styles.contentInformationContainer}>
                <img className={styles.contentBanner} src={background_banner} alt={show.title.english}/>
                <div className={"container " + styles.contentInformation}>
                    <h2>{show.title.english}</h2>
                    <p>{show.description}</p>
                </div>
            </div>
            <div className="container">
                <div className={styles.contentVideos}>
                    {(show.videos).map(video => {
                        console.log(video)
                        return (
                            <p>Fuck</p>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}