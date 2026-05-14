const fs = require('fs');
let content = fs.readFileSync('components/ApartmentDetail.tsx', 'utf8');

// Global replacements
content = content.replace(/bg-\[#F5F2ED\]/g, 'bg-[#f8f6f3]');
content = content.replace(/text-\[#3D4536\]/g, 'text-black');
content = content.replace(/bg-\[#3D4536\]/g, 'bg-black');
content = content.replace(/border-\[#3D4536\]\/15/g, 'border-black/[0.06]');
content = content.replace(/border-\[#3D4536\]\/20/g, 'border-black/[0.08]');
content = content.replace(/border-\[#3D4536\]\/10/g, 'border-black/[0.04]');
content = content.replace(/text-\[#3D4536\]\/70/g, 'text-black/70');
content = content.replace(/text-\[#3D4536\]\/60/g, 'text-black/50');
content = content.replace(/text-\[#3D4536\]\/50/g, 'text-black/40');
content = content.replace(/text-\[#3D4536\]\/40/g, 'text-black/30');
content = content.replace(/bg-\[#3D4536\]\/\[0\.06\]/g, 'bg-black/[0.03]');
content = content.replace(/bg-\[#005433\]/g, 'bg-black');
content = content.replace(/text-\[#005433\]/g, 'text-black');
content = content.replace(/shadow-\[#005433\]\/30/g, 'shadow-black/20');
content = content.replace(/border-\[#005433\]/g, 'border-black');
content = content.replace(/fontFamily: "'Georgia', 'Times New Roman', serif"/g, 'fontFamily: "var(--font-serif)"');
content = content.replace(/fontFamily: "'Roboto', sans-serif"/g, 'fontFamily: "var(--font-roboto)"');

// Typography adjustments
content = content.replace(/text-sm uppercase tracking-widest text-black\/40 font-medium/g, 'text-[10px] uppercase tracking-[0.3em] text-black/40 font-normal');
content = content.replace(/text-2xl font-bold/g, 'text-2xl font-light italic" style={{ fontFamily: "var(--font-serif)" }}');
content = content.replace(/text-xs font-bold px-4 py-1\.5 rounded-full uppercase tracking-wider/g, 'text-[9px] font-normal px-4 py-2 rounded-full uppercase tracking-[0.3em]');
content = content.replace(/text-3xl md:text-5xl font-bold/g, 'text-5xl md:text-7xl font-light italic tracking-[-0.02em]');

// Fix style on text-2xl replacements
content = content.replace(/text-2xl font-light italic" style=\{\{ fontFamily: "var\(--font-serif\)" \}\}"/g, 'text-2xl font-light italic" style={{ fontFamily: "var(--font-serif)" }}');

fs.writeFileSync('components/ApartmentDetail.tsx', content);
console.log('Styles updated.');
