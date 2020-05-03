import React, { useState } from "react";
import {
  IonButton,
  IonPage,
  IonHeader,
  IonContent,
  IonItem,
  IonInput,
  IonItemDivider,
  IonToolbar,
  IonTitle,
  IonList,
  IonToast
} from "@ionic/react";
import { v4 as uuidv4 } from "uuid";

import DataInterface from "./DataInterface";
import "./addController.css";

interface Props {
  close: Function;
  refreshController: Function;
}

const AddController: React.FC<Props> = props => {
  const [showAddErrorToast, setAddErrorToast] = useState(false);

  let formSubmit = (e: any) => {
    e.preventDefault();

    let formData = document.getElementById("form");

    if (formData) {
      let newController = {
        uuid: uuidv4(),
        ip: formData[1].value,
        port: parseInt(formData[2].value),
        name: formData[0].value,
        ledState: {
          isOn: false,
          pColor: [0, 0, 0],
          sColor: [0, 0, 0],
          brightness: 0,
          effect: 0
        },
        effects: []
      };

      // DataInterface.setController([newController]).then(() => console.log("SUCCESS!"));
      DataInterface.addController(newController).then(() => {
        props.refreshController()
        props.close(false);
      })
    } else {
      setAddErrorToast(true);
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add WLED controller</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form
          id="form"
          action=""
          name="controllerAddForm"
          onSubmit={formSubmit}
        >
          <IonList>
            <IonItemDivider>
              Display name of your device (Only used in this app)
            </IonItemDivider>
            <IonItem>
              <IonInput
                name="displayName"
                type="text"
                placeholder="e.g. Table lights"
              ></IonInput>
            </IonItem>

            <IonItemDivider>IP Adress of controller</IonItemDivider>
            <IonItem>
              <IonInput
                name="ip"
                type="text"
                placeholder="e.g. 192.168.2.180"
              ></IonInput>
            </IonItem>

            <IonItemDivider>JSON API port (usually port 80)</IonItemDivider>
            <IonItem>
              <IonInput
                name="port"
                type="number"
                value={80}
                clearInput
              ></IonInput>
            </IonItem>
          </IonList>
          <br />
          <div className="ButtonWrapper">
            <IonButton onClick={() => props.close(false)}>Cancel</IonButton>
            <IonButton type="submit" disabled={false}>
              Add device
            </IonButton>
          </div>
        </form>
      </IonContent>
      <IonToast
        color="danger"
        isOpen={showAddErrorToast}
        onDidDismiss={() => setAddErrorToast(false)}
        message="Error occured while adding device."
        duration={2000}
      />
    </IonPage>
  );
};

export default AddController;

// <IonButton onClick={() => props.close(false)}>Add device</IonButton>
