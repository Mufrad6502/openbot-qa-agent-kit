import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';

// Read-only, allowlisted export. Never copy the live database or browser data.
const [database, destination] = process.argv.slice(2);
if (!database || !destination) {
  throw new Error('Usage: node scripts/export-openbot.mjs <openbot.db> <new-output-directory>');
}
const out = resolve(destination);
if (existsSync(out)) throw new Error('Output must be a new directory; existing exports are preserved.');
const query = `SELECT json_extract(agent_json,'$.name') AS name,
  json_extract(agent_json,'$.title') AS title,
  json_extract(agent_json,'$.description') AS description,
  json_extract(agent_json,'$.provider') AS provider, model,
  json_extract(agent_json,'$.access') AS access,
  json_extract(agent_json,'$.computerUse') AS computerUse,
  json_extract(agent_json,'$.reasoningEffort') AS reasoningEffort
  FROM projection_agents ORDER BY sort_order;`;
const names = new Set(['QA Lead', 'Product Discovery', 'Manual QA', 'API QA',
  'Test Case & Reporting', 'Playwright Automation', 'Do What I Say']);
const rows = JSON.parse(execFileSync('sqlite3', ['-readonly', '-json', database, query], { encoding: 'utf8' }));
const agents = rows.filter(row => names.has(row.name)).map(row => ({
  name: row.name, title: row.title ?? '', description: row.description ?? '',
  provider: row.provider, model: row.model,
  access: row.access, computerUse: Boolean(row.computerUse), reasoningEffort: row.reasoningEffort
}));
if (agents.length !== names.size || new Set(agents.map(a => a.name)).size !== names.size) {
  throw new Error('Expected exactly seven distinct configured agents; review installation before exporting.');
}
const serialized = JSON.stringify({
  format: 'openbot-qa-agent-kit.snapshot.v1',
  note: 'Portable reference snapshot, not a supported OpenBot native import format.',
  exportedAt: new Date().toISOString(), agents
}, null, 2) + '\n';
if (/\/Users\/|gh[pousr]_[A-Za-z0-9]+|github_pat_|sk-[A-Za-z0-9]{16,}|-----BEGIN .*PRIVATE KEY-----/.test(serialized)) {
  throw new Error('Potential private path or secret in selected fields. Review locally; nothing exported.');
}
mkdirSync(out, { recursive: true });
writeFileSync(join(out, 'agents.json'), serialized, { flag: 'wx' });
console.log(`Exported ${agents.length} agent definitions; live data was opened read-only.`);
