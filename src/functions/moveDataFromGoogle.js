async function moveDataFromGoogle(id, token) {
    try {
        const r = await fetch(`${process.env.REACT_APP_API}/api/move_data_from_google`, {
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

export default moveDataFromGoogle