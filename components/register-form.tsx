'use client';

import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { register } from "@/services/autServices"
import { useState } from "react"
import { useRouter } from 'next/navigation';

interface loginResponse {
  success: boolean;
  token?: string; // Add other fields as necessary
  message?: string;
}

export function RegisterForm() {

  const [errorMessage, setErrorMessage] = useState<string | null>(null); // To handle error messages
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const router = useRouter();


  const handelSubmit = async () => {
    try {
      const response = (await register(
        username,
        name,
        email,
        password,
        passwordConfirmation
      )) as loginResponse;

      if (response.success) {
        router.push('/');
      } else {
        setErrorMessage(response.message || 'Login failed.');
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred during login.');
    }
  }

  return (
    <Card className="mx-auto w-[450px]">
      <CardHeader>
        <CardTitle className="text-2xl">Masuk & daftar</CardTitle>
        <CardDescription>
          Masukkan username, email, dan password anda untuk buat dan masuk ke akun anda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline text-primary">
                Lupa password?
              </Link>
            </div>
            <Input 
              id="password" 
              type="password" 
              required placeholder="*******"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Konfirmasi password</Label>
            </div>
            <Input 
              id="password" 
              type="password" 
              required placeholder="*******"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
          </div>
          <Button onClick={() => void handelSubmit()} type="submit" className="w-full primary-color-bg">
            Register
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Sudah punya akun?{" "}
          <Link href="/auth/login" className="underline text-primary">
            Login disini
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
