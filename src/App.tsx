import { useState } from 'react';
import './App.css';
import { bonsaiCardData } from './bonsaiProfDummyData';
import BonsaiCard from './components/bonsaiCard/BonsaiCard';
import BonsaiDataForm from './components/bonsaiDataForm/BonsaiDataForm';
import BonsaiChapterForm from './components/bonsaiChapterForm/BonsaiChapterForm';
import BonsaiSubmitForm from './components/bonsaiSubmitForm/BonsaiSubmitForm';
import BonsaiUpload from './components/bonsaiUpload/BonsaiUpload';
import AuthForm from './components/authForm/AuthForm';
import NavBar from './components/navBar/NavBar';

function App() {
  const [displayPage, setDisplayPage] = useState<'home' | 'login' | 'upload'>(
    'home'
  );

  return (
    <div className="container">
      <NavBar />
      <div style={{ display: 'flex' }}>
        <button onClick={() => setDisplayPage('home')}>Home</button>
        <button onClick={() => setDisplayPage('login')}>Login</button>
        <button onClick={() => setDisplayPage('upload')}>Upload</button>
      </div>

      <hr />
      {displayPage === 'home' && (
        <>
          <BonsaiCard cardData={bonsaiCardData} />
          <BonsaiCard cardData={bonsaiCardData} />
          <BonsaiCard cardData={bonsaiCardData} />
        </>
      )}
      {displayPage === 'upload' && <BonsaiUpload />}
      {displayPage === 'login' && <AuthForm />}
    </div>
  );
}
export default App;
