import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import VolunteerForm from "./components/VolunteerForm";
import EventForm from "./components/EventForm";
import Dashboard from "./components/Dashboard";
function App() {
  return (
    <div>
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6 bg-gray-100 min-h-screen">
          <h2 className="text-2xl font-bold mb-4">
            Welcome to NGO Portal
          </h2>

          <p className="mb-6">
            Manage Volunteers and Events
          </p>
          <Dashboard />

          <VolunteerForm />

<EventForm />
        </main>
      </div>
    </div>
  );
}

export default App;