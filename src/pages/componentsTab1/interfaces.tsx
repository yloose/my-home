export interface controllerIFace {
  uuid: any,
  ip: String;
  port: number;
  name: String;
  ledState: {
    isOn: boolean;
    pColor: number[];
    sColor: number[];
    brightness: number;
    effect: number;
  };
  effects: Array<String>;
}
