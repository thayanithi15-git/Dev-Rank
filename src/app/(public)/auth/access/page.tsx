"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
    GraduationCap,
    BookOpen,
    Target,
    Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Toast } from "@/utils/toast/toast";
import { useToastStore } from "@/utils/toast/store";
import { useSignInStore } from "@/store/auth/signin";
import { useSignUpStore } from "@/store/auth/signup";

export default function AuthPage() {
    const [isSignIn, setIsSignIn] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    // Toast store
    const { toast, hideToast } = useToastStore();

    // Sign In store
    const {
        email: signInEmail,
        password: signInPassword,
        isLoading: signInLoading,
        setEmail: setSignInEmail,
        setPassword: setSignInPassword,
        signIn,
        reset: resetSignIn,
    } = useSignInStore();

    // Sign Up store
    const {
        username,
        email: signUpEmail,
        password: signUpPassword,
        confirmPassword,
        agreeTerms,
        isLoading: signUpLoading,
        setUsername,
        setEmail: setSignUpEmail,
        setPassword: setSignUpPassword,
        setConfirmPassword,
        setAgreeTerms,
        signUp,
        reset: resetSignUp,
    } = useSignUpStore();

    const quotes = [
        { text: "Empower your growth through micro-credentials.", author: "Devrank Vision" },
        { text: "Stack your skills, shape your future.", author: "Devrank Mission" },
        { text: "Where learning meets opportunity.", author: "Devrank Promise" },
    ];
    const [currentQuote, setCurrentQuote] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentQuote((prev) => (prev + 1) % quotes.length);
        }, 4500);
        return () => clearInterval(timer);
    }, []);

    const handleSignIn = async (e?: React.FormEvent) => {
        e?.preventDefault();
        const success = await signIn();
        if (success) {
            router.push("/dashboard");
            resetSignIn();
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await signUp();
        if (success) {
            setIsSignIn(true);
            setSignInEmail(signUpEmail);
            resetSignUp();
        }
    };

    const loading = isSignIn ? signInLoading : signUpLoading;

    return (
        <div
            className="min-h-screen flex items-center font-poppins justify-center p-4 sm:p-6 font-sans"
            style={{ background: "var(--color-background)" }}
        >
            {/* Toast Notification */}
            <AnimatePresence>
                {toast && (
                    <Toast
                        message={toast.message}
                        description={toast.description}
                        type={toast.type}
                        onClose={hideToast}
                    />
                )}
            </AnimatePresence>

            {/* Main Container */}
            <div className="relative z-10 w-full max-w-6xl rounded-2xl border sm:rounded-3xl shadow-2xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">

                    {/* Visual/Content Panel */}
                    <motion.div
                        key="visual-panel"
                        initial={false}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.6 }}
                        className={`flex flex-col justify-between bg-cover bg-center bg-no-repeat p-8 sm:p-10 text-white rounded-2xl overflow-hidden ${isSignIn ? 'order-first' : 'order-last'
                            }`}
                        style={{
                            backgroundImage: `
                                    linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)),
                                    url(${isSignIn
                                    ? "https://png.pngtree.com/thumb_back/fh260/background/20231002/pngtree-illustration-of-a-3d-render-showcasing-a-concept-of-web-ui-image_13584942.png"
                                    : "https://png.pngtree.com/thumb_back/fh260/background/20231002/pngtree-illustration-of-a-3d-render-showcasing-a-concept-of-web-ui-image_13584942.png"
                                })
                            `,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        {/* Header */}
                        <div>
                            <div className="flex items-center gap-3 sm:gap-4 mb-6">
                                <div className="relative w-13 h-13 p-1  rounded-xl flex items-center justify-center">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center">
                                        <svg fill="#fcfbfd" aria-hidden="true" className="w-8 h-8 md:w-10 md:h-10 text-foreground" viewBox="0 0 256 227" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                                            <title>Tapcart</title>
                                            <g>
                                                <path d="M243.56268,83.2548079 L172.835493,12.5279481 C168.883105,8.55729097 164.184897,5.40655793 159.011302,3.25664474 C153.837707,1.10673154 148.29022,1.42108547e-14 142.687729,1.42108547e-14 C137.085239,1.42108547e-14 131.537752,1.10673154 126.364157,3.25664474 C121.190562,5.40655793 116.492354,8.55729097 112.539965,12.5279481 L81.0655716,44.1530775 C97.5194499,46.7776571 112.498713,55.1825716 123.312777,67.8584357 C134.126841,80.5341033 140.06721,96.6501035 140.06721,113.312209 C140.06721,129.974315 134.126841,146.090315 123.312777,158.765982 C112.498713,171.442305 97.5194499,179.846696 81.0655716,182.471799 L112.69057,214.126918 C116.642958,218.097641 121.341166,221.247896 126.514761,223.398267 C131.688356,225.547984 137.235843,226.654601 142.838334,226.654601 C148.440825,226.654601 153.988312,225.547984 159.161907,223.398267 C164.335502,221.247896 169.03371,218.097641 172.986098,214.126918 L243.56268,143.36961 C251.526389,135.394115 256,124.583325 256,113.312209 C256,102.041093 251.526389,91.2309577 243.56268,83.2548079 Z M80.1003927,45.1174052 L81.0649168,44.1526192 C71.0614984,42.5569963 60.8309289,43.1504439 51.0790856,45.8921021 C41.3271768,48.6338259 32.2861216,53.4583455 24.5796195,60.0330214 C16.8731174,66.6077628 10.6846441,74.7757697 6.44109795,83.9744359 C2.19757149,93.1724472 -4.12114787e-13,103.181759 -4.12114787e-13,113.312209 C-4.12114787e-13,123.442004 2.19757149,133.451316 6.44109795,142.649327 C10.6846441,151.847994 16.8731174,160.016 24.5796195,166.590873 C32.2861216,173.16509 41.3271768,177.989675 51.0790856,180.731334 C60.8309289,183.472992 71.0614984,184.066898 81.0649168,182.471144 L80.1003927,181.50662 C62.0217528,163.415735 51.8663547,138.887487 51.8663547,113.312209 C51.8663547,87.7362765 62.0217528,63.2077661 80.1003927,45.1174052 Z" />
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold">Dev Rank</h1>
                                    <p className="text-xs sm:text-sm opacity-90">Developer Ranking Platform</p>
                                </div>
                            </div>

                            {/* Animated Quote */}
                            <AnimatePresence mode="wait">
                                <motion.blockquote
                                    key={currentQuote}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.6 }}
                                    className="p-5 sm:p-6 rounded-2xl border"
                                    style={{
                                        background: "rgba(255,255,255,0.1)",
                                        borderColor: "rgba(255,255,255,0.12)"
                                    }}
                                >
                                    <p className="italic text-base sm:text-lg">"{quotes[currentQuote].text}"</p>
                                    <p className="text-xs sm:text-sm mt-2 opacity-90">— {quotes[currentQuote].author}</p>
                                </motion.blockquote>
                            </AnimatePresence>

                            {/* Feature Highlights - Show on Sign Up */}
                            {/* {!isSignIn && ( */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mt-6 space-y-3"
                            >
                                <div className="flex items-start gap-3">
                                    <Target className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-sm">Stackable Credentials</h3>
                                        <p className="text-xs opacity-90">Build your skill profile with industry-recognized micro-credentials</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <BookOpen className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-sm">Verified Achievements</h3>
                                        <p className="text-xs opacity-90">Share verified badges with recruiters and on your portfolio</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Sparkles className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-sm">AI-Powered Paths</h3>
                                        <p className="text-xs opacity-90">Get personalized learning recommendations from mentors</p>
                                    </div>
                                </div>
                            </motion.div>
                            {/* )} */}
                        </div>
                        <div className="mt-8"></div>
                    </motion.div>

                    {/* Form Panel */}
                    <div
                        className={`p-6 sm:p-8 flex items-center justify-center ${isSignIn ? 'order-last' : 'order-first'}`}
                        style={{ background: "var(--color-card)" }}
                    >
                        <div className="w-full max-w-md">
                            <AnimatePresence mode="wait">
                                {isSignIn ? (
                                    // SIGN IN FORM
                                    <motion.form
                                        key="signin-form"
                                        initial={{ opacity: 0, x: 40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -40 }}
                                        transition={{ duration: 0.5 }}
                                        onSubmit={handleSignIn}
                                        className="space-y-5"
                                    >
                                        <div className="text-center">
                                            <User
                                                className="mx-auto w-10 h-10 mb-3"
                                                style={{ color: "var(--color-primary)" }}
                                            />
                                            <h2 className="text-2xl font-bold">Signin</h2>
                                            <p className="text-sm opacity-70 mt-1">Boost Your Ranking up</p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="signup-email" className="text-sm font-medium">
                                                Email Address
                                            </Label>
                                            <Input
                                                id="signup-email"
                                                type="email"
                                                value={signUpEmail}
                                                onChange={(e) => setSignInEmail(e.target.value)}
                                                placeholder="you@devrank.com"
                                                className="h-12 rounded-xl"
                                                style={{ borderColor: "var(--color-border)" }}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="signin-password" className="text-sm font-medium">
                                                Password
                                            </Label>
                                            <div className="relative">
                                                <Lock
                                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                                                    style={{ color: "var(--color-muted-foreground)" }}
                                                />
                                                <Input
                                                    id="signin-password"
                                                    type={showPassword ? "text" : "password"}
                                                    value={signInPassword}
                                                    onChange={(e) => setSignInPassword(e.target.value)}
                                                    placeholder="••••••••"
                                                    className="h-12 rounded-xl pl-10 pr-10"
                                                    style={{ borderColor: "var(--color-border)" }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                                    style={{ color: "var(--color-muted-foreground)" }}
                                                >
                                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-end text-sm">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const { showToast } = useToastStore.getState();
                                                    showToast("Coming Soon", "Password recovery feature is in development", "info");
                                                }}
                                                className="underline hover:no-underline transition-all text-xs sm:text-sm"
                                                style={{ color: "var(--color-primary)" }}
                                            >
                                                Forgot Password?
                                            </button>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full h-12 rounded-xl font-semibold transition-all hover:scale-[1.02]"
                                            style={{
                                                background: "var(--color-primary)",
                                                color: "var(--color-primary-foreground)"
                                            }}
                                            disabled={loading}
                                        >
                                            {loading ? "Signing in..." : "Sign In"}
                                        </Button>

                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t" style={{ borderColor: "var(--color-border)" }}></div>
                                            </div>
                                            <div className="relative flex justify-center text-xs uppercase">
                                                <span
                                                    className="px-2"
                                                    style={{ background: "var(--color-card)", color: "var(--color-muted-foreground)" }}
                                                >
                                                    Or continue with
                                                </span>
                                            </div>
                                        </div>

                                        <Button
                                            type="button"
                                            onClick={() => {
                                                const { showToast } = useToastStore.getState();
                                                showToast("Google Sign-In", "Feature coming soon!", "info");
                                            }}
                                            variant="outline"
                                            className="w-full h-11 rounded-xl font-medium transition-all hover:scale-[1.02]"
                                            style={{ borderColor: "var(--color-border)" }}
                                        >
                                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                            Sign in with Google
                                        </Button>

                                        <div className="text-center text-sm" style={{ color: "var(--color-muted-foreground)" }}>
                                            Don't have an account?{" "}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsSignIn(false);
                                                    resetSignIn();
                                                }}
                                                className="font-semibold cursor-pointer underline hover:no-underline transition-all"
                                                style={{ color: "var(--color-primary)" }}
                                            >
                                                Sign Up
                                            </button>
                                        </div>
                                    </motion.form>
                                ) : (
                                    // SIGN UP FORM
                                    <motion.form
                                        key="signup-form"
                                        initial={{ opacity: 0, x: -40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 40 }}
                                        transition={{ duration: 0.5 }}
                                        onSubmit={handleSignUp}
                                        className="space-y-5"
                                    >
                                        <div className="text-center">
                                            <User
                                                className="mx-auto w-10 h-10 mb-3"
                                                style={{ color: "var(--color-primary)" }}
                                            />
                                            <h2 className="text-2xl font-bold">Create Account</h2>
                                            <p className="text-sm opacity-70 mt-1">Join the micro-credential revolution</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <Label htmlFor="signup-username" className="text-sm font-medium">
                                                    Username
                                                </Label>
                                                <Input
                                                    id="signup-username"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    placeholder="johndoe"
                                                    className="h-12 rounded-xl"
                                                    style={{ borderColor: "var(--color-border)" }}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="signup-email" className="text-sm font-medium">
                                                    Email Address
                                                </Label>
                                                <Input
                                                    id="signup-email"
                                                    type="email"
                                                    value={signUpEmail}
                                                    onChange={(e) => setSignUpEmail(e.target.value)}
                                                    placeholder="you@devrank.com"
                                                    className="h-12 rounded-xl"
                                                    style={{ borderColor: "var(--color-border)" }}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="signup-password" className="text-sm font-medium">
                                                Password
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="signup-password"
                                                    type={showPassword ? "text" : "password"}
                                                    value={signUpPassword}
                                                    onChange={(e) => setSignUpPassword(e.target.value)}
                                                    placeholder="Choose a strong password"
                                                    className="h-12 rounded-xl pr-10"
                                                    style={{ borderColor: "var(--color-border)" }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                                    style={{ color: "var(--color-muted-foreground)" }}
                                                >
                                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="signup-confirm-password" className="text-sm font-medium">
                                                Confirm Password
                                            </Label>
                                            <Input
                                                id="signup-confirm-password"
                                                type={showPassword ? "text" : "password"}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="Confirm your password"
                                                className="h-12 rounded-xl"
                                                style={{ borderColor: "var(--color-border)" }}
                                            />
                                        </div>

                                        <div className="flex items-start gap-2">
                                            <Checkbox
                                                id="terms"
                                                checked={agreeTerms}
                                                onCheckedChange={(checked) => setAgreeTerms(Boolean(checked))}
                                                className="mt-0.5"
                                            />
                                            <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                                                I agree to the{" "}
                                                <span
                                                    className="underline cursor-pointer font-medium"
                                                    style={{ color: "var(--color-primary)" }}
                                                >
                                                    Terms & Conditions
                                                </span>{" "}
                                                and{" "}
                                                <span
                                                    className="underline cursor-pointer font-medium"
                                                    style={{ color: "var(--color-primary)" }}
                                                >
                                                    Privacy Policy
                                                </span>
                                            </Label>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full h-12 rounded-xl font-semibold transition-all hover:scale-[1.02]"
                                            style={{
                                                background: "var(--color-primary)",
                                                color: "var(--color-primary-foreground)"
                                            }}
                                            disabled={loading}
                                        >
                                            {loading ? "Creating Account..." : "Create Account"}
                                        </Button>

                                        <div className="text-center text-sm" style={{ color: "var(--color-muted-foreground)" }}>
                                            Already have an account?{" "}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsSignIn(true);
                                                    resetSignUp();
                                                }}
                                                className="font-semibold cursor-pointer underline hover:no-underline transition-all"
                                                style={{ color: "var(--color-primary)" }}
                                            >
                                                Sign In
                                            </button>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}