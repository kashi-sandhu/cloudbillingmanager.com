import { useImperativeHandle, useState, forwardRef } from 'react'
import { RefreshCw, ShieldCheck } from 'lucide-react'
import { createCaptchaChallenge, isCaptchaAnswerCorrect, type CaptchaChallenge } from '../../lib/formSecurity.ts'

export type FormCaptchaHandle = {
  /** Returns true when the answer is correct; otherwise refreshes the challenge. */
  verify: () => boolean
  reset: () => void
}

type Props = {
  id?: string
}

const FormCaptcha = forwardRef<FormCaptchaHandle, Props>(function FormCaptcha({ id = 'form-captcha' }, ref) {
  const [challenge, setChallenge] = useState<CaptchaChallenge>(() => createCaptchaChallenge())
  const [value, setValue] = useState('')
  const [invalid, setInvalid] = useState(false)

  function refresh() {
    setChallenge(createCaptchaChallenge())
    setValue('')
    setInvalid(false)
  }

  useImperativeHandle(ref, () => ({
    verify() {
      const ok = isCaptchaAnswerCorrect(challenge, value)
      if (!ok) {
        setInvalid(true)
        setChallenge(createCaptchaChallenge())
        setValue('')
        return false
      }
      setInvalid(false)
      return true
    },
    reset() {
      refresh()
    },
  }))

  return (
    <div className="form-captcha" role="group" aria-labelledby={`${id}-label`}>
      <div className="form-captcha-head">
        <span className="form-captcha-ico" aria-hidden>
          <ShieldCheck className="size-4" strokeWidth={2.25} />
        </span>
        <div className="min-w-0">
          <p id={`${id}-label`} className="form-captcha-title">
            Security check
          </p>
          <p className="form-captcha-hint">Confirm you are human before sending this form.</p>
        </div>
      </div>

      <div className="form-captcha-row">
        <label htmlFor={id} className="form-captcha-prompt">
          What is <span className="form-captcha-sum">{challenge.prompt}</span>?
          <span className="text-accent"> *</span>
        </label>
        <div className="form-captcha-controls">
          <input
            id={id}
            name="captchaAnswer"
            inputMode="numeric"
            autoComplete="off"
            spellCheck={false}
            required
            value={value}
            onChange={(event) => {
              setValue(event.target.value)
              if (invalid) setInvalid(false)
            }}
            aria-invalid={invalid}
            aria-describedby={invalid ? `${id}-error` : undefined}
            className={`form-captcha-input${invalid ? ' is-invalid' : ''}`}
            placeholder="Answer"
          />
          <button
            type="button"
            className="form-captcha-refresh"
            onClick={refresh}
            aria-label="Get a new security question"
            title="New question"
          >
            <RefreshCw className="size-4" strokeWidth={2.25} />
          </button>
        </div>
      </div>
      {invalid ? (
        <p id={`${id}-error`} className="form-captcha-error">
          Incorrect answer. Please try the new question.
        </p>
      ) : null}
    </div>
  )
})

export default FormCaptcha
