
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useApp, findAppUserByEmail, createAppUser } from "@/context/AppContext";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const emailSchema = z.object({
  email: z.string().email("Por favor, introduce un email válido."),
});

const detailsSchema = z.object({
  username: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres."),
  pin: z.string().length(4, "El PIN debe tener exactamente 4 dígitos.").regex(/^\d{4}$/, "El PIN solo puede contener números."),
});

type Step = "email" | "pin" | "register";

export default function LoginPage() {
  const { login } = useApp();
  const router = useRouter();
  const { toast } = useToast();
  
  const [step, setStep] = useState<Step>("email");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [existingUser, setExistingUser] = useState<any>(null);

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const detailsForm = useForm<z.infer<typeof detailsSchema>>({
    resolver: zodResolver(detailsSchema),
    defaultValues: { username: "", pin: "" },
  });

  const handleEmailSubmit = async ({ email }: z.infer<typeof emailSchema>) => {
    setIsLoading(true);
    const user = await findAppUserByEmail(email);
    setIsLoading(false);

    setEmail(email);
    if (user) {
      setExistingUser(user);
      setStep("pin");
    } else {
      setStep("register");
    }
  };

  const handlePinSubmit = async ({ pin }: { pin: string }) => {
    setIsLoading(true);
    if (existingUser && existingUser.pin === pin) {
      login({ email: existingUser.email, username: existingUser.username });
      toast({ title: "¡Bienvenido de nuevo!", description: `Sesión iniciada como ${existingUser.username}` });
      router.push("/mobileapp");
    } else {
      toast({ variant: "destructive", title: "PIN incorrecto", description: "El PIN que has introducido no es correcto." });
      detailsForm.setError("pin", { type: "manual", message: "PIN incorrecto." });
    }
    setIsLoading(false);
  };

  const handleRegisterSubmit = async (values: z.infer<typeof detailsSchema>) => {
    setIsLoading(true);
    try {
      const newUser = await createAppUser(email, values.username, values.pin);
      login(newUser);
      toast({ title: "¡Cuenta creada!", description: `Bienvenido a la app, ${values.username}` });
      router.push("/mobileapp");
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Error al registrar", description: "No se pudo crear la cuenta. Inténtalo de nuevo." });
    }
    setIsLoading(false);
  };

  const renderStep = () => {
    switch (step) {
      case "email":
        return (
          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-6">
              <FormField control={emailForm.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Email</FormLabel>
                  <FormControl><Input type="email" placeholder="tu@email.com" {...field} className="bg-gray-800 border-gray-700 text-white" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <Button type="submit" className="w-full bg-yellow-400 text-black hover:bg-yellow-500" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
                Continuar
              </Button>
            </form>
          </Form>
        );
      case "pin":
        return (
          <Form {...detailsForm}>
            <form onSubmit={detailsForm.handleSubmit(d => handlePinSubmit({pin: d.pin}))} className="space-y-6">
                 <p className="text-sm text-center text-gray-400">Introduce tu PIN para <span className="font-bold text-white">{email}</span></p>
              <FormField control={detailsForm.control} name="pin" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">PIN de 4 dígitos</FormLabel>
                  <FormControl><Input type="password" maxLength={4} {...field} className="bg-gray-800 border-gray-700 text-white text-center text-2xl tracking-[1em]" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <Button type="submit" className="w-full bg-yellow-400 text-black hover:bg-yellow-500" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lock className="mr-2 h-4 w-4"/>}
                Iniciar Sesión
              </Button>
               <Button variant="link" onClick={() => setStep('email')} className="w-full text-gray-400">Usar otro email</Button>
            </form>
          </Form>
        );
      case "register":
        return (
          <Form {...detailsForm}>
            <form onSubmit={detailsForm.handleSubmit(handleRegisterSubmit)} className="space-y-6">
                 <p className="text-sm text-center text-gray-400">Creando cuenta para <span className="font-bold text-white">{email}</span></p>
              <FormField control={detailsForm.control} name="username" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Nombre de Usuario</FormLabel>
                  <FormControl><Input placeholder="Elige un apodo" {...field} className="bg-gray-800 border-gray-700 text-white" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={detailsForm.control} name="pin" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Crea un PIN de 4 dígitos</FormLabel>
                  <FormControl><Input type="password" maxLength={4} {...field} className="bg-gray-800 border-gray-700 text-white text-center text-2xl tracking-[1em]" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <Button type="submit" className="w-full bg-yellow-400 text-black hover:bg-yellow-500" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Crear Cuenta
              </Button>
               <Button variant="link" onClick={() => setStep('email')} className="w-full text-gray-400">Usar otro email</Button>
            </form>
          </Form>
        );
    }
  };
  
  const getTitle = () => {
    switch(step) {
      case "email": return "Accede a la App";
      case "pin": return "Introduce tu PIN";
      case "register": return "Crea tu cuenta";
      default: return "";
    }
  }
   const getDescription = () => {
    switch(step) {
      case "email": return "Introduce tu email para empezar.";
      case "pin": return "¡Qué bueno verte de nuevo!";
      case "register": return "Únete a la experiencia del festival.";
      default: return "";
    }
  }


  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800 text-white animate-fade-in-up">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-yellow-400">{getTitle()}</CardTitle>
          <CardDescription className="text-center text-gray-400">{getDescription()}</CardDescription>
        </CardHeader>
        <CardContent>
          {renderStep()}
        </CardContent>
      </Card>
    </div>
  );
}
