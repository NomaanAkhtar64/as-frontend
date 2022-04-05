import React from 'react';
import useUser from './hooks/user';
import * as Screens from './screens';
import * as Routers from './routers';
import * as Layout from './layout/';

function App() {
  const userManager = useUser();
  if (!userManager.isLogin) return <Screens.Login />;
  if (userManager.state.user.is_staff)
    return (
      <Layout.Admin onLogout={() => userManager.actions.logout()}>
        <Routers.Admin />
      </Layout.Admin>
    );

  return (
    <Layout.Employee onLogout={() => userManager.actions.logout()}>
      <Routers.Employee />
    </Layout.Employee>
  );
}

export default App;
