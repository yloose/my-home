import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { controllerIFace } from "./interfaces";

import DataInterface from "./DataInterface";
import LEDWidget from "./LEDWidget";

class LEDController extends Component<{
  NetworkToast: Function;
  ControllerToast: Function;
  SyncDoneToast: Function;
}> {
  async pullSupportedControllerEffects() {
    Promise.all(
      this.state.LedController.map(async elem => {
        if (elem) {
          const res = await axios.get(
            "http://" + elem.ip + ":" + elem.port + "/json/effects"
          );
          elem.effects = res.data;
        }
      })
    ).then(updated => {
      this.setState({
        LEDController: updated
      });
    });
  }

  updateControllerFromDB() {
    DataInterface.getController().then(controller => {
      if (controller) {
        this.setState({ LedController: controller }, () => {
          this.pullSupportedControllerEffects();
          this.pullForAll();
        });
      }
    });
  }

  constructor(props: any) {
    super(props);
    DataInterface.setController(this.state.LedController)
    // this.updateControllerFromDB();
  }

  state = {
    LedController: [
      {
        uuid: uuidv4(),
        ip: "192.168.2.191",
        port: 2223,
        name: "Desk",
        ledState: {
          isOn: false,
          pColor: [100, 100, 100],
          sColor: [255, 0, 0],
          brightness: 50,
          effect: 0
        },
        effects: []
      }
      // {
      //   uuid: uuidv4(),
      //   ip: "192.168.2.191",
      //   port: 2224,
      //   name: "Couch",
      //   ledState: {
      //     isOn: false,
      //     pColor: [100, 100, 100],
      //     sColor: [255, 0, 0],
      //     brightness: 50,
      //     effect: 0
      //   },
      //   effects: []
      // }
      // {
      //   uuid: uuidv4(),
      //   ip: "192.168.2.191",
      //   port: 2225,
      //   name: "Window",
      //   ledState: {
      //     isOn: false,
      //     pColor: [100, 100, 100],
      //     sColor: [255, 0, 0],
      //     brightness: 50,
      //     effect: 0
      //   },
      //   effects: []
      // }
    ]
  };

  async pullData(controllerUUID: String) {
    Promise.all(
      this.state.LedController.map(async elem => {
        if (elem.uuid === controllerUUID) {
          const res = await axios.get(
            "http://" + elem.ip + ":" + elem.port + "/json/state"
          );
          const data = res.data;
          elem.ledState.isOn = data.on;
          elem.ledState.brightness = data.bri;
          elem.ledState.pColor = data.seg[0].col[0];
          elem.ledState.sColor = data.seg[0].col[1];
          elem.ledState.effect = data.seg[0].fx;
        } else {
          return elem;
        }
      })
    ).then(updated => {
      this.setState({
        LEDController: updated
      });
    });
  }

  pullForAll() {
    Promise.all(
      this.state.LedController.map(async elem => {
        await this.pullData(elem.uuid);
      })
    ).then(() => this.props.SyncDoneToast(true));
  }

  pushData(
    controllerUUID: String,
    data: {
      isOn?: boolean;
      pColor?: number[];
      sColor?: number[];
      brightness?: number;
      effect?: number;
    }
  ) {
    let { isOn, pColor, sColor, brightness, effect } = data;
    let updated = this.state.LedController.map(async elem => {
      if (elem.uuid === controllerUUID) {
        elem.ledState.isOn =
          typeof isOn !== "undefined" ? isOn : elem.ledState.isOn;
        elem.ledState.brightness =
          typeof brightness !== "undefined"
            ? brightness
            : elem.ledState.brightness;
        elem.ledState.pColor =
          typeof pColor !== "undefined" ? pColor : elem.ledState.pColor;
        elem.ledState.sColor =
          typeof sColor !== "undefined" ? sColor : elem.ledState.sColor;
        elem.ledState.effect =
          typeof effect !== "undefined" ? effect : elem.ledState.effect;
      } else {
        return elem;
      }
    });
    this.setState(
      {
        LEDController: updated
      },
      () => {
        this.updateState(controllerUUID);
      }
    );
  }

  async updateState(controllerUUID: String) {
    const controller:
      | controllerIFace
      | undefined = this.state.LedController.find(
      elem => elem.uuid === controllerUUID
    );
    if (controller) {
      await axios
        .post(
          "http://" + controller.ip + ":" + controller.port + "/json/state",
          {
            on: controller.ledState.isOn,
            bri: controller.ledState.brightness,
            seg: [
              {
                fx: controller.ledState.effect,
                col: [controller.ledState.pColor, controller.ledState.sColor]
              }
            ]
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(() => {
          return true;
        })
        .catch(() => {
          this.props.NetworkToast(true);
        });
    } else {
      this.props.ControllerToast(true);
    }
  }

  testbool = true;
  testfunc() {
    // if (this.testbool) {
      this.testbool = false;

      console.log(this.state.LedController);
    // }
  }

  render() {
    // this.testfunc();
    return this.state.LedController.map(controller => (
      <LEDWidget
        pushData={this.pushData.bind(this)}
        uuid={controller.uuid}
        controller={controller}
      />
    ));
  }
}

export default LEDController;
