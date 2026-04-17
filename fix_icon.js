const fs = require('fs');
let planos = fs.readFileSync('src/pages/Planos.tsx', 'utf8');
planos = planos.replace('<span className=" [font-variation-settings:\'FILL\'_1]">star</span>', '<span className="material-symbols-outlined text-tertiary text-sm mt-1 [font-variation-settings:\'FILL\'_1]">star</span>');
fs.writeFileSync('src/pages/Planos.tsx', planos);
console.log('ICON_RESTORED');