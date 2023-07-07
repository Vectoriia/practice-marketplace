import { UserState } from '../redux/slices/userSlice';
import { apiUrl } from './constants';

export interface InitialLoginValues {
  email: string;
  password: string;
}

export const PostLoginData = async (
  values: InitialLoginValues
): Promise<UserState> => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: values.email,
      password: values.password,
    }),
  };
  let res = await fetch(`${apiUrl}identity/signin`, requestOptions)
    .then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          throw new Error(text);
        });
      } else {
        return res.json();
      }
    })
    .catch((err) => {
      throw err;
    });
  return res;
};

export interface InitialSignupValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const PostSignupData = async (
  values: InitialSignupValues
): Promise<UserState> => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    }),
  };
  let res = await fetch(`${apiUrl}identity/signup`, requestOptions)
    .then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          throw new Error(text);
        });
      } else {
        return res.json();
      }
    })
    .catch((err) => {
      throw err;
    });
  return res;
};
