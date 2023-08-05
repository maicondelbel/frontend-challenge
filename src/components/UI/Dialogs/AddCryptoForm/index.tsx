import { Button } from '@/components/UI/Button'
import { Input } from '@/components/UI/Input'
import { SelectInputCryptos } from '@/components/UI/Selects/SelectCryptos'
import { useDialog } from '@/hook/useDialog'
import { useGetAllCryptos } from '@/hook/useGetAllCrypto'
import { ICryptoInWallet, useGetMyWallet } from '@/hook/useGetMyWallet'
import { api } from '@/lib/axios'
import { queryClient } from '@/lib/reactQuery'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'

import style from './../styles.module.css'

// Esquema de validação do Form
const schemaValidation = z.object({
  cryto: z.string(),
  quantity: z.coerce.number().min(1),
})

type IFormData = z.infer<typeof schemaValidation>

interface ITransferCryptoData {
  id: number
  quantity: number
}

export function AddCryptoForm() {
  const { data: cryptos } = useGetAllCryptos()
  const { data: myWallet } = useGetMyWallet()
  const { handleOpenDialog, selectedCrypto } = useDialog()

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<IFormData>({
    resolver: zodResolver(schemaValidation),
  })

  // Mutation responsável por atualizar a quantidade de crypto
  // caso ela já exista na carteira
  async function mutationUpdateCryptoInWallet({
    quantity,
    id,
  }: ITransferCryptoData) {
    return await api.patch(`/my_wallet/${id}`, {
      quantity,
    })
  }

  const updateCryptoInWallet = useMutation({
    mutationFn: async ({ quantity, id }: ITransferCryptoData) =>
      mutationUpdateCryptoInWallet({ quantity, id }),
    onMutate: async () => {
      await queryClient.invalidateQueries({ queryKey: ['wallet'] })
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['wallet'] })
      handleOpenDialog()
    },
    onError: () => {
      handleOpenDialog()
    },
  })

  // Mutation responsável por adicionar uma nova crypto à carteira
  async function mutationAddCryptoInWallet(crypto: ICryptoInWallet) {
    return await api.post(`/my_wallet/`, {
      ...crypto,
    })
  }

  const addCryptoInWallet = useMutation({
    mutationFn: async (crypto: ICryptoInWallet) =>
      mutationAddCryptoInWallet(crypto),
    onMutate: async () => {
      await queryClient.invalidateQueries({ queryKey: ['wallet'] })
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['wallet'] })
      handleOpenDialog()
    },
    onError: () => {
      handleOpenDialog()
    },
  })

  // Ações do envio do formulário onde é definido qual Mutation é realizada:
  // A de atualização ou a de criação
  async function onSubmitAddCryptoForm(data: IFormData) {
    const cryptoInMyWallet = myWallet?.filter(
      (item) => item.symbol === data.cryto,
    )

    if (cryptoInMyWallet?.length === 0) {
      if (selectedCrypto?.crypto) {
        await addCryptoInWallet.mutateAsync({
          ...selectedCrypto?.crypto,
          quantity: data.quantity,
        })
      }
    } else {
      if (cryptoInMyWallet) {
        await updateCryptoInWallet.mutateAsync({
          quantity: cryptoInMyWallet[0].quantity + data.quantity,
          id: cryptoInMyWallet[0].id,
        })
      }
    }
  }

  return (
    <>
      <h4 className={style['dialog__title--db']}>Add Crypto</h4>
      <form
        className={style.form}
        onSubmit={handleSubmit(onSubmitAddCryptoForm)}
      >
        <div>
          <Controller
            name="cryto"
            control={control}
            render={({ field }) => (
              <SelectInputCryptos
                data={cryptos}
                onValueChange={field.onChange}
                hasError={!!errors.cryto?.message}
                disabled={isSubmitting}
                selectedValue={field.value}
              />
            )}
          />
        </div>
        <Input
          placeholder="Quantity"
          type="number"
          min={0}
          {...register('quantity')}
          hasError={!!errors.quantity?.message}
          disabled={isSubmitting}
        />
        <Button
          variant="primary"
          size="md"
          type="submit"
          disabled={isSubmitting}
        >
          Add Crypto
        </Button>
      </form>
    </>
  )
}
