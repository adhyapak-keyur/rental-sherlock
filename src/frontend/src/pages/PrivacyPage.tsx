import { Link } from "@tanstack/react-router";
import { ArrowLeft, Search } from "lucide-react";

const SECTIONS = [
  {
    title: "Information We Collect",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    title: "How We Use Your Information",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
  },
  {
    title: "Data Sharing and Disclosure",
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
  },
  {
    title: "Data Retention",
    content:
      "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
  },
  {
    title: "Your Rights",
    content:
      "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.",
  },
  {
    title: "Cookies and Tracking",
    content:
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
  },
  {
    title: "Security",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    title: "Changes to This Policy",
    content:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  },
  {
    title: "Contact Us",
    content:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
  },
];

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2.5"
            data-ocid="privacy.nav.link"
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
          data-ocid="privacy.back.link"
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
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-sm">
            Last updated: [Date placeholder — will be updated before launch]
          </p>
        </div>

        {/* Intro */}
        <div className="bg-sage/8 border border-sage/20 rounded-xl p-5 mb-10">
          <p className="text-navy/80 text-sm leading-relaxed">
            This Privacy Policy describes how Rental Sherlock collects, uses,
            and shares information about you when you use our services. Please
            read it carefully. This is placeholder text and will be replaced
            with the full legal policy before launch.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {SECTIONS.map((section, index) => (
            <section
              key={section.title}
              data-ocid={`privacy.section.${index + 1}`}
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
              className="text-white/70 transition-colors"
              data-ocid="privacy.footer.privacy.link"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="hover:text-white/70 transition-colors"
              data-ocid="privacy.footer.terms.link"
            >
              Terms
            </Link>
            <Link
              to="/pricing"
              className="hover:text-white/70 transition-colors"
              data-ocid="privacy.footer.pricing.link"
            >
              Pricing
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
