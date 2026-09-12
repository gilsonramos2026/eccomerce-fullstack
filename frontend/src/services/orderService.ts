// src/services/orderService.ts
import { api } from './api'
import type { CartItem } from '../context/CartContext'

export interface OrderPayload {
  shippingAddress: string
  items: { productId: number; quantity: number }[]
}

export interface OrderResponse {
  id: number
  status: string
  totalAmount: number
  shippingAddress: string
  createdAt: string
  items: { productId: number; productName: string; quantity: number; unitPrice: number }[]
}

export const orderService = {
  async create(payload: OrderPayload): Promise<OrderResponse> {
    const { data } = await api.post<OrderResponse>('/orders', payload)
    return data
  },

  async myOrders(page = 0, size = 10) {
    const { data } = await api.get('/orders/me', { params: { page, size } })
    return data
  },

  toPayload(items: CartItem[], shippingAddress: string): OrderPayload {
    return {
      shippingAddress,
      items: items.map(i => ({ productId: i.product.id, quantity: i.quantity })),
    }
  },
}
