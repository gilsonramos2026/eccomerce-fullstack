import { api } from './api'
import type { Product, Page } from '../types/product'

export const productService = {
  async list(page = 0, size = 12): Promise<Page<Product>> {
    const { data } = await api.get<Page<Product>>('/products', { params: { page, size } })
    return data
  },

  async getById(id: number): Promise<Product> {
    const { data } = await api.get<Product>(`/products/${id}`)
    return data
  },

  async create(payload: Omit<Product, 'id' | 'rating' | 'createdAt' | 'categoryName'> & { categoryId: number }) {
    const { data } = await api.post<Product>('/products', payload)
    return data
  },
}
