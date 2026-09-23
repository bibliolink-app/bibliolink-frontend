import { useId, useState } from 'react'
import { CircleAlert, Eye, EyeOff } from 'lucide-react'

interface TextFieldProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'password'| 'date'
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  autoComplete?: string
  errors?: ReadonlyArray<string | undefined>
  disabled?: boolean
}

export function TextField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  autoComplete,
  errors = [],
  disabled,
}: TextFieldProps) {
  const id = useId()
  const errorId = `${id}-error`
  const [revealed, setRevealed] = useState(false)

  const messages = errors.filter((message): message is string => Boolean(message))
  const invalid = messages.length > 0
  const isPassword = type === 'password'

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold tracking-wide text-stone-900">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          name={name}
          type={isPassword && revealed ? 'text' : type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          autoComplete={autoComplete}
          autoCapitalize={type === 'email' ? 'none' : undefined}
          spellCheck={type === 'text' ? undefined : false}
          disabled={disabled}
          aria-invalid={invalid}
          aria-describedby={invalid ? errorId : undefined}
          className={`w-full rounded-md border border-stone-500 bg-stone-100 px-3.5 py-3 text-base text-stone-900 shadow-inner shadow-black/5 hover:border-yellow-800 focus-visible:border-yellow-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-800 disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-rose-900 aria-invalid:ring-1 aria-invalid:ring-rose-900 motion-safe:transition-colors ${isPassword ? 'pr-12' : ''}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setRevealed((current) => !current)}
            disabled={disabled}
            aria-label={revealed ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            aria-pressed={revealed}
            className="absolute inset-y-0 right-0 grid w-12 place-items-center rounded-r-md text-stone-600 hover:text-rose-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-yellow-800 disabled:cursor-not-allowed disabled:opacity-60 motion-safe:transition-colors"
          >
            {revealed ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        )}
      </div>

      {invalid && (
        <p id={errorId} className="flex items-start gap-1.5 text-sm font-medium text-rose-900">
          <CircleAlert className="mt-0.5 size-4 shrink-0" />
          <span>{messages.join(' ')}</span>
        </p>
      )}
    </div>
  )
}
