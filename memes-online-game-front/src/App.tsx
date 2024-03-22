import { Outlet } from "@tanstack/react-router";

function App() {
  return (
    <div className="bg-gray-500 w-screen h-screen">
      <Outlet />
    </div>
  );
}

export default App;
