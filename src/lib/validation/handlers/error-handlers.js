import toast from "react-hot-toast";

export const ToastFormErrors = (errors) => {
    errors.forEach(e => {
        toast.error(e)
    });
}

export const MapFormErrorsInObj = (errors) =>  {
    let object = {}
    if (errors) {
        for (const [key, value] of Object.entries(errors)) {
            object = {...object, [key]: {message: value[0]}}
        }
    }
    return object;
}
export const MapFormErrorsInArr = (errors) =>  {
    return Object.values(errors)
}


export const SimpleToastError = (msg) => {
        toast.error(msg)
}
export const SimpleToastSuccess = (msg) => {
        toast.success(msg)
}