const pdfGenerationMode = process.env.REACT_APP_PDF_GENERATION_MODE.trim().toLowerCase();

export const isPdfGenerationEnabled = pdfGenerationMode === 'local';
export const isProd = process.env.NODE_ENV === 'production';