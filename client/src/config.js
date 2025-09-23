const rawPdfMode = process.env.REACT_APP_PDF_GENERATION_MODE ?? process.env.REACT_APP_PDF_GENERATION_MODE ?? 'local';

const pdfGenerationMode =
	typeof rawPdfMode === 'string' && rawPdfMode.trim() ? rawPdfMode.trim().toLowerCase() : 'local';

export const getPdfGenerationMode = () => pdfGenerationMode;
export const isPdfGenerationEnabled = pdfGenerationMode === 'local';
