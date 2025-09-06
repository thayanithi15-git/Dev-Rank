'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Eye, EyeOff, Mail, Lock, ArrowRight, Trophy, Star, Code2, 
    Users, TrendingUp, Shield, User, Sparkles, Rocket, Target, 
    Brain, Globe, Coffee, Github, Zap
} from 'lucide-react';

const AuthApp = () => {
    const [currentPage, setCurrentPage] = useState<'signin' | 'signup'>('signup');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentQuote, setCurrentQuote] = useState(0);

    const [signInData, setSignInData] = useState({ email: '', password: '' });
    const [signUpData, setSignUpData] = useState({
        fullName: '', email: '', password: '', confirmPassword: '', agreeToTerms: false
    });

    const quotes = {
        signin: [
            { text: "Code is poetry written in logic", author: "Anonymous Developer" },
            { text: "Every expert was once a beginner", author: "Helen Hayes" },
            { text: "Build something amazing today", author: "DevRank Community" },
            { text: "Your next commit could change everything", author: "Tech Wisdom" }
        ],
        signup: [
            { text: "Every journey begins with a single step", author: "Lao Tzu" },
            { text: "Innovation distinguishes leaders from followers", author: "Steve Jobs" },
            { text: "The best time to start was yesterday, the second best time is now", author: "Tech Proverb" },
            { text: "Dream big, code bigger", author: "DevRank" }
        ]
    };

    useEffect(() => {
        setCurrentQuote(0);
        const interval = setInterval(() => {
            setCurrentQuote((prev) => (prev + 1) % quotes[currentPage].length);
        }, 4000);
        return () => clearInterval(interval);
    }, [currentPage]);

    const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignInData({ ...signInData, [e.target.name]: e.target.value });
    };

    const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setTimeout(() => {
            console.log(currentPage === 'signin' ? 'Sign in:' : 'Sign up:', 
                       currentPage === 'signin' ? signInData : signUpData);
            setIsLoading(false);
        }, 2000);
    };

    const bgImage = currentPage === 'signin' 
        ? 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070'
        : 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=2074';

    const gradientClass = currentPage === 'signin' 
        ? 'from-blue-900/30 via-purple-800/60 to-slate-900/30'
        : 'from-emerald-900/30 via-teal-800/60 to-slate-900/30';

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background with responsive margins */}
            <div className="absolute inset-3 sm:inset-6 lg:inset-8 rounded-2xl sm:rounded-3xl overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                    style={{ backgroundImage: `url('${bgImage}')` }}
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} transition-all duration-1000`} />
            </div>

            <div className="relative z-10 min-h-screen w-full flex p-3 sm:p-6 lg:p-8">
                {/* Left Panel - Desktop Only */}
                <div className="hidden lg:flex w-[50%]  items-center justify-center text-white">
                    <div className="max-w-lg text-center space-y-8">
                        {/* Logo */}
                        <div className="flex items-center justify-center space-x-4">
                            <div className="p-4 bg-white/15 backdrop-blur-sm rounded-2xl border border-white/20">
                                <Trophy className="w-12 h-12" />
                            </div>
                            <div>
                                <h1 className="text-5xl font-bold">DevRank</h1>
                                <p className="text-white/80">AI-Powered Developer Profiling</p>
                            </div>
                        </div>

                        {/* Quote */}
                        <div className="h-32 flex items-center justify-center">
                            <div key={`${currentPage}-${currentQuote}`} className="animate-in fade-in duration-700">
                                <blockquote className="text-2xl font-medium leading-relaxed">
                                    "{quotes[currentPage][currentQuote].text}"
                                </blockquote>
                                <cite className="block text-white/70 mt-3">
                                    — {quotes[currentPage][currentQuote].author}
                                </cite>
                            </div>
                        </div>

                        {/* Quote Indicators */}
                        <div className="flex justify-center space-x-2">
                            {quotes[currentPage].map((_, index) => (
                                <button
                                    key={index}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        index === currentQuote ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
                                    }`}
                                    onClick={() => setCurrentQuote(index)}
                                />
                            ))}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-4">
                            {[
                                { icon: Users, value: '50K+', label: 'Developers' },
                                { icon: Brain, value: 'AI', label: 'Powered' },
                                { icon: TrendingUp, value: 'Live', label: 'Rankings' }
                            ].map(({ icon: Icon, value, label }) => (
                                <div key={label} className="text-center group hover:scale-105 transition-transform">
                                    <div className="flex items-center justify-center mb-2">
                                        <Icon className="w-5 h-5 mr-2" />
                                        <span className="text-3xl font-bold">{value}</span>
                                    </div>
                                    <p className="text-white/80 text-sm">{label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap justify-center gap-3">
                            {[
                                { icon: Star, text: 'Real-time Analytics' },
                                { icon: Zap, text: 'Smart Matching' },
                                { icon: Shield, text: 'Secure Platform' }
                            ].map(({ icon: Icon, text }) => (
                                <Badge key={text} variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20 transition-all hover:scale-105">
                                    <Icon className="w-3 h-3 mr-2" />
                                    {text}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Panel - Form */}
                <div className="flex-1 lg:max-w-md xl:max-w-xl flex items-center justify-center">
                    <div className="w-full max-w-sm space-y-6">
                        {/* Mobile Logo */}
                        <div className="lg:hidden text-center mb-8">
                            <div className="flex items-center justify-center space-x-3 mb-6">
                                <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg">
                                    <Trophy className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                        DevRank
                                    </h1>
                                    <p className="text-muted-foreground text-sm">AI-Powered Developer Profiling</p>
                                </div>
                            </div>
                            
                            {/* Mobile Quote */}
                            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-white">
                                <div key={`mobile-${currentPage}-${currentQuote}`} className="animate-in fade-in duration-500">
                                    <blockquote className="text-sm font-medium">
                                        "{quotes[currentPage][currentQuote].text}"
                                    </blockquote>
                                    <cite className="block text-white/70 text-xs mt-1">
                                        — {quotes[currentPage][currentQuote].author}
                                    </cite>
                                </div>
                            </div>
                        </div>

                        {/* Sign In Form */}
                        {currentPage === 'signin' && (
                            <Card className="shadow-2xl  bg-card/95 w-lg backdrop-blur-xl border-white/10">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                                        <Rocket className="w-6 h-6 text-orange-600" />
                                        Welcome Back
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="signin-email" className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-orange-600" />
                                                Email Address
                                            </Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="signin-email"
                                                    name="email"
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    className="pl-10 h-12 border-orange-200 focus:border-orange-500"
                                                    value={signInData.email}
                                                    onChange={handleSignInChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <Label htmlFor="signin-password" className="flex items-center gap-2">
                                                    <Lock className="w-4 h-4 text-orange-600" />
                                                    Password
                                                </Label>
                                                <Button variant="link" className="p-0 h-auto text-sm text-orange-600">
                                                    Forgot password?
                                                </Button>
                                            </div>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="signin-password"
                                                    name="password"
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Enter your password"
                                                    className="pl-10 pr-12 h-12 border-orange-200 focus:border-orange-500"
                                                    value={signInData.password}
                                                    onChange={handleSignInChange}
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
                                        className="w-full h-12 bg-gradient-to-r from-orange-600 to-red-600 hover:from-red-600 hover:to-orange-600 shadow-lg"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
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
                                        <Button variant="outline" className="h-12 hover:border-orange-500">
                                            <Mail className="w-4 h-4 mr-2" />
                                            Google
                                        </Button>
                                        <Button variant="outline" className="h-12 hover:border-orange-500">
                                            <Github className="w-4 h-4 mr-2" />
                                            GitHub
                                        </Button>
                                    </div>

                                    <div className="text-center pt-4">
                                        <p className="text-muted-foreground mb-3">New to DevRank?</p>
                                        <Button 
                                            // onClick={switchPage}
                                            variant="ghost" 
                                            className="font-semibold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                                        >
                                            <Sparkles className="w-4 h-4 mr-2" />
                                            Create your developer profile
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Sign Up Form */}
                        {currentPage === 'signup' && (
                            <Card className="shadow-2xl bg-card/95 backdrop-blur-xl border-white/10">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                                        <Target className="w-6 h-6 text-emerald-600" />
                                        Join DevRank
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="signup-name" className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-emerald-600" />
                                                Full Name
                                            </Label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="signup-name"
                                                    name="fullName"
                                                    placeholder="Enter your full name"
                                                    className="pl-10 h-12 border-emerald-200 focus:border-emerald-500"
                                                    value={signUpData.fullName}
                                                    onChange={handleSignUpChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="signup-email" className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-emerald-600" />
                                                Email Address
                                            </Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="signup-email"
                                                    name="email"
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    className="pl-10 h-12 border-emerald-200 focus:border-emerald-500"
                                                    value={signUpData.email}
                                                    onChange={handleSignUpChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="signup-password" className="flex items-center gap-2">
                                                    <Lock className="w-4 h-4 text-emerald-600" />
                                                    Password
                                                </Label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                    <Input
                                                        id="signup-password"
                                                        name="password"
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Create password"
                                                        className="pl-10 pr-12 h-12 border-emerald-200 focus:border-emerald-500"
                                                        value={signUpData.password}
                                                        onChange={handleSignUpChange}
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

                                            <div className="space-y-2">
                                                <Label htmlFor="signup-confirm" className="flex items-center gap-2">
                                                    <Shield className="w-4 h-4 text-emerald-600" />
                                                    Confirm
                                                </Label>
                                                <div className="relative">
                                                    <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                    <Input
                                                        id="signup-confirm"
                                                        name="confirmPassword"
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        placeholder="Confirm password"
                                                        className="pl-10 pr-12 h-12 border-emerald-200 focus:border-emerald-500"
                                                        value={signUpData.confirmPassword}
                                                        onChange={handleSignUpChange}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute right-1 top-1 h-10 w-10"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    >
                                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox 
                                                id="terms"
                                                checked={signUpData.agreeToTerms}
                                                onCheckedChange={(checked) => 
                                                    setSignUpData({...signUpData, agreeToTerms: !!checked})
                                                }
                                                className="border-emerald-500 data-[state=checked]:bg-emerald-600"
                                            />
                                            <Label htmlFor="terms" className="text-sm">
                                                I agree to the{' '}
                                                <Button variant="link" className="p-0 h-auto text-sm text-emerald-600 underline">
                                                    Terms of Service
                                                </Button>{' '}
                                                and{' '}
                                                <Button variant="link" className="p-0 h-auto text-sm text-emerald-600 underline">
                                                    Privacy Policy
                                                </Button>
                                            </Label>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handleSubmit}
                                        className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-teal-600 hover:to-emerald-600 shadow-lg"
                                        disabled={isLoading || !signUpData.agreeToTerms}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                                Creating Account...
                                            </div>
                                        ) : (
                                            <>
                                                <Target className="mr-2 h-4 w-4" />
                                                Create Developer Profile
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
                                        <Button variant="outline" className="h-12 hover:border-emerald-500">
                                            <Mail className="w-4 h-4 mr-2" />
                                            Google
                                        </Button>
                                        <Button variant="outline" className="h-12 hover:border-emerald-500">
                                            <Github className="w-4 h-4 mr-2" />
                                            GitHub
                                        </Button>
                                    </div>

                                    <div className="text-center pt-4">
                                        <p className="text-muted-foreground mb-3">Already have an account?</p>
                                        <Button 
                                            // onClick={switchPage}
                                            variant="ghost" 
                                            className="font-semibold text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                                        >
                                            <Rocket className="w-4 h-4 mr-2" />
                                            Sign in to your profile
                                        </Button>
                                    </div>

                                    {/* Signup Benefits */}
                                    <div className="grid grid-cols-2 gap-3 pt-4 border-t">
                                        {[
                                            { icon: Globe, text: 'Global Rankings' },
                                            { icon: Code2, text: 'AI Analysis' },
                                            { icon: Coffee, text: 'Community' },
                                            { icon: Star, text: 'Challenges' }
                                        ].map(({ icon: Icon, text }) => (
                                            <div key={text} className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                <Icon className="w-4 h-4 text-emerald-600" />
                                                <span>{text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Page Switch Indicator */}
                        <div className="flex justify-center space-x-2 pt-4">
                            <div 
                                className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                                    currentPage === 'signin' ? 'bg-orange-600 w-6' : 'bg-muted hover:bg-orange-400'
                                }`} 
                                onClick={() => setCurrentPage('signin')}
                            />
                            <div 
                                className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                                    currentPage === 'signup' ? 'bg-emerald-600 w-6' : 'bg-muted hover:bg-emerald-400'
                                }`} 
                                onClick={() => setCurrentPage('signup')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthApp;