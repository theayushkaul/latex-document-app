import React, { useState, useCallback, useMemo } from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { CodeEditor } from './components/CodeEditor/CodeEditor';
import { Preview } from './components/Preview/Preview';
import { Navbar } from './components/Navbar/Navbar';
import { parseComponent } from './components/LatexComponents';
import { LatexService } from './services/LatexService';
import Split from 'react-split';
import { saveAs } from 'file-saver';
import './App.css';

const DEFAULT_CONTENT = `<Title content="My Document" fontSize="32px" color="#333"/>
<Author name="John Doe"/>

<Section title="Introduction" fontSize="24px" color="#444"/>
<Paragraph content="This is an introduction paragraph." fontSize="14pt"/>

<Section title="Mathematical Example"/>
<Equation content="E = mc^2" displayMode="true"/>
<Equation content="\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}" displayMode="true"/>

<Section title="List Example"/>
<List 
  type="bullet"
  items="First item,Second item,Third item"
/>`;

function App() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEditorChange = useCallback((value) => {
    try {
      setContent(value);
      setError(null);
    } catch (error) {
      setError('Error updating content');
      console.error('Error updating content:', error);
    }
  }, []);

  const handleDownload = async (format) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { latex } = parseComponent(content);
      
      switch (format) {
        case 'tex':
          const texBlob = new Blob([latex], { type: 'text/plain;charset=utf-8' });
          saveAs(texBlob, 'document.tex');
          break;
          
        case 'pdf':
          const fullLatex = LatexService.convertToLatex(latex);
          const pdfBlob = await LatexService.generatePDF(fullLatex);
          saveAs(pdfBlob, 'document.pdf');
          break;
          
        default:
          throw new Error('Unsupported format');
      }
    } catch (error) {
      setError('Error generating document');
      console.error('Download error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSidebar = useCallback(() => {
    setShowSidebar(prev => !prev);
  }, []);

  const parsedContent = useMemo(() => {
    try {
      return parseComponent(content);
    } catch (error) {
      setError('Error parsing content');
      console.error('Parse error:', error);
      return { latex: '', preview: '' };
    }
  }, [content]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar 
        toggleSidebar={toggleSidebar} 
        onDownload={handleDownload}
        isLoading={isLoading}
        error={error}
      />
      
      <div className="flex h-screen pt-14">
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            showSidebar ? 'w-64' : 'w-0'
          }`}
        >
          <div className={`w-64 ${showSidebar ? '' : 'invisible'}`}>
            <Sidebar />
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="editor-preview-container">
            <Split
              className="flex flex-1"
              sizes={[50, 50]}
              minSize={300}
              gutterSize={20}
              gutterAlign="center"
              snapOffset={30}
              dragInterval={1}
              direction="horizontal"
            >
              <div className="editor-container">
                <CodeEditor 
                  value={content} 
                  onChange={handleEditorChange}
                />
              </div>

              <div className="preview-container">
                <div className="preview-paper">
                  <Preview content={parsedContent} />
                </div>
              </div>
            </Split>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 