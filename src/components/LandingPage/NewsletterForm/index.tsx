import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '../../UI/Button'

import style from './styles.module.css'

// Esquema de validação do Form
const schemaValidation = z.object({
  email: z.string().email(),
})

type IFormData = z.infer<typeof schemaValidation>

export function NewsletterForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<IFormData>({
    resolver: zodResolver(schemaValidation),
  })

  // Ações de envio do formulário onde é adicionado o email à Fake API e limpa o input
  async function onSubmit(data: IFormData) {
    try {
      await api.post('/newsletter', data)
    } catch (error) {
      console.log('Error sending newsletter', error)
    } finally {
      reset()
    }
  }

  return (
    <form className={style.newsletter__form} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email</label>
      <input
        {...register('email')}
        disabled={isSubmitting}
        className={`${style.newsletter__input} ${
          !!errors.email?.message && style['newsletter__input--error']
        }`}
      />
      <Button
        size="md"
        variant="primary"
        type="submit"
        withShadow={true}
        disabled={isSubmitting}
      >
        Subscribe
      </Button>
    </form>
  )
}
