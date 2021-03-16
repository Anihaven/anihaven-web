import Head from 'next/head'

export default function HeadComponent(props) {
    const websiteName = "Anihaven"
    const description = "Anihaven is your new go-to place for [yeah I'll uh.. write this later]"
    const keywords = "anihaven, anime, stream, free, legal"

    return (
        <Head>
            {/*Normal stuff*/}
            <title>{props.title}</title>
            <meta name="msapplication-TileColor" content="#30bbf2" />

            {/*SEO*/}
            <meta name="application-name" content={websiteName} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta property="og:site_name" content={websiteName} />
            <meta property="og:title" content={props.title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content="https://www.anihaven.net/" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="/favicons/mstile-310x310.png" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={props.title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content="/favicons/mstile-310x310.png" />

            {/*Favicons*/}
            <link rel="icon" href="/favicons/favicon.ico" />
            <link rel="shortcut icon" href="/favicons/favicon.ico" />
            <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/favicons/apple-touch-icon-57x57.png" />
            <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/favicons/apple-touch-icon-114x114.png" />
            <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/favicons/apple-touch-icon-72x72.png" />
            <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/favicons/apple-touch-icon-144x144.png" />
            <link rel="apple-touch-icon-precomposed" sizes="60x60" href="/favicons/apple-touch-icon-60x60.png" />
            <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/favicons/apple-touch-icon-120x120.png" />
            <link rel="apple-touch-icon-precomposed" sizes="76x76" href="/favicons/apple-touch-icon-76x76.png" />
            <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/favicons/apple-touch-icon-152x152.png" />
            <link rel="icon" type="image/png" href="/favicons/favicon-196x196.png" sizes="196x196" />
            <link rel="icon" type="image/png" href="/favicons/favicon-96x96.png" sizes="96x96" />
            <link rel="icon" type="image/png" href="/favicons/favicon-32x32.png" sizes="32x32" />
            <link rel="icon" type="image/png" href="/favicons/favicon-16x16.png" sizes="16x16" />
            <link rel="icon" type="image/png" href="/favicons/favicon-128.png" sizes="128x128" />
            <meta name="msapplication-TileImage" content="/favicons/mstile-144x144.png" />
            <meta name="msapplication-square70x70logo" content="/favicons/mstile-70x70.png" />
            <meta name="msapplication-square150x150logo" content="/favicons/mstile-150x150.png" />
            <meta name="msapplication-wide310x150logo" content="/favicons/mstile-310x150.png" />
            <meta name="msapplication-square310x310logo" content="/favicons/mstile-310x310.png" />

            {/*Viewport and responsiveness*/}
            <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
            <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta charSet="utf-8" />
        </Head>
    )
}
