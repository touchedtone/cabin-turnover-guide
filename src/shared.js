// Shared helpers used by both renderers.
window.flatSteps = g => g.sections.flatMap(s => s.steps.map(st => ({...st, section: s.title, sectionId: s.id})));
window.esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
window.imgSrc = p => p ? p.replace(/^photos\//, 'assets/photos/') : null;
