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
