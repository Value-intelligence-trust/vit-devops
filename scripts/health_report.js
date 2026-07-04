#!/usr/bin/env node
// Turns an audit_org.js JSON snapshot into a Markdown health report.
// Usage: node health_report.js audit.json > HEALTH_REPORT.md
const fs = require('fs');
const file = process.argv[2];
if (!file) { console.error('Usage: node health_report.js <audit.json>'); process.exit(1); }
const repos = JSON.parse(fs.readFileSync(file, 'utf-8'));

console.log('# Repository Health Report\n');
console.log('| Repo | Protected | Workflows | Open Issues | Language | Last Push |');
console.log('|---|---|---|---|---|---|');
for (const r of repos) {
  console.log(`| ${r.name} | ${r.branch_protected ? '✅' : '❌'} | ${r.workflows} | ${r.open_issues} | ${r.language || '-'} | ${r.pushed_at} |`);
}
const protectedCount = repos.filter(r => r.branch_protected).length;
console.log(`\n**Branch protection coverage:** ${protectedCount}/${repos.length} repos\n`);
