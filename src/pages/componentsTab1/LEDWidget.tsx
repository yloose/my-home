import React, { useState } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonRange,
  IonLabel,
  IonPopover,
  IonAlert
} from "@ionic/react";
import { ChromePicker } from "react-color";

import { controllerIFace } from "./interfaces";

interface Props {
  controller: controllerIFace;
  uuid: string;
  pushData: Function;
  deleteController: Function;
}

const LEDWidget: React.FC<Props> = props => {
  const [showpColorPopover, setpColorPopover] = useState(false);
  const [showsColorPopover, setsColorPopover] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  return (
    <IonCard>
      <IonAlert
        isOpen={deleteDialog}
        onDidDismiss={() => setDeleteDialog(false)}
        header={"Delete?"}
        subHeader={"Controller: " + props.controller.name}
        message={"Do you really want to delete this controller?"}
        buttons={[
          { text: "Cancel", handler: () => setDeleteDialog(false) },
          {
            text: "Yes",
            handler: () => {
              props.deleteController();
              setDeleteDialog(false);
            }
          }
        ]}
      />
      <IonCardHeader>
        <IonCardSubtitle>
          LED Widget
          <div
            className="deleteControllerWrapper"
            onClick={() => setDeleteDialog(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              width="1.5em"
              height="1.5em"
              style={{
                msTransform: "rotate(360deg)",
                WebkitTransform: "rotate(360deg)",
                transform: "rotate(360deg)"
              }}
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12z"
                fill="#626262"
              />
            </svg>
          </div>
        </IonCardSubtitle>
        <IonCardTitle>
          {props.controller.name}
          <IonToggle
            color="secondary"
            className="toggleLEDActive"
            checked={props.controller.ledState.isOn}
            onIonChange={e =>
              props.pushData(props.controller.uuid, { isOn: e.detail.checked })
            }
          />
        </IonCardTitle>
      </IonCardHeader>
      <div className="hr"></div>
      <IonCardContent>
        <div className="ledSettingsWrapper">
          <div className="widgetContainer">
            <span className="descSpan">Colors:</span>
            <span
              onClick={() => setpColorPopover(true)}
              className="color"
              style={{
                backgroundColor: `rgb(${props.controller.ledState.pColor[0]}, ${props.controller.ledState.pColor[1]}, ${props.controller.ledState.pColor[2]})`
              }}
            >
              Primary
            </span>
            <IonPopover
              isOpen={showpColorPopover}
              onDidDismiss={() => setpColorPopover(false)}
            >
              <ChromePicker
                color={{
                  r: props.controller.ledState.pColor[0],
                  g: props.controller.ledState.pColor[1],
                  b: props.controller.ledState.pColor[2]
                }}
                onChangeComplete={color =>
                  props.pushData(props.controller.uuid, {
                    pColor: [color.rgb.r, color.rgb.g, color.rgb.b]
                  })
                }
              />
            </IonPopover>
            <span
              onClick={() => setsColorPopover(true)}
              className="color"
              style={{
                backgroundColor: `rgb(${props.controller.ledState.sColor[0]}, ${props.controller.ledState.sColor[1]}, ${props.controller.ledState.sColor[2]})`
              }}
            >
              Secondary
            </span>
            <IonPopover
              isOpen={showsColorPopover}
              onDidDismiss={() => setsColorPopover(false)}
            >
              <ChromePicker
                color={{
                  r: props.controller.ledState.sColor[0],
                  g: props.controller.ledState.sColor[1],
                  b: props.controller.ledState.sColor[2],
                  a: 1
                }}
                onChangeComplete={color =>
                  props.pushData(props.controller.uuid, {
                    sColor: [color.rgb.r, color.rgb.g, color.rgb.b]
                  })
                }
              />
            </IonPopover>
          </div>
          <br />
          <div className="widgetContainer">
            <IonRange
              min={0}
              max={255}
              color="medium"
              className="brightnessSlider"
              value={props.controller.ledState.brightness}
              debounce={500}
              onIonChange={e =>
                props.pushData(props.controller.uuid, {
                  brightness: e.detail.value
                })
              }
            >
              <IonLabel class="descSpan" slot="start">
                Brightness:
              </IonLabel>
            </IonRange>
          </div>
          <br />
          <div className="widgetContainer">
            <span className="descSpan">Effect:</span>
            <IonSelect
              value={props.controller.ledState.effect}
              interface="popover"
              className="effectSelector"
              onIonChange={e =>
                props.pushData(props.controller.uuid, {
                  effect: e.detail.value
                })
              }
            >
              {props.controller.effects.map((effect, index) => {
                return (
                  <IonSelectOption key={index} value={index}>
                    {effect}
                  </IonSelectOption>
                );
              })}
            </IonSelect>
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default LEDWidget;
