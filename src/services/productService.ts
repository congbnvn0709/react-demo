import {
  IProduct,
  ISearchProduct,
  ResponseSearchProduct,
} from "../utils/model/payload";
import baseService from "./baseService";

const PRODUCT_URL = "/product";

const productService = {
  getAllProduct() {
    return baseService.get<IProduct[]>(`${PRODUCT_URL}/get-all`);
  },
  createProduct(body: any) {
    return baseService.post<IProduct>(`${PRODUCT_URL}/create`, body);
  },
  deleteProduct(id: number) {
    return baseService.delete(`${PRODUCT_URL}/${id}`);
  },
  updateProduct(body: any) {
    return baseService.put(`${PRODUCT_URL}/update`, body);
  },
  getProductById(id: number) {
    return baseService.get<IProduct>(`${PRODUCT_URL}/${id}`);
  },
  searchProduct(body: ISearchProduct) {
    return baseService.post<ResponseSearchProduct<IProduct>>(
      `${PRODUCT_URL}/search`,
      body
    );
  },
};

export default productService;
