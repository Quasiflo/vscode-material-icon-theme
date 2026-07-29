import { existsSync, readdirSync, rmSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';

const cleanDir = (dir: string) => {
  if (!existsSync(dir)) return;
  for (const file of readdirSync(dir)) {
    if (file.includes('~')) {
      unlinkSync(join(dir, file));
    }
  }
  const clonesDir = join(dir, 'clones');
  rmSync(clonesDir, { recursive: true, force: true });
};

// Clean stale ~ files from tracked icons/ (leftover from pre-env-var sessions)
cleanDir(join(import.meta.dirname, '..', '..', '..', 'icons'));
// Clean working copy in dist/ (rimraf already removes it, but safe for standalone use)
cleanDir(join(import.meta.dirname, '..', '..', '..', 'dist', 'icons'));
