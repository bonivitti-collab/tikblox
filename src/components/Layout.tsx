import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

interface NavItem {
  to: string
  label: string
  icon: string
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Todos os Produtos', icon: '📦' },
  { to: '/ondas-iniciais', label: 'Ondas Iniciais', icon: '🌊' },
  { to: '/alta-margem', label: 'Alta Margem', icon: '💰' },
  { to: '/calculadora', label: 'Calculadora', icon: '🧮' },
  { to: '/favoritos', label: 'Favoritos', icon: '⭐' },
]

function navLinkClasses(isActive: boolean) {
  return [
    'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
    isActive
      ? 'bg-violet-600/15 text-white ring-1 ring-inset ring-violet-500/40'
      : 'text-gray-400 hover:bg-white/5 hover:text-gray-200',
  ].join(' ')
}

function bottomNavClasses(isActive: boolean) {
  return [
    'flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-medium transition-colors',
    isActive ? 'text-violet-400' : 'text-gray-500',
  ].join(' ')
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] text-gray-100">
      <div className="mx-auto flex w-full max-w-[1400px]">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-white/5 px-4 py-6 md:flex">
          <div className="mb-8 flex items-center gap-2 px-2">
            <span className="text-2xl">🧊</span>
            <span className="text-lg font-bold tracking-tight">
              <span className="gradient-text">Tik</span>blox
            </span>
          </div>
          <nav className="flex flex-1 flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => navLinkClasses(isActive)}>
                <span aria-hidden="true">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <p className="px-2 text-xs text-gray-600">
            Dados mockados para demonstração.
            <br />
            tikblox.com.br
          </p>
        </aside>

        <div className="flex min-h-screen w-full flex-col">
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/5 bg-[var(--color-bg-base)]/90 px-4 py-3 backdrop-blur md:hidden">
            <div className="flex items-center gap-2">
              <span className="text-xl">🧊</span>
              <span className="font-bold">
                <span className="gradient-text">Tik</span>blox
              </span>
            </div>
          </header>

          <main className="flex-1 px-4 pb-24 pt-4 md:px-8 md:pb-10 md:pt-8">{children}</main>

          <nav className="fixed inset-x-0 bottom-0 z-20 flex border-t border-white/10 bg-[#0f1420]/95 backdrop-blur md:hidden">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => bottomNavClasses(isActive)}>
                <span className="text-lg" aria-hidden="true">
                  {item.icon}
                </span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
