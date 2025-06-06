'use client';

import { Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useMutationWithToast } from '@/hooks/use-mutation-with-toast.hook';

import { Button } from '@/components/ui/button';
import { InputWithIcons } from '@/components/ui/input-with-icons';

import { pinAction } from '../_actions/pin.action';

export function PinForm() {
  const router = useRouter();
  const { mutateAsync, isPending, disabled } = useMutationWithToast({
    mutationKey: ['pin'],
    mutationFn: async (data: FormData) => pinAction(data),
    onSuccess: () => router.replace('/hub'),
    toastCustomSuccessMessage: 'Login realizado com sucesso!',
  });

  return (
    <form
      className="flex items-center gap-3 flex-col"
      action={(data) => mutateAsync(data)}
    >
      <InputWithIcons
        placeholder="Insira seu pin"
        leftIcon={Lock}
        required={true}
        autoFocus={true}
        name="pin"
        disabled={disabled}
        type="number"
      />
      <Button
        type="submit"
        disabled={disabled}
        isLoading={isPending}
        className="w-full"
      >
        Login
      </Button>
    </form>
  );
}
