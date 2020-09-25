export default async function getData(token, date_range) {
  try {
    const r = await fetch(
      `${process.env.REACT_APP_API}/api/items/all/${date_range}`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          authorization: 'Token ' + token,
        },
      }
    );
    const response = await r.json();
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
}
