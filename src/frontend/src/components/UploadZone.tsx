import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Camera, FileCheck, FileText, Image, Upload, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";

interface UploadedFile {
  file: File;
  preview?: string;
  id: string;
}

interface UploadZoneProps {
  onStartAnalysis: (files: UploadedFile[]) => void;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(file: File) {
  if (file.type === "application/pdf") return FileText;
  if (file.type.startsWith("image/")) return Image;
  return FileText;
}

export function UploadZone({ onStartAnalysis }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const acceptedTypes = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/tiff",
    "image/jpg",
  ];

  const processFiles = useCallback((newFiles: File[]) => {
    const valid = newFiles.filter((f) => acceptedTypes.includes(f.type));
    const uploadedFiles: UploadedFile[] = valid.map((file) => {
      const id = `${file.name}-${file.size}-${Date.now()}`;
      let preview: string | undefined;
      if (file.type.startsWith("image/")) {
        preview = URL.createObjectURL(file);
      }
      return { file, preview, id };
    });
    setFiles((prev) => [...prev, ...uploadedFiles]);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(Array.from(e.target.files));
      e.target.value = "";
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove?.preview) URL.revokeObjectURL(fileToRemove.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  // Decoration lines — stable array, not mapped from index
  const decorLines = [12, 24, 36, 48, 60, 72, 84, 96];

  return (
    <div className="space-y-6 animate-fade-in-slide">
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl font-bold text-navy mb-2">
          Upload Your Lease
        </h2>
        <p className="text-muted-foreground text-sm">
          We accept PDF documents and images (PNG, JPG, TIFF). Our AI will
          analyze every clause.
        </p>
      </div>

      {/* Drop Zone */}
      <div
        className={cn(
          "relative border-2 border-dashed rounded-xl p-10 text-center transition-all duration-300",
          isDragging ? "drag-active border-primary" : "border-border",
          "bg-background",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        aria-label="Upload zone - drag files here or use the browse button below"
        data-ocid="upload.dropzone"
      >
        {/* Scan lines decoration */}
        <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none opacity-[0.03]">
          {decorLines.map((pct) => (
            <div
              key={pct}
              className="absolute w-full h-px bg-navy"
              style={{ top: `${pct}%` }}
            />
          ))}
        </div>

        <div className="relative flex flex-col items-center gap-4">
          <div
            className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300",
              isDragging
                ? "bg-sage text-white scale-110"
                : "bg-sage-pale text-sage",
            )}
          >
            <Upload className="w-7 h-7" strokeWidth={1.5} />
          </div>

          <div>
            <p className="font-display font-semibold text-navy text-lg">
              {isDragging
                ? "Drop your lease here"
                : "Drag & drop your lease here"}
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              or click to browse your files
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" /> PDF
            </span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="flex items-center gap-1">
              <Image className="w-3.5 h-3.5" /> PNG, JPG, TIFF
            </span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>Up to 50MB</span>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.png,.jpg,.jpeg,.tiff,.tif"
          multiple
          onChange={handleFileChange}
          tabIndex={-1}
        />
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          type="button"
          variant="outline"
          className="flex items-center gap-2 border-border hover:border-sage hover:text-sage hover:bg-sage/5"
          onClick={() => fileInputRef.current?.click()}
          data-ocid="upload.upload_button"
        >
          <Upload className="w-4 h-4" />
          Browse Files
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex items-center gap-2 border-border hover:border-sage hover:text-sage hover:bg-sage/5 sm:hidden"
          onClick={() => cameraInputRef.current?.click()}
          data-ocid="upload.camera.button"
        >
          <Camera className="w-4 h-4" />
          Snap a Photo
        </Button>
        <input
          ref={cameraInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          tabIndex={-1}
        />
      </div>

      {/* File previews */}
      {files.length > 0 && (
        <div className="space-y-3 animate-fade-in-slide">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-navy text-sm">
              {files.length} file{files.length > 1 ? "s" : ""} ready
            </h3>
            <button
              type="button"
              className="text-xs text-muted-foreground hover:text-destructive transition-colors"
              onClick={() => setFiles([])}
              data-ocid="upload.delete_button"
            >
              Clear all
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {files.map((uf, index) => {
              const FileIcon = getFileIcon(uf.file);
              return (
                <div
                  key={uf.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border group hover:border-sage/40 transition-colors"
                  data-ocid={`upload.item.${index + 1}`}
                >
                  {uf.preview ? (
                    <img
                      src={uf.preview}
                      alt={uf.file.name}
                      className="w-10 h-10 rounded object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded bg-sage-pale flex items-center justify-center flex-shrink-0">
                      <FileIcon className="w-5 h-5 text-sage" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {uf.file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(uf.file.size)}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/10 hover:text-destructive transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(uf.id);
                    }}
                    aria-label={`Remove ${uf.file.name}`}
                    data-ocid={`upload.delete_button.${index + 1}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Start Analysis CTA */}
          <div className="pt-2">
            <Button
              type="button"
              className="w-full bg-sage hover:bg-sage/90 text-white font-display font-semibold shadow-sage"
              size="lg"
              onClick={() => onStartAnalysis(files)}
              data-ocid="upload.primary_button"
            >
              <FileCheck className="w-5 h-5 mr-2" />
              Start Analysis
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-2">
              Your lease will be analyzed by our AI in seconds
            </p>
          </div>
        </div>
      )}

      {files.length === 0 && (
        <div
          className="text-center text-xs text-muted-foreground"
          data-ocid="upload.empty_state"
        >
          No files selected yet
        </div>
      )}
    </div>
  );
}
