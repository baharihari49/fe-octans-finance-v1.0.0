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

export function RegisterForm() {
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
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
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
            <Input id="password" type="password" required placeholder="*******"/>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Konfirmasi password</Label>
            </div>
            <Input id="password" type="password" required placeholder="*******"/>
          </div>
          <Button type="submit" className="w-full primary-color-bg">
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
