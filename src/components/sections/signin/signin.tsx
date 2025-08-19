import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, Settings, Shield, Database, User, UserCheck, Copy, Key, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { GoogleIcon } from '@/components/ui/google-icon';
import { SystemStatsCard } from './comp/statsShow';
import { useAuthStore } from '@/store/auth/signin/signin';
import { useRouter } from 'next/navigation';

export interface Testimonial {
    avatarSrc: string;
    name: string;
    handle: string;
    text: string;
}

export const SignInPage = () => {

    const router = useRouter();

    const {
        initiateLogin,
        isLoading,
        isAuthenticated,
        email,
        setEmail,
        password,
        setPassword,
        resetLoginState
    } = useAuthStore();

    useEffect(() => {
        resetLoginState();
    }, [resetLoginState]);


    const token =  typeof window !== "undefined" ? localStorage.getItem("token") : null;

    useEffect(() => {
        if (token) {
            router.push('/dashboard');
        }
    }, [token, router]);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const success = await initiateLogin(email, password);
        if (success) {
            router.push('/dashboard');
        }
    };

    const onForgotPassword = () => {
        router.push("/forgot-password");
    }

    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleModeSwitch = (adminMode: boolean) => {
        if (isAdmin === adminMode) return;

        setIsTransitioning(true);
        setTimeout(() => {
            setIsAdmin(adminMode);
            setEmail('');
            setPassword('');
            setTimeout(() => setIsTransitioning(false), 100);
        }, 200);
    };

    const getTitle = () => (
        <div className="flex flex-col">
            <span className="font-light text-foreground tracking-tight">
                {isAdmin ? "CNC Admin Portal" : "CNC Control Hub"}
            </span>
            <span className="text-2xl font-normal text-primary mt-1">SH08 System</span>
        </div>
    );

    const getDescription = () =>
        isAdmin
            ? "Administrative access to system configuration, user management, and security controls"
            : "Secure access to centralized machine programs, PLC logic, and configuration management";

    const getQuote = () =>
        isAdmin
            ? {
                text: "Effective system administration is the backbone of reliable manufacturing operations.",
                author: "Manufacturing Systems Management"
            }
            : {
                text: "Precision in manufacturing begins with precision in data management.",
                author: "Industrial Engineering Principle"
            };

    const quote = getQuote();

    const formSection = (
        <section className={`flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-background via-muted/20 to-background transition-all duration-500 ease-in-out ${isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
            <div className="w-full max-w-md">
                <div className="flex flex-col gap-6">
                    <div className="animate-fade-in-up animate-delay-100 flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg transition-all duration-300">
                            {isAdmin ? <UserCheck className="h-6 w-6 text-primary" /> : <Settings className="h-6 w-6 text-primary" />}
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-semibold leading-tight transition-all duration-300">{getTitle()}</h1>
                        </div>
                    </div>

                    <p className="animate-fade-in-up animate-delay-200 text-muted-foreground transition-all duration-300">{getDescription()}</p>

                    <div className="space-y-5">
                        <div className="animate-fade-in-up animate-delay-300 space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                className="h-12 bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                            />
                        </div>

                        <div className="animate-fade-in-up animate-delay-400 space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="h-12 pr-12 bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute flex items-center cursor-pointer h-full inset-y-0 right-0 px-3 hover:bg-transparent transition-all duration-200"
                                >
                                    {showPassword ?
                                        <EyeOff className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors duration-200" /> :
                                        <Eye className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors duration-200" />
                                    }
                                </Button>
                            </div>
                        </div>

                        <div className="animate-fade-in-up animate-delay-500 flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    checked={rememberMe}
                                    onCheckedChange={checked => setRememberMe(checked === true)}
                                    className='cursor-pointer'
                                />
                                <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                                    Keep me signed in
                                </Label>
                            </div>
                            <Button
                                variant="link"
                                className="p-0 h-auto cursor-pointer text-primary hover:text-primary/80 transition-colors duration-200"
                                onClick={onForgotPassword}
                            >
                                Forgot password
                            </Button>
                        </div>

                        <Button
                            loading={isLoading}
                            onClick={(e) => handleSubmit(e)}
                            className="cursor-pointer animate-fade-in-up animate-delay-600 w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                        >
                            {isAdmin ? "Access Admin Portal" : "Access Control Hub"}
                        </Button>
                    </div>

                    <div className="animate-fade-in-up animate-delay-700 relative flex items-center justify-center">
                        <div className="w-full border-t border-border"></div>
                        <span className="px-4 text-xs text-muted-foreground bg-background rounded-3xl absolute">Or continue with</span>
                    </div>

                    <Button
                        variant="outline"
                        // onClick={onGoogleSignIn}
                        className="animate-fade-in-up cursor-pointer gap-4 flex animate-delay-800 w-full h-12 border-border/50 hover:bg-accent hover:border-primary/30 transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                        <GoogleIcon />
                        Continue with Google
                    </Button>

                    <p className="animate-fade-in-up animate-delay-900 text-center text-sm text-muted-foreground">
                        Need system access?{" "}
                        <Button
                            variant="link"
                            className="p-0 h-auto text-primary cursor-pointer hover:text-primary/80 transition-colors duration-200"
                        // onClick={onCreateAccount}
                        >
                            {isAdmin ? "Request Admin Access" : "Request Account"}
                        </Button>
                    </p>
                </div>
            </div>
        </section>
    );

    const heroSection = (
        <section className={`hidden md:block flex-1 relative p-4 transition-all duration-500 ease-in-out ${isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
            <div className="animate-slide-right animate-delay-300 absolute inset-4 rounded-3xl border overflow-hidden">
                <img
                    src='machinebg.jpg'
                    alt="CNC Machine Shop"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-background/30"></div>

                <Card className="animate-fade-in-up animate-delay-400 absolute top-8 left-8 right-8 bg-card/90 backdrop-blur-sm border-primary/20">
                    <CardContent className="p-6">
                        <blockquote className="text-card-foreground text-lg font-medium leading-relaxed transition-all duration-300">
                            "{quote.text}"
                        </blockquote>
                        <cite className="text-primary text-sm mt-2 block font-medium transition-all duration-300">- {quote.author}</cite>
                    </CardContent>
                </Card>

                <div className="absolute top-1/3 right-8">
                    <SystemStatsCard isAdmin={isAdmin} />
                </div>

            </div>
        </section>
    );

    return (
        <div className="h-screen flex flex-col w-full bg-background font-poppins">
            <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-right {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-right {
          animation: slide-right 1s ease-out forwards;
          opacity: 0;
        }
        
        .animate-delay-100 { animation-delay: 0.1s; }
        .animate-delay-200 { animation-delay: 0.2s; }
        .animate-delay-300 { animation-delay: 0.3s; }
        .animate-delay-400 { animation-delay: 0.4s; }
        .animate-delay-500 { animation-delay: 0.5s; }
        .animate-delay-600 { animation-delay: 0.6s; }
        .animate-delay-700 { animation-delay: 0.7s; }
        .animate-delay-800 { animation-delay: 0.8s; }
        .animate-delay-900 { animation-delay: 0.9s; }
        .animate-delay-1000 { animation-delay: 1.0s; }
        .animate-delay-1200 { animation-delay: 1.2s; }
        .animate-delay-1400 { animation-delay: 1.4s; }
      `}</style>

            {/* Toggle Button */}
            <div className="absolute top-6 right-6 z-10">
                <div className="flex items-center gap-3 bg-card/90 backdrop-blur-sm border border-border/50 rounded-full p-1">
                    <Button
                        variant={!isAdmin ? "default" : "ghost"}
                        size="sm"
                        onClick={() => handleModeSwitch(false)}
                        className={`rounded-full px-4 py-2 cursor-pointer text-xs font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${!isAdmin ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        <User className="h-3 w-3 mr-1" />
                        User
                    </Button>
                    <Button
                        variant={isAdmin ? "default" : "ghost"}
                        size="sm"
                        onClick={() => handleModeSwitch(true)}
                        className={`rounded-full px-4 py-2 cursor-pointer text-xs font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${isAdmin ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        <UserCheck className="h-3 w-3 mr-1" />
                        Admin
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row w-full flex-1">
                {isAdmin ? (
                    <>
                        {heroSection}
                        {formSection}
                    </>
                ) : (
                    <>
                        {formSection}
                        {heroSection}
                    </>
                )}
            </div>
        </div>
    );
};