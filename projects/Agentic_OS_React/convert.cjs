const fs = require('fs');
let html = fs.readFileSync('../Agentic_OS_Premium/index.html', 'utf8');
const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/i);
if (!bodyMatch) process.exit(1);

let body = bodyMatch[1];
// 1. Convert class -> className
body = body.replace(/class=/g, 'className=');
// 2. Remove comments
body = body.replace(/<!--[\s\S]*?-->/g, '');
// 3. Make img tags self closing
body = body.replace(/<img([^>]*?)>/g, '<img$1 />');
// 4. Make br tags self closing
body = body.replace(/<br>/g, '<br />');
// 5. Remove scripts
body = body.replace(/<script.*?>.*?<\/script>/g, '');
// 6. Delete webgl div because we use LegacyWebGLParticles component
body = body.replace(/<div id="webgl-container"><\/div>/g, '');

const tsxContent = `import React, { useEffect } from 'react';\nimport { initLegacyScripts } from '@/lib/legacy-scripts';\nimport { LegacyWebGLParticles } from '@/components/ui/legacy-particles';\n\nexport function LandingPage() {\n  useEffect(() => {\n    const cleanup = initLegacyScripts();\n    return cleanup;\n  }, []);\n\n  return (\n    <div className="relative z-10 w-full text-white font-sans overflow-hidden">\n      {/* PARTICLES LEGADO (ThreeJs) */}\n      <LegacyWebGLParticles />\n      \n` + body + `\n    </div>\n  );\n};\nexport default LandingPage;`;

fs.mkdirSync('./src/components/layout', { recursive: true });
fs.writeFileSync('./src/components/layout/LandingPage.tsx', tsxContent);
console.log('JSX Generated successfully');
