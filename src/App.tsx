import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { AppPreferences } from "@ionic-native/app-preferences";
import IosSettings from "react-ionicons/lib/IosSettings";
import IosCubeOutline from "react-ionicons/lib/IosCubeOutline";
import IosFlask from "react-ionicons/lib/IosFlask";

import Controller from "./pages/Controller";
import Tab2 from "./pages/Tab2";
import Settings from "./pages/Settings";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => {

  AppPreferences.fetch("darkMode").then(res => {
    let prefersDark: boolean;
    if(res === "true" || res === "false") {
      prefersDark = (res === "true");
    } else {
      prefersDark = !!window.matchMedia('(prefers-color-scheme: dark)');
    }
    AppPreferences.store("darkMode", prefersDark.toString());
    document.body.classList.toggle("dark", prefersDark);
  })



  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/controller" component={Controller} exact={true} />
            <Route path="/tab2" component={Tab2} exact={true} />
            <Route path="/settings" component={Settings} />
            <Route
              path="/"
              render={() => <Redirect to="/controller" />}
              exact={true}
            />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/controller">
              <IosCubeOutline />
              <IonLabel>Controller</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IosFlask />
              <IonLabel>Nothing</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/settings">
              <IosSettings />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
