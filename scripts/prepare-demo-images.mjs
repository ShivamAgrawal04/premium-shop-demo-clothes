/**
 * Builds unique demo images from curated generated assets.
 * Each output file gets a distinct crop/tint so product grids never look duplicated.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const assets = path.join(
  process.env.USERPROFILE || "",
  ".cursor",
  "projects",
  "d-Desktop-my-blog-website-premium-growth-website-for-marketing",
  "assets"
);
const out = path.join(root, "public", "images");

const bases = {
  hero: "hero-gentleman.jpg",
  wedding: "wedding-editorial.jpg",
  store: "store-interior.jpg",
  blazer: "product-blazer.jpg",
  sherwani: "product-sherwani.jpg",
  suit: "product-suit.jpg",
  bandhgala: "product-bandhgala.jpg",
  shirt: "product-shirt.jpg",
  kurta: "product-kurta.jpg",
  shoes: "product-shoes.jpg",
  accessories: "product-accessories.jpg",
};

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function assetPath(name) {
  return path.join(assets, name);
}

async function uniqueVariant(input, output, opts = {}) {
  ensureDir(path.dirname(output));
  const {
    width = 900,
    height = 1200,
    hue = 0,
    saturate = 1,
    brightness = 1,
    left = 0,
    top = 0,
    extractW,
    extractH,
    overlay,
  } = opts;

  const meta = await sharp(input).metadata();
  const srcW = meta.width || width;
  const srcH = meta.height || height;
  const ew = Math.min(extractW || Math.floor(srcW * 0.92), srcW);
  const eh = Math.min(extractH || Math.floor(srcH * 0.92), srcH);
  const l = Math.min(Math.max(0, left), Math.max(0, srcW - ew));
  const t = Math.min(Math.max(0, top), Math.max(0, srcH - eh));

  let pipeline = sharp(input)
    .extract({ left: l, top: t, width: ew, height: eh })
    .resize(width, height, { fit: "cover", position: "centre" })
    .modulate({ hue, saturation: saturate, brightness });

  if (overlay) {
    const overlaySvg = Buffer.from(
      `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${overlay}" stop-opacity="0.18"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0.08"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#g)"/>
      </svg>`
    );
    pipeline = pipeline.composite([{ input: overlaySvg, blend: "over" }]);
  }

  await pipeline.jpeg({ quality: 86, mozjpeg: true }).toFile(output);
  console.log("wrote", path.relative(root, output));
}

async function copyResize(input, output, width, height) {
  ensureDir(path.dirname(output));
  await sharp(input)
    .resize(width, height, { fit: "cover", position: "centre" })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(output);
  console.log("wrote", path.relative(root, output));
}

const productMap = [
  // blazers
  ["products/blazer-1.jpg", "blazer", { hue: 0, left: 20, top: 10, overlay: "#1B2A4A" }],
  ["products/blazer-2.jpg", "blazer", { hue: 18, left: 80, top: 40, saturate: 1.1, overlay: "#2C1810" }],
  ["products/blazer-3.jpg", "blazer", { hue: 210, left: 40, top: 90, brightness: 0.95, overlay: "#0E1A2B" }],
  ["products/blazer-4.jpg", "blazer", { hue: 340, left: 100, top: 20, saturate: 0.9, overlay: "#3A1C1C" }],
  // sherwanis
  ["products/sherwani-1.jpg", "sherwani", { hue: 0, left: 10, top: 10, overlay: "#F5F0E6" }],
  ["products/sherwani-2.jpg", "sherwani", { hue: 25, left: 60, top: 50, saturate: 1.15, overlay: "#D4AF37" }],
  ["products/sherwani-3.jpg", "sherwani", { hue: 200, left: 30, top: 80, brightness: 0.92, overlay: "#1A3A4A" }],
  ["products/sherwani-4.jpg", "sherwani", { hue: 40, left: 90, top: 30, overlay: "#E8D5B5" }],
  // suits
  ["products/suit-1.jpg", "suit", { hue: 0, left: 15, top: 15, overlay: "#36454F" }],
  ["products/suit-2.jpg", "suit", { hue: 220, left: 70, top: 40, overlay: "#1B2A4A" }],
  ["products/suit-3.jpg", "suit", { hue: 10, left: 40, top: 90, brightness: 0.9, overlay: "#111111" }],
  ["products/suit-4.jpg", "suit", { hue: 30, left: 100, top: 20, saturate: 0.85, overlay: "#4A3728" }],
  ["products/suit-5.jpg", "suit", { hue: 180, left: 50, top: 60, overlay: "#1F3A3A" }],
  // ethnic / bandhgala
  ["products/ethnic-1.jpg", "bandhgala", { hue: 0, left: 20, top: 20, overlay: "#6B1E2A" }],
  ["products/ethnic-2.jpg", "bandhgala", { hue: 40, left: 80, top: 50, overlay: "#8B5A2B" }],
  ["products/ethnic-3.jpg", "bandhgala", { hue: 280, left: 40, top: 80, overlay: "#2D1B4E" }],
  ["products/ethnic-4.jpg", "kurta", { hue: 90, left: 30, top: 40, overlay: "#2F4F3A" }],
  ["products/ethnic-5.jpg", "kurta", { hue: 20, left: 90, top: 10, overlay: "#C4A35A" }],
  // shirts
  ["products/shirt-1.jpg", "shirt", { hue: 0, left: 10, top: 10, overlay: "#F8F8F8" }],
  ["products/shirt-2.jpg", "shirt", { hue: 200, left: 70, top: 40, overlay: "#D6E4F0" }],
  ["products/shirt-3.jpg", "shirt", { hue: 30, left: 40, top: 80, overlay: "#E8DCC8" }],
  ["products/shirt-4.jpg", "shirt", { hue: 160, left: 100, top: 20, overlay: "#E0F0EA" }],
  // kurtas
  ["products/kurta-1.jpg", "kurta", { hue: 0, left: 15, top: 15, overlay: "#8FAE8B" }],
  ["products/kurta-2.jpg", "kurta", { hue: 40, left: 70, top: 50, overlay: "#E8C547" }],
  ["products/kurta-3.jpg", "kurta", { hue: 220, left: 35, top: 85, overlay: "#2C3E50" }],
  ["products/kurta-4.jpg", "kurta", { hue: 350, left: 95, top: 25, overlay: "#F5E6E0" }],
  ["products/kurta-5.jpg", "kurta", { hue: 120, left: 45, top: 60, overlay: "#1A4D3E" }],
  ["products/kurta-6.jpg", "kurta", { hue: 15, left: 110, top: 35, overlay: "#D2691E" }],
  // shoes
  ["products/shoe-1.jpg", "shoes", { hue: 0, left: 20, top: 20, overlay: "#5C4033" }],
  ["products/shoe-2.jpg", "shoes", { hue: 20, left: 80, top: 50, overlay: "#1A1A1A" }],
  ["products/shoe-3.jpg", "shoes", { hue: 35, left: 40, top: 90, overlay: "#8B4513" }],
  // accessories
  ["products/acc-1.jpg", "accessories", { hue: 0, left: 10, top: 10, overlay: "#C9A227" }],
  ["products/acc-2.jpg", "accessories", { hue: 200, left: 70, top: 40, overlay: "#2F4F4F" }],
  ["products/acc-3.jpg", "accessories", { hue: 40, left: 40, top: 80, overlay: "#8B0000" }],
  ["products/acc-4.jpg", "accessories", { hue: 280, left: 100, top: 20, overlay: "#4B0082" }],
  ["products/acc-5.jpg", "accessories", { hue: 160, left: 50, top: 60, overlay: "#006666" }],
  ["products/acc-6.jpg", "accessories", { hue: 10, left: 90, top: 30, overlay: "#A0522D" }],
  // casual / trousers
  ["products/casual-1.jpg", "shirt", { hue: 25, left: 30, top: 50, saturate: 0.8, overlay: "#8B7355" }],
  ["products/casual-2.jpg", "kurta", { hue: 50, left: 80, top: 20, brightness: 1.05, overlay: "#D2B48C" }],
  ["products/trouser-1.jpg", "suit", { hue: 210, left: 60, top: 100, extractH: 600, overlay: "#2C3E50" }],
  ["products/trouser-2.jpg", "suit", { hue: 30, left: 100, top: 120, extractH: 600, overlay: "#4A3728" }],
  ["products/trouser-3.jpg", "blazer", { hue: 0, left: 40, top: 140, extractH: 600, brightness: 0.88, overlay: "#1A1A1A" }],
];

const categoryMap = [
  ["categories/wedding.jpg", "sherwani", { hue: 15, width: 900, height: 1200, overlay: "#D4AF37" }],
  ["categories/party.jpg", "bandhgala", { hue: 320, width: 900, height: 1200, overlay: "#4A0E2E" }],
  ["categories/casual.jpg", "shirt", { hue: 40, width: 900, height: 1200, overlay: "#8B7355" }],
  ["categories/formal.jpg", "suit", { hue: 210, width: 900, height: 1200, overlay: "#1B2A4A" }],
  ["categories/sherwanis.jpg", "sherwani", { hue: 5, width: 900, height: 1200, overlay: "#F5F0E6" }],
  ["categories/bandhgala.jpg", "bandhgala", { hue: 0, width: 900, height: 1200, overlay: "#6B1E2A" }],
  ["categories/kurtas.jpg", "kurta", { hue: 80, width: 900, height: 1200, overlay: "#2F4F3A" }],
  ["categories/accessories.jpg", "accessories", { hue: 20, width: 900, height: 1200, overlay: "#C9A227" }],
];

const collectionMap = [
  ["collections/wedding.jpg", "sherwani", { hue: 10, width: 1200, height: 1500 }],
  ["collections/formal.jpg", "suit", { hue: 215, width: 1200, height: 1500 }],
  ["collections/casual.jpg", "shirt", { hue: 35, width: 1200, height: 1500 }],
  ["collections/party.jpg", "bandhgala", { hue: 330, width: 1200, height: 1500 }],
  ["collections/ethnic.jpg", "kurta", { hue: 45, width: 1200, height: 1500 }],
  ["collections/suits.jpg", "blazer", { hue: 200, width: 1200, height: 1500 }],
  ["collections/wedding-hero.jpg", "wedding", { hue: 5, width: 1600, height: 1000 }],
  ["collections/formal-hero.jpg", "blazer", { hue: 210, width: 1600, height: 1000 }],
  ["collections/casual-hero.jpg", "shirt", { hue: 30, width: 1600, height: 1000 }],
  ["collections/party-hero.jpg", "bandhgala", { hue: 340, width: 1600, height: 1000 }],
  ["collections/ethnic-hero.jpg", "kurta", { hue: 70, width: 1600, height: 1000 }],
  ["collections/suits-hero.jpg", "suit", { hue: 220, width: 1600, height: 1000 }],
];

async function main() {
  for (const key of Object.keys(bases)) {
    const p = assetPath(bases[key]);
    if (!fs.existsSync(p)) {
      throw new Error(`Missing generated asset: ${p}`);
    }
  }

  await copyResize(assetPath(bases.hero), path.join(out, "editorial/hero.jpg"), 1920, 1080);
  await copyResize(assetPath(bases.wedding), path.join(out, "editorial/wedding-hero.jpg"), 1600, 1200);
  await copyResize(assetPath(bases.store), path.join(out, "editorial/store.jpg"), 1400, 1400);
  // tailor: use store with different crop + warm grade
  await uniqueVariant(assetPath(bases.store), path.join(out, "editorial/tailor.jpg"), {
    width: 1200,
    height: 1500,
    left: 120,
    top: 40,
    hue: 15,
    saturate: 1.05,
    overlay: "#B8956C",
  });

  for (const [rel, baseKey, opts] of productMap) {
    await uniqueVariant(assetPath(bases[baseKey]), path.join(out, rel), {
      width: 900,
      height: 1200,
      ...opts,
    });
  }

  for (const [rel, baseKey, opts] of categoryMap) {
    await uniqueVariant(assetPath(bases[baseKey]), path.join(out, rel), opts);
  }

  for (const [rel, baseKey, opts] of collectionMap) {
    const input =
      baseKey === "wedding" || baseKey === "hero" || baseKey === "store"
        ? assetPath(bases[baseKey])
        : assetPath(bases[baseKey]);
    await uniqueVariant(input, path.join(out, rel), {
      width: 1200,
      height: 1500,
      ...opts,
    });
  }

  // also keep sherwani-blue as a variant
  await uniqueVariant(assetPath(bases.sherwani), path.join(out, "products/sherwani-blue.jpg"), {
    width: 900,
    height: 1200,
    hue: 200,
    left: 50,
    top: 40,
    overlay: "#1A3A5C",
  });

  console.log("Demo images prepared.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
