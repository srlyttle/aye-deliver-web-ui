/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      note
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        note
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getMarket = /* GraphQL */ `
  query GetMarket($id: ID!) {
    getMarket(id: $id) {
      id
      name
      products {
        items {
          id
          description
          price
          shipped
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      tags
      owner
      createdAt
      updatedAt
    }
  }
`;
export const listMarkets = /* GraphQL */ `
  query ListMarkets(
    $filter: ModelMarketFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMarkets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        products {
          nextToken
        }
        tags
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      description
      market {
        id
        name
        products {
          nextToken
        }
        tags
        owner
        createdAt
        updatedAt
      }
      file {
        bucket
        region
        key
      }
      price
      shipped
      owner
      createdAt
      updatedAt
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        description
        market {
          id
          name
          tags
          owner
          createdAt
          updatedAt
        }
        file {
          bucket
          region
          key
        }
        price
        shipped
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      registered
      orders {
        items {
          id
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const getVenue = /* GraphQL */ `
  query GetVenue($id: ID!) {
    getVenue(id: $id) {
      id
      name
      Seatings {
        items {
          id
          name
          description
          outside
          maxPeople
          foodOnly
          depositRequired
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      tags
      owner
      createdAt
      updatedAt
    }
  }
`;
export const listVenues = /* GraphQL */ `
  query ListVenues(
    $filter: ModelVenueFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVenues(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        Seatings {
          nextToken
        }
        tags
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSeating = /* GraphQL */ `
  query GetSeating($id: ID!) {
    getSeating(id: $id) {
      id
      name
      description
      venue {
        id
        name
        Seatings {
          nextToken
        }
        tags
        owner
        createdAt
        updatedAt
      }
      file {
        bucket
        region
        key
      }
      outside
      maxPeople
      foodOnly
      depositRequired
      owner
      createdAt
      updatedAt
    }
  }
`;
export const listSeatings = /* GraphQL */ `
  query ListSeatings(
    $filter: ModelSeatingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSeatings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        venue {
          id
          name
          tags
          owner
          createdAt
          updatedAt
        }
        file {
          bucket
          region
          key
        }
        outside
        maxPeople
        foodOnly
        depositRequired
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchMarkets = /* GraphQL */ `
  query SearchMarkets(
    $filter: SearchableMarketFilterInput
    $sort: SearchableMarketSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchMarkets(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        products {
          nextToken
        }
        tags
        owner
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchVenues = /* GraphQL */ `
  query SearchVenues(
    $filter: SearchableVenueFilterInput
    $sort: SearchableVenueSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchVenues(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        Seatings {
          nextToken
        }
        tags
        owner
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
