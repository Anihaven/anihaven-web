import { ApolloClient, InMemoryCache } from "@apollo/client"
import { client } from "./apollo.config"

const apolloClient = new ApolloClient({
    uri: client.service.url,
    cache: new InMemoryCache(),
})

export default apolloClient
