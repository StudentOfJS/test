import createStoreContext from './Store';

export const { Provider, useStore } = createStoreContext(
  {
    count: 0,
    name: 'Rod',
  },
  'sessionStorage'
);
