export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-[var(--border-line)] bg-[var(--bg-panel)] text-[var(--text-body)] transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          
          {/* DIREITOS AUTORAIS */}
          <p className="text-xs text-center sm:text-left">
            &copy; {currentYear} E-Commerce Core API. Todos os direitos reservados.
          </p>

          {/* LINKS AUXILIARES */}
          <div className="flex gap-6 text-xs">
            <a href="#privacy" className="hover:text-[var(--text-title)] transition-colors">
              Privacidade
            </a>
            <a href="#terms" className="hover:text-[var(--text-title)] transition-colors">
              Termos de Uso
            </a>
            <a href="#support" className="hover:text-[var(--text-title)] transition-colors">
              Suporte
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
