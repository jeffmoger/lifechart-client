export default async function getData(token, date_range, dataSourceIds) {
  let data_type = '';
  if (dataSourceIds) data_type = `/${dataSourceIds}`;
  try {
    const r = await fetch(
      `${process.env.REACT_APP_API}/api/get_range_data/${date_range}${data_type}`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          authorization: 'Token ' + token,
        },
      }
    );
    const response = await r.json();
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
}
