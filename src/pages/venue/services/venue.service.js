import { API, graphqlOperation } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import {
  createVenue,
  deleteVenue,
  createSeating,
  updateSeating,
  deleteSeating
} from '../../../graphql/mutations';
import { searchVenues, getVenue } from '../../../graphql/queries';

export const tagList = ['Cafe', 'Restaurant', 'Groceries', 'Alchohol'];
export const layout = {
  labelCol: {
    span: 2
  },
  wrapperCol: {
    span: 16
  }
};
export const tailLayout = {
  wrapperCol: {
    offset: 16,
    span: 8
  }
};

export const gqlCreateVenue = async (venue, user) => {
  await API.graphql(
    graphqlOperation(createVenue, {
      input: venue,
      owner: user
    })
  );
};

export const gqlCreateSeating = async (seating, user) => {
  await API.graphql(
    graphqlOperation(createSeating, {
      input: seating,
      owner: user
    })
  );
};

export const gqlEditSeating = async (seating, user) => {
  await API.graphql(
    graphqlOperation(updateSeating, {
      input: seating,
      owner: user
    })
  );
};
export const gqlDeleteSeating = async (seating, user) => {
  await API.graphql(
    graphqlOperation(deleteSeating, {
      input: seating,
      owner: user
    })
  );
};

export const gqlGetVenue = async venue => {
  const result = await API.graphql(
    graphqlOperation(getVenue, { id: venue.id })
  );
  return result;
};
export const gqlOnVenueSearch = async searchTerm => {
  return await API.graphql(
    graphqlOperation(searchVenues, {
      filter: {
        or: [
          { name: { matchPhrasePrefix: searchTerm } },
          { owner: { matchPhrasePrefix: searchTerm } },
          { tags: { matchPhrasePrefix: searchTerm } }
        ]
      },
      sort: {
        field: 'name',
        direction: 'asc'
      }
    })
  );
};

export const gqlGetAuthUser = async () => {
  return await Auth.currentAuthenticatedUser({
    bypassCache: false
  });
};

export const gqlGetAuthCurrentCredentials = async () => {
  return await Auth.currentUserCredentials({
    bypassCache: false
  });
};

export const gqlOnNewVenue = (previousQuery, newData) => {
  const updatedQuery = { ...previousQuery };
  const updatedVenueList = [
    newData.onCreateVenue,
    ...previousQuery.listVenues.items
  ];
  updatedQuery.listVenues.items = updatedVenueList;
  return updatedQuery;
};

export const gqlVenueDelete = async market => {
  await API.graphql(
    graphqlOperation(deleteVenue, {
      input: market
    })
  );
};
