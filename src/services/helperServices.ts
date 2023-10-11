export const HELPER_SERVICES = {
  ErrorMsg: (err: any) => {
    if (Array.isArray(err)) {
      return err[0];
    }
    return err;
  },
};
