import { Link } from "@tanstack/react-router";
import { ArrowLeft, Search } from "lucide-react";

const SECTIONS = [
  {
    title: "Acceptance of Terms",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    title: "Description of Service",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
  },
  {
    title: "User Accounts",
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
  },
  {
    title: "Permitted Use",
    content:
      "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
  },
  {
    title: "Prohibited Conduct",
    content:
      "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.",
  },
  {
    title: "Intellectual Property",
    content:
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
  },
  {
    title: "Disclaimers and Limitations",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    title: "Not Legal Advice",
    content:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Rental Sherlock provides informational analysis only and does not constitute legal advice. Always consult a qualified attorney for legal guidance. This is placeholder text and will be updated before launch.",
  },
  {
    title: "Payment and Refunds",
    content:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
  },
  {
    title: "Termination",
    content:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.",
  },
  {
    title: "Governing Law",
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.",
  },
  {
    title: "Changes to These Terms",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. This is placeholder text and will be replaced with the full legal terms before launch.",
  },
];

export function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2.5"
            data-ocid="terms.nav.link"
          >
            <div className="w-8 h-8 rounded-lg bg-sage flex items-center justify-center">
              <Search className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-white text-lg tracking-tight">
              Rental Sherlock
            </span>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sage text-sm font-medium hover:text-sage/80 transition-colors mb-8"
          data-ocid="terms.back.link"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <p className="text-sage font-semibold text-xs uppercase tracking-widest mb-3">
            Legal
          </p>
          <h1 className="font-display text-4xl font-extrabold text-navy mb-4">
            Terms of Service
          </h1>
          <p className="text-muted-foreground text-sm">
            Last updated: [Date placeholder — will be updated before launch]
          </p>
        </div>

        {/* Intro */}
        <div className="bg-sage/8 border border-sage/20 rounded-xl p-5 mb-10">
          <p className="text-navy/80 text-sm leading-relaxed">
            By using Rental Sherlock, you agree to these Terms of Service.
            Please read them carefully. These terms govern your access to and
            use of our lease analysis platform. This is placeholder text and
            will be replaced with the full legal terms before launch.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {SECTIONS.map((section, index) => (
            <section
              key={section.title}
              data-ocid={`terms.section.${index + 1}`}
            >
              <h2 className="font-display font-bold text-navy text-xl mb-3">
                {index + 1}. {section.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {section.content}
              </p>
            </section>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-navy border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
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
              data-ocid="terms.footer.privacy.link"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-white/70 transition-colors"
              data-ocid="terms.footer.terms.link"
            >
              Terms
            </Link>
            <Link
              to="/pricing"
              className="hover:text-white/70 transition-colors"
              data-ocid="terms.footer.pricing.link"
            >
              Pricing
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
