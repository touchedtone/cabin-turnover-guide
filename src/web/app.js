// One step per screen, Next/Back, progress, resumes where you left off.
const G = window.GUIDE, steps = flatSteps(G), KEY = 'turnover:' + G.meta.version;
let i = 0; try { i = Math.min(+localStorage.getItem(KEY) || 0, steps.length - 1); } catch {}
const app = document.getElementById('app');
function render(){
  const s = steps[i], pct = Math.round(((i + 1) / steps.length) * 100);
  try { localStorage.setItem(KEY, i); } catch {}
  app.innerHTML = `
    <div class="top"><span>${esc(G.meta.title)}</span><span>${i + 1} / ${steps.length}</span></div>
    <div class="bar"><i style="width:${pct}%"></i></div>
    <div class="section">${esc(s.section)}</div>
    <h1>${esc(s.title)}</h1>
    ${s.photo ? `<img class="photo" src="${imgSrc(s.photo)}" alt="">` : ''}
    ${(s.do||[]).length ? `<ol class="do">${s.do.map(d => `<li>${esc(d)}</li>`).join('')}</ol>` : ''}
    ${(s.if||[]).map(c => `<div class="if"><b>If ${esc(c.when)}:</b> ${esc(c.then)}</div>`).join('')}
    ${(s.supplies||[]).length ? `<div class="supplies">Need: ${s.supplies.map(esc).join(', ')}</div>` : ''}
    <div class="nav">
      <button id="back" ${i === 0 ? 'disabled' : ''}>Back</button>
      <button id="next" class="primary">${i === steps.length - 1 ? 'Done' : 'Next'}</button>
    </div>
    <div style="text-align:center;margin-top:12px"><button class="link" id="restart">Start over</button></div>`;
  document.getElementById('back').onclick = () => { i--; render(); };
  document.getElementById('next').onclick = () => { if (i < steps.length - 1) { i++; render(); } };
  document.getElementById('restart').onclick = () => { i = 0; render(); };
  window.scrollTo(0, 0);
}
document.addEventListener('keydown', e => { if (e.key === 'ArrowRight' && i < steps.length - 1) { i++; render(); } if (e.key === 'ArrowLeft' && i > 0) { i--; render(); } });
render();
