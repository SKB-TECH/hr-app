type ButtonProps = {
  children: React.ReactNode
  variant?: 'hero' | 'arrow'
  onClick?: () => void
}

export default function Button({ children, variant = 'hero', onClick }: ButtonProps) {
  return (
    <button className={variant === 'arrow' ? 'arrow-btn' : 'hero-btn'} onClick={onClick}>
      {children}
    </button>
  )
}
