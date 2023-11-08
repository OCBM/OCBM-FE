// Object.freeze
// Prevents the modification of existing property attributes and values, and prevents the addition of new properties.

export const USERS_PAGE_CONSTANTS = {
  ROLE_ACCESS_TYPES: Object.freeze([
    {
      id: 1,
      role: 'ADMIN',
    },
    {
      id: 2,
      role: 'USER',
    },
  ]),
  EDIT_USER_DIALOG: Object.freeze({
    label: 'Edit Details',
    leftLabel: 'Employee Details',
    rightLabel: 'Login Details',
    message: 'Changes are Done',
  }),
  DELETE_USER_DIALOG: Object.freeze({
    message: 'Are you sure want to delete?',
  }),
};

export const MASTERY_PAGE_CONSTANTS = {
  EDIT_PLANT_DIALOG: Object.freeze({
    label: 'Edit Plant',
    orgLabel: 'Organisation Detail',
    message: 'Changes are Done',
  }),
};
