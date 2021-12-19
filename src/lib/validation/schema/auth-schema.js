export const __register = {
    rules: {
        firstname: 'required',
        email: 'required|email',
        password: 'required|confirmed',
    },

    attributes: {
        firstname: 'firstname',
        email: 'email address',
        password: 'password',
    }
}