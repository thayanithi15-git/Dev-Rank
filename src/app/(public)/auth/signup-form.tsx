"use client"

import type React from "react"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useToast } from "@/components/ui/use-toast"
import { toast } from "sonner"

export default function SignUpForm() {
    //   const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const [role, setRole] = useState<"user" | "recruiter" | "admin" | "">("")

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const fd = new FormData(e.currentTarget)
        const name = String(fd.get("name") || "").trim()
        const email = String(fd.get("email") || "").trim()
        const password = String(fd.get("password") || "")
        if (!name || !email || !password || !role) {
            toast.error("Missing fields", {
                description: "Please complete all fields.",
            })
            return
        }
        try {
            setLoading(true)
            await new Promise((r) => setTimeout(r, 800))
            toast.success("Account created", {
                description: `You're signed up as ${role}.`,
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" type="text" placeholder="Jane Doe" autoComplete="name" required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@domain.com" autoComplete="email" required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    autoComplete="new-password"
                    required
                />
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
            <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Creating..." : "Create account"}
            </Button>
        </form>
    )
}
