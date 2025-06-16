"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Dumbbell, CheckCircle2, ArrowRight, Download, ShoppingBag, CreditCard, Clock } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useCart } from "@/contexts/cart-context"
import confetti from "canvas-confetti"

export default function ConfirmacionCompraPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { clearCart } = useCart()
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

   //Lanzar confetti al cargar la página
  useEffect(() => {
     //Verificar si estamos en el navegador
    if (typeof window !== "undefined") {
      //Lanzar confetti solo una vez
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })

      // Obtener detalles de la orden del localStorage
      const orderData = localStorage.getItem("powerfit_last_order")
      if (orderData) {
        try {
          setOrderDetails(JSON.parse(orderData))
        } catch (error) {
          console.error("Error parsing order data:", error)
          // Crear datos de ejemplo en caso de error
          setOrderDetails({
            orderId: "PF" + Math.floor(100000 + Math.random() * 900000),
            date: new Date().toISOString(),
            items: [],
            total: 0,
            paymentMethod: "Tarjeta de crédito",
            deliveryMethod: "Envío a domicilio",
            estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 días después
          })
        }
      } else {
        // Si no hay datos de orden, crear datos de ejemplo
        setOrderDetails({
          orderId: "PF" + Math.floor(100000 + Math.random() * 900000),
          date: new Date().toISOString(),
          items: [],
          total: 0,
          paymentMethod: "Tarjeta de crédito",
          deliveryMethod: "Envío a domicilio",
          estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 días después
        })
      }

      // Limpiar el carrito solo una vez
      clearCart()
      setLoading(false)
    }
  }, []) // Asegúrate de incluir clearCart en las dependencias

  // Función para generar y descargar la factura en PDF
  const downloadInvoice = () => {
    if (!orderDetails) return

    // Crear un nuevo documento PDF
    const doc = new jsPDF()

    // Añadir logo y título
    doc.setFontSize(20)
    doc.setTextColor(215, 38, 56) // Color #D72638
    doc.text("M Club GYM", 105, 20, { align: "center" })

    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.text("FACTURA", 105, 30, { align: "center" })

    // Información de la factura
    doc.setFontSize(10)
    doc.text(`Nº de Factura: ${orderDetails.orderId}`, 20, 45)
    doc.text(`Fecha: ${format(new Date(orderDetails.date), "dd/MM/yyyy", { locale: es })}`, 20, 52)
    doc.text(`Método de pago: ${orderDetails.paymentMethod}`, 20, 59)
    doc.text(
      `Método de entrega: ${orderDetails.deliveryMethod === "delivery" ? "Envío a domicilio" : "Recojo en tienda"}`,
      20,
      66,
    )

    // Información de la empresa
    doc.text("M Club GYM", 140, 45)
    doc.text("RUC: 20123456789", 140, 52)
    doc.text("Av. Libertadores, San Vicente de Cañete", 140, 59)
    doc.text("Teléfono: +51 963 061 369", 140, 66)

    // Línea separadora
    doc.setDrawColor(215, 38, 56) // Color #D72638
    doc.setLineWidth(0.5)
    doc.line(20, 75, 190, 75)

    // Tabla de productos
    const tableColumn = ["Producto", "Cantidad", "Precio Unit.", "Total"]
    const tableRows: any[] = []

    // Añadir productos a la tabla
    if (orderDetails.items && orderDetails.items.length > 0) {
      orderDetails.items.forEach((item: any) => {
        const itemData = [
          item.name,
          item.quantity,
          `S/ ${item.price.toFixed(2)}`,
          `S/ ${(item.price * item.quantity).toFixed(2)}`,
        ]
        tableRows.push(itemData)
      })
    } else {
      tableRows.push(["No hay productos en esta orden", "", "", ""])
    }

    // Generar la tabla
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 85,
      theme: "striped",
      headStyles: {
        fillColor: [215, 38, 56], // Color #D72638
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
    })

    // Calcular la posición Y después de la tabla
    const finalY = (doc as any).lastAutoTable.finalY + 10

    // Resumen de totales
    doc.text("Subtotal:", 130, finalY + 10)
    doc.text(`S/ ${orderDetails.total.toFixed(2)}`, 175, finalY + 10, { align: "right" })

    doc.text("Envío:", 130, finalY + 17)
    doc.text("Gratis", 175, finalY + 17, { align: "right" })

    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("TOTAL:", 130, finalY + 27)
    doc.text(`S/ ${orderDetails.total.toFixed(2)}`, 175, finalY + 27, { align: "right" })

    // Pie de página
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.text("Este documento es una representación impresa de la factura electrónica.", 105, finalY + 45, {
      align: "center",
    })
    doc.text("Gracias por tu compra en M Club GYM.", 105, finalY + 50, { align: "center" })

    // Guardar el PDF
    doc.save(`Factura_${orderDetails.orderId}.pdf`)

    // Mostrar toast de confirmación
    toast({
      title: "Factura descargada",
      description: "La factura se ha descargado correctamente",
      duration: 3000,
    })
  }

  // Si está cargando, mostrar un spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#D72638] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Procesando tu compra...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Dumbbell className="h-8 w-8 text-[#D72638]" />
              <span className="ml-2 text-xl font-bold text-foreground">PowerFit</span>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/">
                <Button variant="outline">Volver al Inicio</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mensaje de éxito */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">¡Compra Exitosa!</h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            Tu pedido ha sido procesado correctamente. Hemos enviado un correo electrónico con los detalles de tu
            compra.
          </p>
        </div>

        {/* Detalles del pedido */}
        <Card className="mb-8 overflow-hidden">
          <CardHeader className="bg-[#D72638]/5 border-b border-[#D72638]/10">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">Detalles del Pedido</CardTitle>
                <CardDescription>
                  Pedido #{orderDetails?.orderId} •{" "}
                  {orderDetails?.date && format(new Date(orderDetails.date), "d 'de' MMMM, yyyy", { locale: es })}
                </CardDescription>
              </div>
              <Button variant="outline" className="flex items-center gap-2" onClick={downloadInvoice}>
                <Download className="h-4 w-4" /> Factura
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium text-lg mb-4">Información del Pedido</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#D72638]/10 p-2 rounded-full">
                      <ShoppingBag className="h-5 w-5 text-[#D72638]" />
                    </div>
                    <div>
                      <p className="font-medium">Estado del Pedido</p>
                      <p className="text-sm text-muted-foreground">Confirmado</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-[#D72638]/10 p-2 rounded-full">
                      <CreditCard className="h-5 w-5 text-[#D72638]" />
                    </div>
                    <div>
                      <p className="font-medium">Método de Pago</p>
                      <p className="text-sm text-muted-foreground">
                        {orderDetails?.paymentMethod || "Tarjeta de crédito"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-[#D72638]/10 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-[#D72638]" />
                    </div>
                    <div>
                      <p className="font-medium">Entrega Estimada</p>
                      <p className="text-sm text-muted-foreground">
                        {orderDetails?.estimatedDelivery &&
                          format(new Date(orderDetails.estimatedDelivery), "d 'de' MMMM, yyyy", { locale: es })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-4">Resumen de Compra</h3>
                <div className="space-y-3">
                  {orderDetails?.items && orderDetails.items.length > 0 ? (
                    orderDetails.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
                            {item.type === "membership" ? (
                              <Dumbbell className="h-5 w-5 text-[#D72638]" />
                            ) : (
                              <ShoppingBag className="h-5 w-5 text-[#D72638]" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Cant: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium">S/ {item.price * item.quantity}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">Tu compra ha sido procesada correctamente.</p>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>S/ {orderDetails?.total || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Envío</span>
                    <span>Gratis</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-2">
                    <span>Total</span>
                    <span>S/ {orderDetails?.total || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="flex items-center gap-2" onClick={() => router.push("/")}>
            Seguir Comprando
          </Button>

          <Button
            className="bg-[#D72638] hover:bg-[#B91E2F] text-white flex items-center gap-2"
            onClick={() => {
              // Verificar si hay membresías en la orden
              const hasMembership = orderDetails?.items?.some((item: any) => item.type === "membership")
              if (hasMembership) {
                router.push("/membresias/mi-membresia")
              } else {
                router.push("/")
              }
            }}
          >
            {orderDetails?.items?.some((item: any) => item.type === "membership") ? "Ver Mi Membresía" : "Mi Cuenta"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </main>

      <Toaster />
    </div>
  )
}
