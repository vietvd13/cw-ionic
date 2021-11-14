import { 
  Redirect, 
  Route 
} from 'react-router-dom';
import { 
  IonApp, 
  IonIcon, 
  IonRouterOutlet, 
  IonTabBar, 
  IonTabButton, 
  IonTabs, 
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { home as homeIcon } from 'ionicons/icons';

import Home from './pages/Home';
import Create from './pages/Create';
import Update from './pages/Update';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>

      {/* Router */}
      <IonRouterOutlet>
        <Route path="/home" component={Home} exact={true}></Route>
        <Route exact path="/" render={() => <Redirect to="/home" />}></Route>
        <Route path="/create" component={Create} exact={true}></Route>
        <Route path="/detail/:id" component={Update} exact={true}></Route>
      </IonRouterOutlet>

      {/* Tab bar */}
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
          <IonIcon size="small" icon={homeIcon} />
          Home
        </IonTabButton>
      </IonTabBar>

      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
