export interface Product {
  id: number
  name: string
  description?: string
  price: number
  discountPrice?: number
  stockQuantity: number
  imageUrl?: string
  category_name: string
  rating: number
  createdAt: string
}

export interface Page<T> {
  content: T[]
  totalElements: number
  totalPages: number
  number: number
}