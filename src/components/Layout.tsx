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
    'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all',
    isActive
      ? 'bg-gradient-to-r from-violet-600/25 to-cyan-500/10 text-white shadow-[inset_0_0_0_1px_rgba(139,92,246,0.35)]'
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
      <div className="pointer-events-none fixed inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,_rgba(124,58,237,0.18),_transparent_65%)]" />

      <div className="relative mx-auto flex w-full max-w-[1500px]">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-white/5 bg-[#0d1220]/60 px-4 py-6 md:flex">
          <div className="mb-8 flex items-center gap-2.5 px-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 text-lg shadow-lg shadow-violet-900/40">
              🧊
            </span>
            <div>
              <span className="block text-base font-extrabold leading-none tracking-tight">
                <span className="gradient-text">Tik</span>blox
              </span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-gray-600">
                Product Research
              </span>
            </div>
          </div>

          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-gray-600">
            Navegação
          </p>
          <nav className="flex flex-1 flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => navLinkClasses(isActive)}>
                <span className="text-base" aria-hidden="true">
                  {item.icon}
                </span>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="card-surface rounded-2xl p-4">
            <p className="text-xs font-semibold text-gray-200">🚀 Domínio oficial</p>
            <p className="mt-1 text-[11px] text-gray-500">Publicando em breve em</p>
            <p className="gradient-text text-sm font-bold">tikblox.com.br</p>
          </div>
        </aside>

        <div className="flex min-h-screen w-full flex-col">
          <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-white/5 bg-[var(--color-bg-base)]/85 px-4 py-3 backdrop-blur md:px-8 md:py-4">
            <div className="flex items-center gap-2 md:hidden">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 text-base">
                🧊
              </span>
              <span className="font-bold">
                <span className="gradient-text">Tik</span>blox
              </span>
            </div>

            <div className="ml-auto hidden items-center gap-3 md:flex">
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Dados atualizados agora
              </span>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-base hover:bg-white/10"
                aria-label="Notificações"
              >
                🔔
              </button>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 text-sm font-bold text-white">
                TB
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 pb-24 pt-4 md:px-8 md:pb-10 md:pt-6">{children}</main>

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
