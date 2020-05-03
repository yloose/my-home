import React, { useState, useRef } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonToast,
  IonFab,
  IonFabButton,
  IonModal
} from "@ionic/react";

import LEDController from "./componentsTab1/LEDController";
import AddController from "./componentsTab1/AddController";

import "./Controller.css";

const Controller: React.FC = () => {
  let ledControllerRef = useRef<LEDController>(null);

  const [showNetworkErrorToast, setNetworkErrorToast] = useState(false);
  const [showControllerErrorToast, setControllerErrorToast] = useState(false);
  const [showSyncDoneToast, setSyncDoneToast] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ambilight Control</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonModal isOpen={showModalAdd}>
          <AddController
            close={setShowModalAdd}
            refreshController={() => {
              if (ledControllerRef.current) {
                ledControllerRef.current.updateControllerFromDB();
              }
            }}
          />
        </IonModal>
        <IonFab horizontal={"end"} vertical={"bottom"}>
          <IonFabButton onClick={() => setShowModalAdd(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                id="addIcon"
                d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"
              />
            </svg>
          </IonFabButton>
        </IonFab>
        <LEDController
          ControllerToast={setControllerErrorToast}
          NetworkToast={setNetworkErrorToast}
          SyncDoneToast={setSyncDoneToast}
          ref={ledControllerRef}
        />
        <IonToast
          color="danger"
          isOpen={showNetworkErrorToast}
          onDidDismiss={() => setNetworkErrorToast(false)}
          message="Network error occured."
          duration={2000}
        />
        <IonToast
          color="danger"
          isOpen={showControllerErrorToast}
          onDidDismiss={() => setControllerErrorToast(false)}
          message="Internal error occured. (No controller matched UUID)"
          duration={2000}
        />
        <IonToast
          color="success"
          isOpen={showSyncDoneToast}
          onDidDismiss={() => setSyncDoneToast(false)}
          message="Sync successful!"
          duration={500}
        />
      </IonContent>
    </IonPage>
  );
};

export default Controller;
