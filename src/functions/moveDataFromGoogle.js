async function moveDataFromGoogle(token, dataSourceIds) {
  let data_type = '';
  if (dataSourceIds) data_type = `/${dataSourceIds}`;
  try {
    const r = await fetch(
      `${process.env.REACT_APP_API}/api/move_data_from_google${data_type}`,
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

export default moveDataFromGoogle;
