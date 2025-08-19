import React, { useState } from 'react';
import { Eye, EyeOff, Settings, Shield, Database, User, UserCheck, Copy, Key, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s12-5.373 12-12c3.059 0 5.842 1.15  4 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-2.641-.21-5.236-.611-7.743z" />
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.022 35.026 44 30.038 44 24c0-2.641-.21-5.236-.611-7.743z" />
  </svg>
);

export interface Testimonial {
  avatarSrc: string;
  name: string;
  handle: string;
  text: string;
}

interface SignInPageProps {
  onSignIn?: (email: string, password: string, rememberMe: boolean) => void;
  onGoogleSignIn?: () => void;
  onResetPassword?: () => void;
  onCreateAccount?: () => void;
  email?: string;
  password?: string;
  onEmailChange?: (email: string) => void;
  onPasswordChange?: (password: string) => void;
}

const SystemStatsCard = ({ isAdmin }: { isAdmin: boolean }) => (
  <Card className="bg-card/90 backdrop-blur-sm border-primary/20 animate-fade-in-up animate-delay-500">
    <CardContent className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Database className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-card-foreground">
          {isAdmin ? "System Management" : "System Coverage"}
        </h3>
      </div>
      <div className="space-y-3 text-sm">
        {isAdmin ? (
          <>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Active Users:</span>
              <span className="text-primary font-semibold">47</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Machines Online:</span>
              <span className="text-primary font-semibold">12/14</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Admin Level:</span>
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3 text-red-500" />
                <span className="text-red-500 font-semibold">Full Access</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Last Backup:</span>
              <span className="text-green-600 font-semibold">2h ago</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">CNC Machines:</span>
              <span className="text-primary font-semibold">6+ Makes</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Programs Stored:</span>
              <span className="text-primary font-semibold">2,400+</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">System Uptime:</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-600 font-semibold">99.8%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Security Level:</span>
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3 text-primary" />
                <span className="text-primary font-semibold">Enterprise</span>
              </div>
            </div>
          </>
        )}
      </div>
    </CardContent>
  </Card>
);

// Demo credentials data
const demoCredentials = [
  {
    email: "john@cnccontrolhub.com",
    password: "Admin@123",
    role: "Administrator",
    description: "Full system access with admin privileges"
  },
  {
    email: "lisa@cnccontrolhub.com",
    password: "Operator@1",
    role: "Operator",
    description: "Standard operator access to machine programs"
  }
];

const CopyButton = ({ text, fieldKey, copiedField, onCopy }: {
  text: string;
  fieldKey: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}) => {
  const isCopied = copiedField === fieldKey;
  
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => onCopy(text, fieldKey)}
      className="h-6 w-6 p-0 hover:bg-gray-600 cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95"
    >
      <div className="relative">
        <Copy 
          className={`h-3 w-3 text-white transition-all duration-300 ${
            isCopied ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
          }`} 
        />
        <Check 
          className={`h-3 w-3 text-green-400 absolute inset-0 transition-all duration-300 ${
            isCopied ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`} 
        />
      </div>
    </Button>
  );
};

export const SignInPage: React.FC<SignInPageProps> = ({
  onSignIn = () => {},
  onGoogleSignIn = () => { },
  onResetPassword = () => { },
  onCreateAccount = () => { },
  email = '',
  password = '',
  onEmailChange = () => { },
  onPasswordChange = () => { },
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleModeSwitch = (adminMode: boolean) => {
    if (isAdmin === adminMode) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setIsAdmin(adminMode);
      onEmailChange('');
      onPasswordChange('');
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
                onChange={(e) => onEmailChange(e.target.value)}
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
                  onChange={(e) => onPasswordChange(e.target.value)}
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
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                  className='cursor-pointer'
                />
                <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                  Keep me signed in
                </Label>
              </div>
              <Button
                variant="link"
                className="p-0 h-auto cursor-pointer text-primary hover:text-primary/80 transition-colors duration-200"
                onClick={onResetPassword}
              >
                Reset password
              </Button>
            </div>

            <Button
              onClick={(e) => { e.preventDefault(); onSignIn(email, password, rememberMe); }}
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
            onClick={onGoogleSignIn}
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
              onClick={onCreateAccount}
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