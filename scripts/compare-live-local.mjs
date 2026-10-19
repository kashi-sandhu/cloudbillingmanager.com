import { readFileSync } from 'node:fs'

const local = readFileSync('dist/index.html', 'utf8')
const live = await (await fetch('https://cloudbillingmanager.com/')).text()
const robots = await (await fetch('https://cloudbillingmanager.com/robots.txt')).text()

console.log('LOCAL js:', (local.match(/assets\/[^"]+\.js/) || [])[0])
console.log('LIVE  js:', (live.match(/assets\/[^"]+\.js/) || [])[0])
console.log('LOCAL has slash-strip script?', local.includes("path.charAt(path.length - 1) === '/'"))
console.log('LIVE  has slash-strip script?', live.includes("path.charAt(path.length - 1) === '/'"))
console.log('LOCAL has pricing chunk refs?', /Pricing-/.test(local) || local.includes('/pricing'))
console.log('\n--- LIVE robots.txt ---\n')
console.log(robots)
console.log('\n--- LOCAL robots first lines ---\n')
console.log(readFileSync('dist/robots.txt', 'utf8').split('\n').slice(0, 45).join('\n'))
