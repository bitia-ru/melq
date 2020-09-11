const fs = require('fs');
const marked = require('marked');

const slug = process.argv[2];
if (slug === undefined) {
  throw new Error('Slug is not set');
}
const dirFrom = process.argv[3] || './storage/posts';

fs.access(
  `${dirFrom}/${slug}/index.md`,
  fs.F_OK,
  (err) => {
    if (err) {
      throw new Error(err);
    }

    const content = fs.readFileSync(`${dirFrom}/${slug}/index.md`, 'utf8');
    process.stdout.write(marked(content));
  },
);
