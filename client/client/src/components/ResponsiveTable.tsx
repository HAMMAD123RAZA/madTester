import React from 'react';
import { useResponsive } from '@/hooks/useResponsive';

interface ResponsiveTableProps {
  children: React.ReactNode;
}

export function ResponsiveTable({ children }: ResponsiveTableProps) {
  const { isMobile } = useResponsive();

  if (isMobile) {
    return (
      <div className="overflow-x-auto -mx-4 px-4">
        {children}
      </div>
    );
  }

  return <div className="overflow-x-auto">{children}</div>;
}
