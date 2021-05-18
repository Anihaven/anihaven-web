import styles from "../styles/Home.module.sass"
import { gql, useQuery } from "@apollo/client"
import Poster from "./ContentPoster";

export default function ContentList(props) {
    // Get shows depending on type provided (props.type) from graphql
    const SHOW_QUERY = gql`
        query getContentListContent($tags: [String]) {
            content(tags: $tags) {
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
                poster {
                    url
                }
                tags
            }
        }
    `

    // Get variables
    let variables = {}
    if (props.type) {
        console.log("type:", props.type)
        if (props.type.startsWith("tag-")) {
            const tag = props.type.replace("tag-", "")
            variables.tags = [tag]
        }
    }
    console.log(variables)

    const { data, loading, error } = useQuery(SHOW_QUERY, {
        variables: variables
    })

    if (loading) {
        const fakeShows = [{id: "1", loading: true}, {id: "2", loading: true}, {id: "3", loading: true},
            {id: "4", loading: true}, {id: "5", loading: true}, {id: "6", loading: true},
            {id: "7", loading: true}]
        return (
            <div className={styles.websiteContent + " mt-4"}>
                <div className={styles.contentListContainer + " container p-0"}>
                    <div className="row"><h5 className="col-12">{props.listTitle}</h5></div>
                    <div className={styles.contentList + " d-flex"}>
                        {fakeShows.map((show) => {
                            return Poster({ showElement: show })
                        })}
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

    console.log(variables, shows)

    return (
        <div className={styles.websiteContent + " mt-4"}>
            <div className={styles.contentListContainer + " container p-0"}>
                <div className="row"><h5 className="col-12">{props.listTitle}</h5></div>
                <div className={styles.contentList + " d-flex"}>
                    {shows.map((show) => {
                        return Poster({ showElement: show })
                    })}
                </div>
                <div className={styles.contentListSpacer}/>
            </div>
        </div>
    )
}