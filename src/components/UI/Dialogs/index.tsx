/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CloseIcon } from '@/components/Icons/CloseIcon'
import { useDialog } from '@/hook/useDialog'
import * as Dialog from '@radix-ui/react-dialog'
import { Roboto } from 'next/font/google'
import { AddCryptoForm } from './AddCryptoForm'
import { SignInForm } from './SignInForm'
import { SignUpForm } from './SignUpForm'
import { TransferCryptoForm } from './TransferCryptoForm'

import style from './styles.module.css'
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] })

export function Dialogs() {
  const { openDialog, formType, setOpenDialog } = useDialog()

  return (
    <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
      <Dialog.Portal>
        <Dialog.Overlay className={style.dialog__overlay} />
        <Dialog.Content
          onInteractOutside={(e) => {
            e.preventDefault()
          }}
          className={`${roboto.className} ${style.dialog__content} ${
            style[`dialog__content--${formType?.type}`]
          }`}
        >
          <Dialog.Close asChild className={style['dialog__close-button']}>
            <button aria-label="Close">
              <CloseIcon />
            </button>
          </Dialog.Close>
          {formType?.type === 'signIn' && <SignInForm />}
          {formType?.type === 'signUp' && <SignUpForm />}
          {formType?.type === 'addCrypto' && <AddCryptoForm />}
          {formType?.type === 'transferCrypto' && <TransferCryptoForm />}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
