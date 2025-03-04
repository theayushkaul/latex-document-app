const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const temp = require('temp');
const rateLimit = require('express-rate-limit');
const { promisify } = require('util');
const execAsync = promisify(exec);

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(cors());
app.use(express.json({ limit: '10mb' })); // Limit payload size
app.use(limiter);

// Auto-track and cleanup temporary files
temp.track();

// Utility function to compile LaTeX
async function compileLatex(texFile, tmpDir, draftMode = false) {
  const mode = draftMode ? '-draftmode' : '';
  try {
    await execAsync(`pdflatex ${mode} -interaction=nonstopmode -output-directory=${tmpDir} ${texFile}`);
  } catch (error) {
    throw new Error(`LaTeX compilation failed: ${error.stderr || error.message}`);
  }
}

// Utility function to cleanup temporary files
async function cleanup(tmpDir) {
  try {
    const files = await fs.readdir(tmpDir);
    await Promise.all(
      files.map(file => fs.unlink(path.join(tmpDir, file)))
    );
    await fs.rmdir(tmpDir);
  } catch (error) {
    console.error('Cleanup error:', error);
  }
}

app.post('/compile', async (req, res) => {
  let tmpDir;
  try {
    const { latex } = req.body;
    
    if (!latex || typeof latex !== 'string') {
      return res.status(400).json({ error: 'Invalid LaTeX content' });
    }
    
    // Create temporary directory for compilation
    tmpDir = await temp.mkdir('latex-compile');
    const texFile = path.join(tmpDir, 'document.tex');
    
    // Write LaTeX content to file
    await fs.writeFile(texFile, latex);
    
    // Compile LaTeX to PDF
    await compileLatex(texFile, tmpDir);
    
    // Read the generated PDF
    const pdfPath = path.join(tmpDir, 'document.pdf');
    const pdfContent = await fs.readFile(pdfPath);
    
    // Send PDF back to client
    res.contentType('application/pdf');
    res.send(pdfContent);
    
  } catch (error) {
    console.error('Compilation error:', error);
    res.status(500).json({ 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  } finally {
    // Cleanup temporary files
    if (tmpDir) {
      await cleanup(tmpDir);
    }
  }
});

app.post('/validate', async (req, res) => {
  let tmpDir;
  try {
    const { latex } = req.body;
    
    if (!latex || typeof latex !== 'string') {
      return res.status(400).json({ error: 'Invalid LaTeX content' });
    }
    
    // Create temporary directory for validation
    tmpDir = await temp.mkdir('latex-validate');
    const texFile = path.join(tmpDir, 'document.tex');
    
    // Write LaTeX content to file
    await fs.writeFile(texFile, latex);
    
    // Run LaTeX in draft mode for quick syntax check
    await compileLatex(texFile, tmpDir, true);
    
    res.json({ valid: true });
    
  } catch (error) {
    res.status(400).json({ 
      valid: false, 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  } finally {
    // Cleanup temporary files
    if (tmpDir) {
      await cleanup(tmpDir);
    }
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`LaTeX compilation server running on port ${PORT}`);
}); 