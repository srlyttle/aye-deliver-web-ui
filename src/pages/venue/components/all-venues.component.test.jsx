import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import AllVenues from './all-venues.component';
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});
function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history
  };
}

test('<AllVenues is rendered correctly', async () => {
  const confirmVenueDelete = () => {};
  const allVenueData = [
    {
      createdAt: '2020-06-02T15:36:04.492Z',
      id: '58ae3921-df19-4427-a183-50174ea47e94',
      name: 'Hello world!',
      owner: 'cf950200-670b-4dda-adca-d022f085d266',
      products: { nextToken: null },
      tags: ['Cafe', 'Restaurant', 'Groceries', 'Alchohol'],
      updatedAt: '2020-06-02T15:36:04.492Z'
    }
  ];
  const allVenues = (
    <AllVenues
      tableData={allVenueData}
      confirmVenueDelete={confirmVenueDelete}
    />
  );

  const { findByText, container } = renderWithRouter(allVenues);

  const item = await findByText(allVenueData[0].name);
  expect(item.innerHTML).toBe(allVenueData[0].name);
  expect(container).toMatchSnapshot();
  //ant-tag ant-tag-blue
  expect(
    document.querySelectorAll('tbody tr:first-child .ant-tag').length
  ).toBe(4);
  const editLink = document.querySelector('tbody tr:first-child a');
  expect(editLink.getAttribute('href')).toBe(`/venue/${allVenueData[0].id}`);
});
