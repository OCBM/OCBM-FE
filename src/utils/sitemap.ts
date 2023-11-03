export const SITEMAP = {
  base: {
    index: '/',
  },
  auth: {
    index: '/auth/login',
  },
  plant: {
    index: '/plant',
  },
  machines: {
    index: '/machines',
  },
  mastery: {
    index: '/mastery',
  },
  setStandards: {
    index: '/setStandards',
  },
  reports: {
    index: '/reports',
  },
  users: {
    index: '/userDetails',
    addUser: '/userDetails/addUser',
  },
  notFound: '*',
};

export const SERVICES = {
  auth: {
    login: '/auth/login',
  },
  user: {
    add: '/user',
    get: '/user',
    update: '/user',
    delete: '/user',
  },
  organization: {
    get: '/organization',
  },
  plants: {
    get: '/plant',
  },
  shops: {
    get: '/shop',
    add: '/shop',
    update: '/shop',
    delete: 'shop',
  },
  groups: {
    get: '/group',
  },
};
