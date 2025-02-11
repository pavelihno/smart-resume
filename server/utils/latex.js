import latex from 'node-latex';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_TEMPLATE_NAME = 'default';
const TEMPLATE_FOLDER_PATH = path.join(__dirname, '../static/templates/');
const OUTPUT_TEX_PATH = path.join(__dirname, '../static/temp/output.tex');
const OUTPUT_PDF_PATH = path.join(__dirname, '../static/temp/output.pdf');

export const escapeLatex = (text) => {
    if (typeof text !== 'string') {
        return text;
    }
    return text
        .replace(/\\/g, '\\textbackslash{}')
        .replace(/%/g, '\\%')
        .replace(/#/g, '\\#')
        .replace(/\$/g, '\\$')
        .replace(/_/g, '\\_')
        .replace(/{/g, '\\{')
        .replace(/}/g, '\\}')
        .replace(/&/g, '\\&')
        .replace(/\^/g, '\\textasciicircum{}')
        .replace(/~/g, '\\textasciitilde{}')
        .replace(/'/g, '\\textquotesingle{}');
};

const escapeProfileData = (data) => {
    if (typeof data === 'string') {
        return escapeLatex(data);
    } else if (data instanceof Date) {
        return data.toLocaleString('default', { month: 'short', year: 'numeric' });
    } else if (Array.isArray(data)) {
        return data.map(escapeProfileData);
    } else if (typeof data === 'object' && data !== null) {
        const escapedData = {};
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                escapedData[key] = escapeProfileData(data[key]);
            }
        }
        return escapedData;
    } else {
        return data;
    }
};

export const generatePDF = async (data, templateName=DEFAULT_TEMPLATE_NAME) => {
    // Read LaTeX template
    const templatePath = path.join(TEMPLATE_FOLDER_PATH, `${templateName}.tex`);
    const templateContent = fs.readFileSync(templatePath, 'utf8');

    // Escape profile data
    const escapedData = escapeProfileData(data);

    // Compile template using Handlebars
    const template = Handlebars.compile(templateContent);
    const latexContent = template(escapedData);

    // Save compiled LaTeX content to a .tex file
    fs.writeFileSync(OUTPUT_TEX_PATH, latexContent);

    // Write compiled PDF output to file
    const outputStream = fs.createWriteStream(OUTPUT_PDF_PATH);
    
    return new Promise((resolve, reject) => {
        const pdfStream = latex(latexContent);
        pdfStream.pipe(outputStream);

        pdfStream.on('error', (err) => {
            reject(err);
        });

        outputStream.on('error', (err) => {
            reject(err);
        });

        outputStream.on('finish', () => {
            console.log('PDF successfully generated');
            resolve({ pdfPath: OUTPUT_PDF_PATH, texPath: OUTPUT_TEX_PATH });
        });
    });
};

export const listTemplates = () => {
    const templateFiles = fs.readdirSync(TEMPLATE_FOLDER_PATH);
    return templateFiles.map((file) => path.basename(file, '.tex'));
};