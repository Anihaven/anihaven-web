import { useRouter } from 'next/router'
import { useHasMounted } from "../components/ClientOnly"
import HeadComponent from "../components/head"
import NavbarComponent from "../components/navbar"
import FooterComponent from "../components/footer"

export default function Content() {
    const router = useRouter()

    const hasMounted = useHasMounted()

    if (!hasMounted) {
        return null
    }

    Content.getInitialProps = ({ query }) => {
        return { query }
    }

    console.log(router.query)
    const { type } = router.query
    console.log(type)

    if (!type) {
        return null
    }

    return (
        <>
            <HeadComponent title="Anihaven - Browse Content"/>

            <NavbarComponent/>

            <FooterComponent/>
        </>
    )
}