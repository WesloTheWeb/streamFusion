import { useState } from 'react';
import NavigationHeader from './components/NavigationHeader/NavigationHeader';
import './App.scss';
import Footer from './components/Footer/Footer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <NavigationHeader />
      </header>
      <main>
        content
      </main>
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
        <Footer />
    </>
  )
}

export default App
