const fs = require('fs');
const path = require('path');


const schemaPath = path.join(__dirname, 'schema.prisma');
const dbProvider = process.env.DB_PROVIDER || 'postgresql';

let schema = fs.readFileSync(schemaPath, 'utf8');

// Reemplaza provider en el bloque datasource (este es el más importante)
schema = schema.replace(
  /datasource\s+\w+\s+\{[^}]*?provider\s*=\s*".*?"[^}]*?\}/gs,
  match => match.replace(/provider\s*=\s*".*?"/, `provider = "${dbProvider}"`)
);



fs.writeFileSync(schemaPath, schema);
console.log(`✅ Reemplazo completado:
- datasource.provider = "${dbProvider}"
`);