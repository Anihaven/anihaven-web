import styles from "../styles/Poster.module.sass";

export default function Poster(props) {
    let poster_src = "/assets/missing_poster.svg"

    if (props.showElement.loading) {
        // Can break rule #1 of hooks
        // const [isHovered, setHovered] = useState(false)

        return (
            <div className={"d-flex justify-content-center px-1"} key={props.showElement.id}>
                <div className={styles.contentPoster + " rounded"}
                    /*onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}*/>
                    <a>
                        <div className={styles.contentPosterHover} /*<style={isHovered ? {opacity: 100 } : {opacity: 0}}*/>
                            <h5/>
                            <p/>
                        </div>
                        <img
                            className="d-block"
                            src={poster_src}
                            alt="Loading..."
                        />
                    </a>
                </div>
            </div>
        )
    }

    if (props.showElement.poster && props.showElement.poster.url) {
        poster_src = props.showElement.poster.url
    }

    return (
        <div className={"d-flex justify-content-center px-1"} key={props.showElement.titleId}>
            <div className={styles.contentPoster + " rounded"}
                /*onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}*/>
                <a href={"/content/"+props.showElement.titleId}>
                    <div className={styles.contentPosterHover} /*<style={isHovered ? {opacity: 100 } : {opacity: 0}}*/>
                        <h5>{props.showElement.title.english}</h5>
                        <p>{props.showElement.shortdescription}</p>
                    </div>
                    <img
                        className={"d-block"}
                        src={poster_src}
                        alt={props.showElement.title.english}
                    />
                </a>
            </div>
        </div>
    )
}