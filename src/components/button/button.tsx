import type { JSX } from 'react'
import styles from './button.module.scss'
import clsx from 'clsx'

export const buttonTypes = {
  submit: 'submit',
  reset: 'reset',
  button: 'button',
} as const

export type ButtonProps = {
  handleOnClick: React.MouseEventHandler<HTMLButtonElement>
  content: string | JSX.Element
  // children: ReactNode
  disabled?: boolean
  type?: keyof typeof buttonTypes
  classNames?: {
    base?: string
    button?: string
  }
}

export function Button({
  handleOnClick,
  content,
  type = 'button',
  disabled = false,
  classNames,
}: ButtonProps) {
  return (
    <div className={clsx(styles.base, classNames?.base)}>
      <button
        disabled={disabled}
        className={clsx(
          styles.button,
          disabled && styles.button__disabled,
          classNames?.button
        )}
        type={type}
        onClick={handleOnClick}
      >
        {content}
      </button>
    </div>
  )
}
