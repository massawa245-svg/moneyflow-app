import { BalanceProvider } from '@/context/BalanceContext';
// ... andere imports

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body>
        <BalanceProvider>
          {/* Dein bestehender Inhalt */}
          {children}
        </BalanceProvider>
      </body>
    </html>
  );
}
