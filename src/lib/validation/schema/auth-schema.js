export const __register = {
    rules: {
        name: 'required',
        email: 'required|email',
        password: 'required|confirmed',
    },

    attributes: {
        name: 'username',
        email: 'email address',
        password: 'password',
    }
}