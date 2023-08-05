import { CoinSynch } from '@/components/LandingPage/CoinSynch'
import { Button } from '@/components/UI/Button'
import { Checkbox } from '@/components/UI/Checkbox'
import { Input } from '@/components/UI/Input'
import { useDialog } from '@/hook/useDialog'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import style from './../styles.module.css'

// Esquema de validação do Form
const schemaValidation = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
    terms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept Terms and Conditions' }),
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      })
    }
  })

type IFormData = z.infer<typeof schemaValidation>

export function SignUpForm() {
  const router = useRouter()
  const { setFormType, handleOpenDialog } = useDialog()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<IFormData>({
    resolver: zodResolver(schemaValidation),
  })

  // Ação de envio do formulário onde adiciona uma nova conta na Fake API
  // e redireciona o usuário ao Dashboard
  async function onSubmitSigUpForm(data: IFormData) {
    try {
      await api.post('/register', data)
      router.push('/dashboard')
    } catch (error) {
      console.log('Error sending SignUp form', error)
    } finally {
      handleOpenDialog()
    }
  }

  return (
    <>
      <h4 className={style['dialog__title--lp']}>
        Sign up to <CoinSynch />
      </h4>
      <form className={style.form} onSubmit={handleSubmit(onSubmitSigUpForm)}>
        <Input
          hasIcon={true}
          aria-label="Name"
          type="name"
          placeholder="Name"
          {...register('name')}
          hasError={!!errors.name?.message}
          disabled={isSubmitting}
        />
        <Input
          hasIcon={true}
          aria-label="Email"
          type="email"
          placeholder="Email"
          {...register('email')}
          hasError={!!errors.email?.message}
          disabled={isSubmitting}
        />
        <Input
          hasIcon={true}
          aria-label="Password"
          type="password"
          placeholder="Password"
          {...register('password')}
          hasError={!!errors.password?.message}
          disabled={isSubmitting}
        />
        <Input
          hasIcon={true}
          aria-label="Confirm your password"
          type="password"
          placeholder="Confirm your password"
          {...register('confirmPassword')}
          hasError={!!errors.confirmPassword?.message}
          disabled={isSubmitting}
        />
        <Checkbox
          {...register('terms')}
          hasError={!!errors.terms?.message}
          disabled={isSubmitting}
        >
          I have read and accept the<strong> Privacy Policy</strong> and
          <strong> Terms of User</strong>.
        </Checkbox>
        <Button
          variant="primary"
          size="md"
          type="submit"
          disabled={isSubmitting}
        >
          Sign up
        </Button>
      </form>
      <button
        className={style.dialog__footer}
        onClick={() => setFormType({ type: 'signIn' })}
      >
        Don’t have an account? <strong>Sign in to</strong> <CoinSynch />
      </button>
    </>
  )
}
