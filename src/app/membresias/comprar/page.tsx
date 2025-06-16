"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Dumbbell, CreditCard, CheckCircle2, ArrowLeft, ShieldCheck, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Datos de los planes de membresía
const membershipPlans = [
  {
    id: "basico",
    name: "Plan Básico",
    description: "Ideal para principiantes",
    price: 80,
    features: ["Acceso a sala de pesas", "Horario limitado (8am - 4pm)", "Evaluación física inicial"],
  },
  {
    id: "estandar",
    name: "Plan Estándar",
    description: "Para entusiastas del fitness",
    price: 210,
    features: [
      "Acceso a 1 año de entrenamiento",
      "Acceso completo 24/7",
      "Clases grupales incluidas",
      "1 sesión con entrenador personal",
      "Acceso a duchas y lockers",
    ],
  },
  {
    id: "premium",
    name: "Plan Premium",
    description: "La experiencia completa",
    price: 750,
    features: [
      "Acceso a 1 año de entrenamiento",
      "4 sesiones con entrenador personal",
      "Plan nutricional personalizado",
      "10% descuento en productos",
    ],
  },
]

// Meses para la fecha de expiración
const months = [
  { value: "01", label: "01 - Enero" },
  { value: "02", label: "02 - Febrero" },
  { value: "03", label: "03 - Marzo" },
  { value: "04", label: "04 - Abril" },
  { value: "05", label: "05 - Mayo" },
  { value: "06", label: "06 - Junio" },
  { value: "07", label: "07 - Julio" },
  { value: "08", label: "08 - Agosto" },
  { value: "09", label: "09 - Septiembre" },
  { value: "10", label: "10 - Octubre" },
  { value: "11", label: "11 - Noviembre" },
  { value: "12", label: "12 - Diciembre" },
]

// Años para la fecha de expiración
const years = Array.from({ length: 10 }, (_, i) => {
  const year = new Date().getFullYear() + i
  return { value: year.toString(), label: year.toString() }
})

export default function ComprarMembresia() {
  const router = useRouter()
  const { toast } = useToast()

  // Estado para el plan seleccionado (obtenido de la URL o localStorage)
  const [selectedPlanId, setSelectedPlanId] = useState(() => {
    // En un entorno real, obtendríamos esto de la URL o localStorage
    return typeof window !== "undefined" ? localStorage.getItem("selectedPlan") || "premium" : "premium"
  })

  // Encontrar el plan seleccionado
  const selectedPlan = membershipPlans.find((plan) => plan.id === selectedPlanId) || membershipPlans[2]

  // Estados para el formulario
  const [billingCycle, setBillingCycle] = useState("mensual")
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiryMonth, setExpiryMonth] = useState("")
  const [expiryYear, setExpiryYear] = useState("")
  const [cvv, setCvv] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [purchaseComplete, setPurchaseComplete] = useState(false)

  // Calcular precio según ciclo de facturación
  const calculatePrice = () => {
    const basePrice = selectedPlan.price
    if (billingCycle === "anual") {
      // 20% de descuento en plan anual
      return {
        monthly: Math.round(basePrice * 0.8),
        total: Math.round(basePrice * 0.8 * 12),
        savings: Math.round(basePrice * 0.2 * 12),
      }
    }
    return {
      monthly: basePrice,
      total: basePrice,
      savings: 0,
    }
  }

  const price = calculatePrice()

  // Formatear número de tarjeta
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Manejar cambio en número de tarjeta
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value)
    setCardNumber(formattedValue)
  }

  // Manejar envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!acceptTerms) {
      toast({
        title: "Términos y condiciones",
        description: "Debes aceptar los términos y condiciones para continuar",
        variant: "destructive",
      })
      return
    }

    if (!cardNumber || !cardName || !expiryMonth || !expiryYear || !cvv) {
      toast({
        title: "Datos incompletos",
        description: "Por favor completa todos los campos del formulario",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simular procesamiento de pago
    setTimeout(() => {
      setIsProcessing(false)
      setPurchaseComplete(true)

      // Guardar información de la membresía en localStorage
      const membershipData = {
        plan: selectedPlan.name,
        planId: selectedPlan.id,
        price: price.monthly,
        billingCycle,
        startDate: new Date().toISOString(),
        // Calcular fecha de fin según ciclo de facturación
        endDate:
          billingCycle === "anual"
            ? new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()
            : new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
        status: "Activo",
      }

      localStorage.setItem("powerfit_membership", JSON.stringify(membershipData))

      // Mostrar toast de éxito
      toast({
        title: "¡Compra exitosa!",
        description: `Has adquirido el ${selectedPlan.name} correctamente.`,
        duration: 5000,
      })

      // Redirigir después de 2 segundos
      setTimeout(() => {
        router.push("/membresias/mi-membresia")
      }, 2000)
    }, 2000)
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
              <Link href="/membresias">
                <Button variant="ghost" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver a Planes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!purchaseComplete ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">Finalizar Compra</h1>
              <p className="text-muted-foreground">Completa tu información para adquirir tu membresía</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Formulario de pago */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Información de Pago</CardTitle>
                      <CardDescription>Ingresa los datos de tu tarjeta para procesar el pago</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Ciclo de facturación */}
                      <div className="space-y-2">
                        <Label>Ciclo de facturación</Label>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem checked id="mensual" value="mensual" />
                          <Label htmlFor="mensual" className="cursor-pointer">
                            Mensual
                          </Label>
                        </div>
                      </div>

                      <Separator />

                      {/* Datos de tarjeta */}
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Número de tarjeta</Label>
                          <div className="relative">
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={cardNumber}
                              onChange={handleCardNumberChange}
                              maxLength={19}
                              className="pl-10"
                              required
                            />
                            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="cardName">Nombre en la tarjeta</Label>
                          <Input
                            id="cardName"
                            placeholder="NOMBRE APELLIDO"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Fecha de expiración</Label>
                            <div className="flex space-x-2">
                              <Select value={expiryMonth} onValueChange={setExpiryMonth} required>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Mes" />
                                </SelectTrigger>
                                <SelectContent>
                                  {months.map((month) => (
                                    <SelectItem key={month.value} value={month.value}>
                                      {month.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>

                              <Select value={expiryYear} onValueChange={setExpiryYear} required>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Año" />
                                </SelectTrigger>
                                <SelectContent>
                                  {years.map((year) => (
                                    <SelectItem key={year.value} value={year.value}>
                                      {year.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                              maxLength={4}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2 pt-4">
                        <Checkbox
                          id="terms"
                          checked={acceptTerms}
                          onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                        />
                        <Label htmlFor="terms" className="text-sm leading-tight">
                          Acepto los{" "}
                          <Link href="/terms" className="text-[#D72638] hover:underline">
                            términos y condiciones
                          </Link>{" "}
                          y la{" "}
                          <Link href="/privacy" className="text-[#D72638] hover:underline">
                            política de privacidad
                          </Link>
                        </Label>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                      <div className="flex items-center justify-end w-full text-sm text-muted-foreground">
                        <div className="flex space-x-2">
                          <div className="h-6 w-10 bg-muted rounded"></div>
                          <div className="h-6 w-10 bg-muted rounded"></div>
                          <div className="h-6 w-10 bg-muted rounded"></div>
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-[#D72638] hover:bg-[#B91E2F] text-white"
                        disabled={isProcessing}
                      >
                        {isProcessing ? "Procesando..." : `Pagar S/ ${price.total}`}
                      </Button>
                    </CardFooter>
                  </Card>
                </form>
              </div>

              {/* Resumen de compra */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Resumen de Compra</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-lg">{selectedPlan.name}</span>
                      <Badge>{billingCycle === "anual" ? "Anual" : "Mensual"}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedPlan.description}</p>

                    <div className="space-y-2">
                      {selectedPlan.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Precio mensual</span>
                        <span>S/ {price.monthly}</span>
                      </div>
                      {billingCycle === "anual" && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Periodo</span>
                          <span>12 meses</span>
                        </div>
                      )}
                      {billingCycle === "anual" && (
                        <div className="flex justify-between text-green-600">
                          <span>Ahorro anual</span>
                          <span>S/ {price.savings}</span>
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>S/ {price.total}</span>
                    </div>

                    <div className="bg-muted/30 p-3 rounded-md text-sm flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <p className="text-muted-foreground">
                        {billingCycle === "anual"
                          ? "Se te cobrará S/ " +
                            price.total +
                            " hoy. Tu membresía se renovará automáticamente cada año."
                          : "Se te cobrará S/ " +
                            price.total +
                            " hoy. Tu membresía se renovará automáticamente cada mes."}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Garantía de devolución de 7 días</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Pantalla de compra exitosa
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">¡Compra Exitosa!</h1>
            <p className="text-muted-foreground text-center max-w-md mb-8">
              Tu membresía {selectedPlan.name} ha sido activada correctamente. Serás redirigido a tu panel de membresía
              en unos segundos.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => router.push("/")}>
                Ir al Inicio
              </Button>
              <Button
                className="bg-[#D72638] hover:bg-[#B91E2F] text-white"
                onClick={() => router.push("/membresias/mi-membresia")}
              >
                Ver Mi Membresía
              </Button>
            </div>
          </div>
        )}
      </main>

      <Toaster />
    </div>
  )
}
