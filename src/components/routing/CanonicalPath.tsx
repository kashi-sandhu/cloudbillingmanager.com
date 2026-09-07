import { useLayoutEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

/**
 * Apache DirectoryIndex often serves /about/ while React routes are /about.
 * Strip trailing slashes so every page matches and "Page not found" does not flash.
 */
export default function CanonicalPath({ children }: { children: React.ReactNode }) {
  const { pathname, search, hash } = useLocation()
  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (pathname.length > 1 && pathname.endsWith('/')) {
      navigate(`${pathname.replace(/\/+$/, '')}${search}${hash}`, { replace: true })
    }
  }, [pathname, search, hash, navigate])

  return children
}
