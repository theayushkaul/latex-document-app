import { Generator } from 'latex.js';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export class LatexService {
  static async generatePDF(latexContent) {
    try {
      const generator = new Generator({
        customPreamble: `
          \\usepackage{amsmath}
          \\usepackage{amsfonts}
          \\usepackage{amssymb}
          \\usepackage{xcolor}
          \\usepackage{graphicx}
          \\usepackage{geometry}
        `
      });

      const pdf = await generator.createPdf(latexContent);
      return new Blob([pdf], { type: 'application/pdf' });
    } catch (error) {
      console.error('LaTeX generation error:', error);
      throw error;
    }
  }

  static convertToLatex(components) {
    return components; // The latex is already properly formatted
  }

  static parseLatexToHtml(latexContent) {
    try {
      const generator = new Generator();
      const doc = generator.parse(latexContent);
      return doc.domFragment().firstChild.outerHTML;
    } catch (error) {
      console.error('LaTeX parsing error:', error);
      return `<div class="error">Error parsing LaTeX: ${error.message}</div>`;
    }
  }

  static async validateSyntax(latexContent) {
    try {
      const response = await fetch(`${API_URL}/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latex: latexContent }),
      });

      return await response.json();
    } catch (error) {
      console.error('Validation error:', error);
      throw error;
    }
  }
} 