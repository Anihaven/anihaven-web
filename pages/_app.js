import '../styles/variables.css'
import '../styles/global.sass'
import { ThemeProvider } from 'next-themes'
import apolloClient from "../apollo-client"
import { ApolloProvider } from "@apollo/client"

function MyApp({ Component, pageProps }) {
    return (
        <ApolloProvider client={apolloClient}>
            <ThemeProvider defaultTheme="system">
                <Component {...pageProps} />
            </ThemeProvider>
        </ApolloProvider>
      )
}

export default MyApp
