//Get the API URL from .env
const API_URL = import.meta.env.VITE_APP_TRAVEL_JOURNAL_API_URL; //localhost:8000

if (!API_URL)
  throw new Error('API URL is required, are you missing a .env file?');

//Since all functions in this file will be sending requests /posts, we will create that as the base url.
const baseURL = `${API_URL}/auth`; //localhost:8000/posts

export const me = async () => {
  const res = await fetch(`${baseURL}/me`, {
    credentials: 'include', // needed to recieve and save cookies
  });

  if (!res.ok) {
    const errorData = await res.json();

    throw new Error(errorData.error || 'An error occurred while signing in');
  }

  const data = await res.json();
  return data;
};

export const signUp = async (formData) => {
  const res = await fetch(`${baseURL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const errorData = await res.json();

    throw new Error(errorData.error || 'An error occurred while signing up');
  }

  const data = await res.json();
  return data;
};

export const signIn = async (formData) => {
  const res = await fetch(`${baseURL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
    credentials: 'include', // needed to recieve and save cookies
  });

  if (!res.ok) {
    const errorData = await res.json();

    throw new Error(errorData.error || 'An error occurred while signing in');
  }

  const data = await res.json();
  return data;
};

export const signOut = async () => {
  const res = await fetch(`${baseURL}/signout`, {
    method: 'DELETE',
    credentials: 'include', // needed to recieve and save cookies
  });

  if (!res.ok) {
    const errorData = await res.json();

    throw new Error(errorData.error || 'An error occurred while signing in');
  }

  const data = await res.json();
  return data;
};
