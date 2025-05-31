// This directory structure (hosting/app) is deprecated if using hosting/src/app or the root app.
// The main Next.js application is at the project root.
import type { ReactNode } from 'react';

export default function DeprecatedLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <div>This is a deprecated layout.</div>
        {children}
      </body>
    </html>
  );
}
