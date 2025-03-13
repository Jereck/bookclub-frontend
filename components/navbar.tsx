const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between p-3">
      <div>
        <h1>Book Club</h1>
      </div>

      <div className="flex flex-row gap-3">
        <p>Dashboard</p>
        <p>Library</p>
        <p>Book Clubs</p>
      </div>

      <div>
        <p>Log Out</p>
      </div>
    </nav>
  )
}

export default Navbar;