import { ToastOptions } from 'react-toastify';
import { IHeader } from '../../components/Table/TableHeader';

export const STATUS_API_ERROR = 0;
export const STATUS_UNKNOWN_ERROR = 5;
export const API_SUCCESS_STATUS = 200;
export const UNKNOWN_ERROR_MESSAGE = 'Có lỗi hệ thống xảy ra!';

export const LOCAL_STORAGE = {
    AUTH_INFO: '@currentAuth',
    ACCESS_TOKEN: '@accessToken',
};

export const TOAST_OPTIONS: ToastOptions = {
    theme: 'colored',
    pauseOnFocusLoss: false,
    autoClose: 2000,
    toastId: 401,
};

export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATE_TIME_FORMAT = 'DD/MM/YYYY - hh:mm:ss';

export const MENU = [
    { name: 'Home', router: '/' },
    { name: 'About', router: '/about' },
    { name: 'Todo', router: '/todo' },
]

export const COL_HEADER_FAKE: IHeader[] = [
    { headerName: 'Mã SP', align: 'center', property: 'id' },
    { headerName: 'Tên SP', align: 'center', property: 'name' },
    { headerName: 'Giá', align: 'center', property: 'priceStr' },
    { headerName: 'Loại sản phẩm', align: 'center', property: 'productType' },
    { headerName: 'Ngày mua', align: 'center', property: 'createdDateStr' },
]
export const DATA_SOURCE = [
    { id: '1', name: 'IPHONE 1', date: '17/07/2023' },
    { code: '2', name: 'IPHONE 2', date: '18/08/2023' },
    { code: '3', name: 'IPHONE 3', date: '19/09/2023' },
    { code: '4', name: 'IPHONE 4', date: '11/01/2023' },
]

export const PRODUCT_TYPE = ['PHONE', 'COMPUTER', 'CLOTHES', 'FOOT_WEAR']