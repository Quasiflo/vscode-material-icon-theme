import { copyFile, mkdir, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const sourceDir = join(import.meta.dirname, '..', '..', '..', 'icons');
const destDir = join(import.meta.dirname, '..', '..', '..', 'dist', 'icons');

try {
  await mkdir(destDir, { recursive: true });
  const files = await readdir(sourceDir);

  for (const file of files) {
    if (file.endsWith('.svg')) {
      await copyFile(join(sourceDir, file), join(destDir, file));
    }
  }

  console.log(
    `Copied ${files.filter((f) => f.endsWith('.svg')).length} icons to ${destDir}`
  );
} catch (error) {
  console.error('Failed to copy icons:', error);
  process.exit(1);
}
