import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'


const typeDefs = gql`
	extend type User {
		height: Int
	}
`

const resolvers = {
	User : {
		height() {
			return 35
		}
	}
}

const cache = new InMemoryCache()
const http = new HttpLink({
  uri: 'http://localhost:4000/'
})

const link = ApolloLink.from([
  http
])


const client = new ApolloClient({
	link,
  cache,
  typeDefs,
  resolvers
})

export default client