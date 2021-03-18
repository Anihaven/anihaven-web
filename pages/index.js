import styles from '../styles/Home.module.sass'
import HeadComponent from '../components/head'
import FooterComponent from '../components/footer'
import NavbarComponent from '../components/navbar'
import { Carousel } from 'react-bootstrap'
import { useMediaQuery } from 'react-responsive'

export default function Home() {
    const isBigScreen = useMediaQuery({ query: '(min-width: 550px)' })

    function ShowCarousel(props) {
        const shows = [{"title": "Example 1", "short_description": "Nulla vitae elit libero, a pharetra augue mollis interdum.", "content_id": 420, "image": "/dev/Series1.png"},
            {"title": "Example 2", "short_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "content_id": 69, "image": "/dev/Series2.png"},
            {"title": "Example 3", "short_description": "Praesent commodo cursus magna, vel scelerisque nisl consectetur.", "content_id": 360, "image": "/dev/Series3.png"}]

        return (
            <div className={styles.carousel + " container-fluid p-0"}>
                <Carousel controls={false}>
                    {shows.map(function (value) {
                        return (
                            <Carousel.Item>
                                <a href={"/watch/"+value.content_id}>
                                    <img
                                        className="d-block"
                                        src={value.image}
                                        alt={value.title}
                                    />
                                </a>
                                <Carousel.Caption>
                                    <h3>{value.title}</h3>
                                    <p>{value.short_description}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
            </div>
        )
    }

    return (
        <div>
            <HeadComponent title="Anihaven - Home"/>

            <NavbarComponent/>

            <div className={styles.dashboardContent}>
                {isBigScreen && <ShowCarousel/>}

                <main className="container py-3 mt-5">
                    <h1>
                        Welcome to Anihaven!
                    </h1>

                    <div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer condimentum egestas tincidunt. Mauris volutpat gravida nunc et eleifend. Aenean ullamcorper enim eu leo sodales accumsan. Proin at accumsan tortor. Vivamus purus lorem, ornare vitae sollicitudin eu, scelerisque quis nunc. Donec lobortis placerat nulla, non sodales dui hendrerit a. Aliquam lacinia libero vitae nisl luctus luctus. Nam pulvinar malesuada ipsum in rutrum. In dictum euismod massa, at ultrices mauris laoreet laoreet. Nam sollicitudin iaculis dolor malesuada fringilla. Proin pharetra quam eget tincidunt aliquam. Ut et odio feugiat, dictum nunc eget, pretium eros. Etiam sed enim sed libero pulvinar iaculis.
                        </p>
                        <p>
                            Donec eget lorem ornare, lacinia odio et, faucibus nisl. Integer eget justo non nisl sollicitudin sollicitudin. Morbi ante diam, sollicitudin id arcu non, lacinia varius nisi. Fusce tempor in leo vitae accumsan. Sed tempus est libero, et lacinia magna pellentesque non. Morbi a dui quis elit laoreet molestie eget vitae risus. Mauris tincidunt consequat neque, ac efficitur diam blandit sit amet. Aenean tincidunt eu lacus eleifend pulvinar. Ut vehicula convallis vulputate.
                        </p>
                        <p>
                            Vivamus venenatis lobortis arcu ac ultricies. Suspendisse mauris enim, porta et sem id, dapibus cursus sem. Aenean suscipit nulla augue, a eleifend ipsum sodales vel. Nam at risus aliquam, pellentesque sem a, porta augue. Maecenas cursus vulputate ultrices. Ut quis mauris quam. Nulla ac velit quam. Donec scelerisque vel nunc non bibendum. Sed vitae mattis sem. Cras ultrices ante vel velit imperdiet, non malesuada lectus sollicitudin. Integer felis ante, vestibulum sit amet congue non, pulvinar eget felis.
                        </p>
                        <p>
                            Sed lacinia, velit a scelerisque condimentum, elit turpis vehicula lacus, quis feugiat nulla dolor eu mauris. Phasellus eu molestie sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis nibh lorem, at venenatis libero vulputate sit amet. Proin tristique turpis odio, a congue nibh laoreet at. Duis in convallis magna. Aliquam vitae ullamcorper sem. Vestibulum aliquet ultricies ex vel imperdiet. Vivamus condimentum eros vitae lorem condimentum, in consequat odio condimentum. Aliquam maximus purus in sapien imperdiet porta. Sed nec risus ex. Integer at quam vitae orci gravida finibus eu vitae tortor. Donec eu felis iaculis, rutrum risus a, egestas felis. Vestibulum condimentum scelerisque metus id tincidunt. Quisque ultrices venenatis mauris, id semper lacus auctor sit amet.
                        </p>
                        <p>
                            Duis in facilisis nunc. Nulla facilisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus rutrum ullamcorper nunc, nec euismod turpis rutrum ut. Maecenas condimentum mollis placerat. Sed molestie dui eu efficitur condimentum. Nullam id nulla magna.
                        </p>
                    </div>
                </main>
            </div>

            <FooterComponent/>
        </div>
    )
}
