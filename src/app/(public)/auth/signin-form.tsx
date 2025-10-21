"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useToast } from "@/components/ui/use-toast"
import { toast } from "sonner"

type Errors = {
  email?: string
  password?: string
}

export function SignInForm() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [remember, setRemember] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)
  const [errors, setErrors] = React.useState<Errors>({})
  const [role, setRole] = React.useState<"user" | "recruiter" | "admin" | "">("")
//   const { toast } = useToast()

  function validate() {
    const next: Errors = {}
    if (!email.trim()) {
      next.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Enter a valid email address"
    }
    if (!password) {
      next.password = "Password is required"
    } else if (password.length < 6) {
      next.password = "Password must be at least 6 characters"
    }
    if (!role) {
      toast.error("Role is required")
    }
    setErrors(next)
    return Object.keys(next).length === 0 && !!role
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      console.log("[v0] Sign-in attempt:", { email, remember })
      // TODO: Connect your auth provider here (Supabase, Auth.js, custom API, etc.)
      await new Promise((r) => setTimeout(r, 800))
      console.log("[v0] Sign-in success placeholder")
      localStorage.setItem("auth.email", email)
      localStorage.setItem("auth.role", role)
      localStorage.setItem("auth.remember", remember ? "1" : "0")
      localStorage.setItem("auth.loginAt", String(Date.now()))
      toast.success(`Welcome back, ${role}!`)
      // Example: redirect after success
      // router.push("/dashboard")
    } catch (err: any) {
      console.log("[v0] Sign-in error:", err?.message || err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="grid gap-4" onSubmit={onSubmit} noValidate>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email ? (
          <p id="email-error" className="text-sm text-destructive">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link
            href="/forgot-password"
            className="text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground"
          >
            Forgot password?
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
        />
        {errors.password ? (
          <p id="password-error" className="text-sm text-destructive">
            {errors.password}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="role">Role</Label>
        <Select value={role} onValueChange={(v) => setRole(v as any)}>
          <SelectTrigger id="role" aria-label="Select role">
            <SelectValue placeholder="Choose a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="recruiter">Recruiter</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="remember"
          checked={remember}
          onCheckedChange={(checked) => setRemember(Boolean(checked))}
          aria-label="Remember me"
        />
        <Label htmlFor="remember" className="text-sm text-muted-foreground">
          Remember me
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? "Signing in..." : "Sign in"}
      </Button>

      <div className="grid gap-4">
        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">OR</span>
          <Separator className="flex-1" />
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <Button
            type="button"
            variant="outline"
            className="w-full bg-transparent"
            onClick={() => console.log("[v0] Social sign-in: Google")}
          >
            Continue with Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full bg-transparent"
            onClick={() => console.log("[v0] Social sign-in: GitHub")}
          >
            Continue with GitHub
          </Button>
        </div>
      </div>
    </form>
  )
}

export default SignInForm

