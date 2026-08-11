const fs = require('fs');
const readline = require('readline');
const path = require('path');

const logPath = 'C:\\Users\\nttis\\.gemini\\antigravity-ide\\brain\\2245dc9b-7867-49a0-a9e3-affc4c556511\\.system_generated\\logs\\transcript.jsonl';
const outputPath = 'C:\\Users\\nttis\\Downloads\\eshop-sut\\tests\\FR14\\RAW_AUDIT_FR14.md';

const fileStream = fs.createReadStream(logPath);
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

let mdContent = '# Raw Audit Log - FR-14 (Category Management (CRUD))\n\n';

rl.on('line', (line) => {
  if (!line.trim()) return;
  try {
    const entry = JSON.parse(line);
    const { step_index, source, type, created_at, content, tool_calls } = entry;
    
    if (source === 'USER_EXPLICIT') {
      mdContent += `## USER INPUT (Step ${step_index}) - ${created_at}\n\n`;
      mdContent += `${content}\n\n---\n\n`;
    } else if (source === 'SYSTEM' && type === 'CONVERSATION_HISTORY') {
      mdContent += `## SYSTEM CONVERSATION HISTORY - ${created_at}\n\n`;
      mdContent += `${content}\n\n---\n\n`;
    } else if (source === 'MODEL' && type === 'PLANNER_RESPONSE') {
      mdContent += `## AI RESPONSE (Step ${step_index}) - ${created_at}\n\n`;
      mdContent += `${content}\n\n`;
      if (tool_calls && tool_calls.length > 0) {
        mdContent += `### Tool Calls\n`;
        tool_calls.forEach(tc => {
          mdContent += `- **${tc.name}**: ${JSON.stringify(tc.args)}\n`;
        });
        mdContent += `\n`;
      }
      mdContent += `---\n\n`;
    }
  } catch (err) {
    console.error('Error parsing line:', err.message);
  }
});

rl.on('close', () => {
  fs.writeFileSync(outputPath, mdContent);
  console.log('Successfully generated RAW_AUDIT_FR14.md at:', outputPath);
});
