// floorplan.yaml + photos.yaml -> SVG. Colors come from CSS vars so the theme restyles it.
const DIR = {N:[0,-1],NE:[.7,-.7],E:[1,0],SE:[.7,.7],S:[0,1],SW:[-.7,.7],W:[-1,0],NW:[-.7,-.7]};
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
export function renderFloorplan(fp, photos = []) {
  const {w, h, wall: t} = fp.room, o = [];
  o.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-40 -40 ${w+80} ${h+80}" font-family="-apple-system,Helvetica,Arial,sans-serif">`);
  o.push(`<style>.wall{fill:var(--ink,#1f1d1a)}.floor{fill:var(--surface,#fff)}.furniture{fill:#d9d2c5;stroke:#8a8172;stroke-width:3}.soft{fill:#e6eadf;stroke:#8a9a78;stroke-width:3}.shelf{fill:#b8a58a}.fixture{fill:#9c8f7c}.room{fill:#efeae1;stroke:#8a8172;stroke-width:3}.off{stroke-dasharray:14 10;fill-opacity:.35}.approx{stroke-dasharray:4 6}.lbl{font-size:30px;fill:var(--ink,#1f1d1a)}.raf{stroke:#8a8172;stroke-width:22;stroke-opacity:.25}.cam{fill:var(--accent,#2f5d50)}.camt{font-size:26px;font-weight:700;fill:#fff}.pt{font-size:24px;fill:#c0532f;font-weight:600;paint-order:stroke;stroke:#fff;stroke-width:6px}.door{fill:none;stroke:var(--ink-2,#5c5750);stroke-width:4;stroke-dasharray:10 8}</style>`);
  o.push(`<rect class="floor" x="0" y="0" width="${w}" height="${h}"/>`);
  // walls (window gap in north wall, door gap in south wall)
  const d = fp.door;
  o.push(`<rect class="wall" x="0" y="0" width="${fp.window.x1}" height="${t}"/><rect class="wall" x="${fp.window.x2}" y="0" width="${w-fp.window.x2}" height="${t}"/>`);
  o.push(`<rect x="${fp.window.x1}" y="4" width="${fp.window.x2-fp.window.x1}" height="${t-8}" fill="#cfe3ea" stroke="#1f1d1a" stroke-width="3"/>`);
  o.push(`<rect class="wall" x="0" y="0" width="${t}" height="${h}"/><rect class="wall" x="0" y="${h-t}" width="${w}" height="${t}"/>`);
  o.push(`<rect class="wall" x="${w-t}" y="0" width="${t}" height="${d.hinge_y-d.r}"/>`);
  o.push(`<path class="door" d="M ${d.hinge_x-d.r} ${d.hinge_y} A ${d.r} ${d.r} 0 0 1 ${d.hinge_x} ${d.hinge_y-d.r}"/><line x1="${d.hinge_x}" y1="${d.hinge_y}" x2="${d.hinge_x-d.r*0.7}" y2="${d.hinge_y-d.r*0.7}" stroke="#1f1d1a" stroke-width="8"/>`);
  for (const x of fp.rafters) o.push(`<line class="raf" x1="${x}" y1="${t}" x2="${x}" y2="${h-t}"/>`);
  for (const it of fp.items) {
    const cls = `${it.kind} ${it.confidence === 'off' ? 'off' : it.confidence === 'approx' ? 'approx' : ''}`;
    o.push(`<rect id="${it.id}" class="${cls}" x="${it.x}" y="${it.y}" width="${it.w}" height="${it.h}" rx="6"/>`);
  }
  const bm = fp.bed_made;
  if (bm) {
    o.push(`<rect x="${bm.runner.x}" y="${bm.runner.y}" width="${bm.runner.w}" height="${bm.runner.h}" fill="#6b4f3a" fill-opacity=".55"/>`);
    for (const p of bm.pillows) o.push(`<rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" rx="22" fill="#f4efe6" stroke="#8a8172" stroke-width="3"/>`);
    for (const p of bm.throws) o.push(`<rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" rx="10" fill="#b5ab9c" stroke="#8a8172" stroke-width="3"/>`);
  }
  for (const it of fp.items) {
    if (it.id === 'bed' || it.nolabel) continue;
    if (it.w < 120 && it.h < 120) continue;
    const vert = it.h > it.w * 1.6 && it.w < 200, cx = it.x + it.w/2, cy = it.y + it.h/2 + (it.id === "closet" ? 90 : 0) + (it.label_dy || 0);
    o.push(`<text class="lbl" x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="middle"${vert ? ` transform="rotate(-90 ${cx} ${cy})"` : ''}>${esc(it.label)}${it.confidence==='off'?' (?)':''}</text>`);
  }
  o.push(`<text class="lbl" x="${(fp.window.x1+fp.window.x2)/2}" y="-10" text-anchor="middle">Window</text><text class="lbl" x="${w+8}" y="${d.hinge_y-d.r/2}" text-anchor="middle" transform="rotate(90 ${w+8} ${d.hinge_y-d.r/2})">Entry door</text>`);
  for (const p of fp.points || []) {
    const right = p.x > fp.room.w / 2;
    o.push(`<circle cx="${p.x}" cy="${p.y}" r="11" fill="#c0532f"/><text class="pt" x="${p.x + (right ? -20 : 20)}" y="${p.y}" text-anchor="${right ? 'end' : 'start'}" dominant-baseline="middle">${esc(p.label)}</text>`);
  }
  for (const p of photos) {
    if (!p.camera) continue;
    const {x, y, facing} = p.camera, [dx, dy] = DIR[facing] || [0,0];
    o.push(`<g id="cam-${p.id}"><line x1="${x}" y1="${y}" x2="${x+dx*90}" y2="${y+dy*90}" stroke="var(--accent,#2f5d50)" stroke-width="8" marker-end="url(#a)"/><circle class="cam" cx="${x}" cy="${y}" r="26"/><text class="camt" x="${x}" y="${y+1}" text-anchor="middle" dominant-baseline="middle">${esc(p.id)}</text></g>`);
  }
  o.push(`<defs><marker id="a" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--accent,#2f5d50)"/></marker></defs></svg>`);
  return o.join('\n');
}
