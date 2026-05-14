const fs = require('fs');
let content = fs.readFileSync('components/ApartmentDetail.tsx', 'utf8');

// Labels
content = content.replace(/<p className="text-\[10px\] uppercase tracking-\[0\.4em\] text-black\/50 mb-6 font-semibold">/g, '<p className="text-[9px] uppercase tracking-[0.6em] text-black/30 mb-8 font-normal">');
content = content.replace(/<p className="text-\[10px\] uppercase tracking-\[0\.4em\] text-white\/40 mb-6 font-semibold">/g, '<p className="text-[9px] uppercase tracking-[0.6em] text-white/30 mb-8 font-normal">');

// Subheadings that are still font-bold
content = content.replace(/<h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8" style=\{\{ fontFamily: "var\(--font-serif\)" \}\}>/g, '<h2 className="text-5xl md:text-7xl font-light italic tracking-[-0.02em] leading-tight mb-8 text-black/80" style={{ fontFamily: "var(--font-serif)" }}>');
content = content.replace(/<h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8" style=\{\{ fontFamily: "var\(--font-serif\)" \}\}>/g, '<h2 className="text-5xl md:text-7xl font-light italic tracking-[-0.02em] leading-tight mb-8" style={{ fontFamily: "var(--font-serif)" }}>');
content = content.replace(/<h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8"/g, '<h2 className="text-5xl md:text-7xl font-light italic tracking-[-0.02em] leading-tight mb-8"');

// Fix the specs background
content = content.replace(/bg-\[#EDE9E3\]/g, 'bg-black/[0.02]');

fs.writeFileSync('components/ApartmentDetail.tsx', content);
console.log('Fixed titles');
