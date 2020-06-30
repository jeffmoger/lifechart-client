export default async function getData(id, token) {
    try {
      const r = await fetch(`${process.env.REACT_APP_API}/api/get_range_data`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'authorization': 'Token ' + token,
            'id': id
          },
        });
      const response = await r.json();
      return response;
    }
    catch (err) {
      console.log(err)
      return err;
    }
  }
