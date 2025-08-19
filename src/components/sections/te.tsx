import React, { useState } from 'react';
import { Eye, EyeOff, Settings, Shield, Database } from 'lucide-react';

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s12-5.373 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-2.641-.21-5.236-.611-7.743z" />
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
  title?: React.ReactNode;
  description?: React.ReactNode;
  heroImageSrc?: string;
  testimonials?: Testimonial[];
  onSignIn?: (email: string, password: string, rememberMe: boolean) => void;
  onGoogleSignIn?: () => void;
  onResetPassword?: () => void;
  onCreateAccount?: () => void;
  email?: string;
  password?: string;
  onEmailChange?: (email: string) => void;
  onPasswordChange?: (password: string) => void;
}

const SystemStatsCard = () => (
  <div className="bg-slate-900/90 backdrop-blur-sm border border-blue-500/20 rounded-lg animate-fade-in-up animate-delay-500 p-6">
    <div className="flex items-center gap-2 mb-4">
      <Database className="h-5 w-5 text-blue-400" />
      <h3 className="font-semibold text-white">System Coverage</h3>
    </div>
    <div className="space-y-3 text-sm">
      <div className="flex justify-between items-center">
        <span className="text-gray-400">CNC Machines:</span>
        <span className="text-blue-400 font-semibold">6+ Makes</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-400">Programs Stored:</span>
        <span className="text-blue-400 font-semibold">2,400+</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-400">System Uptime:</span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-400 font-semibold">99.8%</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-400">Security Level:</span>
        <div className="flex items-center gap-1">
          <Shield className="h-3 w-3 text-blue-400" />
          <span className="text-blue-400 font-semibold">Enterprise</span>
        </div>
      </div>
    </div>
  </div>
);

const TestimonialCard = ({ testimonial, delay }: { testimonial: Testimonial, delay: string }) => (
  <div className={`animate-fade-in-up ${delay} w-80 bg-slate-900/80 backdrop-blur-xl border border-gray-700/50 hover:border-blue-500/30 transition-colors rounded-lg p-5`}>
    <div className="flex items-start gap-3">
      <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
        {testimonial.name.charAt(0)}
      </div>
      <div className="text-sm leading-snug flex-1">
        <p className="font-medium text-white">{testimonial.name}</p>
        <p className="text-blue-400 text-xs">{testimonial.handle}</p>
        <p className="mt-2 text-gray-300 leading-relaxed">{testimonial.text}</p>
      </div>
    </div>
  </div>
);

export const SignInPage: React.FC<SignInPageProps> = ({
  title = (
    <div className="flex flex-col">
      <span className="font-light text-gray-900 tracking-tight">CNC Control Hub</span>
      <span className="text-2xl font-normal text-blue-600 mt-1">SH08 System</span>
    </div>
  ),
  description = "Secure access to centralized machine programs, PLC logic, and configuration management",
  heroImageSrc = "https://images.unsplash.com/photo-1565189814213-9dd25c0a6db5?ixlib=rb-4.0.3",
  testimonials = [],
  onSignIn = () => {},
  onGoogleSignIn = () => {},
  onResetPassword = () => {},
  onCreateAccount = () => {},
  email = '',
  password = '',
  onEmailChange = () => {},
  onPasswordChange = () => {},
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSignIn(email, password, rememberMe);
  };

  return (
    <div className="h-screen flex flex-col md:flex-row w-full bg-gray-50">
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

      <section className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 via-gray-100/20 to-gray-50">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-6">
            <div className="animate-fade-in-up animate-delay-100 flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Settings className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-semibold leading-tight">{title}</h1>
              </div>
            </div>

            <p className="animate-fade-in-up animate-delay-200 text-gray-600">{description}</p>

            <div className="space-y-5">
              <div className="animate-fade-in-up animate-delay-300 space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => onEmailChange(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full h-12 px-3 bg-white/50 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  required
                />
              </div>

              <div className="animate-fade-in-up animate-delay-400 space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => onPasswordChange(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-12 px-3 pr-12 bg-white/50 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-3 hover:bg-transparent"
                  >
                    {showPassword ?
                      <EyeOff className="w-4 h-4 text-gray-500 hover:text-gray-700 transition-colors" /> :
                      <Eye className="w-4 h-4 text-gray-500 hover:text-gray-700 transition-colors" />
                    }
                  </button>
                </div>
              </div>

              <div className="animate-fade-in-up animate-delay-500 flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="cursor-pointer"
                  />
                  <label htmlFor="remember" className="text-sm font-normal cursor-pointer text-gray-700">
                    Keep me signed in
                  </label>
                </div>
                <button
                  type="button"
                  className="p-0 h-auto cursor-pointer text-blue-600 hover:text-blue-500 underline"
                  onClick={onResetPassword}
                >
                  Reset password
                </button>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="cursor-pointer animate-fade-in-up animate-delay-600 w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
              >
                Access Control Hub
              </button>
            </div>

            <div className="animate-fade-in-up animate-delay-700 relative flex items-center justify-center">
              <div className="w-full border-t border-gray-300"></div>
              <span className="px-4 text-xs text-gray-500 bg-gray-50 absolute">Or continue with</span>
            </div>

            <button
              type="button"
              onClick={onGoogleSignIn}
              className="animate-fade-in-up cursor-pointer gap-4 flex animate-delay-800 w-full h-12 border border-gray-300 hover:bg-gray-100 hover:border-blue-300 transition-colors rounded-md items-center justify-center"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <p className="animate-fade-in-up animate-delay-900 text-center text-sm text-gray-600">
              Need system access?{" "}
              <button
                type="button"
                className="p-0 h-auto text-blue-600 cursor-pointer hover:text-blue-500 underline"
                onClick={onCreateAccount}
              >
                Request Account
              </button>
            </p>
                      </div>
        </div>
      </section>

      {heroImageSrc && (
        <section className="hidden md:block flex-1 relative p-4">
          <div className="animate-slide-right animate-delay-300 absolute inset-4 rounded-3xl border overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1565189814213-9dd25c0a6db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="CNC Machine Shop"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/60 to-gray-900/30"></div>

            <div className="animate-fade-in-up animate-delay-400 absolute top-8 left-8 right-8 bg-slate-900/90 backdrop-blur-sm border border-blue-500/20 rounded-lg p-6">
              <blockquote className="text-white text-lg font-medium leading-relaxed">
                "Precision in manufacturing begins with precision in data management."
              </blockquote>
              <cite className="text-blue-400 text-sm mt-2 block font-medium">- Industrial Engineering Principle</cite>
            </div>

            <div className="absolute top-1/3 right-8">
              <SystemStatsCard />
            </div>
          </div>

          {testimonials.length > 0 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 px-8 w-full justify-center">
              <TestimonialCard testimonial={testimonials[0]} delay="animate-delay-1000" />
              {testimonials[1] && <div className="hidden xl:flex"><TestimonialCard testimonial={testimonials[1]} delay="animate-delay-1200" /></div>}
              {testimonials[2] && <div className="hidden 2xl:flex"><TestimonialCard testimonial={testimonials[2]} delay="animate-delay-1400" /></div>}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

// Demo implementation
const users = [
  {
    email: "admin@machineshop.com",
    password: "Admin@123",
    role: "admin"
  },
  {
    email: "lisa@machineshop.com",
    password: "Operator@1",
    role: "operator"
  },
  {
    email: "ravi@machineshop.com",
    password: "Super@321",
    role: "superadmin"
  },
  {
    email: "mei@machineshop.com",
    password: "Maint@456",
    role: "operator"
  },
  {
    email: "tom@machineshop.com",
    password: "Backup@789",
    role: "central-backup"
  }
];

const sampleTestimonials: Testimonial[] = [
  {
    avatarSrc: "",
    name: "Sarah Chen",
    handle: "Maintenance Lead",
    text: "The version control has saved us hours during machine breakdowns. We can restore any configuration instantly with full traceability."
  },
  {
    avatarSrc: "",
    name: "Mike Rodriguez",
    handle: "CNC Operator",
    text: "Finally, all our Haas and Mazak programs are in one secure place. No more hunting through USB drives or worrying about lost data."
  },
  {
    avatarSrc: "",
    name: "Tom Anderson",
    handle: "Production Manager",
    text: "Role-based access means operators get what they need while keeping critical PLC logic secure. Perfect for our multi-shift operation."
  }
];

const SignInPageDemo = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState<{email: string, role: string} | null>(null);
  const [message, setMessage] = useState('');

  const handleSignIn = (email: string, password: string, rememberMe: boolean) => {
    const foundUser = users.find(user => user.email === email && user.password === password);

    if (foundUser) {
      setCurrentUser({ email: foundUser.email, role: foundUser.role });
      setMessage(`✅ Successfully logged in as ${foundUser.role.toUpperCase()}`);
      setEmail('');
      setPassword('');
    } else {
      setMessage('❌ Invalid email or password');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleGoogleSignIn = () => {
    setMessage('🔵 Google OAuth integration would be implemented here');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleResetPassword = () => {
    setMessage('📧 Password reset email would be sent');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleCreateAccount = () => {
    setMessage('📝 Account request form would be displayed');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setMessage('');
  };

  if (currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome to CNC Control Hub</h2>
            <p className="text-gray-600 mt-2">Successfully authenticated</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-sm text-gray-600 mb-1">Logged in as:</div>
            <div className="font-semibold text-gray-900">{currentUser.email}</div>
            <div className="text-blue-600 font-medium uppercase text-sm mt-1">{currentUser.role}</div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Logout
          </button>

          <div className="mt-6 text-xs text-gray-500">
            <p className="font-semibold mb-2">Test Accounts:</p>
            <div className="text-left space-y-1">
              {users.map((user, index) => (
                <div key={index} className="flex justify-between">
                  <span>{user.email}</span>
                  <span className="font-mono">{user.password}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 text-gray-900 relative">
      {message && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-lg">
          {message}
        </div>
      )}
      
      <SignInPage
        heroImageSrc="https://images.unsplash.com/photo-1565189814213-9dd25c0a6db5?ixlib=rb-4.0.3"
        testimonials={sampleTestimonials}
        onSignIn={handleSignIn}
        onGoogleSignIn={handleGoogleSignIn}
        onResetPassword={handleResetPassword}
        onCreateAccount={handleCreateAccount}
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
      />
      
      <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg p-3 shadow-lg max-w-xs">
        <div className="text-xs text-gray-600 font-semibold mb-2">Test Credentials:</div>
        <div className="space-y-1 text-xs">
          <div><strong>Admin:</strong> admin@machineshop.com / Admin@123</div>
          <div><strong>Operator:</strong> lisa@machineshop.com / Operator@1</div>
          <div><strong>Super Admin:</strong> ravi@machineshop.com / Super@321</div>
        </div>
      </div>
    </div>
  );
};

export default SignInPageDemo;