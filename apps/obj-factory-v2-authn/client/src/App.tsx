import React, { useState } from 'react';
import { PageLayout, ObjFactoryData } from './components';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest } from './authnConfig';
import Button from 'react-bootstrap/Button';
import { fetchObjectsFromFactory } from "./objFactory";


function App() {
  return (
    <PageLayout>
      <AuthenticatedTemplate>
        <ProfileContent />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <p className="row justify-content-md-center">You are not signed in! Please sign in to see the content.</p>
      </UnauthenticatedTemplate>
    </PageLayout>
  );
}

function ProfileContent() {
  const { instance, accounts } = useMsal();
  const [accessToken, setAccessToken] = useState<null | string>(null);
  const [objectsFromFactory, setObjectsFromFactory] = useState<void | null>(null);

  const name = accounts[0] && accounts[0].name;

  function RequestProfileData() {
    const request = {
        ...loginRequest,
        account: accounts[0]
    };


    instance.acquireTokenSilent(request).then((response) => {
      setAccessToken(response.accessToken);
      fetchObjectsFromFactory(response.accessToken)
      .then(data => {
        console.log(data);
        setObjectsFromFactory(data)
      });
    }).catch((e) => {
        instance.acquireTokenPopup(request).then((response) => {
          fetchObjectsFromFactory(response.accessToken).then(response => setObjectsFromFactory(response));
          console.error(e);
        });
    });
  }

  return (
    <div className="container">
      <p className="lead">Welcome {name}!</p>
      <p className="lead">
        The application you are using shows how the React SPA allows you to request various APIs by receiving security
        tokens from the Microsoft identification platform. It uses the Microsoft Authentication Library (MS AL) for
        React, an MSAL wrapper.The React v2. MSAL js library allows React 16+ applications to perform authentication
        corporate users using Azure Active Directory (Azure AD).
      </p>
      <p className="lead">Here you can see the authentication sequence diagram:</p>
      <img src={require('./img/scheme.png').default} className="img-fluid" alt="Azure scheme" />
      {accessToken && (
        <p>Access Token Acquired!</p>
      )}
      {objectsFromFactory ?
          <ObjFactoryData data={objectsFromFactory['data']}/>
          :
          <Button variant="secondary" onClick={RequestProfileData}>Request  object information</Button>
      }

    </div>
    
  );
}

export default App;
