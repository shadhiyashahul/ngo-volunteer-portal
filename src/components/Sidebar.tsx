function Sidebar() {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">
        Menu
      </h2>

      <ul className="space-y-4">
        <li>Dashboard</li>
        <li>Volunteers</li>
        <li>Events</li>
        <li>Registrations</li>
      </ul>
    </aside>
  );
}

export default Sidebar;