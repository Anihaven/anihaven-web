import styles from '../styles/Footer.module.sass'
import { useTheme } from 'next-themes'

export default function FooterComponent(props) {
    const { theme, setTheme } = useTheme()
    const ThemeChanger = props => (<input type="checkbox" className="custom-control-input" id="themeSwitch" {...props}/>)
    const themeChangeEvent = event => setTheme(event.target.checked ? "dark" : "light")

    return (
        <footer className={styles.footer}>
            <div className="container py-5">
                <div className="row">
                    <div className="col-12 col-md">
                        <img className="d-block mb-2" width="auto" height={50} src="/favicons/favicon.svg" alt="Anihaven Logo" />
                        <small className="d-block mb-1">&copy; 2021</small>
                        <small className="d-block mb-3">Made with &hearts; by the fans, for the fans.</small>
                    </div>
                    <div className="col-6 col-md">
                        <h5>Policies</h5>
                        <ul className="list-unstyled text-sm-left">
                            <li><a href="/terms">Terms of Service</a></li>
                            <li><a href="/privacy">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div className="col-6 col-md">
                        <h5>Open Source</h5>
                        <ul className="list-unstyled text-sm-left">
                            <li><a href="https://github.com/Anihaven" target="_blank">GitHub</a></li>
                            <li><a href="/open-source">Dependencies</a></li>
                        </ul>
                    </div>
                    <div className="col-6 col-md">
                        <h5>Company</h5>
                        <ul className="list-unstyled text-sm-left">
                            <li><a href="/about">About</a></li>
                            <li><a href="/about#values">Our Values</a></li>
                            <li><a href="/about#plan">Our Vision</a></li>
                        </ul>
                    </div>
                    <div className="col-6 col-md">
                        <h5>Community</h5>
                        <ul className="list-unstyled text-sm-left">
                            <li><a href="https://twitter.com/AnihavenApp" target="_blank">Twitter</a></li>
                            <li><a href="https://discord.gg/">Discord</a></li>
                        </ul>
                    </div>
                    <div className="col-6 col-md">
                        <div className="custom-control custom-switch">
                            <ThemeChanger
                                checked={theme === "dark"}
                                onChange={themeChangeEvent}
                            />
                            <label className={"custom-control-label " + styles.themeToggler} htmlFor="themeSwitch">{theme === "light" ? "Light Theme" : "Dark Theme"}</label>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
