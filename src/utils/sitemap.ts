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
    machinesbyId: '/machines/:id',
    hydraulicSystem: '/machines/:id/hydraulicSystem',
    SpindleCoolingSystem: '/machines/:id/SpindleCoolingSystem',
    LubricationSystem: '/machines/:id/LubricationSystem',
  },
  mastery: {
    index: '/mastery',
    manualEntry: '/mastery/manualEntry',
  },
  setStandards: {
    index: '/setStandards',
    NewSetStandards: '/setStandards/NewSetStandards',
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
    add: '/plant',
    delete: '/plant',
    update: '/plant',
  },
  machineLine: {
    get: '/machineline',
    add: '/machineline',
    update: '/machineline',
    delete: '/machineline',
  },
  shops: {
    get: '/shop',
    add: '/shop',
    update: '/shop',
    delete: 'shop',
  },
  machines: {
    get: '/machine',
    add: '/machine',
    update: '/machine',
    delete: '/machine',
  },
  element: {
    get: '/element',
    add: '/element',
    update: '/element',
    delete: '/element',
  },
  groups: {
    get: '/group',
  },
  setStandards: {
    get: '/sensor-properties',
    post: '/sensor-properties',
    bulk: '/sensor-properties/bulk',
    update: '/sensor-properties',
    delete: '/sensor-properties',
  },
};
