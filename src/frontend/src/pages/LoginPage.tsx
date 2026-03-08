import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Eye, EyeOff, Lock, Search } from "lucide-react";
import { useState } from "react";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate brief loading then navigate
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    navigate({ to: "/pricing" });
  };

  return (
    <div className="min-h-screen bg-sage-mesh flex flex-col">
      {/* Top bar */}
      <header className="h-16 flex items-center px-6 border-b border-border bg-card/80 backdrop-blur-sm">
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          data-ocid="login.nav.link"
        >
          <div className="w-7 h-7 rounded-lg bg-navy flex items-center justify-center group-hover:bg-navy-light transition-colors">
            <Search className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display font-bold text-navy text-base tracking-tight">
            Rental Sherlock
          </span>
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md animate-fade-in-slide">
          {/* Card */}
          <div className="bg-card border border-border rounded-2xl shadow-card p-8">
            {/* Logo / wordmark */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-navy mb-4 shadow-navy">
                <Lock className="w-6 h-6 text-sage" />
              </div>
              <h1 className="font-display text-2xl font-bold text-navy">
                Welcome back
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Sign in to your Rental Sherlock account
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="h-11 focus-visible:ring-sage"
                  data-ocid="login.email.input"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-foreground"
                  >
                    Password
                  </Label>
                  <button
                    type="button"
                    className="text-xs text-sage hover:text-sage/80 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="h-11 pr-10 focus-visible:ring-sage"
                    data-ocid="login.password.input"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-sage hover:bg-sage/90 text-white font-display font-semibold shadow-sage gap-2"
                data-ocid="login.submit_button"
              >
                {isLoading ? (
                  <>
                    <span className="dot-bounce-1 w-1.5 h-1.5 rounded-full bg-white inline-block" />
                    <span className="dot-bounce-2 w-1.5 h-1.5 rounded-full bg-white inline-block" />
                    <span className="dot-bounce-3 w-1.5 h-1.5 rounded-full bg-white inline-block" />
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-3 text-xs text-muted-foreground">
                  or
                </span>
              </div>
            </div>

            {/* Sign up link */}
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-sage font-medium hover:text-sage/80 transition-colors"
                data-ocid="login.signup.link"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Trust badges */}
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> Encrypted
            </span>
            <span className="flex items-center gap-1.5">
              <Search className="w-3 h-3" /> Secure Analysis
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
