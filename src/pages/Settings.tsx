import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonToggle
} from "@ionic/react";

import { AppPreferences } from "@ionic-native/app-preferences";

import "./Settings.css";

const Settings: React.FC = () => {
  let darkMode = false;
  AppPreferences.fetch("darkMode").then(res => {
    darkMode = !!res;
  });


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Theme</IonCardTitle>
          </IonCardHeader>
          <div className="hr"></div>
          <IonCardContent>
            <div>
              <span className="DescSpan">Dark Mode</span>
              <IonToggle
                id="toggleDarkMode"
                className="SettingsToggle"
                color="secondary"
                checked={darkMode}
                onClick={() => {
                  console.log(darkMode);
                  darkMode = !darkMode;
                  console.log(darkMode);
                  document.body.classList.toggle("dark", darkMode);
                  AppPreferences.store(
                    "darkMode",
                    darkMode.toString()
                  ).then(() =>
                    AppPreferences.fetch("darkMode").then(res =>
                      console.log("From app prefs: " + res)
                    )
                  );
                }}
              ></IonToggle>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Settings;

//
// <span style={{
//   textAlign: "center",
//   display: "inline-block",
//   width: "100%",
//   fontSize: "1.2rem",
//   marginTop: "2rem"
// }}>Nothing to see here <strong>yet</strong>!</span>
