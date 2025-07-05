import 'react';

/* Resolve svgr imports */
/// <reference types="vite-plugin-svgr/client" />

/* Allow dialog closedBy */
// https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#closedby
declare module 'react' {
  interface DialogHTMLAttributes<T> extends React.HTMLAttributes<T> {
    closedBy?: string;
  }
}
