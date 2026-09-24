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

function navPillClasses(isActive: boolean) {
  return [
    'flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-bold transition-all sm:text-sm',
    isActive
      ? 'bg-gradient-to-r from-brand-pink-500 to-brand-pink-600 text-white shadow-lg shadow-brand-pink-900/30'
      : 'text-gray-400 hover:bg-white/5 hover:text-gray-200',
  ].join(' ')
}

function bottomNavClasses(isActive: boolean) {
  return [
    'flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-medium transition-colors',
    isActive ? 'text-brand-pink-400' : 'text-gray-500',
  ].join(' ')
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] text-gray-100">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,_rgba(254,44,85,0.16),_transparent_65%)]" />

      <header className="sticky top-0 z-30 border-b border-white/5 bg-[#0b0c12]/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1500px] items-center gap-4 px-4 py-3 md:px-8">
          <div className="flex shrink-0 items-center gap-2.5">
            <img src={`${import.meta.env.BASE_URL}icons/icon-192.png`} alt="Tikblox" className="h-9 w-9 rounded-xl shadow-lg shadow-black/40" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold leading-none tracking-tight text-white">TIKBLOX</span>
                <span className="hidden items-center gap-1 rounded-full bg-brand-pink-500/15 px-2 py-0.5 text-[10px] font-bold text-brand-pink-400 ring-1 ring-inset ring-brand-pink-500/30 sm:flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-pink-500" />
                  RADAR BR
                </span>
              </div>
              <span className="hidden text-[9px] font-semibold uppercase tracking-widest text-gray-500 md:block">
                Spy Viral <span className="text-brand-pink-500">•</span> Arbitragem{' '}
                <span className="text-brand-cyan-400">•</span> Dropshipping
              </span>
            </div>
          </div>

          <nav className="hide-scrollbar flex flex-1 items-center gap-1 overflow-x-auto">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => navPillClasses(isActive)}>
                <span aria-hidden="true">{item.icon}</span>
                <span className="hidden md:inline">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <span className="flex items-center gap-1.5 rounded-full border border-brand-cyan-500/30 bg-brand-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-brand-cyan-400">
              🔄 Escanear Tendências
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-300">
              🔔 Push
            </span>
          </div>
        </div>
      </header>

      <div className="relative mx-auto flex w-full max-w-[1500px] flex-col">
        <main className="flex-1 px-4 pb-24 pt-5 md:px-8 md:pb-10 md:pt-6">{children}</main>

        <nav className="fixed inset-x-0 bottom-0 z-20 flex border-t border-white/10 bg-[#0b0c12]/95 backdrop-blur md:hidden">
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
  )
}
