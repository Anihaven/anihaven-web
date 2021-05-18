import { useRouter } from 'next/router'
import { useHasMounted } from "../components/ClientOnly"
import HeadComponent from "../components/head"
import NavbarComponent from "../components/navbar"
import FooterComponent from "../components/footer"
import {gql, useLazyQuery, useQuery} from "@apollo/client";
import Poster from "../components/ContentPoster";

export default function Browse() {
    const router = useRouter()

    // const hasMounted = useHasMounted()

    Browse.getInitialProps = ({ query }) => {
        return { query }
    }

    // Query to get browsing content
    const BROWSE_QUERY = gql`
        query getBrowseContent($type: String, $tags: [String], $search: String) {
            content(format: $type, tags: $tags, search: $search) {
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

    console.log(router.query)
    const { type, search } = router.query
    console.log("type:", type)
    console.log("search:", search)

    let variables = {}
    if (type) {
        variables.type = type
        if (type.toLowerCase() === "movies") {
            variables.type = "movie"
        }
    }
    if (search) {
        variables.search = search
    }

    const { error, loading, data } = useQuery(BROWSE_QUERY, {
        variables: variables
    })



    // if (!type) {
    //     return null
    // }

    if (loading) {
        const fakeShows = [{id: "1", loading: true}, {id: "2", loading: true}, {id: "3", loading: true},
            {id: "4", loading: true}, {id: "5", loading: true}]
        return (
            <>
                <HeadComponent title="Anihaven - Browse Content"/>

                <NavbarComponent/>

                <div className="container pt-2">
                    <div className="pt-5">
                        <div className="d-flex flex-row flex-wrap">
                            {fakeShows.map((show) => {
                                return (
                                    <div className="py-1">
                                        <Poster showElement={show}/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <FooterComponent/>
            </>
        )
    }

    if (error) return (
        <>
            <HeadComponent title="Anihaven - Browse Content"/>

            <NavbarComponent/>

            <div className="container pt-2">
                <div className="pt-5">
                    <h1>An error has occurred...</h1>
                </div>
            </div>

            <FooterComponent/>
        </>
    )

    return (
        <>
            <HeadComponent title="Anihaven - Browse Content"/>

            <NavbarComponent/>

            <div className="container pt-2">
                <div className="pt-5">
                    <div className="d-flex flex-row flex-wrap">
                        {data.content.map((show) => {
                            return (
                                <div className="py-1">
                                    <Poster showElement={show}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <FooterComponent/>
        </>
    )
}