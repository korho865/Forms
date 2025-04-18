import HobbyTracker from './components/HobbyTracker';
import { HobbyTrackerProvider } from './context/HobbyTrackerContext';

export default function App() {
  return (
    <HobbyTrackerProvider>
      <h1>Hobby Tracker</h1>
      <HobbyTracker />
    </HobbyTrackerProvider>
  );
}
