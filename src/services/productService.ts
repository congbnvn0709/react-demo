import { ResponseGetProduct, ResponseLogin } from '../utils/model/payload';
import baseService from './baseService';

const PRODUCT_URL = '/product';

const productService = {
    getAllProduct() {
        return baseService.get<ResponseGetProduct[]>(`${PRODUCT_URL}/get-all`)
    },
    createProduct(body: any) {
        return baseService.post<ResponseGetProduct>(`${PRODUCT_URL}/create`, body)
    },
    deleteProduct(id: number) {
        return baseService.delete(`${PRODUCT_URL}/${id}`)
    },
    updateProduct(body: any) {
        return baseService.put(`${PRODUCT_URL}/update`, body)
    },
    getProductById(id: number) {
        return baseService.get<ResponseGetProduct>(`${PRODUCT_URL}/${id}`)
    },
    searchProduct(body: any) {
        return baseService.post(`${PRODUCT_URL}/search`, body)
    }
};

export default productService;
