"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-zinc-950 group-[.toaster]:text-white group-[.toaster]:border-white/10 group-[.toaster]:shadow-2xl rounded-none font-light tracking-wide",
          description: "group-[.toast]:text-white/50",
          actionButton:
            "group-[.toast]:bg-white group-[.toast]:text-black rounded-none",
          cancelButton:
            "group-[.toast]:bg-zinc-800 group-[.toast]:text-white rounded-none",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
