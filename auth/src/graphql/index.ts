import { ApolloServer } from 'apollo-server-express';
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';

const resolversArray = fileLoader(path.join(__dirname, './resolvers/'), {
  recursive: true,
  extensions: ['.ts'],
});

const typesArray = fileLoader(path.join(__dirname, './types/'), {
  recursive: true,
  extensions: ['.gql'],
});

const resolvers = mergeResolvers(resolversArray);
const typeDefs = mergeTypes(typesArray, { all: true });

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export { apolloServer };
