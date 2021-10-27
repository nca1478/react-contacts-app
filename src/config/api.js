const baseUrl = 'http://localhost:4000/api/v1';

const get = (pathUrl, token) =>
    fetch(`${baseUrl}${pathUrl}`, {
        method: 'GET',
        headers: {
            Authorization: `jwt ${token}`,
        },
    }).then((res) => res.json());

const post = (pathUrl, data) =>
    fetch(`${baseUrl}${pathUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((res) => res.json());

const put = (pathUrl, data) =>
    fetch(`${baseUrl}${pathUrl}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data,
    });

export { get, post, put };
