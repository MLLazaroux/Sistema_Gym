export interface Producto {
  producto_id: number
  nombre: string
  descripcion: string
  precio: number
  stock: number
  categoriaId: number
  estado: boolean
  imagen: string
}