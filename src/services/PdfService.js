import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Initialize pdfMake with the default fonts
if (typeof window !== 'undefined' && !pdfMake.vfs) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
}

export class PdfService {
  static async generatePDF(latexContent) {
    try {
      // Convert LaTeX content to pdfmake format
      const docDefinition = {
        content: [
          {
            text: latexContent,
            style: 'document'
          }
        ],
        styles: {
          document: {
            fontSize: 12,
            lineHeight: 1.5
          },
          title: {
            fontSize: 24,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 20]
          },
          section: {
            fontSize: 16,
            bold: true,
            margin: [0, 15, 0, 10]
          }
        },
        defaultStyle: {
          fontSize: 12
        },
        footer: function(currentPage, pageCount) {
          return {
            text: `Page ${currentPage} of ${pageCount}`,
            alignment: 'center'
          };
        }
      };

      // Generate PDF
      return new Promise((resolve) => {
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        pdfDocGenerator.getBlob((blob) => {
          resolve(blob);
        });
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      throw error;
    }
  }
} 