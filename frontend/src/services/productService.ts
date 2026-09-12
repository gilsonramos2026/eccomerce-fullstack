import { api } from './api'
import type { Product, Page } from '../types/product'

// 💡 Exportando a interface estruturada de critérios da barra lateral e busca
export interface ProductFilters {
  search?: string
  categoryId?: number
  minPrice?: number
  maxPrice?: number
  onlyInStock?: boolean
  sort?: string
  page?: number
  size?: number
}

export const productService = {
  // 🌐 Lista todos os produtos de forma simplificada e paginada
  async list(page = 0, size = 12): Promise<Page<Product>> {
    const { data } = await api.get<Page<Product>>('/products', { params: { page, size } })
    return data
  },

  // 🔍 OTIMIZADO: Novo método acoplado à rota avançada de Specifications do Backend
  async searchWithFilters(filters: ProductFilters): Promise<Page<Product>> {
    const { data } = await api.get<Page<Product>>('/products/search', { params: filters })
    return data
  },

  // 📝 Recupera um produto específico por ID
  async getById(id: number): Promise<Product> {
    const { data } = await api.get<Product>(`/products/${id}`)
    return data
  },

  // 🛠️ Criação de um novo produto (Admin)
  async create(payload: Omit<Product, 'id' | 'rating' | 'createdAt' | 'categoryName'> & { categoryId: number }) {
    const { data } = await api.post<Product>('/products', payload)
    return data
  },
   async update(id: number, payload: Omit<Product, 'id' | 'rating' | 'createdAt' | 'categoryName' | 'category_name'> & { categoryId: number }) {
    const { data } = await api.put<Product>(`/products/${id}`, payload)
    return data
  }
}
