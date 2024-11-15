'use client'
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
import { useState } from "react"
import { useRouter } from 'next/navigation';


import { login } from "@/services/autServices"

export function LoginForm() {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const router = useRouter()

  const handelSubmit = async () => {
    const respon = await login(email, password)

    if(respon.success == true){
      router.push('/')
    }
  }

  return (
    <Card className="mx-auto w-[450px]">
      <CardHeader>
        <CardTitle className="text-2xl">Masuk ke akun anda</CardTitle>
        <CardDescription>
          Masukkan email anda untuk masuk ke akun anda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline text-primary">
                Lupa password?
              </Link>
            </div>
            <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)} required placeholder="*******"/>
          </div>
          <Button onClick={handelSubmit} type="submit" className="w-full primary-color-bg">
            Login
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Belum punya akun?{" "}
          <Link href="/auth/register" className="underline text-primary">
            Daftar disini
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
