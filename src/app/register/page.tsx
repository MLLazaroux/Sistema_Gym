"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Dumbbell, Mail, Lock, User, Phone, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [acceptMarketing, setAcceptMarketing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validateForm = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.birthDate ||
      !formData.gender ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      })
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Contraseñas no coinciden",
        description: "Las contraseñas ingresadas no son iguales",
        variant: "destructive",
      })
      return false
    }

    if (formData.password.length < 6) {
      toast({
        title: "Contraseña muy corta",
        description: "La contraseña debe tener al menos 6 caracteres",
        variant: "destructive",
      })
      return false
    }

    if (!acceptTerms) {
      toast({
        title: "Términos y condiciones",
        description: "Debes aceptar los términos y condiciones para continuar",
        variant: "destructive",
      })
      return false
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor ingresa un email válido",
        variant: "destructive",
      })
      return false
    }

    // Validar teléfono (básico)
    if (formData.phone.length < 9) {
      toast({
        title: "Teléfono inválido",
        description: "Por favor ingresa un número de teléfono válido",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simular delay de registro
    await new Promise((resolve) => setTimeout(resolve, 2000))

    try {
      // Crear objeto de usuario
      const newUser = {
        id: Date.now(),
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        birthDate: formData.birthDate,
        gender: formData.gender,
        role: "member",
        registrationDate: new Date().toISOString(),
        acceptMarketing: acceptMarketing,
      }

      // Guardar usuario en localStorage (en producción sería una API)
      const existingUsers = JSON.parse(localStorage.getItem("powerfit_users") || "[]")

      // Verificar si el email ya existe
      const emailExists = existingUsers.some((user: any) => user.email === formData.email)
      if (emailExists) {
        toast({
          title: "Email ya registrado",
          description: "Ya existe una cuenta con este email. Intenta iniciar sesión.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Agregar nuevo usuario
      existingUsers.push(newUser)
      localStorage.setItem("powerfit_users", JSON.stringify(existingUsers))

      // Iniciar sesión automáticamente
      localStorage.setItem("powerfit_user", JSON.stringify(newUser))

      toast({
        title: "¡Registro exitoso!",
        description: `Bienvenido ${newUser.name}, tu cuenta ha sido creada correctamente.`,
        duration: 3000,
      })

      // Verificar si hay una URL de redirección guardada
      const redirectUrl = localStorage.getItem("powerfit_redirect_after_auth")
      if (redirectUrl) {
        localStorage.removeItem("powerfit_redirect_after_auth")
        setTimeout(() => {
          router.push(redirectUrl)
        }, 1000)
      } else {
        // Redireccionar al dashboard por defecto
        setTimeout(() => {
          router.push("/dashboard")
        }, 1000)
      }
    } catch (error) {
      toast({
        title: "Error en el registro",
        description: "Hubo un problema al crear tu cuenta. Inténtalo de nuevo.",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      {/* Header con logo y theme toggle */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Dumbbell className="h-8 w-8 text-[#D72638]" />
          <span className="text-xl font-bold text-foreground">PowerFit</span>
        </Link>
        <ThemeToggle />
      </div>

      <div className="w-full max-w-2xl space-y-6">
        {/* Card principal de registro */}
        <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur">
          <CardHeader className="space-y-1 text-center">
            <div className="w-16 h-16 bg-[#D72638] rounded-full flex items-center justify-center mx-auto mb-4">
              <Dumbbell className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">Crear Cuenta</CardTitle>
            <CardDescription className="text-muted-foreground">
              Únete a la comunidad PowerFit y comienza tu transformación
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Información personal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-foreground">
                    Nombre *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Tu nombre"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-foreground">
                    Apellido *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Tu apellido"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Teléfono y fecha de nacimiento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">
                    Teléfono *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="999 999 999"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate" className="text-foreground">
                    Fecha de Nacimiento *
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange("birthDate", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Género */}
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-foreground">
                  Género *
                </Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu género" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="femenino">Femenino</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                    <SelectItem value="prefiero-no-decir">Prefiero no decir</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Contraseñas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">
                    Contraseña *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-foreground">
                    Confirmar Contraseña *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
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

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="marketing"
                    checked={acceptMarketing}
                    onCheckedChange={(checked) => setAcceptMarketing(checked as boolean)}
                  />
                 
                </div>
              </div>

              {/* Botón de registro */}
              <Button type="submit" className="w-full bg-[#D72638] hover:bg-[#B91E2F] text-white" disabled={isLoading}>
                {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="text-[#D72638] hover:underline font-medium">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>

      <Toaster />
    </div>
  )
}
