import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `
  type Book {
    title: String
    author: String
    year: Int
  }

  type Library {
    books: [Book]
  }

  schema {
    query: Query
  }

  type Query {
    greeting: String,
    hello: String,
    library: Library
  }
`;

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
    year: 1899,
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
    year: 1985,
  },
];

const resolvers = {
  Query: {
    greeting: () => "Hello GraphQL world!👋",
    hello: () => "Hello world!",
    library: () => ({ books: books }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);