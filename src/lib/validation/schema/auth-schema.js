export const __register = {
    rules: {
        name: 'required',
        email: 'required|email',
        password: 'required',
        password_confirmation: 'required|confirmed',
    },

    attributes: {
        name: 'full name',
        email: 'email address',
        password: 'password',
        password_confirmation: 'password',
    }
}