export const SITEMAP = {
  base: {
    index: '/',
  },
  auth: {
    index: '/auth/login',
  },
  users: {
    index: '/usersdetails',
    addUser: '/usersdetails/addUser',
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
