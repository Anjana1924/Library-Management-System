import type { ReactNode } from 'react';

export default function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="bg-light auth-page">
      <div className="glass-card">{children}</div>
      <h1 className="big-title">
        LIBRARY<br />MANAGEMENT<br />SYSTEM
      </h1>
    </div>
  );
}