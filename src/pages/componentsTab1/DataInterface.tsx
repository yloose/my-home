import { Plugins } from "@capacitor/core";
import { controllerIFace } from "./interfaces";

const { Storage } = Plugins;

class DataInterface {
  static async getController() {
    const controller = await Storage.get({ key: "LedController" });
    console.log(controller);
    if (controller.value) {
      return JSON.parse(controller.value);
    } else {
      return false;
    }
  }

  static async setController(controller: Array<controllerIFace>) {
    await Storage.set({
      key: "LedController",
      value: JSON.stringify(controller)
    });
  }

  static async addController(controllerToAdd: controllerIFace) {
    this.getController().then(controller => {
      if (controller) {
        let controllerNew = controller.push(controllerToAdd);
        this.setController(controllerNew).then(() => {
          return true;
        });
      }
    });
  }
}

export default DataInterface;
