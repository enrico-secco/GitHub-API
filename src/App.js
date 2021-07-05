import React from 'react';

import Routes from './routes';

import GlobalStyle from './styles/global'

function App() {
  return (
    <> {/* colocou como fragment, porque sendo div, pode atrapalhar depois */}
      <GlobalStyle/>
      <Routes/>
    </>
  );
}

export default App;
