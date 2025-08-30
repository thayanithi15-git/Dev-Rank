'use client';;
import React, { useState, useEffect, use } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    Eye, EyeOff, Mail, Lock, ArrowRight, Trophy, Star,
    Users, TrendingUp, Shield, Sparkles, Rocket, Github, Sun, Moon
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const DevRankSignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [currentQuote, setCurrentQuote] = useState(0);
    const [signInData, setSignInData] = useState({ email: '', password: '' });

    const quotes = [
        { text: "Code is poetry written in logic", author: "Anonymous Developer" },
        { text: "Every expert was once a beginner", author: "Helen Hayes" },
        { text: "Build something amazing today", author: "DevRank Community" },
        { text: "Your next commit could change everything", author: "Tech Wisdom" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuote((prev) => (prev + 1) % quotes.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignInData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const router = useRouter();

    const handleSubmit = async () => {
        setIsLoading(true);
        setTimeout(() => {
            // console.log('Sign in:', signInData);
            setIsLoading(false);
        }, 2000);
        router.push('/dashboard');
    };

    return (
        <div className={isDark ? 'dark' : ''}>
            <div className="min-h-screen relative overflow-hidden">
                {/* Background with responsive margins */}
                <div className="absolute inset-4 sm:inset-6 lg:inset-8 rounded-2xl sm:rounded-3xl overflow-hidden">
                    {/* <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070)' }}
                    /> */}
                    <div className="absolute inset-0 bg-gradient-to-br from-background/10 via-primary/60 to-background/90" />
                </div>

                <div className="relative z-10 min-h-screen flex p-4 sm:p-6 lg:p-8">
                    
                    {/* Left Panel - Desktop Only */}
                    <div className="hidden lg:flex w-1/2 items-center justify-center text-card-foreground">
                        <div className="max-w-lg text-center space-y-8">
                            {/* Logo */}
                            <div className="flex items-center justify-center gap-4">
                                <div className="p-4 bg-card/20 backdrop-blur-sm rounded-2xl border border-border/30">
                                    <Trophy className="w-12 h-12 text-primary" />
                                </div>
                                <div>
                                    <h1 className="text-5xl font-bold text-card-foreground">DevRank</h1>
                                    <p className="text-muted-foreground">AI-Powered Developer Profiling</p>
                                </div>
                            </div>

                            {/* Quote */}
                            <div className="h-32 flex items-center justify-center">
                                <div key={currentQuote} className="animate-in fade-in duration-700">
                                    <blockquote className="text-2xl font-medium leading-relaxed text-card-foreground">
                                        "{quotes[currentQuote].text}"
                                    </blockquote>
                                    <cite className="block text-muted-foreground mt-3">
                                        — {quotes[currentQuote].author}
                                    </cite>
                                </div>
                            </div>

                            {/* Quote Indicators */}
                            <div className="flex justify-center space-x-2">
                                {quotes.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`h-2 rounded-full transition-all duration-300 ${index === currentQuote
                                                ? 'w-8 bg-primary'
                                                : 'w-2 bg-muted hover:bg-primary/60'
                                            }`}
                                        onClick={() => setCurrentQuote(index)}
                                    />
                                ))}
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 lg:gap-6">
                                {[
                                    { icon: Users, value: '50K+', label: 'Developers', color: 'text-blue-600' },
                                    { icon: TrendingUp, value: 'Live', label: 'Rankings', color: 'text-green-600' },
                                    { icon: Shield, value: 'Secure', label: 'Platform', color: 'text-orange-600' }
                                ].map(({ icon: Icon, value, label, color }) => (
                                    <div key={label} className="text-center group hover:scale-105 transition-transform">
                                        <div className="flex items-center justify-center mb-2">
                                            <Icon className={`w-5 h-5 mr-2 ${color}`} />
                                            <span className="text-2xl font-bold text-slate-800 dark:text-slate-200">{value}</span>
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm">{label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Features */}
                            <div className="flex flex-wrap justify-center gap-3">
                                {[
                                    { icon: Star, text: 'Real-time Analytics' },
                                    { icon: Rocket, text: 'Smart Matching' },
                                    { icon: Shield, text: 'Secure Platform' }
                                ].map(({ icon: Icon, text }) => (
                                    <Badge key={text} variant="secondary" className="bg-card/20 text-card-foreground border-border/30 hover:bg-card/30 transition-all hover:scale-105">
                                        <Icon className="w-3 h-3 mr-2" />
                                        {text}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Sign In Form */}
                    <div className="flex-1 lg:max-w-md xl:max-w-xl flex items-center justify-center">
                        <div className="w-full max-w-lg space-y-6">
                            {/* Mobile Logo */}
                            <div className="lg:hidden text-center mb-8">
                                <div className="flex items-center justify-center space-x-3 mb-6">
                                    <div className="p-3 bg-primary rounded-xl shadow-lg">
                                        <Trophy className="w-6 h-6 text-primary-foreground" />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold text-primary">DevRank</h1>
                                        <p className="text-muted-foreground text-sm">AI-Powered Developer Profiling</p>
                                    </div>
                                </div>

                                {/* Mobile Quote */}
                                <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border">
                                    <div key={`mobile-${currentQuote}`} className="animate-in fade-in duration-500">
                                        <blockquote className="text-sm font-medium text-card-foreground">
                                            "{quotes[currentQuote].text}"
                                        </blockquote>
                                        <cite className="block text-muted-foreground text-xs mt-1">
                                            — {quotes[currentQuote].author}
                                        </cite>
                                    </div>
                                </div>
                            </div>

                            <Card className="shadow-2xl bg-card/95 backdrop-blur-xl border">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                                        <Rocket className="w-6 h-6 text-primary" />
                                        Welcome Back
                                    </CardTitle>
                                    <p className="text-sm text-muted-foreground">Sign in to access your developer profile</p>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-primary" />
                                                Email Address
                                            </Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    className="pl-10 h-12 focus:ring-primary"
                                                    value={signInData.email}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <Label htmlFor="password" className="flex items-center gap-2">
                                                    <Lock className="w-4 h-4 text-primary" />
                                                    Password
                                                </Label>
                                                <Button variant="link" className="p-0 h-auto text-sm text-primary hover:text-primary/80">
                                                    Forgot password?
                                                </Button>
                                            </div>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="password"
                                                    name="password"
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Enter your password"
                                                    className="pl-10 pr-12 h-12 focus:ring-primary"
                                                    value={signInData.password}
                                                    onChange={handleInputChange}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-1 top-1 h-10 w-10"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handleSubmit}
                                        className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center">
                                                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                                                Signing In...
                                            </div>
                                        ) : (
                                            <>
                                                <Rocket className="mr-2 h-4 w-4" />
                                                Sign In to DevRank
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </>
                                        )}
                                    </Button>

                                    <div className="relative">
                                        <Separator />
                                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs text-muted-foreground">
                                            Or continue with
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <Button variant="outline" className="h-12 hover:bg-accent hover:text-accent-foreground">
                                            <Mail className="w-4 h-4 mr-2" />
                                            Google
                                        </Button>
                                        <Button variant="outline" className="h-12 hover:bg-accent hover:text-accent-foreground">
                                            <Github className="w-4 h-4 mr-2" />
                                            GitHub
                                        </Button>
                                    </div>

                                    <div className="text-center pt-4">
                                        <p className="text-muted-foreground mb-3">New to DevRank?</p>
                                        <Button
                                            variant="ghost"
                                            className="font-semibold text-secondary-foreground hover:bg-secondary"
                                        >
                                            <Sparkles className="w-4 h-4 mr-2" />
                                            Create your developer profile
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Trust Indicators */}
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Shield className="w-3 h-3 text-primary" />
                                        <span>256-bit SSL</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-3 h-3 text-accent" />
                                        <span>SOC 2 Certified</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="w-3 h-3 text-secondary-foreground" />
                                        <span>GDPR Compliant</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Separate Sign Up Component
const DevRankSignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [signUpData, setSignUpData] = useState({
        fullName: '', email: '', password: '', confirmPassword: '', agreeToTerms: false
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setSignUpData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setTimeout(() => {
            console.log('Sign up:', signUpData);
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div className={isDark ? 'dark' : ''}>
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <Card className="w-full max-w-md shadow-2xl bg-card border">
                    <CardHeader className="text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="p-3 bg-primary rounded-xl">
                                <Trophy className="w-6 h-6 text-primary-foreground" />
                            </div>
                            <h1 className="text-2xl font-bold text-primary">DevRank</h1>
                        </div>
                        <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                            <Sparkles className="w-6 h-6 text-accent" />
                            Join DevRank
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">Create your AI-powered developer profile</p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                placeholder="Enter your full name"
                                value={signUpData.fullName}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={signUpData.email}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a password"
                                    className="pr-10"
                                    value={signUpData.password}
                                    onChange={handleInputChange}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1 h-8 w-8"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    className="pr-10"
                                    value={signUpData.confirmPassword}
                                    onChange={handleInputChange}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1 h-8 w-8"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="agreeToTerms"
                                name="agreeToTerms"
                                checked={signUpData.agreeToTerms}
                                onChange={handleInputChange}
                                className="rounded"
                            />
                            <Label htmlFor="agreeToTerms" className="text-sm">
                                I agree to the <Button variant="link" className="p-0 h-auto text-primary">Terms & Privacy</Button>
                            </Label>
                        </div>

                        <Button
                            onClick={handleSubmit}
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                            disabled={isLoading || !signUpData.agreeToTerms}
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                                    Creating Account...
                                </div>
                            ) : (
                                <>
                                    Create DevRank Account
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>

                        <div className="text-center">
                            <p className="text-muted-foreground text-sm mb-2">Already have an account?</p>
                            <Button variant="ghost" className="font-semibold text-primary hover:bg-primary/10">
                                <Mail className="w-4 h-4 mr-2" />
                                Sign in to existing account
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DevRankSignIn;