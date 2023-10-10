export const SITEMAP = {
  base: {
    index: '/',
  },
  auth: {
    index: '/auth/login',
  },
  users: {
    index: '/users',
    addUser: '/users/add',
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
  },
  organization: {
    get: '/organization',
  },
  plants: {
    get: '/plant',
  },
  groups: {
    get: '/group',
  },
};
