// Component definitions with their corresponding LaTeX translations
export const components = {
  Title: ({ content, fontSize = "32", color = "#333", align = "center", bold = true, italic = false }) => ({
    latex: `\\begin{${align}}\n${bold ? '\\textbf{' : ''}${italic ? '\\textit{' : ''}${content}${italic ? '}' : ''}${bold ? '}' : ''}\n\\end{${align}}`,
    preview: `<h1 style="font-size: ${fontSize}px; color: ${color}; text-align: ${align};" class="${bold ? 'font-bold' : ''} ${italic ? 'italic' : ''} my-4">${content}</h1>`
  }),

  Author: ({ name, align = "center", bold = false, italic = false }) => ({
    latex: `\\begin{${align}}\n${bold ? '\\textbf{' : ''}${italic ? '\\textit{' : ''}${name}${italic ? '}' : ''}${bold ? '}' : ''}\n\\end{${align}}`,
    preview: `<p style="text-align: ${align};" class="${bold ? 'font-bold' : ''} ${italic ? 'italic' : ''} my-2">${name}</p>`
  }),

  Section: ({ title, fontSize = "24", color = "#444", align = "left", bold = true, italic = false }) => ({
    latex: `\\begin{${align}}\n\\section*{${bold ? '\\textbf{' : ''}${italic ? '\\textit{' : ''}${title}${italic ? '}' : ''}${bold ? '}' : ''}}\n\\end{${align}}`,
    preview: `<h2 style="font-size: ${fontSize}px; color: ${color}; text-align: ${align};" class="${bold ? 'font-bold' : ''} ${italic ? 'italic' : ''} my-4">${title}</h2>`
  }),

  Subsection: ({ title, fontSize = "20", color = "#444", align = "left", bold = true, italic = false }) => ({
    latex: `\\begin{${align}}\n\\subsection*{${bold ? '\\textbf{' : ''}${italic ? '\\textit{' : ''}${title}${italic ? '}' : ''}${bold ? '}' : ''}}\n\\end{${align}}`,
    preview: `<h3 style="font-size: ${fontSize}px; color: ${color}; text-align: ${align};" class="${bold ? 'font-bold' : ''} ${italic ? 'italic' : ''} my-3">${title}</h3>`
  }),

  Subsubsection: ({ title, align = "left", bold = false }) => {
    const formattedTitle = bold ? `\\textbf{${title}}` : title;
    return `\\subsubsection{${formattedTitle}}`;
  },

  Paragraph: ({ content, fontSize = "12", color = "#000", align = "justify", italic = false, bold = false }) => ({
    latex: `\\begin{${align}}\n${bold ? '\\textbf{' : ''}${italic ? '\\textit{' : ''}${content}${italic ? '}' : ''}${bold ? '}' : ''}\n\\end{${align}}`,
    preview: `<p style="font-size: ${fontSize}pt; color: ${color}; text-align: ${align};" class="${italic ? 'italic' : ''} ${bold ? 'font-bold' : ''} my-2">${content}</p>`
  }),

  Text: ({ content, fontSize = "12", color = "#000", align = "left", italic = false, bold = false }) => ({
    latex: `\\begin{${align}}\n${bold ? '\\textbf{' : ''}${italic ? '\\textit{' : ''}${content}${italic ? '}' : ''}${bold ? '}' : ''}\n\\end{${align}}`,
    preview: `<span style="font-size: ${fontSize}pt; color: ${color}; text-align: ${align};" class="${italic ? 'italic' : ''} ${bold ? 'font-bold' : ''}">${content}</span>`
  }),

  Equation: ({ content, displayMode = true, label = "", align = "center", bold = false, italic = false }) => ({
    latex: displayMode 
      ? `\\begin{${align}}\n\\begin{equation}${label ? `\\label{${label}}` : ""}\n${bold ? '\\textbf{' : ''}${italic ? '\\textit{' : ''}${content}${italic ? '}' : ''}${bold ? '}' : ''}\n\\end{equation}\n\\end{${align}}` 
      : `\\begin{${align}}\n\\(${bold ? '\\textbf{' : ''}${italic ? '\\textit{' : ''}${content}${italic ? '}' : ''}${bold ? '}' : ''}\\)\n\\end{${align}}`,
    preview: displayMode ? `<div style="text-align: ${align};">$$${bold ? '\\textbf{' : ''}${italic ? '\\textit{' : ''}${content}${italic ? '}' : ''}${bold ? '}' : ''}$$</div>` : `<div style="text-align: ${align};">$${bold ? '\\textbf{' : ''}${italic ? '\\textit{' : ''}${content}${italic ? '}' : ''}${bold ? '}' : ''}$</div>`
  }),

  List: ({ items, type = "itemize", nested = false }) => {
    const itemArray = typeof items === 'string' ? items.split(';') : items;
    
    return `\\begin{${type}}
${itemArray.map(item => `\\item ${item}`).join('\n')}
\\end{${type}}`;
  },

  Table: ({ headers, rows, caption = "", align = "center", columnWidths = [] }) => {
    const headerArray = headers.split(',');
    const rowsArray = rows.split(';').filter(row => row.trim());
    
    // Handle columnWidths as either string or array
    const widthsArray = typeof columnWidths === 'string' ? columnWidths.split(',') : columnWidths;
    
    // Generate column specification
    const colSpec = widthsArray.length > 0 
      ? widthsArray.map(width => `p{${width}}`).join('|')
      : headerArray.map(() => 'l').join('|');

    let latex = `\\begin{table}[h!]
\\begin{${align}ing}
\\begin{tabular}{|${colSpec}|}
\\hline
${headerArray.join(' & ')} \\\\
\\hline\n`;

    rowsArray.forEach(row => {
      const cells = row.split(',');
      latex += `${cells.join(' & ')} \\\\\n`;
    });

    latex += `\\hline
\\end{tabular}
${caption ? `\\caption{${caption}}` : ''}
\\end{${align}ing}
\\end{table}`;

    return { latex, preview: `<div class="table-container">
  <table class="min-w-full border-collapse border">
    <thead>
      <tr>${headerArray.map(h => `<th class="border p-2">${h}</th>`).join('')}</tr>
    </thead>
    <tbody>
      ${rowsArray.map(row => `
        <tr>${row.split(',').map(cell => `<td class="border p-2">${cell}</td>`).join('')}</tr>
      `).join('')}
    </tbody>
  </table>
</div>`};
  },

  Figure: ({ src, caption = "", width = "0.8", align = "center", bold = false, italic = false }) => ({
    latex: `
\\begin{${align}}
\\begin{figure}[h]
\\centering
\\includegraphics[width=${width}\\textwidth]{${src}}
${caption ? `\\caption{${bold ? '\\textbf{' : ''}${italic ? '\\textit{' : ''}${caption}${italic ? '}' : ''}${bold ? '}' : ''}}` : ""}
\\end{figure}
\\end{${align}}`,
    preview: `
<div style="text-align: ${align};">
  <figure class="my-4">
    <img src="${src}" alt="${caption}" style="width: ${width * 100}%; margin: 0 auto;">
    ${caption ? `<figcaption class="text-sm text-gray-600 mt-2 ${bold ? 'font-bold' : ''} ${italic ? 'italic' : ''}">${caption}</figcaption>` : ""}
  </figure>
</div>`
  }),

  Quote: ({ content, author = "", align = "left", bold = false, italic = true }) => ({
    latex: `
\\begin{${align}}
\\begin{quote}
${bold ? '\\textbf{' : ''}${italic ? '\\textit{' : ''}${content}${italic ? '}' : ''}${bold ? '}' : ''}
${author ? `\\\\\\hfill--- ${bold ? '\\textbf{' : ''}${italic ? '\\textit{' : ''}${author}${italic ? '}' : ''}${bold ? '}' : ''}` : ""}
\\end{quote}
\\end{${align}}`,
    preview: `
<div style="text-align: ${align};">
  <blockquote class="border-l-4 border-gray-300 pl-4 my-4 ${italic ? 'italic' : ''} ${bold ? 'font-bold' : ''}">
    <p>${content}</p>
    ${author ? `<footer class="text-right mt-2">— ${author}</footer>` : ""}
  </blockquote>
</div>`
  }),

  PageBreak: () => {
    return '\\newpage';
  },

  Columns: ({ content, count = 2, align = "left", bold = false, italic = false }) => {
    const columns = typeof content === 'string' ? content.split('|') : content;
    const latex = `
\\begin{${align}}
\\begin{multicols}{${count}}
${columns.map(col => `${bold ? '\\textbf{' : ''}${italic ? '\\textit{' : ''}${col.trim()}${italic ? '}' : ''}${bold ? '}' : ''}\n\\columnbreak\n`).join('')}
\\end{multicols}
\\end{${align}}`;

    const preview = `
<div style="text-align: ${align};">
  <div class="grid grid-cols-${count} gap-4">
    ${columns.map(col => `<div>${bold ? '<b>' : ''}${italic ? '<i>' : ''}${col.trim()}${italic ? '</i>' : ''}${bold ? '</b>' : ''}</div>`).join('\n    ')}
  </div>
</div>`;

    return { latex, preview };
  },

  SmallCaps: ({ content, align = "center" }) => ({
    latex: `\\begin{${align}}
\\smallcapsstyle{${content}}

\\vspace{0.5cm}

\\end{${align}}`,
    preview: `<div style="text-align: ${align};">
  <div class="small-caps">${content}</div>
  <div class="vspace"></div>
</div>`
  }),

  TableOfContents: () => {
    return `\\tableofcontents
\\newpage`;
  },

  DocumentSetup: ({ documentClass = "article", options = "12pt,letterpaper", packages = [] }) => ({
    latex: `\\documentclass[${options}]{${documentClass}}

% Required packages
${packages.map(pkg => {
  const [name, options] = pkg.split(':');
  return options ? `\\usepackage[${options}]{${name}}` : `\\usepackage{${name}}`;
}).join('\n')}

% Page setup
\\geometry{margin=1in}

% Color definitions
\\definecolor{linkcolor}{RGB}{0,0,238}

% Hyperref setup
\\hypersetup{
    colorlinks=true,
    linkcolor=linkcolor,
    filecolor=black,      
    urlcolor=blue,
    pdftitle={Model Documentation Template},
    pdfauthor={CLIENT}
}

% Header and footer
\\pagestyle{fancy}
\\fancyhf{}
\\fancyhead[R]{\\thepage}
\\renewcommand{\\headrulewidth}{0pt}

% Title formatting
\\titleformat{\\section}
  {\\normalfont\\Large\\bfseries}{\\thesection}{1em}{}
\\titleformat{\\subsection}
  {\\normalfont\\large\\bfseries}{\\thesubsection}{1em}{}
\\titleformat{\\subsubsection}
  {\\normalfont\\normalsize\\bfseries}{\\thesubsubsection}{1em}{}

% Table of contents formatting
\\renewcommand{\\contentsname}{Table of Contents}

% Define a command for smallcaps that mimics Word's smallcaps
\\newcommand{\\smallcapsstyle}[1]{\\textsc{\\MakeUppercase{#1}}}`,
    preview: `<div class="document-setup">
  <style>
    .document-setup {
      font-family: 'Latin Modern Roman', serif;
      margin: 1in;
    }
  </style>
</div>`
  }),

  HeaderFooter: ({ headerRight, headRuleWidth = "0pt" }) => ({
    latex: `\\pagestyle{fancy}
\\fancyhf{}
\\fancyhead[R]{${headerRight}}
\\renewcommand{\\headrulewidth}{${headRuleWidth}}`,
    preview: `<div class="header-footer">
  <div class="header-right">${headerRight}</div>
</div>`
  }),

  TitleFormat: ({ section, subsection, subsubsection }) => ({
    latex: `\\titleformat{\\section}
  {${section}}{\\thesection}{1em}{}
\\titleformat{\\subsection}
  {${subsection}}{\\thesubsection}{1em}{}
\\titleformat{\\subsubsection}
  {${subsubsection}}{\\thesubsubsection}{1em}{}`,
    preview: `<div class="title-format">
  <style>
    .section { ${section} }
    .subsection { ${subsection} }
    .subsubsection { ${subsubsection} }
  </style>
</div>`
  }),

  TableOfContentsFormat: ({ name = "Table of Contents" }) => ({
    latex: `\\renewcommand{\\contentsname}{${name}}`,
    preview: `<div class="toc-format">
  <h2>${name}</h2>
</div>`
  }),
};

// Helper function to convert hex color to RGB
function hexToRgb(hex) {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r},${g},${b}`;
}

// Update the LaTeX service to include necessary packages and setup
export const getLatexPreamble = () => `
\\documentclass[12pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{lmodern}
\\usepackage{amsmath}
\\usepackage{amsfonts}
\\usepackage{amssymb}
\\usepackage{xcolor}
\\usepackage{graphicx}
\\usepackage{geometry}
\\usepackage{multicol}
\\usepackage{float}
\\usepackage{caption}
\\usepackage{array}
\\usepackage{enumitem}
\\usepackage{ragged2e} % For better text alignment
\\usepackage{fancyhdr}
\\usepackage{lastpage}

% Set page geometry
\\geometry{
  a4paper,
  margin=1in
}

% Set paragraph spacing
\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{1em}

% Set default font size
\\renewcommand{\\normalsize}{\\fontsize{12}{14}\\selectfont}

% Define text alignment environments
\\newenvironment{left}{\\raggedright}{\\par}
\\newenvironment{right}{\\raggedleft}{\\par}
\\newenvironment{center}{\\centering}{\\par}
\\newenvironment{justify}{\\justifying}{\\par}

\\begin{document}
`;

export const getLatexClosing = () => `
\\end{document}
`;

export const parseComponent = (componentString) => {
  const componentRegex = /<(\w+)([^>]*)\/>/g;
  const propsRegex = /(\w+)="([^"]*?)"/g;

  const parseProps = (propsString) => {
    const props = {};
    let propMatch;
    
    while ((propMatch = propsRegex.exec(propsString)) !== null) {
      const [, key, value] = propMatch;
      
      // Handle different value types
      if (value === 'true') props[key] = true;
      else if (value === 'false') props[key] = false;
      else if (value.startsWith('[') && value.endsWith(']')) {
        try {
          props[key] = JSON.parse(value);
        } catch {
          props[key] = value;
        }
      } else {
        props[key] = value;
      }
    }
    
    return props;
  };

  let latex = '';
  let preview = '';
  const processedComponents = [];
  let match;
  
  while ((match = componentRegex.exec(componentString)) !== null) {
    const [, componentName, propsString] = match;
    const props = parseProps(propsString);
    const component = components[componentName];
    if (component) {
      const result = component(props);
      processedComponents.push(result);
    }
  }

  // Combine LaTeX content with proper structure
  latex = getLatexPreamble() + 
    processedComponents.map(comp => comp.latex).join('\n\n') +
    getLatexClosing();

  // Combine preview content
  preview = processedComponents.map(comp => comp.preview).join('\n');

  return { latex, preview };
}; 