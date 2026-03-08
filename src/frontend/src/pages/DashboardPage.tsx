import { AuditReport } from "@/components/AuditReport";
import { HistorySidebar } from "@/components/HistorySidebar";
import { Navbar } from "@/components/Navbar";
import { ScanningAnimation } from "@/components/ScanningAnimation";
import { UploadZone } from "@/components/UploadZone";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { History, PanelRightClose, PanelRightOpen, Plus } from "lucide-react";
import { useCallback, useState } from "react";

type DashboardState = "upload" | "scanning" | "report";

interface UploadedFile {
  file: File;
  preview?: string;
  id: string;
}

const HISTORY_COUNT = 4;

export function DashboardPage() {
  const [dashState, setDashState] = useState<DashboardState>("upload");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentLeaseName, setCurrentLeaseName] = useState<string>("");

  const handleStartAnalysis = useCallback((files: UploadedFile[]) => {
    if (files.length > 0) {
      setCurrentLeaseName(files[0].file.name);
    }
    setDashState("scanning");
  }, []);

  const handleScanComplete = useCallback(() => {
    setDashState("report");
  }, []);

  const handleNewAudit = useCallback(() => {
    setDashState("upload");
    setCurrentLeaseName("");
  }, []);

  const handleQuickView = useCallback((_id: string) => {
    setDashState("report");
    setSidebarOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Main layout */}
      <div className="flex flex-1 pt-16 relative">
        {/* Main content area */}
        <main
          className="flex-1 flex flex-col min-h-0 transition-all duration-300"
          style={{
            marginRight: sidebarOpen ? "18rem" : "0",
          }}
        >
          {/* Dashboard toolbar */}
          <div className="sticky top-16 z-20 bg-card/95 backdrop-blur-sm border-b border-border px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
            {/* Breadcrumb / state indicator */}
            <div className="flex items-center gap-2 min-w-0">
              <h1 className="font-display font-bold text-navy text-sm sm:text-base truncate">
                {dashState === "upload" && "New Audit"}
                {dashState === "scanning" && "Scanning Lease..."}
                {dashState === "report" && "Audit Report"}
              </h1>
              {dashState === "scanning" && (
                <Badge
                  variant="secondary"
                  className="bg-sage/10 text-sage border-sage/20 text-xs"
                  data-ocid="dashboard.scanning.loading_state"
                >
                  Processing
                </Badge>
              )}
              {dashState === "report" && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700 border-green-200 text-xs"
                  data-ocid="dashboard.report.success_state"
                >
                  Complete
                </Badge>
              )}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {dashState === "report" && (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs hover:border-sage hover:text-sage hover:bg-sage/5"
                  onClick={handleNewAudit}
                  data-ocid="dashboard.new_audit.button"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">New Audit</span>
                </Button>
              )}

              {/* Sidebar toggle */}
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs relative hover:border-sage hover:text-sage hover:bg-sage/5"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label={sidebarOpen ? "Close history" : "Open history"}
                data-ocid="dashboard.history.toggle"
              >
                {sidebarOpen ? (
                  <PanelRightClose className="w-4 h-4" />
                ) : (
                  <PanelRightOpen className="w-4 h-4" />
                )}
                <span className="hidden sm:flex items-center gap-1">
                  <History className="w-3.5 h-3.5" />
                  History
                </span>
                {/* Badge count */}
                {!sidebarOpen && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-sage text-white text-[9px] font-bold flex items-center justify-center">
                    {HISTORY_COUNT}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Content body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-2xl mx-auto">
              {dashState === "upload" && (
                <UploadZone onStartAnalysis={handleStartAnalysis} />
              )}

              {dashState === "scanning" && (
                <ScanningAnimation onComplete={handleScanComplete} />
              )}

              {dashState === "report" && (
                <AuditReport
                  leaseName={currentLeaseName || "123 Main St Lease.pdf"}
                />
              )}
            </div>
          </div>
        </main>

        {/* History sidebar */}
        <HistorySidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onQuickView={handleQuickView}
        />
      </div>

      {/* Footer */}
      <footer
        className="border-t border-border bg-card py-4 px-6 text-center text-xs text-muted-foreground"
        style={{
          marginRight: sidebarOpen ? "18rem" : "0",
          transition: "margin 0.3s",
        }}
      >
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
