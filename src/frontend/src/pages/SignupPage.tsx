import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Eye, EyeOff, Search, UserPlus } from "lucide-react";
import { useState } from "react";

export function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.includes("@"))
      newErrors.email = "Enter a valid email address";
    if (form.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setIsLoading(false);
    navigate({ to: "/pricing" });
  };

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    };

  return (
    <div className="min-h-screen bg-sage-mesh flex flex-col">
      {/* Top bar */}
      <header className="h-16 flex items-center px-6 border-b border-border bg-card/80 backdrop-blur-sm">
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          data-ocid="signup.nav.link"
        >
          <div className="w-7 h-7 rounded-lg bg-navy flex items-center justify-center group-hover:bg-navy-light transition-colors">
            <Search className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display font-bold text-navy text-base tracking-tight">
            Rental Sherlock
          </span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md animate-fade-in-slide">
          <div className="bg-card border border-border rounded-2xl shadow-card p-8">
            {/* Icon + title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-navy mb-4 shadow-navy">
                <UserPlus className="w-6 h-6 text-sage" />
              </div>
              <h1 className="font-display text-2xl font-bold text-navy">
                Create your account
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Start auditing leases in seconds
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Full name */}
              <div className="space-y-1.5">
                <Label htmlFor="fullName" className="text-sm font-medium">
                  Full name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Jane Smith"
                  value={form.fullName}
                  onChange={handleChange("fullName")}
                  autoComplete="name"
                  className="h-11 focus-visible:ring-sage"
                  aria-invalid={!!errors.fullName}
                  data-ocid="signup.name.input"
                />
                {errors.fullName && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="signup.name_error"
                  >
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="signupEmail" className="text-sm font-medium">
                  Email address
                </Label>
                <Input
                  id="signupEmail"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange("email")}
                  autoComplete="email"
                  className="h-11 focus-visible:ring-sage"
                  aria-invalid={!!errors.email}
                  data-ocid="signup.email.input"
                />
                {errors.email && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="signup.email_error"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label htmlFor="signupPassword" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="signupPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 8 characters"
                    value={form.password}
                    onChange={handleChange("password")}
                    autoComplete="new-password"
                    className="h-11 pr-10 focus-visible:ring-sage"
                    aria-invalid={!!errors.password}
                    data-ocid="signup.password.input"
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
                {errors.password && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="signup.password_error"
                  >
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm password */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium"
                >
                  Confirm password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat your password"
                    value={form.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    autoComplete="new-password"
                    className="h-11 pr-10 focus-visible:ring-sage"
                    aria-invalid={!!errors.confirmPassword}
                    data-ocid="signup.confirm_password.input"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowConfirm(!showConfirm)}
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="signup.confirm_password_error"
                  >
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms note */}
              <p className="text-xs text-muted-foreground">
                By continuing, you agree to our{" "}
                <span className="text-sage cursor-pointer hover:underline">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-sage cursor-pointer hover:underline">
                  Privacy Policy
                </span>
                .
              </p>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-sage hover:bg-sage/90 text-white font-display font-semibold shadow-sage gap-2 mt-2"
                data-ocid="signup.submit_button"
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

            {/* Login link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-sage font-medium hover:text-sage/80 transition-colors"
                data-ocid="signup.login.link"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
