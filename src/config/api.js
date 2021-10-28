const baseUrl = 'http://localhost:4000/api/v1';

const get = (pathUrl, token) =>
    fetch(`${baseUrl}${pathUrl}`, {
        method: 'GET',
        headers: {
            Authorization: `jwt ${token}`,
        },
    }).then((res) => res.json());

const post = (pathUrl, data, token) =>
    fetch(`${baseUrl}${pathUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `jwt ${token}`,
        },
        body: JSON.stringify(data),
    }).then((res) => res.json());

const put = (pathUrl, data, token) =>
    fetch(`${baseUrl}${pathUrl}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `jwt ${token}`,
        },
        body: JSON.stringify(data),
    }).then((res) => res.json());

const del = (pathUrl, token) =>
    fetch(`${baseUrl}${pathUrl}`, {
        method: 'DELETE',
        headers: {
            Authorization: `jwt ${token}`,
        },
    }).then((res) => res.json());

export { get, post, put, del };
