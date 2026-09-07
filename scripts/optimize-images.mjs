import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const publicDir = path.resolve('public')
const imagesDir = path.join(publicDir, 'images')

const dirs = {
  brand: path.join(imagesDir, 'brand'),
  og: path.join(imagesDir, 'og'),
  products: path.join(imagesDir, 'products'),
  banners: path.join(publicDir, 'banners'),
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

async function writeWebp(input, output, options = {}) {
  await sharp(input).webp({ quality: options.quality ?? 78, effort: 6 }).toFile(output)
}

async function writeJpeg(input, output, options = {}) {
  await sharp(input)
    .jpeg({ quality: options.quality ?? 78, mozjpeg: true })
    .toFile(output)
}

async function writePng(input, output, options = {}) {
  await sharp(input)
    .png({ compressionLevel: 9, palette: options.palette ?? false })
    .toFile(output)
}

async function optimizeBanner(file) {
  const input = path.join(dirs.banners, file)
  const base = file.replace(/\.(jpe?g|png)$/i, '')
  const webp = path.join(dirs.banners, `${base}.webp`)
  const tmpJpg = path.join(dirs.banners, `${base}.opt.jpg`)

  const image = sharp(input).rotate()
  const meta = await image.metadata()
  const width = Math.min(meta.width ?? 1600, 1600)

  await image
    .clone()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 76, effort: 6 })
    .toFile(webp)

  // Responsive variants for hero slides
  if (base.startsWith('home-')) {
    for (const w of [640, 960, 1280]) {
      const out = path.join(dirs.banners, `${base}-${w}w.webp`)
      await sharp(input)
        .rotate()
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: 74, effort: 6 })
        .toFile(out)
    }
  }

  await sharp(input)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(tmpJpg)

  fs.renameSync(tmpJpg, input)

  const before = fs.statSync(input).size
  const afterWebp = fs.statSync(webp).size
  console.log(`banner ${file} → webp ${(afterWebp / 1024).toFixed(1)}KB (jpg rewritten)`)
  return { file, before, afterWebp }
}

async function main() {
  Object.values(dirs).forEach(ensureDir)

  // Banners
  const bannerFiles = fs
    .readdirSync(dirs.banners)
    .filter((f) => /\.(jpe?g|png)$/i.test(f) && !f.includes('.opt.'))
  for (const file of bannerFiles) {
    await optimizeBanner(file)
  }

  // Brand logo from logo.png
  const logoSrc = path.join(publicDir, 'logo.png')
  const logoTmp = path.join(dirs.brand, 'logo-tmp.png')
  await sharp(logoSrc)
    .resize({ width: 512, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(logoTmp)
  fs.copyFileSync(logoTmp, path.join(dirs.brand, 'cloudbillingmanager-logo.png'))
  await writeWebp(logoTmp, path.join(dirs.brand, 'cloudbillingmanager-logo.webp'), { quality: 90 })
  // Replace root logo.png with compressed version (favicon/manifest)
  fs.renameSync(logoTmp, logoSrc)
  console.log('Optimized logo.png and brand logos')

  // Product invoice screenshot (optional legacy PNG)
  const invoiceSrc = path.join(publicDir, 'invoiceg.png')
  const invoiceWebpExisting = path.join(publicDir, 'invoiceg.webp')
  if (fs.existsSync(invoiceSrc)) {
    const productWebp = path.join(dirs.products, 'cloudbillingmanager-sales-invoice.webp')
    await sharp(invoiceSrc)
      .resize({ width: 1400, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(productWebp)
    await writeWebp(invoiceSrc, path.join(publicDir, 'invoiceg.webp'), { quality: 80 })
    console.log('Optimized invoice screenshot')
  } else if (fs.existsSync(invoiceWebpExisting)) {
    console.log('invoiceg.webp already present — skip PNG optimize')
  }

  // Compress oversized backgrounds if still present as PNG/JPG
  for (const name of ['bg-image.png', 'bg2-image.png', 'footer.png', 'bg-image.jpg', 'bg2-image.jpg']) {
    const src = path.join(publicDir, name)
    if (!fs.existsSync(src)) continue
    const base = name.replace(/\.(png|jpe?g)$/i, '')
    const webp = path.join(publicDir, `${base}.webp`)
    await sharp(src)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 72, effort: 6 })
      .toFile(webp)
    console.log(`Optimized ${name}`)
  }

  // OG / social share image 1200x630 from home overview
  const ogSource = path.join(dirs.banners, 'home-overview.jpg')
  const ogJpg = path.join(dirs.og, 'cloudbillingmanager-og.jpg')
  const ogWebp = path.join(dirs.og, 'cloudbillingmanager-og.webp')
  const logoOverlay = path.join(dirs.brand, 'cloudbillingmanager-logo.png')

  const ogBase = await sharp(ogSource)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .modulate({ brightness: 0.55 })
    .toBuffer()

  const logoBuf = await sharp(logoOverlay).resize({ width: 420 }).toBuffer()
  const svg = Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="rgba(22,48,84,0.35)"/>
      <text x="80" y="420" fill="#ffffff" font-family="Arial, sans-serif" font-size="42" font-weight="700">Cloud Billing Manager</text>
      <text x="80" y="470" fill="#dbe7f5" font-family="Arial, sans-serif" font-size="26">Inventory, billing &amp; POS for UK food distributors</text>
    </svg>
  `)

  await sharp(ogBase)
    .composite([
      { input: svg, top: 0, left: 0 },
      { input: logoBuf, top: 72, left: 80 },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(ogJpg)

  await sharp(ogJpg).webp({ quality: 80 }).toFile(ogWebp)
  console.log('Created OG images')

  // Summary sizes
  const report = []
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (/\.(png|jpe?g|webp)$/i.test(entry.name)) {
        report.push({ path: path.relative(publicDir, full), bytes: fs.statSync(full).size })
      }
    }
  }
  walk(publicDir)
  report.sort((a, b) => b.bytes - a.bytes)
  console.log('\nTop 15 assets by size:')
  for (const item of report.slice(0, 15)) {
    console.log(`  ${(item.bytes / 1024).toFixed(1).padStart(8)} KB  ${item.path}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
