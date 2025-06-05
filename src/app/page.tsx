import { AppLink } from '@/components/ui/app-link';

import { PinForm } from './_components/pin-form';

export default function Home() {
  return (
    <div className="w-screen min-h-svh flex items-center justify-center flex-col gap-6">
      <h2 className="font-bold text-5xl">Pin</h2>
      <PinForm />
      <AppLink href="/solicitor" variant="link" className="text-primary -mt-3">
        Sou solicitante
      </AppLink>
    </div>
  );
}
