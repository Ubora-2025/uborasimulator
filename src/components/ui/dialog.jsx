// src/components/ui/dialog.jsx
import React from 'react';

export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;
  return (
    <div
      onClick={() => onOpenChange(false)}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      {children}
    </div>
  );
}

export function DialogContent({ children }) {
  return (
    <div className="bg-white rounded p-6 max-w-md w-full">
      {children}
    </div>
  );
}

export function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2 className="text-xl font-bold">{children}</h2>;
}

export function DialogFooter({ children }) {
  return <div className="mt-4 text-right">{children}</div>;
}
