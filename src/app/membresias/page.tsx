"use client"

import { Dumbbell, Check, Crown, Star } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/cart-context"
import { CartButton } from "@/components/cart-button"

// Datos de los planes de membresía
const membershipPlans = [
  {
    id: "basico",
    name: "Plan Básico",
    description: "Ideal para principiantes",
    price: 80,
    features: ["Acceso a sala de pesas", "Horario limitado (8am - 4pm)", "Evaluación física inicial", "10% descuento en productos",],
    buttonText: "Seleccionar Plan",
  },
  {
    id: "estandar",
    name: "Plan Estándar",
    description: "Para entusiastas del fitness",
    price: 210,
    features: [
      "Acceso a 3 meses de entrenamiento",
      "Acceso completo 24/7",
      "Clases grupales incluidas",
      "1 sesión con entrenador personal",
      "15% descuento en productos",
    ],
    buttonText: "Seleccionar Plan",
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
      "20% descuento en productos",
    ],
    buttonText: "Seleccionar Plan",
  },
]

export default function MembresiasPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter()
  const { addToCart } = useCart()

  // Verificar si el usuario ya tiene una membresía
  const [hasMembership, setHasMembership] = useState<boolean>(false)

  // Verificar si el usuario tiene una membresía al cargar la página
  useState(() => {
    if (typeof window !== "undefined") {
      const membership = localStorage.getItem("powerfit_membership")
      if (membership) {
        setHasMembership(true)
      }
    }
  })

  // Actualizar la función selectPlan para manejar el resultado de addToCart
  const selectPlan = (planId: string) => {
    const plan = membershipPlans.find((p) => p.id === planId)
    if (plan) {
      setSelectedPlan(planId)

      // Opción 1: Agregar al carrito
      const added = addToCart({
        id: plan.id,
        name: plan.name,
        price: plan.price,
        quantity: 1,
        type: "membership",
        description: plan.description,
      })

      // Solo mostrar el mensaje de éxito si se agregó correctamente
      if (added) {
        toast({
          title: "¡Plan agregado al carrito!",
          description: `Has agregado el ${plan.name} a tu carrito.`,
          duration: 3000,
        })

        // Opción 2: Guardar el plan seleccionado y redirigir a la página de compra
        localStorage.setItem("selectedPlan", planId)
      }
    }
  }

  // Si el usuario ya tiene una membresía, redirigir a la página de estado de membresía
  if (hasMembership) {
    router.push("/membresias/mi-membresia")
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Dumbbell className="h-8 w-8 text-[#D72638]" />
              <span className="ml-2 text-xl font-bold text-foreground">PowerFit</span>
            </div>

            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-foreground hover:text-[#D72638] transition-colors">
                Inicio
              </Link>
              <Link href="/membresias" className="text-[#D72638] font-medium">
                Membresías
              </Link>
              <Link href="/productos" className="text-foreground hover:text-[#D72638] transition-colors">
                Productos
              </Link>
              <Link href="/entrenadores" className="text-foreground hover:text-[#D72638] transition-colors">
                Entrenadores
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <CartButton />
              <div className="flex items-center space-x-2">
                <Link href="/register">
                  <Button variant="ghost" className="text-foreground hover:text-[#D72638]">
                    Registrarse
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="border-[#D72638] text-[#D72638] hover:bg-[#D72638] hover:text-white"
                  >
                    Iniciar Sesión
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Nuestras Membresías</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades y objetivos
          </p>
        </div>

        {/* Membership Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {membershipPlans.map((plan) => {
            const isSelected = selectedPlan === plan.id
            return (
              <Card
                key={plan.id}
                className={`h-full transition-all duration-300 hover:shadow-xl flex flex-col ${
                  isSelected
                    ? "border-[#D72638] shadow-lg bg-gradient-to-b from-[#D72638] to-[#B91E2F] text-white"
                    : "hover:border-[#D72638]/30"
                }`}
              >
                <CardHeader className="text-center pb-8">
                  <div className="flex items-center justify-center mb-4">
                    <Dumbbell className={`h-8 w-8 ${isSelected ? "text-white" : "text-[#D72638]"}`} />
                  </div>
                  <CardTitle className={`text-2xl font-bold ${isSelected ? "text-white" : "text-foreground"}`}>
                    {plan.name}
                  </CardTitle>
                  <CardDescription className={`${isSelected ? "text-red-100" : "text-muted-foreground"}`}>
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="text-center flex-1 flex flex-col">
                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline justify-center">
                      <span className={`text-4xl font-bold ${isSelected ? "text-white" : "text-foreground"}`}>
                        S/.{plan.price}
                      </span>
                      <span className={`text-lg ml-1 ${isSelected ? "text-red-100" : "text-muted-foreground"}`}>
                        /mes
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start text-left">
                        <Check
                          className={`h-5 w-5 mr-3 flex-shrink-0 ${isSelected ? "text-green-300" : "text-green-600"}`}
                        />
                        <span className={`text-sm ${isSelected ? "text-white" : "text-foreground"}`}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button - Aligned at bottom */}
                  <div className="mt-auto">
                    <Button
                      onClick={() => selectPlan(plan.id)}
                      className={`w-full py-3 font-semibold transition-all duration-300 ${
                        isSelected
                          ? "bg-white text-[#D72638] hover:bg-gray-100 hover:text-[#B91E2F]"
                          : "bg-[#D72638] hover:bg-[#B91E2F] text-white"
                      }`}
                    >
                      {isSelected ? "✓ Agregado al Carrito" : "Agregar al Carrito"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Benefits Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            Beneficios Incluidos en Todos los Planes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#D72638] rounded-full flex items-center justify-center mx-auto mb-4">
                <Dumbbell className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Equipamiento Moderno</h4>
              <p className="text-sm text-muted-foreground">
                Acceso a equipos de última generación para todos tus entrenamientos
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#D72638] rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Sin Permanencia</h4>
              <p className="text-sm text-muted-foreground">Cancela cuando quieras, sin penalizaciones ni compromisos</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#D72638] rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Comunidad Activa</h4>
              <p className="text-sm text-muted-foreground">
                Únete a una comunidad motivadora de personas con objetivos similares
              </p>
            </div>
          </div>
        </div>
      </main>

      <Toaster />
    </div>
  )
}
