import { ToastOptions, toast } from 'react-toastify';

export const TOAST_OPTIONS: ToastOptions = {
    theme: 'colored',
    pauseOnFocusLoss: false,
    autoClose: 2000,
    toastId: 401,
};

export const showMessage = {
    success: (message: string = 'successfully') => toast.success(message, TOAST_OPTIONS),
    error: (message: string = 'failed') => toast.error(message, TOAST_OPTIONS),
    info: (message: string) => toast.info(message, TOAST_OPTIONS),
    warning: (message: string) => toast.warning(message, TOAST_OPTIONS),
};