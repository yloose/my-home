import { Plugins } from "@capacitor/core";
import { controllerIFace } from "./interfaces";

const { Storage } = Plugins;

class DataInterface {
  static async getController() {
    const controller = await Storage.get({ key: "LedController" });
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
    await this.getController().then(controller => {
      if (controller) {
        controller.push(controllerToAdd);
      } else {
        controller = [controllerToAdd];
      }
      this.setController(controller).then(() => {
        return true;
      });
    });
  }

  static async deleteController(uuid: string) {
    let controller = await this.getController();
    let controllerNew = controller.filter((controllerSingle: controllerIFace) => (
      controllerSingle.uuid !== uuid
    ));
    await this.setController(controllerNew);
  }
}

export default DataInterface;
