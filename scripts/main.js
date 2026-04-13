const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
// canvas.width = canvasSize;
// canvas.height = canvasSize;

var canvasSize = 200;

window.addEventListener('resize', updateCanvasSize);

let dirty = true; // Initialzustand, falls nötig

function drawOnce() {
	const rng = linearCongruentialGenerator(options.seed);
	grid = new Hexagrid(
		options.sideCount,
		rng,
		options.searchIterationCount,
		options.forceCircleShape,
	);

	if (options.innerRelaxation !== 'None') {
		if (options.innerRelaxation === 'Weighted') {
			grid.relaxWeighted();
		} else {
			grid.relax();
		}

		if (options.sideRelaxation && !options.forceCircleShape) {
			grid.relaxSide();
		}
	}

	drawAllCanvasRotations();
	drawSVGGridAll();
}
updateCanvasSize();
drawOnce();

// ─── REGISTER ALL LISTENERS ───────────────────────────────────

function registerEvents() {
	// Theme toggle
	document.getElementById('theme-toggle')?.addEventListener('click', () => {
		const html = document.documentElement;
		const current =
			html.getAttribute('data-theme') ||
			(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
		html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
		syncThemeIcon();
	});
}

function syncThemeIcon() {
  // Dark Mode active  → sun icon    (clicking switches to Light)
  // Light Mode active → moon icon   (clicking switches to Dark)
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  btn.setAttribute('aria-label', isDark ? 'Light Mode aktivieren' : 'Dark Mode aktivieren');
  btn.setAttribute('title',      isDark ? 'Light Mode aktivieren' : 'Dark Mode aktivieren');
  const icon = btn.querySelector('[data-lucide]');
  if (icon) {
    icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
    // Re-render this single Lucide icon
    if (typeof lucide !== 'undefined') lucide.createIcons({ nodes: [icon] });
  }
}
