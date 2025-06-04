import { Lock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { InputWithIcons } from '@/components/ui/input-with-icons';
import { AppLink } from '@/components/ui/app-link';

export default function Home() {
  return (
    <div className="w-screen min-h-svh flex items-center justify-center flex-col gap-6">
      <h2 className="font-bold text-5xl">Pin</h2>
      <form className="flex items-center gap-3">
        <InputWithIcons
          placeholder="Insira seu pin"
          leftIcon={Lock}
          required={true}
          autoFocus={true}
        />
        <Button type="submit">Login</Button>
      </form>
      <AppLink href="/teste" variant="link" className="text-primary -mt-3">
        Sou solicitante
      </AppLink>
    </div>
  );
}
