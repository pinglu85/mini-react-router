import { createContext, useState, useEffect } from 'react';

const RouterContext = createContext({
  location: '',
  push: () => {},
});

// The `Router` component manages the current location of the app
// and passes it to the child components via Context API.
// It also pushes new entries to the browser's session history
// stack.
const Router = ({ children }) => {
  const [location, setLocation] = useState(window.location.pathname);

  // Callback function that is passed to the `Link` component.
  // When a link is clicked, it pushes the new entry to the browser's
  // session history stack and update the state `location`.
  const handleNewLocation = (newLocation) => {
    window.history.pushState({}, '', newLocation);
    setLocation(newLocation);
  };

  const handleHistoryEntryChange = () => {
    setLocation(window.location.pathname);
  };

  useEffect(() => {
    // Listen for history entry changes. The `popstate` event is only triggered
    // by performing a browser action, such as clicking on the back button
    // (or calling history.back() in JavaScript), when navigating between
    // two history entries for the same document.
    window.addEventListener('popstate', handleHistoryEntryChange);

    return () => {
      window.removeEventListener('popstate', handleHistoryEntryChange);
    };
  }, []);

  return (
    <RouterContext.Provider value={{ location, push: handleNewLocation }}>
      {children}
    </RouterContext.Provider>
  );
};

export default Router;
export { RouterContext };
