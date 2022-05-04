import { IRequest } from "../interfaces/Request.interface";

const serverHost = process.env.REACT_APP_SERVER_HOST || '127.0.0.1';
const serverPort = process.env.REACT_APP_SERVER_PORT || '3001';
const rootUrl = `http://${serverHost}:${serverPort}`;

const applicationJson = {
  'Content-Type': 'application/json',
};

export async function apiGetter({ url, headers }: IRequest) {
  const options = {
    method: 'GET',
    headers: {
      ...applicationJson,
      ...headers
    }
  };
  try {
    const res = await fetch(`${rootUrl}/${url}`, options);
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}

export async function apiPoster({ url, headers, body }: IRequest) {
  const options = {
    method: 'POST',
    headers: {
      ...applicationJson,
      ...headers
    },
    body
  };

  return fetch(`${rootUrl}/${url}`, options);
}

export async function apiPutter({ url, headers, body }: IRequest) {
  const options = {
    method: 'PUT',
    headers: {
      ...applicationJson,
      ...headers
    },
    body
  };

  return fetch(`${rootUrl}/${url}`, options);
}
