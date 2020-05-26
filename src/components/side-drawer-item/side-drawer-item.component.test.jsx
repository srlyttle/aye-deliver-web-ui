import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import ListItem from '../side-drawer-item/side-drawer-item.component';

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

test('<ListItem is rendered correctly', async () => {
  const listItemsData = [
    {
      id: 1,
      text: 'Provide Delivery Services',
      route: '/deviveryservices',
      icon: 'deliver',
      alert: false
    },
    {
      id: 2,
      text: 'Sell goods for Delivery',
      route: '/sell',
      icon: 'sell',
      alert: false
    },
    { id: 3, text: 'FAQs', route: '/faq', icon: 'faq', alert: false },
    { id: 4, text: 'Log Out', route: '/logout', icon: 'exit', alert: true }
  ];
  const listItems = listItemsData.map(li => (
    <ListItem
      key={li.id}
      text={li.text}
      route={li.route}
      icon={li.icon}
      alert={li.alert}
    />
  ));
  // const {container} = renderWithRouter(<App />)
  const { findByText } = renderWithRouter(listItems);

  const item = await findByText(listItemsData[0].text);
  expect(item.innerHTML).toBe(listItemsData[0].text);
});
