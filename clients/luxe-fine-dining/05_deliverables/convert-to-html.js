const fs = require('fs');
const path = require('path');

const mdPath = path.join(__dirname, 'PROPOSAL_PHASED_APPROACH.md');
const htmlPath = path.join(__dirname, 'PROPOSAL_PHASED_APPROACH.html');

const md = fs.readFileSync(mdPath, 'utf8');

// Convert markdown to HTML
let html = md
  // Headers
  .replace(/^# (.+)$/gm, '<h1>$1</h1>')
  .replace(/^## (.+)$/gm, '<h2>$1</h2>')
  .replace(/^### (.+)$/gm, '<h3>$1</h3>')
  .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
  // Bold
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  // Code
  .replace(/`(.+?)`/g, '<code>$1</code>')
  // Horizontal rules
  .replace(/^---$/gm, '<hr>');

// Process tables
const lines = html.split('\n');
let inTable = false;
let tableRows = [];
let processedLines = [];

lines.forEach((line, index) => {
  if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
    if (!inTable) {
      inTable = true;
      tableRows = [];
    }
    const cells = line.split('|').map(c => c.trim()).filter(c => c && !c.match(/^[-:]+$/));
    if (cells.length > 0) {
      tableRows.push(cells);
    }
  } else {
    if (inTable && tableRows.length > 0) {
      // Process table
      let tableHtml = '<table>';
      tableRows.forEach((row, i) => {
        if (i === 0) {
          // Header row
          tableHtml += '<tr>' + row.map(cell => `<th>${cell}</th>`).join('') + '</tr>';
        } else {
          tableHtml += '<tr>' + row.map(cell => `<td>${cell}</td>`).join('') + '</tr>';
        }
      });
      tableHtml += '</table>';
      processedLines.push(tableHtml);
      tableRows = [];
      inTable = false;
    }
    processedLines.push(line);
  }
});

if (inTable && tableRows.length > 0) {
  let tableHtml = '<table>';
  tableRows.forEach((row, i) => {
    if (i === 0) {
      tableHtml += '<tr>' + row.map(cell => `<th>${cell}</th>`).join('') + '</tr>';
    } else {
      tableHtml += '<tr>' + row.map(cell => `<td>${cell}</td>`).join('') + '</tr>';
    }
  });
  tableHtml += '</table>';
  processedLines.push(tableHtml);
}

html = processedLines.join('\n');

// Process lists
html = html.replace(/^[-*] (.+)$/gm, '<li>$1</li>');
html = html.replace(/^✅ (.+)$/gm, '<li>✅ $1</li>');

// Wrap consecutive list items
html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
  return '<ul>' + match + '</ul>';
});

// Wrap paragraphs
html = html.split('\n\n').map(para => {
  if (para.trim() && !para.trim().startsWith('<') && !para.trim().startsWith('|')) {
    return '<p>' + para.trim() + '</p>';
  }
  return para;
}).join('\n\n');

const fullHtml = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Luxe Fine Dining - Phased Proposal</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.8;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
            background: #f8f9fa;
        }
        h1 {
            color: #1a1a1a;
            border-bottom: 4px solid #4a90e2;
            padding-bottom: 15px;
            margin-bottom: 30px;
        }
        h2 {
            color: #2c3e50;
            margin-top: 40px;
            margin-bottom: 20px;
            border-bottom: 2px solid #e0e0e0;
            padding-bottom: 10px;
        }
        h3 {
            color: #34495e;
            margin-top: 30px;
            margin-bottom: 15px;
        }
        h4 {
            color: #555;
            margin-top: 25px;
            margin-bottom: 10px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 25px 0;
            background: white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
        }
        th {
            background: #4a90e2;
            color: white;
            padding: 15px;
            text-align: left;
            font-weight: 600;
            font-size: 14px;
        }
        td {
            padding: 12px 15px;
            border-bottom: 1px solid #e0e0e0;
            font-size: 14px;
        }
        tr:last-child td {
            border-bottom: none;
        }
        tr:hover {
            background: #f8f9fa;
        }
        code {
            background: #f4f4f4;
            padding: 3px 8px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }
        ul, ol {
            margin: 20px 0;
            padding-left: 30px;
        }
        li {
            margin: 10px 0;
            line-height: 1.6;
        }
        strong {
            color: #2c3e50;
            font-weight: 600;
        }
        hr {
            border: none;
            border-top: 3px solid #e0e0e0;
            margin: 40px 0;
        }
        p {
            margin: 15px 0;
        }
    </style>
</head>
<body>
${html}
</body>
</html>`;

fs.writeFileSync(htmlPath, fullHtml);
console.log('HTML file created successfully at:', htmlPath);






