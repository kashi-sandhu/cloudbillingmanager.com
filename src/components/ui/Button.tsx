import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

type ButtonProps = {
  to?: string
  href?: string
  children: ReactNode
  variant?: 'accent' | 'brand' | 'outline' | 'ghost' | 'white' | 'line'
  size?: 'md' | 'lg'
  className?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  arrow?: boolean
  tip?: string
  tipDown?: boolean
  disabled?: boolean
  analytics?: string
}

const variants = {
  accent: 'bg-accent text-white hover:bg-accent-dark',
  brand: 'bg-brand text-white hover:bg-brand-dark',
  outline: 'border border-line bg-white text-brand-ink hover:border-brand hover:text-brand',
  ghost: 'text-brand-navy hover:bg-surface',
  white: 'bg-white text-brand-navy hover:bg-slate-100',
  line: 'border border-white/40 bg-transparent text-white hover:bg-white hover:text-brand-navy',
}

const sizes = {
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-sm',
}

export default function Button({
  to,
  href,
  children,
  variant = 'accent',
  size = 'md',
  className = '',
  type = 'button',
  onClick,
  arrow = true,
  tip,
  tipDown,
  disabled,
  analytics,
}: ButtonProps) {
  const classes = `btn-cta inline-flex items-center justify-center gap-2 rounded-lg text-center font-semibold disabled:pointer-events-none disabled:opacity-60 ${tip ? 'tip' : ''} ${tipDown ? 'tip-down' : ''} ${variants[variant]} ${sizes[size]} ${className}`
  const tipProps = tip ? { 'data-tip': tip } : {}
  const analyticsProps = analytics ? { 'data-analytics': analytics } : {}

  const content = (
    <>
      {children}
      {arrow ? <ArrowRight className="size-4 shrink-0" strokeWidth={2.25} /> : null}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...tipProps} {...analyticsProps}>
        {content}
      </Link>
    )
  }

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        className={classes}
        {...tipProps}
        {...analyticsProps}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {content}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled} {...tipProps} {...analyticsProps}>
      {content}
    </button>
  )
}
