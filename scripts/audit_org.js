#!/usr/bin/env node
// Produces a JSON health snapshot of every repo in the org.
// Usage: GITHUB_TOKEN=xxx node audit_org.js [org] > audit.json
const TOKEN = process.env.GITHUB_TOKEN;
const ORG = process.argv[2] || 'Value-intelligence-trust';
const HEADERS = { Authorization: `token ${TOKEN}`, 'User-Agent': 'vit-devops-audit', Accept: 'application/vnd.github+json' };

async function get(url) {
  const res = await fetch(url, { headers: HEADERS });
  return res.status === 200 ? res.json() : null;
}

(async () => {
  const repos = await get(`https://api.github.com/orgs/${ORG}/repos?per_page=100&type=all`);
  const out = [];
  for (const r of repos) {
    const protection = await get(`https://api.github.com/repos/${ORG}/${r.name}/branches/${r.default_branch}/protection`);
    const workflows = await get(`https://api.github.com/repos/${ORG}/${r.name}/actions/workflows`);
    out.push({
      name: r.name, private: r.private, default_branch: r.default_branch,
      language: r.language, size_kb: r.size, open_issues: r.open_issues_count,
      archived: r.archived, branch_protected: !!protection,
      workflows: workflows ? workflows.total_count : 0,
      pushed_at: r.pushed_at,
    });
  }
  console.log(JSON.stringify(out, null, 2));
})();
