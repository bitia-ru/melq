let fs = require('fs');
let marked = require('marked');

let slug = process.argv[2]
if (slug === undefined){
  throw new Error('Slug is not set');
}
let dirFrom = process.argv[3] || './storage/posts'

fs.access(`${dirFrom}/${slug}/index.md`, fs.F_OK, (err) => {
  if (err) {
    throw new Error(err);
    return;
  }

  let content = fs.readFileSync(`${dirFrom}/${slug}/index.md`, 'utf8');
  console.log(marked(content));
})
