const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
  return (
    <header className="app-header">
      <Link to="/" className="logo">
        <svg viewBox="0 0 120 100" width="48" height="40">
          <line
            x1="21"
            y1="22"
            x2="60"
            y2="78"
            stroke="#202124"
            strokeWidth="14"
          />
          <line
            x1="60"
            y1="50"
            x2="99"
            y2="50"
            stroke="#202124"
            strokeWidth="14"
          />
          <line
            x1="21"
            y1="22"
            x2="21"
            y2="78"
            stroke="#FBBC04"
            strokeWidth="14"
          />
          <line
            x1="60"
            y1="22"
            x2="60"
            y2="78"
            stroke="#4285F4"
            strokeWidth="14"
          />
          <line
            x1="99"
            y1="22"
            x2="99"
            y2="78"
            stroke="#EA4335"
            strokeWidth="14"
          />
        </svg>
        <span>Appsus</span>
      </Link>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/mail">Mail</NavLink>
        <NavLink to="/note">Note</NavLink>
        <NavLink to="/book">Books</NavLink>
      </nav>
    </header>
  )
}
