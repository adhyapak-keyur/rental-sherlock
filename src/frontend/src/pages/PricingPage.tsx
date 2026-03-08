import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check, Lock, Shield, Star, Zap } from "lucide-react";

const MONTHLY_FEATURES = [
  "Unlimited lease audits",
  "Full legal red flag analysis",
  "Hidden fee detection",
  "State-specific tenant laws",
  "PDF & image uploads",
  "Audit history & archives",
  "Priority AI processing",
  "Email report delivery",
];

const ONE_TIME_FEATURES = [
  "1 complete lease audit",
  "Full legal red flag analysis",
  "Hidden fee detection",
  "State-specific tenant laws",
  "PDF & image uploads",
  "Report valid for 30 days",
];

export function PricingPage() {
  const navigate = useNavigate();

  const handleSubscribe = () => {
    navigate({ to: "/dashboard" });
  };

  const handleBuyNow = () => {
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-sage-mesh flex flex-col">
      <Navbar />

      <main className="flex-1 pt-16">
        {/* Header */}
        <div className="bg-navy-gradient text-white py-16 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-sage/20 border border-sage/30 text-sage-light rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Star className="w-3.5 h-3.5 fill-current" />
              Transparent Pricing
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold mb-4">
              Choose Your Plan
            </h1>
            <p className="text-white/60 text-lg">
              One lease or unlimited access — both come with our full AI
              analysis engine.
            </p>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
            {/* ── Monthly Subscription ── */}
            <div
              className="relative bg-navy rounded-2xl p-7 shadow-navy text-white flex flex-col"
              data-ocid="pricing.monthly.card"
            >
              {/* Popular badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                <Badge className="bg-sage text-white border-none px-4 py-1 font-display font-semibold text-xs shadow-sage">
                  Most Popular
                </Badge>
              </div>

              <div className="flex items-center gap-3 mb-6 pt-1">
                <div className="w-10 h-10 rounded-xl bg-sage/25 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-sage-light" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg leading-tight">
                    Monthly Subscription
                  </h2>
                  <p className="text-white/40 text-xs mt-0.5">
                    Best for active renters
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-white/10">
                <div className="flex items-end gap-1.5">
                  <span className="font-display font-black text-5xl tracking-tight">
                    $29
                  </span>
                  <span className="text-white/50 text-base mb-2">/month</span>
                </div>
                <p className="text-white/40 text-sm mt-1">
                  Billed monthly · Cancel anytime
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 flex-1 mb-8">
                {MONTHLY_FEATURES.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2.5 text-sm text-white/80"
                  >
                    <div className="w-4 h-4 rounded-full bg-sage/30 flex items-center justify-center flex-shrink-0">
                      <Check
                        className="w-2.5 h-2.5 text-sage-light"
                        strokeWidth={3}
                      />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className="w-full h-12 bg-sage hover:bg-sage/90 text-white font-display font-semibold shadow-sage gap-2 text-base"
                onClick={handleSubscribe}
                data-ocid="pricing.monthly.submit_button"
              >
                Subscribe Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* ── One-Time Audit ── */}
            <div
              className="relative bg-card border-2 border-sage/30 rounded-2xl p-7 flex flex-col shadow-card"
              data-ocid="pricing.onetime.card"
            >
              {/* Subtle sage accent stripe at top */}
              <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-sage/40 via-sage to-sage/40" />

              <div className="flex items-center gap-3 mb-6 pt-1">
                <div className="w-10 h-10 rounded-xl bg-sage-pale flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-sage" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-navy leading-tight">
                    One-Time Audit
                  </h2>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    Perfect for a single lease
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-border">
                <div className="flex items-end gap-1.5">
                  <span className="font-display font-black text-5xl text-navy tracking-tight">
                    $9
                  </span>
                  <span className="text-muted-foreground text-base mb-2">
                    per report
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mt-1">
                  No subscription · Pay once
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 flex-1 mb-8">
                {ONE_TIME_FEATURES.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2.5 text-sm text-foreground"
                  >
                    <div className="w-4 h-4 rounded-full bg-sage-pale flex items-center justify-center flex-shrink-0">
                      <Check
                        className="w-2.5 h-2.5 text-sage"
                        strokeWidth={3}
                      />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className="w-full h-12 bg-navy hover:bg-navy-light text-white font-display font-semibold gap-2 text-base shadow-navy/20 shadow-md transition-colors"
                onClick={handleBuyNow}
                data-ocid="pricing.onetime.submit_button"
              >
                Buy Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Trust strip */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="w-4 h-4 text-sage" />
              <span>Bank-level encryption</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-sage" />
              <span>
                <strong className="text-foreground">30-day</strong> money-back
                guarantee
              </span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 text-sage" />
              <span>Results in under 60 seconds</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-6 px-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()}.{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          Built with love using caffeine.ai
        </a>
      </footer>
    </div>
  );
}
