// components/icons/Social.tsx
import { siTiktok, siInstagram, siFacebook } from 'simple-icons'

type Props = React.SVGProps<SVGSVGElement> & { size?: number }

export function IconTikTok({ size = 18, ...props }: Props) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...props}>
      <path d={siTiktok.path} fill="currentColor" />
    </svg>
  )
}

export function IconInstagram({ size = 18, ...props }: Props) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...props}>
      <path d={siInstagram.path} fill="currentColor" />
    </svg>
  )
}

export function IconFacebook({ size = 18, ...props }: Props) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...props}>
      <path d={siFacebook.path} fill="currentColor" />
    </svg>
  )
}