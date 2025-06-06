import { HubHeader } from './_components/hub-header';

export default function HubLayout({ children }: WithChildren) {
  return (
    <div className="relative">
      <HubHeader />
      <div className="absolute top-20 min-h-(--content-height) w-screen">
        {children}
      </div>
    </div>
  );
}
