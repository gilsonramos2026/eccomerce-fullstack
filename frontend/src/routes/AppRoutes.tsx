import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PublicLayout } from '../layout/PublicLayout'
import { Home } from '../pages/public/Home'
import { AdminLayout } from '../layout/AdminLayout'
import { ProtectedRoute } from './ProtectedRoute'
 

// 💡 Placeholders temporários para evitar erros de compilação até criarmos as telas definitivas
const ProductDetails = () => <div className="p-8 text-[var(--text-title)]">Detalhes do Produto (Em breve)</div>
const Cart = () => <div className="p-8 text-[var(--text-title)]">Carrinho de Compras (Em breve)</div>
const Checkout = () => <div className="p-8 text-[var(--text-title)]">Finalizar Compra (Em breve)</div>
const Login = () => <div className="p-8 text-[var(--text-title)]">Tela de Login (Em breve)</div>
const Dashboard = () => <div className="p-8 text-[var(--text-title)]">Painel Geral Administrativo</div>
const ProductList = () => <div className="p-8 text-[var(--text-title)]">Listagem de Produtos do Catálogo</div>
const ProductForm = () => <div className="p-8 text-[var(--text-title)]">Formulário de Produto (Criar/Editar)</div>
const OrderList = () => <div className="p-8 text-[var(--text-title)]">Gerenciamento de Pedidos dos Clientes</div>

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🌐 Área Pública do E-commerce */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* 🔒 Área Administrativa Protegida por JWT (Duplicidade Removida) */}
        <Route element={<ProtectedRoute requiredRole="ADMIN" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductList />} />
            <Route path="products/new" element={<ProductForm />} />
            <Route path="products/:id/edit" element={<ProductForm />} />
            <Route path="orders" element={<OrderList />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
