import latex from 'node-latex';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import { promisify } from 'util';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatePath = path.join(__dirname, '../static/templates/template.tex');
const outputTexPath = path.join(__dirname, '../static/temp/output.tex');
const outputPDFPath = path.join(__dirname, '../static/temp/output.pdf');

const execAsync = promisify(exec);

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

export const generatePDF = async (data) => {
    // Read LaTeX template
    const templateContent = fs.readFileSync(templatePath, 'utf8');
    
    // Escape profile data
    const escapedData = escapeProfileData(data);

    // Compile template using Handlebars
    const template = Handlebars.compile(templateContent);
    const latexContent = template(escapedData);

    // Save compiled LaTeX content to a .tex file
    fs.writeFileSync(outputTexPath, latexContent);

    // Write compiled PDF output to file
    const outputStream = fs.createWriteStream(outputPDFPath);
    
    return new Promise((resolve, reject) => {
        const pdfStream = latex(latexContent);
        pdfStream.pipe(outputStream);
    
        pdfStream.on('error', (err) => {
            reject(err);
        });

        outputStream.on('finish', () => {
            console.log('PDF successfully generated');
            resolve({ pdfPath: outputPDFPath, texPath: outputTexPath });
        });
    });
};