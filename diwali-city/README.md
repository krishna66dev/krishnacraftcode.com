# ✨ Diwali City — 3D City of Lights
Procedural Three.js (r160) night city: buildings, roads, parks, fountain, people with sparklers, fireworks, diyas, rangoli, bloom.

## Run
ES modules need a local server (do not open via file://):
```
cd diwali-city
python3 -m http.server 8000   # or: npx serve
```
Open http://localhost:8000. Internet needed for CDN (Three.js, Bootstrap, fonts).

## Controls
Drag = rotate, right-drag = pan, scroll/pinch = zoom. Hover buildings, click diyas/buildings/ground. Dock: Fireworks, Celebration mode, Day/Night, Reset. Sound is off until you click the speaker (synthesized, no files).

## Notes / limitations
People are procedural low-poly figures; sidewalks use plain colors rather than textured paving; reflections are simulated with glow decals, not true mirror reflection. Particle counts auto-reduce on mobile and quality drops if FPS is low.
