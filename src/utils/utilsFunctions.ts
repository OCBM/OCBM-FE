export const appendFormData = (body: any) => {
  const formData = new FormData();

  for (const key in body) {
    if (Object.prototype.hasOwnProperty.call(body, key)) {
      formData.append(key, body[key]);
    }
  }
};
