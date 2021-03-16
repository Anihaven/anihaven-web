import styles from '../styles/Navbar.module.sass'

export default function NavbarComponent(props) {

    return (
        <nav className={styles.navbar}>
            <div className="container py-1 d-flex flex-column flex-md-row justify-content-between">
                <a className="py-2" href="#">
                    <img className="d-block mx-auto" width="auto" height={30} src="/favicons/favicon.svg" alt="Anihaven Logo" />
                </a>
                <a className="py-2 d-none d-md-inline-block" href="#">Series</a>
                <a className="py-2 d-none d-md-inline-block" href="#">Movies</a>
                <a className="py-2 d-none d-md-inline-block" href="#">Subscriptions</a>
            </div>
        </nav>
    )
}
