const sections = [...document.querySelectorAll('details.resume-section')];

function revealAnchor() {
  const target = document.getElementById(location.hash.slice(1));
  const section = target?.closest('details.resume-section');
  if (section) {
    section.open = true;
    requestAnimationFrame(() => target.scrollIntoView());
  }
}

window.addEventListener('hashchange', revealAnchor);
revealAnchor();

let printState;
window.addEventListener('beforeprint', () => {
  if (printState) return;
  printState = sections.map(section => section.open);
  sections.forEach(section => { section.open = true; });
});
window.addEventListener('afterprint', () => {
  if (!printState) return;
  sections.forEach((section, index) => { section.open = printState[index]; });
  printState = undefined;
});
