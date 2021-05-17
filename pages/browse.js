import { useRouter } from 'next/router'
import { useHasMounted } from "../components/ClientOnly"
import HeadComponent from "../components/head"
import NavbarComponent from "../components/navbar"
import FooterComponent from "../components/footer"

export default function Browse() {
    const router = useRouter()

    const hasMounted = useHasMounted()

    if (!hasMounted) {
        return null
    }

    Browse.getInitialProps = ({ query }) => {
        return { query }
    }

    console.log(router.query)
    const { type, search } = router.query
    console.log("type:", type)
    console.log("search:", search)

    // if (!type) {
    //     return null
    // }

    return (
        <>
            <HeadComponent title="Anihaven - Browse Content"/>

            <NavbarComponent/>

            <div className="container pt-2">
                <div className="pt-5">
                    <h1>Under construction...</h1>
                </div>
            </div>

            <FooterComponent/>
        </>
    )
}