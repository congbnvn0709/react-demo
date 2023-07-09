export interface ResponseLogin {
    id: number
    username: string
    role: string
    fullName: string
    userAgent: string
    token: string
}

export interface ResponseGetProduct {
    createDate: string
    createBy: string
    updateDate?: string
    updateBy?: string
    id: number
    name: string
    image: string
    price: number
    status: string
    shippingUnit: string
    productType: string
}

export interface IBodySearch {
    name: string
    page: number
    size: number
    sortField: string
    sortType: string
    productType: string[] | []
}