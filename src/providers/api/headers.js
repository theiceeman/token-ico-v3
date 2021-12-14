export const headers = {
    'Accept' : 'application/json',
    'Content-Type' : 'application/json'
}

export const authHeaders = (token = null) => {
    return {
        ...headers,
        'Authorization' : `Bearer ${token}`
    }
}