// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Player" type defines the queryable fields for every player in our data source.
  type Player {
    _id: String,
    first_name: String
    last_name: String
    age: Int
  }
  type Team {
    name: String
    description: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "players" query returns an array of zero or more players (defined above).
  type Query {
    players: [Player]
    player(id: String): Player
    playerByName(name: String, limit: Int): [Player]
    teams: [Team]
    version: String
  }
`;