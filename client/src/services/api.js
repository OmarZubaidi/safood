const rootUrl = 'http://127.0.0.1:3001';

export async function api ({
  method,
  url,
  headers,
  body,
}) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body
  };
  if (method === 'GET') {
    const res = await fetch(`${rootUrl}/${url}`, options);
    return res.json();
  }
  return fetch(`${rootUrl}/${url}`, options);
}
