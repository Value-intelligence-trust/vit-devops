# vit-devops

Shared DevOps tooling, CI/CD templates, and automation scripts for the VIT Network ecosystem
(org: `Value-intelligence-trust`).

## Scripts

All scripts live in `scripts/` and are plain Node.js (no dependencies beyond the built-in
`fetch`). Each requires a `GITHUB_TOKEN` environment variable with `repo` + `admin:org` scope.

| Script | Purpose |
|---|---|
| `scripts/bootstrap_repo.js` | Apply standard files (LICENSE, SECURITY, CONTRIBUTING, CODEOWNERS, templates, Dependabot) to a repo |
| `scripts/create_labels.js` | Create the standard label set on a repo |
| `scripts/create_milestones.js` | Create the standard milestone set on a repo |
| `scripts/audit_org.js` | Produce a JSON health snapshot of every repo in the org |
| `scripts/health_report.js` | Turn an audit snapshot into a human-readable Markdown report |

## Usage

```bash
export GITHUB_TOKEN=ghp_xxx
node scripts/bootstrap_repo.js <repo-name>
node scripts/create_labels.js <repo-name>
node scripts/create_milestones.js <repo-name>
node scripts/audit_org.js > audit.json
node scripts/health_report.js audit.json > HEALTH_REPORT.md
```

## CI Template

`templates/ci-node.yml` and `templates/ci-python.yml` are reusable GitHub Actions starting points
for new repos — copy into `.github/workflows/ci.yml` and adjust as needed.
