const db = 'http://127.0.0.1:3001';

function getUsers () {
  const getOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return fetch(db + '/users', getOptions);
}

function getUser (user) {
  const getOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      uid: user.uid
    }
  };
  return fetch(db + '/user', getOptions);
}

function postUser (user) {
  const postOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  };
  return fetch(db + '/user', postOptions);
}

function updateUserAllergens (user) {
  const postOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  };
  return fetch(db + '/user/allergens', postOptions);
}

function recipeQuery (allergens, string) {
  const getOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      string: string,
      allergens: JSON.stringify(allergens)
    }
  };
  return fetch(db + '/recipe', getOptions);
}

function recipeRandom (allergens) {
  const getOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      allergens: JSON.stringify(allergens)
    }
  };
  return fetch(db + '/recipe/random', getOptions);
}

function getMenu (allergens) {
  const getOptions = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      allergens: JSON.stringify(allergens)
    },
  };
  return fetch(db + '/menu', getOptions);
}

function addEvent (event) {
  const postOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  };
  return fetch(db + '/event', postOptions);
}

function getEvents (name) {
  const getOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return fetch(db + '/events', getOptions);
}

function getEvent (id) {
  const getOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return fetch(db + `/event/${id}`, getOptions);
}

export {
  getUser,
  getUsers,
  postUser,
  updateUserAllergens,
  recipeQuery,
  recipeRandom,
  addEvent,
  getEvents,
  getEvent,
  getMenu
};
