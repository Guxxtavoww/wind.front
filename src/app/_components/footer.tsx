import Link from 'next/link';

export function Footer() {
  return (
    <footer className="text-foreground/50 absolute bottom-2 right-0 left-0 text-center text-sm">
      Desenvolvido por {' '}
      <Link
        href="https://gustavo-augusto-portfolio.vercel.app/"
        target="_blank"
      >
        Gustavo Augusto Cardoso de Almeida
      </Link>{' '}
      & Ricardo Leggieri Assenza &copy; {new Date().getFullYear()}
    </footer>
  );
}
