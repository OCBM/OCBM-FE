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
    add: '/user/create',
  },
  organization: {
    get: '/organization/get-all-organization',
  },
  plants: {
    get: '/plant/get-all-plant',
  },
  groups: {
    get: '/group/get-all-groups',
  },
};
