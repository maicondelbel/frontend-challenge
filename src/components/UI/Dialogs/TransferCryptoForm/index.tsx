import { Button } from '@/components/UI/Button'
import { Input } from '@/components/UI/Input'
import { SelectTransferType } from '@/components/UI/Selects/SelectTransferType'
import { useDialog } from '@/hook/useDialog'
import { api } from '@/lib/axios'
import { queryClient } from '@/lib/reactQuery'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'

import style from './../styles.module.css'

// Esquema de validação do Form
const schemaValidation = z.object({
  transfer: z.string(),
  quantity: z.coerce.number().min(1),
})

type IFormData = z.infer<typeof schemaValidation>

interface ITransferCryptoData {
  quantity: number
}

export function TransferCryptoForm() {
  const { selectedCrypto, handleOpenDialog } = useDialog()

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<IFormData>({
    resolver: zodResolver(schemaValidation),
  })

  // Mutation de atualização da crypto selecionada para transferencia
  async function mutationTransferCrypto({ quantity }: ITransferCryptoData) {
    return await api.patch(`/my_wallet/${selectedCrypto?.crypto.id}`, {
      quantity,
    })
  }

  const createTransferCrypto = useMutation({
    mutationFn: async ({ quantity }: ITransferCryptoData) =>
      mutationTransferCrypto({ quantity }),
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

  // Mutation responsável por remover a crypto da carteira caso a transferência for superior à quantidade atual
  async function mutationRemoveCrypto() {
    return await api.delete(`/my_wallet/${selectedCrypto?.crypto.id}`)
  }

  const deleteCrypto = useMutation({
    mutationFn: async () => mutationRemoveCrypto(),
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

  // Ações do envio do formulário onde será determinado se a quantidade de crypto
  // transferida será adicionada ou removida da carteira
  async function onSubmitTransferCryptoForm(data: IFormData) {
    if (selectedCrypto && data.transfer === 'in') {
      await createTransferCrypto.mutateAsync({
        quantity: selectedCrypto?.crypto.quantity + data.quantity,
      })
    }
    if (selectedCrypto && data.transfer === 'out') {
      const quantity = selectedCrypto?.crypto.quantity - data.quantity

      if (quantity <= 0) {
        await deleteCrypto.mutateAsync()
      } else {
        await createTransferCrypto.mutateAsync({ quantity })
      }
    }
  }

  return (
    <>
      <h4 className={style['dialog__title--db']}>Tansfer Crypto</h4>
      <div className={style.separator} />
      <div className={style['selected-coin']}>
        <span>You are transfering</span>
        <div className={style['selected-coin__wrapper']}>
          <Image
            src={`https://assets.coincap.io/assets/icons/${selectedCrypto?.crypto.logo}@2x.png`}
            width={24}
            height={24}
            alt="Coin"
          />
          <div>
            <span className={style['coin-name']}>
              {selectedCrypto?.crypto.name}
            </span>
            <span className={style['coin-symbol']}>
              {selectedCrypto?.crypto.symbol}
            </span>
          </div>
        </div>
      </div>
      <form
        className={style.form}
        onSubmit={handleSubmit(onSubmitTransferCryptoForm)}
      >
        <div>
          <label>Transfer</label>
          <Controller
            name="transfer"
            control={control}
            render={({ field }) => (
              <SelectTransferType
                onValueChange={field.onChange}
                hasError={!!errors.transfer?.message}
                disabled={isSubmitting}
              />
            )}
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity</label>
          <Input
            type="number"
            min={0}
            {...register('quantity')}
            hasError={!!errors.quantity?.message}
            disabled={isSubmitting}
          />
        </div>
        <Button
          variant="primary"
          size="md"
          type="submit"
          disabled={isSubmitting}
        >
          Transfer Crypto
        </Button>
      </form>
    </>
  )
}
