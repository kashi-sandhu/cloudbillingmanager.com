/** Lightweight form anti-bot helpers (works with FormSubmit AJAX). */

export type CaptchaChallenge = {
  a: number
  b: number
  answer: number
  prompt: string
}

export function createCaptchaChallenge(): CaptchaChallenge {
  const a = 2 + Math.floor(Math.random() * 8)
  const b = 1 + Math.floor(Math.random() * 7)
  return {
    a,
    b,
    answer: a + b,
    prompt: `${a} + ${b}`,
  }
}

export function isCaptchaAnswerCorrect(challenge: CaptchaChallenge, value: string): boolean {
  const cleaned = value.replace(/\s+/g, '')
  if (!/^\d{1,3}$/.test(cleaned)) return false
  return Number(cleaned) === challenge.answer
}

/** True when a honeypot field was filled (bot behaviour). */
export function isHoneypotTripped(formData: FormData): boolean {
  const traps = ['_honey', 'company_website', 'website_url']
  return traps.some((name) => String(formData.get(name) ?? '').trim().length > 0)
}
