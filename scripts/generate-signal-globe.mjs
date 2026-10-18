// Natural Earth land polygons, public domain. Run with node scripts/generate-signal-globe.mjs.
import { readFileSync, writeFileSync } from "node:fs";

const source = JSON.parse(readFileSync(new URL("../public/projects/signal-land.geojson", import.meta.url), "utf8"));
const rings = source.features.flatMap(feature => feature.geometry.type === "Polygon"
  ? [feature.geometry.coordinates[0]]
  : feature.geometry.coordinates.map(polygon => polygon[0]));
const polygons = rings.map(ring => ({
  ring,
  minX: Math.min(...ring.map(p => p[0])), maxX: Math.max(...ring.map(p => p[0])),
  minY: Math.min(...ring.map(p => p[1])), maxY: Math.max(...ring.map(p => p[1])),
}));
function inside(x, y, ring) {
  let result = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j];
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) result = !result;
  }
  return result;
}
const dots = [];
for (let lat = -58; lat <= 82; lat += 1.8) {
  const step = 1.8 / Math.cos(lat * Math.PI / 180);
  for (let lon = -180; lon < 180; lon += step) {
    if (polygons.some(p => lon >= p.minX && lon <= p.maxX && lat >= p.minY && lat <= p.maxY && inside(lon, lat, p.ring))) {
      dots.push([+lon.toFixed(2), +lat.toFixed(2)]);
    }
  }
}
const coasts = rings.filter(ring => ring.length > 12).map(ring => ring.map(([lon, lat]) => [+lon.toFixed(2), +lat.toFixed(2)]));
writeFileSync(new URL("../public/projects/signal-globe.json", import.meta.url), JSON.stringify({ dots, coasts }));
console.log(`SIGNAL globe: ${dots.length} land particles / ${coasts.length} coastlines`);
