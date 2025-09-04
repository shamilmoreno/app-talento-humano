"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  CreditCard,
  User,
  Building2,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  Upload,
} from "lucide-react"

// Mock data for demo
const mockRequests = [
  {
    id: "REQ-001",
    type: "Reembolso",
    employee: "María González",
    cedula: "12.345.678",
    amount: "$450.00",
    status: "Aprobado",
    date: "2024-01-15",
    beneficiary: "María González",
  },
  {
    id: "REQ-002",
    type: "Carta Aval",
    employee: "Carlos Rodríguez",
    cedula: "23.456.789",
    amount: "$1,200.00",
    status: "Pendiente",
    date: "2024-01-14",
    beneficiary: "Hospital San José",
  },
  {
    id: "REQ-003",
    type: "Reembolso",
    employee: "Ana Martínez",
    cedula: "34.567.890",
    amount: "$320.00",
    status: "Pagado",
    date: "2024-01-13",
    beneficiary: "Ana Martínez",
  },
]

const statusColors = {
  Pendiente: "bg-yellow-100 text-yellow-800",
  Asignado: "bg-blue-100 text-blue-800",
  Aprobado: "bg-green-100 text-green-800",
  Liquidado: "bg-purple-100 text-purple-800",
  Pagado: "bg-emerald-100 text-emerald-800",
}

const statusIcons = {
  Pendiente: Clock,
  Asignado: User,
  Aprobado: CheckCircle,
  Liquidado: DollarSign,
  Pagado: CheckCircle,
}

export default function HRManagementApp() {
  const [currentView, setCurrentView] = useState("login")
  const [selectedProcess, setSelectedProcess] = useState("")
  const [formData, setFormData] = useState({
    cedula: "",
    email: "",
    phone: "",
    beneficiary: "",
    bankAccount: "",
  })
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File | null }>({
    cedula: null,
    estudios: null,
    recipes: null,
    facturas: null,
  })

  const handleFileUpload = (fileType: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFiles((prev) => ({
        ...prev,
        [fileType]: file,
      }))
    }
  }

  const handleLogin = () => {
    setCurrentView("dashboard")
  }

  const handleProcessSelection = (process: string) => {
    setSelectedProcess(process)
    setCurrentView("form")
  }

  const handleFormSubmit = () => {
    setCurrentView("documents")
  }

  const handleDocumentsSubmit = () => {
    setCurrentView("success")
  }

  if (currentView === "login") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800">
          <CardHeader className="text-center">
            <div className="mx-auto mb-6">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wework-isologo-color%404x%20%282%29-KzqPYoEoxKgTyC3JA0wHwkIo2ORQ3p.png"
                alt="WeWork Integrados Logo"
                className="h-16 w-auto mx-auto"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Solicitud de Reembolso y Cartas Avales</CardTitle>
            <CardDescription className="text-gray-300">
              Ingrese sus credenciales para acceder al sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white">
                Usuario
              </Label>
              <Input id="username" placeholder="Ingrese su usuario" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Contraseña
              </Label>
              <Input id="password" type="password" placeholder="Ingrese su contraseña" />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Iniciar Sesión
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentView === "dashboard") {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b border-border p-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Building2 className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Solicitud de Reembolso y Cartas Avales</h1>
            </div>
            <Button variant="outline" onClick={() => setCurrentView("login")}>
              Cerrar Sesión
            </Button>
          </div>
        </header>

        <main className="max-w-6xl mx-auto p-6">
          <Tabs defaultValue="new-request" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="new-request">Nueva Solicitud</TabsTrigger>
              <TabsTrigger value="requests">Mis Solicitudes</TabsTrigger>
            </TabsList>

            <TabsContent value="new-request" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">Bienvenido, María González</h2>
                <p className="text-muted-foreground">Seleccione el tipo de solicitud que desea realizar</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card
                  className="cursor-pointer hover:shadow-lg transition-shadow bg-slate-800"
                  onClick={() => handleProcessSelection("Reembolso")}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                      <CreditCard className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-white">Reembolso</CardTitle>
                    <CardDescription className="text-gray-300">
                      Solicite el reembolso de gastos médicos o educativos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Gastos médicos</li>
                      <li>• Gastos educativos</li>
                      <li>• Medicamentos</li>
                      <li>• Exámenes médicos</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card
                  className="cursor-pointer hover:shadow-lg transition-shadow bg-slate-800"
                  onClick={() => handleProcessSelection("Carta Aval")}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-white">Carta Aval</CardTitle>
                    <CardDescription className="text-gray-300">
                      Solicite una carta aval para procedimientos médicos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Cirugías programadas</li>
                      <li>• Tratamientos especializados</li>
                      <li>• Hospitalizaciones</li>
                      <li>• Procedimientos ambulatorios</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="requests" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Mis Solicitudes</h2>
                <Badge variant="secondary">{mockRequests.length} solicitudes</Badge>
              </div>

              <div className="grid gap-4">
                {mockRequests.map((request) => {
                  const StatusIcon = statusIcons[request.status as keyof typeof statusIcons]
                  return (
                    <Card key={request.id} className="bg-slate-800">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
                              {request.type === "Reembolso" ? (
                                <CreditCard className="w-6 h-6 text-blue-600" />
                              ) : (
                                <FileText className="w-6 h-6 text-blue-600" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">
                                {request.id} - {request.type}
                              </h3>
                              <p className="text-sm text-gray-300">Beneficiario: {request.beneficiary}</p>
                              <p className="text-sm text-gray-300">Fecha: {request.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2 mb-2">
                              <StatusIcon className="w-4 h-4" />
                              <Badge className={statusColors[request.status as keyof typeof statusColors]}>
                                {request.status}
                              </Badge>
                            </div>
                            <p className="text-lg font-semibold text-white">{request.amount}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    )
  }

  if (currentView === "form") {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b border-border p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Building2 className="w-8 h-8 text-primary" />
              <h1 className="text-xl font-bold text-foreground">Solicitud de {selectedProcess}</h1>
            </div>
            <Button variant="outline" onClick={() => setCurrentView("dashboard")}>
              Volver
            </Button>
          </div>
        </header>

        <main className="max-w-4xl mx-auto p-6">
          <Card className="bg-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Información del Solicitante</CardTitle>
              <CardDescription className="text-gray-300">
                Complete los siguientes datos para procesar su solicitud
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cedula" className="text-white">
                    Cédula de Identidad *
                  </Label>
                  <Input
                    id="cedula"
                    placeholder="12.345.678"
                    value={formData.cedula}
                    onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Correo Electrónico *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="maria.gonzalez@empresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">
                    Teléfono
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+58 412 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="beneficiary" className="text-white">
                    Beneficiario *
                  </Label>
                  <Input
                    id="beneficiary"
                    placeholder="Nombre del beneficiario"
                    value={formData.beneficiary}
                    onChange={(e) => setFormData({ ...formData, beneficiary: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankAccount" className="text-white">
                  Cuenta Bancaria
                </Label>
                <Input
                  id="bankAccount"
                  placeholder="0102-1234-56-1234567890"
                  value={formData.bankAccount}
                  onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setCurrentView("dashboard")}>
                  Cancelar
                </Button>
                <Button onClick={handleFormSubmit}>Confirmar Planilla</Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  if (currentView === "documents") {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b border-border p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Building2 className="w-8 h-8 text-primary" />
              <h1 className="text-xl font-bold text-foreground">Adjuntar Documentos</h1>
            </div>
            <Button variant="outline" onClick={() => setCurrentView("form")}>
              Volver
            </Button>
          </div>
        </header>

        <main className="max-w-4xl mx-auto p-6">
          <Card className="bg-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Documentos Requeridos</CardTitle>
              <CardDescription className="text-gray-300">
                Adjunte los siguientes documentos para completar su solicitud
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center bg-slate-700">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2 text-white">Cédula Laminada</h3>
                  <p className="text-sm text-gray-300 mb-4">Formato: PDF, JPG, PNG (Max: 5MB)</p>
                  {uploadedFiles.cedula ? (
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-green-400">{uploadedFiles.cedula.name}</span>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        id="cedula-upload"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload("cedula", e)}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("cedula-upload")?.click()}
                        className="flex items-center space-x-2"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Seleccionar Archivo</span>
                      </Button>
                    </div>
                  )}
                </div>

                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center bg-slate-700">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2 text-white">Estudios Realizados y Resultados</h3>
                  <p className="text-sm text-gray-300 mb-4">Formato: PDF, JPG, PNG (Max: 10MB)</p>
                  {uploadedFiles.estudios ? (
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-green-400">{uploadedFiles.estudios.name}</span>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        id="estudios-upload"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload("estudios", e)}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("estudios-upload")?.click()}
                        className="flex items-center space-x-2"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Seleccionar Archivo</span>
                      </Button>
                    </div>
                  )}
                </div>

                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center bg-slate-700">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2 text-white">Récipes Médicos</h3>
                  <p className="text-sm text-gray-300 mb-4">Formato: PDF, JPG, PNG (Max: 5MB)</p>
                  {uploadedFiles.recipes ? (
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-green-400">{uploadedFiles.recipes.name}</span>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        id="recipes-upload"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload("recipes", e)}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("recipes-upload")?.click()}
                        className="flex items-center space-x-2"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Seleccionar Archivo</span>
                      </Button>
                    </div>
                  )}
                </div>

                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center bg-slate-700">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2 text-white">Facturas o Presupuestos</h3>
                  <p className="text-sm text-gray-300 mb-4">Formato: PDF, JPG, PNG (Max: 10MB)</p>
                  {uploadedFiles.facturas ? (
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-green-400">{uploadedFiles.facturas.name}</span>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        id="facturas-upload"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload("facturas", e)}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("facturas-upload")?.click()}
                        className="flex items-center space-x-2"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Seleccionar Archivo</span>
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900">Validación Automática</h4>
                    <p className="text-sm text-blue-700">
                      El sistema verificará automáticamente que todos los campos estén completos, que los archivos sean
                      legibles y que las facturas estén dentro de los 30 días desde su fecha de emisión.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setCurrentView("form")}>
                  Volver
                </Button>
                <Button onClick={handleDocumentsSubmit}>Enviar Solicitud</Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  if (currentView === "success") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-900">¡Solicitud Enviada!</CardTitle>
            <CardDescription>Su solicitud ha sido procesada exitosamente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-700">
                <strong>Número de Solicitud:</strong> REQ-004
                <br />
                <strong>Tipo:</strong> {selectedProcess}
                <br />
                <strong>Estado:</strong> Pendiente
                <br />
                <strong>Fecha:</strong> {new Date().toLocaleDateString()}
              </p>
            </div>
            <p className="text-sm text-green-700">
              Recibirá un archivo PDF con los detalles de su solicitud. Puede consultar el estado en la sección "Mis
              Solicitudes".
            </p>
            <Button onClick={() => setCurrentView("dashboard")} className="w-full">
              Volver al Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}
