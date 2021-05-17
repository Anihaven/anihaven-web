import { useRouter } from 'next/router'
import HeadComponent from "../../components/head"
import NavbarComponent from "../../components/navbar"
import FooterComponent from "../../components/footer"
import ClientOnly from "../../components/ClientOnly"
import ContentView from "../../components/ContentView"
import {dashboardContentContainer} from "../../styles/Home.module.sass"

export default function Content() {
    const router = useRouter()
    const { titleId } = router.query

    return (
        <>
            <HeadComponent title="Anihaven - Content Loading..."/>

            <NavbarComponent/>

            <div className={dashboardContentContainer}>
                <ClientOnly>
                    <ContentView titleId={titleId}/>
                </ClientOnly>
            </div>

            <FooterComponent/>
        </>
    )
}