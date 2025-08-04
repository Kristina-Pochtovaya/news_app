import clsx from 'clsx'
import styles from './input.module.scss'

export const inputTypes = {
  text: 'text',
  number: 'number',
} as const

export type inputConfigurationType = {
  placeholder?: string
  required?: boolean
  disabled?: boolean
}

export type InputProps = {
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined
  configuration?: inputConfigurationType
  value?: string
  type?: keyof typeof inputTypes
  title?: string
  classNames?: {
    base?: string
    title?: string
    input?: string
  }
}

export function Input({
  onChange,
  classNames,
  title,
  configuration,
  value,
  type = inputTypes.text,
}: InputProps) {
  return (
    <div className={clsx(styles.base, classNames?.base)}>
      {title !== undefined && (
        <p className={clsx(styles.title, classNames?.title)}>{title}</p>
      )}
      <input
        className={clsx(styles.input, classNames?.input)}
        onChange={onChange}
        type={type}
        value={value}
        {...configuration}
      />
    </div>
  )
}
