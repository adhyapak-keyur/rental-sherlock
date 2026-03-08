import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ChevronRight, Clock, Eye, FileText, X } from "lucide-react";

interface AuditHistoryItem {
  id: string;
  leaseName: string;
  date: string;
  findings: number;
  status: "complete" | "pending";
}

const MOCK_HISTORY: AuditHistoryItem[] = [
  {
    id: "1",
    leaseName: "123 Main St Lease.pdf",
    date: "March 2, 2026",
    findings: 4,
    status: "complete",
  },
  {
    id: "2",
    leaseName: "Oak Ave Apartment.pdf",
    date: "Feb 15, 2026",
    findings: 2,
    status: "complete",
  },
  {
    id: "3",
    leaseName: "Downtown Loft Agreement.pdf",
    date: "Jan 28, 2026",
    findings: 6,
    status: "complete",
  },
  {
    id: "4",
    leaseName: "Studio Unit Contract.pdf",
    date: "Jan 10, 2026",
    findings: 3,
    status: "complete",
  },
];

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickView: (id: string) => void;
}

export function HistorySidebar({
  isOpen,
  onClose,
  onQuickView,
}: HistorySidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.key === "Escape") onClose();
          }}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          "fixed right-0 top-16 bottom-0 w-72 bg-card border-l border-border shadow-xl z-40 transition-transform duration-300 ease-in-out flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        aria-label="Audit History"
        data-ocid="history.panel"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-border bg-navy/5">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-sage" />
            <h3 className="font-display font-bold text-sm text-navy">
              Audit History
            </h3>
            <Badge
              variant="secondary"
              className="bg-sage text-white text-xs px-1.5 py-0 h-4"
            >
              {MOCK_HISTORY.length}
            </Badge>
          </div>
          <button
            type="button"
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            onClick={onClose}
            aria-label="Close history"
            data-ocid="history.close.button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* History list */}
        <ScrollArea className="flex-1">
          <div className="p-3 space-y-2">
            {MOCK_HISTORY.length === 0 ? (
              <div
                className="flex flex-col items-center gap-2 py-12 text-center"
                data-ocid="history.empty_state"
              >
                <FileText className="w-8 h-8 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">No audits yet</p>
                <p className="text-xs text-muted-foreground">
                  Upload your first lease to get started
                </p>
              </div>
            ) : (
              MOCK_HISTORY.map((item, index) => (
                <div
                  key={item.id}
                  className="group rounded-lg border border-border bg-background p-3 hover:border-sage/40 hover:bg-sage/5 transition-all duration-200"
                  data-ocid={`history.item.${index + 1}`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-md bg-sage-pale flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FileText className="w-3.5 h-3.5 text-sage" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-navy truncate leading-tight">
                        {item.leaseName}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Clock className="w-2.5 h-2.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {item.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {item.findings} findings
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2.5 h-7 text-xs gap-1.5 border-border hover:border-sage hover:text-sage hover:bg-sage/5 group-hover:border-sage/60"
                    onClick={() => onQuickView(item.id)}
                    data-ocid={`history.quick_view.button.${index + 1}`}
                  >
                    <Eye className="w-3 h-3" />
                    Quick View
                    <ChevronRight className="w-3 h-3 ml-auto" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            {MOCK_HISTORY.length} audit{MOCK_HISTORY.length !== 1 ? "s" : ""}{" "}
            total
          </p>
        </div>
      </aside>
    </>
  );
}
