export const getSymptomList = async (token) => {
  try {
    let res = await fetch(`${process.env.REACT_APP_API}/api/symptoms/read`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: 'Token ' + token,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export async function fetchAuthentication(email, password) {
  try {
    const r = await fetch(`${process.env.REACT_APP_API}/api/users/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      }),
    });
    const response = await r.json();
    return response;
  } catch (err) {
    return console.log(err);
  }
}

export async function getProfile(id, token) {
  const r = await fetch(`${process.env.REACT_APP_API}/api/users/read`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: 'Token ' + token,
      id: id,
    },
  });
  const response = await r.json();
  return response;
}

export async function getDemoID() {
  const r = await fetch(`${process.env.REACT_APP_API}/api/demo/id`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  });
  const response = await r.json();
  return response;
}
