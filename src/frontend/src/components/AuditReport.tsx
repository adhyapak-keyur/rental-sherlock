import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  DollarSign,
  Download,
  FileSearch,
  Share2,
  ShieldAlert,
  TrendingDown,
} from "lucide-react";
import { useState } from "react";

interface Finding {
  id: string;
  title: string;
  excerpt: string;
  explanation: string;
}

interface ReportSection {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  findings: Finding[];
  colorClass: string;
  badgeClass: string;
  headerClass: string;
  accentClass: string;
}

const MOCK_FINDINGS: ReportSection[] = [
  {
    id: "illegal",
    label: "Illegal Clauses",
    icon: AlertTriangle,
    colorClass: "finding-illegal",
    badgeClass: "bg-red-100 text-red-700 border-red-200",
    headerClass: "text-red-700",
    accentClass: "bg-red-500",
    findings: [
      {
        id: "illegal-1",
        title: "Illegal Entry Without Notice",
        excerpt:
          "Landlord reserves the right to enter the premises at any time without prior notice...",
        explanation:
          "Most states require 24–48 hours notice before landlord entry. This clause may be unenforceable and violates tenant privacy rights established under state landlord-tenant law. You may be able to negotiate removal or modification of this clause before signing.",
      },
      {
        id: "illegal-2",
        title: "Waiver of Habitability Rights",
        excerpt:
          "Tenant waives all rights to habitable conditions as defined by local ordinances...",
        explanation:
          "Tenants cannot legally waive their right to a habitable dwelling. The implied warranty of habitability is a fundamental tenant protection in all U.S. states. This clause is void and unenforceable — landlords cannot contract around this obligation.",
      },
    ],
  },
  {
    id: "hidden",
    label: "Hidden Costs",
    icon: DollarSign,
    colorClass: "finding-hidden",
    badgeClass: "bg-amber-100 text-amber-700 border-amber-200",
    headerClass: "text-amber-700",
    accentClass: "bg-amber-500",
    findings: [
      {
        id: "hidden-1",
        title: "Carpet Cleaning Surcharge",
        excerpt:
          "Tenant agrees to professional carpet cleaning upon move-out at tenant's expense, minimum $250.",
        explanation:
          "Normal wear and tear on carpets is typically the landlord's responsibility under most state laws. Mandatory carpet cleaning fees regardless of condition are often unenforceable. This charge should not be deducted from your security deposit if carpets show only normal use.",
      },
      {
        id: "hidden-2",
        title: "Administrative Fee",
        excerpt:
          "A monthly administrative fee of $35 will be charged in addition to rent.",
        explanation:
          "This $35/month administrative fee ($420/year) may not be disclosed in the headline rent amount. Verify this fee is properly disclosed in your state's required disclosures. In some states, undisclosed fees may be challengeable. Ask for an itemized cost breakdown.",
      },
    ],
  },
  {
    id: "tenant",
    label: "Tenant Responsibilities",
    icon: ClipboardList,
    colorClass: "finding-tenant",
    badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
    headerClass: "text-slate-600",
    accentClass: "bg-slate-400",
    findings: [
      {
        id: "tenant-1",
        title: "HVAC Filter Replacement",
        excerpt:
          "Tenant is responsible for replacing HVAC filters every 30 days at tenant's expense.",
        explanation:
          "While assigning filter replacement to tenants is common, a mandatory 30-day replacement schedule is unusually frequent and costly. Standard HVAC filters last 60–90 days. This clause could cost you $120–$240/year. Negotiate for a 90-day replacement schedule.",
      },
      {
        id: "tenant-2",
        title: "Landscaping Maintenance",
        excerpt:
          "Tenant shall maintain all exterior landscaping including lawn mowing and shrub trimming.",
        explanation:
          "Review whether this includes seasonal services such as leaf removal, aeration, or winter cleanup, which can be costly. For a single-family home this is often standard, but ensure the scope is clearly defined. Ask for specific measurable standards to avoid disputes at move-out.",
      },
    ],
  },
];

// Risk score: illegal clauses are high weight, hidden costs medium, responsibilities low
function getRiskLabel(
  illegalCount: number,
  hiddenCount: number,
): {
  label: string;
  color: string;
  bg: string;
  barColor: string;
  score: number;
} {
  const score = illegalCount * 40 + hiddenCount * 25;
  if (score >= 80)
    return {
      label: "High Risk",
      color: "text-red-700",
      bg: "bg-red-50 border-red-200",
      barColor: "bg-red-500",
      score,
    };
  if (score >= 40)
    return {
      label: "Medium Risk",
      color: "text-amber-700",
      bg: "bg-amber-50 border-amber-200",
      barColor: "bg-amber-500",
      score,
    };
  return {
    label: "Low Risk",
    color: "text-green-700",
    bg: "bg-green-50 border-green-200",
    barColor: "bg-green-500",
    score,
  };
}

interface FindingCardProps {
  finding: Finding;
  colorClass: string;
  headerClass: string;
  index: number;
  sectionId: string;
}

function FindingCard({
  finding,
  colorClass,
  headerClass,
  index,
  sectionId,
}: FindingCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={cn(
        "rounded-lg overflow-hidden transition-all duration-200 border",
        colorClass,
      )}
      data-ocid={`report.${sectionId}.item.${index + 1}`}
    >
      <button
        type="button"
        className="w-full text-left p-4 flex items-start justify-between gap-3 hover:bg-black/[0.03] transition-colors"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        data-ocid={`report.${sectionId}.toggle.${index + 1}`}
      >
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              "font-display font-semibold text-sm leading-snug",
              headerClass,
            )}
          >
            {finding.title}
          </p>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed line-clamp-2 font-mono">
            "{finding.excerpt}"
          </p>
        </div>
        <div className="flex-shrink-0 mt-0.5 p-0.5 rounded">
          {expanded ? (
            <ChevronUp className={cn("w-4 h-4", headerClass)} />
          ) : (
            <ChevronDown className={cn("w-4 h-4 opacity-60", headerClass)} />
          )}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 animate-fade-in-slide">
          <div className="pt-3 border-t border-black/[0.06]">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Legal Analysis
              </span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              {finding.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

interface AuditReportProps {
  leaseName?: string;
}

export function AuditReport({
  leaseName = "Your Lease Agreement.pdf",
}: AuditReportProps) {
  const illegalCount = MOCK_FINDINGS[0].findings.length;
  const hiddenCount = MOCK_FINDINGS[1].findings.length;
  const tenantCount = MOCK_FINDINGS[2].findings.length;
  const totalFindings = illegalCount + hiddenCount + tenantCount;
  const risk = getRiskLabel(illegalCount, hiddenCount);
  // Cap score display at 100
  const displayScore = Math.min(risk.score, 100);

  return (
    <div className="space-y-5 animate-fade-in-slide" data-ocid="report.section">
      {/* ── Scorecard Header ── */}
      <div className="bg-navy rounded-2xl overflow-hidden">
        {/* Top metadata bar */}
        <div className="px-5 pt-5 pb-4 border-b border-white/10">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <FileSearch className="w-4 h-4 text-sage flex-shrink-0" />
                <span className="text-sage text-xs font-semibold uppercase tracking-widest">
                  Audit Report
                </span>
              </div>
              <h2 className="font-display text-lg font-bold text-white leading-tight truncate">
                {leaseName}
              </h2>
              <p className="text-white/40 text-xs mt-1 font-mono">
                {new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                · {totalFindings} findings · AI Model v2.1
              </p>
            </div>
            {/* Risk badge */}
            <div
              className={cn(
                "flex-shrink-0 border rounded-xl px-3 py-2 text-center min-w-[90px]",
                risk.bg,
              )}
            >
              <div
                className={cn(
                  "font-display font-black text-2xl leading-none",
                  risk.color,
                )}
              >
                {displayScore}
              </div>
              <div
                className={cn(
                  "text-[10px] font-bold uppercase tracking-wide mt-0.5",
                  risk.color,
                )}
              >
                {risk.label}
              </div>
            </div>
          </div>

          {/* Risk score bar */}
          <div className="mt-4 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-white/40 text-xs">Risk Score</span>
              <span className="text-white/40 text-xs font-mono">
                {displayScore}/100
              </span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-1000",
                  risk.barColor,
                )}
                style={{ width: `${displayScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Category breakdown grid */}
        <div className="grid grid-cols-3 divide-x divide-white/10">
          <div className="px-4 py-3.5 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
              <span className="font-display font-black text-white text-xl">
                {illegalCount}
              </span>
            </div>
            <div className="text-[10px] text-white/40 uppercase tracking-wide font-medium leading-tight">
              Illegal
              <br />
              Clauses
            </div>
          </div>
          <div className="px-4 py-3.5 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <TrendingDown className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-display font-black text-white text-xl">
                {hiddenCount}
              </span>
            </div>
            <div className="text-[10px] text-white/40 uppercase tracking-wide font-medium leading-tight">
              Hidden
              <br />
              Costs
            </div>
          </div>
          <div className="px-4 py-3.5 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <ClipboardList className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-display font-black text-white text-xl">
                {tenantCount}
              </span>
            </div>
            <div className="text-[10px] text-white/40 uppercase tracking-wide font-medium leading-tight">
              Tenant
              <br />
              Obligations
            </div>
          </div>
        </div>
      </div>

      {/* ── Action buttons ── */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 gap-2 font-medium hover:border-sage hover:text-sage hover:bg-sage/5 transition-colors"
          data-ocid="report.secondary_button"
        >
          <Download className="w-3.5 h-3.5" />
          Download PDF
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 gap-2 font-medium hover:border-sage hover:text-sage hover:bg-sage/5 transition-colors"
          data-ocid="report.share.button"
        >
          <Share2 className="w-3.5 h-3.5" />
          Share Report
        </Button>
      </div>

      {/* ── Finding sections ── */}
      <div className="space-y-5">
        {MOCK_FINDINGS.map((section) => (
          <div key={section.id} className="space-y-2">
            {/* Section header */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <div
                  className={cn("w-1 h-4 rounded-full", section.accentClass)}
                />
                <h3
                  className={cn(
                    "font-display font-bold text-sm tracking-tight",
                    section.headerClass,
                  )}
                >
                  {section.label}
                </h3>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "text-[11px] border font-medium h-5 px-2",
                  section.badgeClass,
                )}
                data-ocid={`report.${section.id}.card`}
              >
                {section.findings.length} finding
                {section.findings.length !== 1 ? "s" : ""}
              </Badge>
            </div>

            {/* Finding cards */}
            <div className="space-y-1.5">
              {section.findings.map((finding, index) => (
                <FindingCard
                  key={finding.id}
                  finding={finding}
                  colorClass={section.colorClass}
                  headerClass={section.headerClass}
                  index={index}
                  sectionId={section.id}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Disclaimer ── */}
      <div className="border border-border rounded-lg p-3.5 bg-muted/40">
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          <strong className="text-foreground/70">Disclaimer:</strong> This
          analysis is AI-generated for informational purposes only and does not
          constitute legal advice. Consult a licensed attorney in your
          jurisdiction before making any decisions based on this report.
        </p>
      </div>
    </div>
  );
}
