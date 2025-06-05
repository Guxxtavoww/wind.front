import { HubHeader } from './_components/hub-header';

export default function HubLayout({ children }: WithChildren) {
  return (
    <div className="relative">
      <HubHeader />
      <div className="absolute top-20 pt-3 min-h-[calc(100svh-5rem)] w-full grid place-items-center">
        {children}
      </div>
    </div>
  );
}
