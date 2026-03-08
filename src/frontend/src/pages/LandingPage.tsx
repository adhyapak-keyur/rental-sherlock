import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  DollarSign,
  FileText,
  Search,
  Shield,
  Star,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Upload Your Lease",
    description:
      "Drag and drop your PDF lease agreement or snap a photo with your phone. We accept all standard formats.",
    icon: FileText,
  },
  {
    step: "02",
    title: "AI Scans for Issues",
    description:
      "Our legal AI analyzes every clause, cross-referencing tenant protection laws in your state to flag problems.",
    icon: Search,
  },
  {
    step: "03",
    title: "Get Your Report",
    description:
      "Receive a clear, plain-English breakdown of illegal clauses, hidden fees, and tenant responsibilities.",
    icon: Shield,
  },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Instant Analysis",
    description:
      "Get a full lease audit in under 60 seconds. No waiting, no manual review.",
  },
  {
    icon: Shield,
    title: "Legal Red Flags",
    description:
      "Identifies clauses that may be unenforceable or violate tenant protection laws.",
  },
  {
    icon: DollarSign,
    title: "Hidden Fee Detection",
    description:
      "Uncovers fees buried in fine print that add hundreds to your annual cost.",
  },
  {
    icon: FileText,
    title: "Plain English Reports",
    description:
      "No legalese. Every finding explained clearly so you know exactly what to do.",
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* === NAVBAR (transparent on landing) === */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[oklch(0.18_0.04_243)] backdrop-blur-sm shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2.5"
            data-ocid="landing.nav.link"
          >
            <div className="w-8 h-8 rounded-lg bg-sage flex items-center justify-center">
              <Search className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-white text-lg tracking-tight">
              Rental Sherlock
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/login" data-ocid="landing.login.link">
              <Button
                variant="ghost"
                className="text-white/70 hover:text-white hover:bg-white/10 text-sm"
              >
                Log in
              </Button>
            </Link>
            <Link to="/signup" data-ocid="landing.signup.link">
              <Button className="bg-sage hover:bg-sage/90 text-white text-sm shadow-sage">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* === HERO === */}
      <section className="relative min-h-[90vh] flex items-center bg-navy-gradient overflow-hidden">
        {/* Background image overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(/assets/generated/hero-rental-sherlock.dim_1200x600.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Dark overlay to ensure text contrast regardless of image */}
        <div className="absolute inset-0 bg-navy/40 pointer-events-none" />

        {/* Decorative geometric elements */}
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-sage/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full bg-white/3 blur-2xl pointer-events-none" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.76 0.055 145) 1px, transparent 1px), linear-gradient(90deg, oklch(0.76 0.055 145) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-sage/15 border border-sage/30 text-sage-light rounded-full px-4 py-1.5 text-sm font-medium mb-8">
              <Star className="w-3.5 h-3.5 fill-current" />
              AI-Powered Lease Protection
            </div>

            {/* Main headline */}
            <h1
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
              style={{
                color: "white",
                textShadow:
                  "0 2px 16px oklch(0.14 0.045 243 / 0.7), 0 1px 4px oklch(0.14 0.045 243 / 0.5)",
              }}
            >
              Know Your Rights{" "}
              <span className="text-sage relative">
                Before You Sign
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M2 10 Q75 2 150 8 Q225 14 298 6"
                    stroke="oklch(0.63 0.07 145)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-white/65 text-xl leading-relaxed mb-10 max-w-xl">
              Upload your lease and our AI reviews every clause in seconds —
              exposing illegal terms, hidden fees, and one-sided
              responsibilities before they cost you.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup" data-ocid="landing.start_audit.primary_button">
                <Button
                  size="lg"
                  className="bg-sage hover:bg-sage/90 text-white font-display font-semibold px-8 shadow-sage h-14 text-base gap-2"
                >
                  Start Audit — It's Free
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/login" data-ocid="landing.login.secondary_button">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white bg-transparent hover:bg-white/10 hover:border-white/60 hover:text-white h-14 text-base font-medium"
                >
                  Sign in to your account
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Hero visual - floating report card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block w-80"
          >
            <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl p-5 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-white/60 text-xs">Analysis Complete</span>
              </div>
              <div className="space-y-3">
                {[
                  {
                    id: "illegal",
                    color: "bg-red-400/80",
                    text: "Illegal Entry Clause",
                    tag: "ILLEGAL",
                  },
                  {
                    id: "cost",
                    color: "bg-amber-400/80",
                    text: "$420/year Hidden Fees",
                    tag: "COST",
                  },
                  {
                    id: "info",
                    color: "bg-slate-400/50",
                    text: "HVAC Maintenance Required",
                    tag: "INFO",
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2.5 bg-white/5 rounded-lg p-2.5"
                  >
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-white/80 text-xs flex-1">
                      {item.text}
                    </span>
                    <span className="text-[10px] text-white/40 font-mono">
                      {item.tag}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span>3 findings total</span>
                  <span className="text-sage text-xs">View Report →</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            className="w-full"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M0 40 Q360 0 720 40 Q1080 80 1440 40 L1440 60 L0 60 Z"
              fill="oklch(0.97 0.005 243)"
            />
          </svg>
        </div>
      </section>

      {/* === HOW IT WORKS === */}
      <section className="py-20 bg-background" id="how-it-works">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sage font-semibold text-xs uppercase tracking-widest mb-3">
              Simple. Fast. Thorough.
            </p>
            <h2 className="font-display text-4xl font-bold text-navy">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {HOW_IT_WORKS.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative bg-card rounded-2xl border border-border p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                data-ocid={`landing.how_it_works.card.${index + 1}`}
              >
                {/* Large ghost step number — anchored bottom-right, high contrast */}
                <div
                  className="absolute bottom-3 right-4 font-display font-black text-[5rem] leading-none select-none pointer-events-none"
                  style={{ color: "oklch(0.63 0.07 145 / 0.08)" }}
                  aria-hidden="true"
                >
                  {step.step}
                </div>

                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-navy flex items-center justify-center mb-5">
                  <step.icon className="w-5 h-5 text-sage" />
                </div>

                {/* Step label */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold text-sage uppercase tracking-widest">
                    Step {step.step}
                  </span>
                </div>

                <h3 className="font-display font-bold text-navy text-lg mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === FEATURE HIGHLIGHTS === */}
      <section className="py-20 bg-navy-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl font-bold text-white mb-4">
              Everything You Need to Rent Confidently
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Rental Sherlock combines legal expertise with AI speed — so you
              never sign a lease blindly again.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-sage/30 transition-all duration-300"
                data-ocid={`landing.features.card.${index + 1}`}
              >
                <div className="w-10 h-10 rounded-xl bg-sage/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-sage-light" />
                </div>
                <h3 className="font-display font-bold text-white text-base mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === FINAL CTA === */}
      <section className="py-20 bg-navy">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Don't Sign Until You Know
          </h2>
          <p className="text-white/60 mb-10">
            Your next lease could hide thousands of dollars in fees and rights
            violations. Audit it before you commit.
          </p>
          <Link to="/signup" data-ocid="landing.cta.primary_button">
            <Button
              size="lg"
              className="bg-sage hover:bg-sage/90 text-white font-display font-semibold px-10 shadow-sage h-14 text-base gap-2"
            >
              Start Your Free Audit
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="bg-navy border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-sage flex items-center justify-center">
                <Search className="w-3 h-3 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-bold text-white text-sm">
                Rental Sherlock
              </span>
            </div>
            <div className="flex items-center gap-6 text-white/40 text-xs">
              <Link
                to="/privacy"
                className="hover:text-white/70 transition-colors"
                data-ocid="landing.footer.privacy.link"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="hover:text-white/70 transition-colors"
                data-ocid="landing.footer.terms.link"
              >
                Terms
              </Link>
              <Link
                to="/pricing"
                className="hover:text-white/70 transition-colors"
              >
                Pricing
              </Link>
            </div>
            <p className="text-white/30 text-xs">
              © {new Date().getFullYear()}.{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/60 transition-colors"
              >
                Built with love using caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
