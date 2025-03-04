import React, { useState } from 'react';
import { components } from '../LatexComponents';

const componentDocs = {
  Title: {
    description: 'Creates a document title',
    props: {
      content: {
        type: 'string',
        description: 'The title text',
        required: true
      },
      fontSize: {
        type: 'string',
        description: 'Font size (e.g., "32px")',
        default: '32px'
      },
      color: {
        type: 'string',
        description: 'Text color',
        default: '#333'
      },
      align: {
        type: 'enum',
        options: ['left', 'center', 'right'],
        description: 'Text alignment',
        default: 'center'
      }
    },
    example: '<Title content="My Document" fontSize="32px" color="#333" align="center"/>'
  },
  Section: {
    description: 'Creates a section heading',
    props: {
      title: {
        type: 'string',
        description: 'Section title',
        required: true
      },
      fontSize: {
        type: 'string',
        description: 'Font size',
        default: '24px'
      },
      color: {
        type: 'string',
        description: 'Text color',
        default: '#444'
      },
      align: {
        type: 'enum',
        options: ['left', 'center', 'right'],
        description: 'Text alignment',
        default: 'left'
      },
      bold: {
        type: 'boolean',
        description: 'Make text bold',
        default: 'true'
      }
    },
    example: '<Section title="Introduction" fontSize="24px" align="left" bold={true}/>'
  },
  Subsection: {
    description: 'Creates a subsection heading',
    props: {
      title: {
        type: 'string',
        description: 'Subsection title',
        required: true
      },
      fontSize: {
        type: 'string',
        description: 'Font size',
        default: '20px'
      },
      color: {
        type: 'string',
        description: 'Text color',
        default: '#444'
      },
      align: {
        type: 'enum',
        options: ['left', 'center', 'right'],
        description: 'Text alignment',
        default: 'left'
      },
      bold: {
        type: 'boolean',
        description: 'Make text bold',
        default: 'true'
      }
    },
    example: '<Subsection title="My Subsection" fontSize="20px" align="left"/>'
  },
  Subsubsection: {
    description: 'Creates a sub-subsection heading',
    props: {
      title: {
        type: 'string',
        description: 'Subsection title',
        required: true
      },
      fontSize: {
        type: 'string',
        description: 'Font size',
        default: '18px'
      },
      color: {
        type: 'string',
        description: 'Text color',
        default: '#444'
      },
      align: {
        type: 'enum',
        options: ['left', 'center', 'right'],
        description: 'Text alignment',
        default: 'left'
      },
      bold: {
        type: 'boolean',
        description: 'Make text bold',
        default: 'true'
      }
    },
    example: '<Subsubsection title="My Sub-subsection" align="left"/>'
  },
  Paragraph: {
    description: 'Creates a text paragraph',
    props: {
      content: {
        type: 'string',
        description: 'Paragraph text',
        required: true
      },
      fontSize: {
        type: 'string',
        description: 'Font size',
        default: '12pt'
      },
      color: {
        type: 'string',
        description: 'Text color',
        default: '#000'
      },
      align: {
        type: 'enum',
        options: ['left', 'center', 'right', 'justify'],
        description: 'Text alignment',
        default: 'justify'
      },
      italic: {
        type: 'boolean',
        description: 'Make text italic',
        default: 'false'
      },
      bold: {
        type: 'boolean',
        description: 'Make text bold',
        default: 'false'
      }
    },
    example: '<Paragraph content="Your text here" align="justify"/>'
  },
  Equation: {
    description: 'Renders mathematical equations',
    props: {
      content: {
        type: 'string',
        description: 'LaTeX math expression',
        required: true
      },
      displayMode: {
        type: 'boolean',
        description: 'Display as block equation',
        default: 'true'
      }
    },
    example: '<Equation content="E = mc^2" displayMode="true"/>'
  },
  List: {
    description: 'Creates various types of lists',
    props: {
      items: {
        type: 'string',
        description: 'Comma-separated list items',
        required: true
      },
      type: {
        type: 'enum',
        options: ['bullet', 'numbered', 'alpha', 'roman'],
        description: 'Type of list',
        default: 'bullet'
      }
    },
    example: '<List type="bullet" items="First item,Second item,Third item"/>'
  },
  PageBreak: {
    description: 'Inserts a page break',
    props: {},
    example: '<PageBreak/>'
  },
  Columns: {
    description: 'Creates a multi-column layout',
    props: {
      content: {
        type: 'string',
        description: 'Column content separated by |',
        required: true
      },
      count: {
        type: 'number',
        description: 'Number of columns',
        default: '2'
      }
    },
    example: '<Columns content="Left column content|Right column content" count="2"/>'
  },
  Table: {
    description: 'Creates a table',
    props: {
      headers: {
        type: 'string',
        description: 'Comma-separated headers',
        required: true
      },
      rows: {
        type: 'string',
        description: 'Semicolon-separated rows, comma-separated cells',
        required: true
      },
      caption: {
        type: 'string',
        description: 'Table caption',
        default: ''
      }
    },
    example: '<Table headers="Name,Age,City" rows="John,25,NY;Jane,30,LA" caption="Sample Table"/>'
  },
  Figure: {
    description: 'Inserts an image with caption',
    props: {
      src: {
        type: 'string',
        description: 'Image source path',
        required: true
      },
      caption: {
        type: 'string',
        description: 'Figure caption',
        default: ''
      },
      width: {
        type: 'string',
        description: 'Width as fraction of text width',
        default: '0.8'
      }
    },
    example: '<Figure src="path/to/image.png" caption="My Figure" width="0.8"/>'
  },
  Quote: {
    description: 'Creates a block quote',
    props: {
      content: {
        type: 'string',
        description: 'Quote content',
        required: true
      },
      author: {
        type: 'string',
        description: 'Quote author',
        default: ''
      }
    },
    example: '<Quote content="To be or not to be" author="Shakespeare"/>'
  }
};

export const Sidebar = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const renderPropDetails = (propName, propInfo) => (
    <div key={propName} className="mb-2 pl-2 border-l-2 border-gray-200">
      <div className="flex items-center text-sm">
        <span className="font-medium">{propName}</span>
        {propInfo.required && (
          <span className="ml-2 text-xs text-red-500">required</span>
        )}
      </div>
      <div className="text-xs text-gray-600">Type: {propInfo.type}</div>
      {propInfo.default && (
        <div className="text-xs text-gray-600">
          Default: {propInfo.default}
        </div>
      )}
      {propInfo.type === 'enum' && (
        <div className="text-xs text-gray-600">
          Options: {propInfo.options.join(', ')}
        </div>
      )}
      <div className="text-xs text-gray-700">{propInfo.description}</div>
    </div>
  );

  const renderComponent = (name, info) => {
    return (
      <div key={name} className="mb-2">
        <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
          <button
            className="w-full p-2 text-left"
            onClick={() => setSelectedComponent(selectedComponent === name ? null : name)}
          >
            <div className="font-medium text-primary-600 text-sm">{name}</div>
            <div className="text-xs text-gray-600">{info.description}</div>
          </button>
          
          {selectedComponent === name && (
            <div className="p-2 border-t border-gray-100">
              <div className="mb-2">
                <div className="font-medium text-xs mb-1">Props:</div>
                <div className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {Object.entries(info.props).map(([propName, propInfo]) =>
                    renderPropDetails(propName, propInfo)
                  )}
                </div>
              </div>
              <div>
                <div className="font-medium text-xs mb-1">Example:</div>
                <div className="max-h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  <code className="block bg-gray-50 p-2 rounded text-xs break-all whitespace-pre-wrap">
                    {info.example}
                  </code>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-gray-100 border-r border-gray-200">
      <div className="h-full flex flex-col">
        <div className="p-3 border-b border-gray-200">
          <h2 className="text-sm font-semibold">Components</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-3 mt-5">
          {Object.entries(componentDocs).map(([name, info]) => renderComponent(name, info))}
        </div>
      </div>
    </div>
  );
};