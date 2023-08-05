import { CoinSynch } from '@/components/LandingPage/CoinSynch'
import { Button } from '@/components/UI/Button'
import { Input } from '@/components/UI/Input'
import { useDialog } from '@/hook/useDialog'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import style from '../styles.module.css'

// Esquema de validação do Form
const schemaValidation = z.object({
  email: z.string().email(),
  password: z.string().min(4),
})

type IFormData = z.infer<typeof schemaValidation>

export function SignInForm() {
  const { setFormType, handleOpenDialog } = useDialog()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<IFormData>({
    resolver: zodResolver(schemaValidation),
  })

  // Ação de envio do formulário onde adiciona uma nova sessão na Fake API
  // e redireciona o usuário ao Dashboard
  async function onSubmitSignInForm(data: IFormData) {
    try {
      await api.post('/session', data)
      handleOpenDialog()
      router.push('/dashboard')
    } catch (error) {
      console.log('Error sending session form', error)
    }
  }

  return (
    <>
      <h4 className={style['dialog__title--lp']}>
        Sign in to <CoinSynch />
      </h4>
      <form className={style.form} onSubmit={handleSubmit(onSubmitSignInForm)}>
        <Input
          hasIcon={true}
          aria-label="Email"
          type="email"
          placeholder="Email"
          hasError={!!errors.email?.message}
          {...register('email')}
          disabled={isSubmitting}
        />
        <Input
          hasIcon={true}
          aria-label="Password"
          type="password"
          placeholder="Password"
          hasError={!!errors.password?.message}
          {...register('password')}
          disabled={isSubmitting}
        />
        <Link href={'/#'} className={style.form__link}>
          Forgot password?
        </Link>
        <Button
          variant="primary"
          size="md"
          type="submit"
          disabled={isSubmitting}
        >
          Sign in
        </Button>
      </form>
      <button
        disabled={isSubmitting}
        className={style.dialog__footer}
        onClick={() => setFormType({ type: 'signUp' })}
      >
        Don’t have an account? <strong>Sign up to</strong> <CoinSynch />
      </button>
    </>
  )
}
