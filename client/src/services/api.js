const rootUrl = 'http://127.0.0.1:3001';

const applicationJson = {
  'Content-Type': 'application/json',
};

export async function apiGetter ({ url, headers }) {
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
    console.error(error.message);
  }
}

export async function apiPoster ({ url, headers, body }) {
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

export async function apiPutter ({ url, headers, body }) {
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
