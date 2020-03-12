export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = (password: string) => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';
  return '';
};

export const nameValidator = (name: string) => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';
  return '';
};

export const titleValidator = (title: string) => {
  if (!title || title.length <= 0) return 'Title cannot be empty.';
  return '';
};

export const descriptionValidator = (description: string) => {
  if (!description || description.length <= 25)
    return 'Description cannot be less than 25 characters.';
  return '';
};

export const priceValidator = (price: String) => {
  if (!price || price.length <= 0) return 'Price cannot be empty';
  return '';
};

export const cityValidator = (city: String) => {
  if (!city || city.length <= 0) return 'City cannot be empty';
  return '';
};

export const postalCodeValidator = (postalCode: String) => {
  if (!postalCode || postalCode.length <= 0)
    return 'PostalCode cannot be empty';
  return '';
};

export const addressValidator = (address: String) => {
  if (!address || address.length <= 0) return 'Address cannot be empty';
  return '';
};
