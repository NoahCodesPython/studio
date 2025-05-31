// Placeholder - Main layout.tsx is at /src/app/layout.tsx
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <div>This is a placeholder layout in the hosting directory. The main app is at the project root.</div>
        {children}
      </body>
    </html>
  );
}
