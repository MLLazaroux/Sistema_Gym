"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Activity, CreditCard, Clock, CheckCircle2, Ban, AlertTriangle, Dumbbell, Download, Home } from "lucide-react"
import { format, differenceInDays, addMonths, addYears } from "date-fns"
import { es } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Función para formatear fechas
function formatDate(date: Date): string {
  return format(date, "d 'de' MMMM, yyyy", { locale: es })
}

export default function MiMembresia() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [membershipData, setMembershipData] = useState<any>(null)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Verificar autenticación
    const savedUser = localStorage.getItem("powerfit_user")
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)

      // Obtener datos de membresía
      const savedMembership = localStorage.getItem("powerfit_membership")
      if (savedMembership) {
        const membershipInfo = JSON.parse(savedMembership)

        // Convertir fechas de string a Date
        const startDate = new Date(membershipInfo.startDate)
        const endDate = new Date(membershipInfo.endDate)

        // Generar datos adicionales para la membresía
        const generatedData = {
          ...membershipInfo,
          startDate,
          endDate,
          memberSince: startDate,
          nextBillingDate: membershipInfo.billingCycle === "anual" ? addYears(startDate, 1) : addMonths(startDate, 1),
          benefits: getBenefitsByPlan(membershipInfo.planId),
          paymentHistory: generatePaymentHistory(startDate, membershipInfo.price, membershipInfo.billingCycle),
          attendance: generateAttendanceData(),
        }

        setMembershipData(generatedData)
      } else {
        // Si no tiene membresía, redirigir a la página de membresías
        router.push("/membresias")
      }
    } else {
      // Redireccionar al login si no está autenticado
      router.push("/login")
    }
    setIsLoading(false)
  }, [router])

  // Generar beneficios según el plan
  function getBenefitsByPlan(planId: string) {
    switch (planId) {
      case "premium":
        return [
          "Acceso completo 24/7",
          "Clases grupales ilimitadas",
          "4 sesiones con entrenador personal al mes",
          "Plan nutricional personalizado",
          "Acceso a área VIP y spa",
          "10% descuento en productos",
          "Invitado gratis 1 vez al mes",
        ]
      case "estandar":
        return [
          "Acceso completo 24/7",
          "Clases grupales incluidas",
          "1 sesión con entrenador personal",
        ]
      case "basico":
      default:
        return ["Acceso a sala de pesas", "Horario limitado (8am - 4pm)", "Evaluación física inicial"]
    }
  }

  // Generar historial de pagos
  function generatePaymentHistory(startDate: Date, price: number, billingCycle: string) {
    const history = []
    const months = billingCycle === "anual" ? 1 : 4 // Mostrar solo un pago para anual, 4 para mensual

    for (let i = 0; i < months; i++) {
      const paymentDate = new Date(startDate)
      if (billingCycle === "anual") {
        // No ajustar la fecha para el pago anual
      } else {
        // Restar meses para pagos mensuales (más reciente primero)
        paymentDate.setMonth(paymentDate.getMonth() - i)
      }

      history.push({
        id: i + 1,
        date: paymentDate,
        amount: price,
        status: "Completado",
      })
    }

    return history
  }

  // Generar datos de asistencia
  function generateAttendanceData() {
    const attendance = []
    const today = new Date()

    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i * 2) // Cada 2 días

      attendance.push({
        date,
        duration: [45, 60, 75, 90][Math.floor(Math.random() * 4)], // Duración aleatoria
      })
    }

    return attendance
  }

  const handleCancelMembership = () => {
    // Eliminar la membresía
    localStorage.removeItem("powerfit_membership")

    toast({
      title: "Membresía cancelada",
      description: "Tu membresía ha sido cancelada exitosamente",
      duration: 3000,
    })

    // Redirigir a la página principal
    setTimeout(() => {
      router.push("/")
    }, 2000)
  }

  if (isLoading || !user || !membershipData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#D72638] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <p className="text-muted-foreground">Cargando información de membresía...</p>
        </div>
      </div>
    )
  }

  // Calcular días restantes
  const daysRemaining = differenceInDays(membershipData.endDate, new Date())
  const totalDays = differenceInDays(membershipData.endDate, membershipData.startDate)
  const progressPercentage = 100 - Math.round((daysRemaining / totalDays) * 100)

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
              <Button
                variant="outline"
                className="border-[#D72638] text-[#D72638] hover:bg-[#D72638] hover:text-white"
                onClick={() => router.push("/")}
              >
                <Home className="mr-2 h-4 w-4" />
                Volver al Inicio
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mi Membresía</h1>
            <p className="text-muted-foreground">Gestiona tu plan y revisa el estado de tu membresía</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              onClick={() => setShowCancelDialog(true)}
            >
              <Ban className="mr-2 h-4 w-4" />
              Cancelar Membresía
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna izquierda - Información del plan */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tarjeta de estado del plan */}
            <Card className="border-2 border-[#D72638]/20">
              <CardHeader className="bg-[#D72638]/5 border-b border-[#D72638]/10">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl font-bold text-foreground">{membershipData.plan}</CardTitle>
                    <CardDescription>Miembro desde {formatDate(membershipData.memberSince)}</CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    {membershipData.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Fecha de inicio</p>
                      <p className="text-foreground font-medium">{formatDate(membershipData.startDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Fecha de vencimiento</p>
                      <p className="text-foreground font-medium">{formatDate(membershipData.endDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ciclo de facturación</p>
                      <p className="text-foreground font-medium">
                        {membershipData.billingCycle === "anual" ? "Anual" : "Mensual"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Próximo pago</p>
                      <p className="text-foreground font-medium">{formatDate(membershipData.nextBillingDate)}</p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <div className="relative w-40 h-40">
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-3xl font-bold text-[#D72638]">{daysRemaining}</span>
                        <span className="text-sm text-muted-foreground">días restantes</span>
                      </div>
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          className="text-muted stroke-current"
                          strokeWidth="10"
                          stroke="currentColor"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                        />
                        <circle
                          className="text-[#D72638] stroke-current"
                          strokeWidth="10"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${((100 - progressPercentage) / 100) * 2 * Math.PI * 40}`}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Tu membresía vence el {format(membershipData.endDate, "d 'de' MMMM", { locale: es })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pestañas para información adicional */}
            <Tabs defaultValue="benefits" className="w-full">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="benefits">Beneficios</TabsTrigger>
                <TabsTrigger value="payments">Historial de Pagos</TabsTrigger>
                <TabsTrigger value="attendance">Asistencia</TabsTrigger>
              </TabsList>

              <TabsContent value="benefits" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Beneficios de tu Plan</CardTitle>
                    <CardDescription>
                      Todos los beneficios incluidos en tu membresía {membershipData.plan}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {membershipData.benefits.map((benefit: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payments" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Historial de Pagos</CardTitle>
                    <CardDescription>Registro de tus pagos recientes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {membershipData.paymentHistory.map((payment: any) => (
                        <div key={payment.id} className="flex justify-between items-center p-3 border rounded-lg">
                          <div className="flex items-center">
                            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full mr-3">
                              <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <p className="font-medium">{formatDate(payment.date)}</p>
                              <p className="text-sm text-muted-foreground">Pago {payment.status.toLowerCase()}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">S/ {payment.amount}</p>
                            <Button variant="ghost" size="sm" className="text-xs">
                              <Download className="h-3 w-3 mr-1" /> Factura
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="attendance" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Registro de Asistencia</CardTitle>
                    <CardDescription>Tus últimas visitas al gimnasio</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {membershipData.attendance.map((visit: any, index: number) => (
                        <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                          <div className="flex items-center">
                            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3">
                              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <p className="font-medium">{format(visit.date, "EEEE d 'de' MMMM", { locale: es })}</p>
                              <p className="text-sm text-muted-foreground">Duración: {visit.duration} minutos</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Columna derecha - Información adicional */}
          <div className="space-y-6">
            {/* Perfil del usuario */}
            <Card>
              <CardHeader>
                <CardTitle>Perfil de Miembro</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-[#D72638] text-white text-xl">
                      {user.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold">{user.name}</h3>
                  <p className="text-muted-foreground">{user.email}</p>
                  <Badge className="mt-2">{user.role}</Badge>

                  <div className="w-full mt-4 pt-4 border-t border-border">
                    <Button variant="outline" className="w-full">
                      Editar Perfil
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preguntas frecuentes */}
            <Card>
              <CardHeader>
                <CardTitle>Preguntas Frecuentes</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>¿Cómo puedo renovar mi membresía?</AccordionTrigger>
                    <AccordionContent>
                      Puedes renovar tu membresía haciendo clic en el botón "Renovar Membresía" en la parte superior de
                      esta página o visitando la recepción del gimnasio.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>¿Puedo cambiar mi plan actual?</AccordionTrigger>
                    <AccordionContent>
                      Sí, puedes cambiar tu plan en cualquier momento. Haz clic en "Cambiar Plan" para ver las opciones
                      disponibles. Se aplicarán ajustes proporcionales.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>¿Cómo reservo una clase?</AccordionTrigger>
                    <AccordionContent>
                      Puedes reservar clases a través de la sección "Clases" en el menú principal o directamente en la
                      recepción del gimnasio.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="w-full">
                  Ver todas las preguntas
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      {/* Diálogo de confirmación para cancelar membresía */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-red-500">
              <AlertTriangle className="h-5 w-5 mr-2" /> Cancelar Membresía
            </AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas cancelar tu membresía? Perderás todos los beneficios asociados a tu plan
              actual y no se realizarán reembolsos por el tiempo restante.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelMembership} className="bg-red-500 hover:bg-red-600 text-white">
              Sí, cancelar mi membresía
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Toaster />
    </div>
  )
}
