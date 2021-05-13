import styles from '../styles/Navbar.module.sass'
import { useState, useEffect } from 'react'
import { debounce } from '../utilities/helpers'
import {Button, Form, FormControl, Nav, Navbar} from 'react-bootstrap'

export default function NavbarComponent(props) {
    // Scrollhandler from https://www.prwhite.io/blog/sticky-navbar-hides-scroll
    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const [visible, setVisible] = useState(true)

    const handleScroll = debounce(() => {
        const currentScrollPos = window.pageYOffset

        setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 10)

        setPrevScrollPos(currentScrollPos)
    }, 100)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)

    }, [prevScrollPos, visible, handleScroll])

    return (
        <Navbar collapseOnSelect expand="md" variant="none" className={styles.navbar+" container-fluid"} style={{top: visible ? '0' : '-55px'}}>
            <div className="container">
                <Navbar.Brand href="/">
                    <img
                        src="/favicons/favicon.svg"
                        width="auto"
                        height="30"
                        className="d-block mx-auto"
                        alt="Anihaven Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className={styles.navbarToggler + " navbar-dark"} />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/browse?type=series">Series</Nav.Link>
                        <Nav.Link href="/browse?type=movies">Movies</Nav.Link>
                        <Nav.Link href="/subscriptions">Subscriptions</Nav.Link>
                    </Nav>
                    {/* Will replace search with a search button, which opens up a search modal - kinda like AniList */}
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </div>
        </Navbar>
    )
}
