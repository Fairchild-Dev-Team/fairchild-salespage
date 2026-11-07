import {
  getDocument,
  GlobalWorkerOptions,
  version as pdfjsVersion,
  type PDFDocumentProxy,
} from "pdfjs-dist"

let workerConfigured = false

function ensureWorker() {
  if (workerConfigured || typeof window === "undefined") return
  // Prefer the local public copy so Cloudflare / nosniff hosts stay reliable.
  GlobalWorkerOptions.workerSrc = `/flipbook/pdf.worker.min.mjs`
  // Fallback string kept for clarity if the public asset is missing in local digs.
  void pdfjsVersion
  workerConfigured = true
}

type LoadPdfDocumentArgs = {
  url: string
  onLoad?: (pageCount: number) => void
  onError?: (error: Error) => void
  onProgress?: (ratio: number) => void
}

export async function loadPdfDocument({
  url,
  onLoad,
  onError,
  onProgress,
}: LoadPdfDocumentArgs): Promise<PDFDocumentProxy | null> {
  ensureWorker()
  try {
    const loadingTask = getDocument({
      url,
      withCredentials: false,
      enableXfa: false,
      disableAutoFetch: false,
      disableStream: false,
      disableRange: false,
    })

    loadingTask.onProgress = (progress: { loaded: number; total: number }) => {
      if (!progress.total) return
      onProgress?.(Math.min(1, progress.loaded / progress.total))
    }

    const pdf = await loadingTask.promise
    onLoad?.(pdf.numPages)
    return pdf
  } catch (error) {
    const next =
      error instanceof Error ? error : new Error("Failed to load PDF")
    onError?.(next)
    return null
  }
}
