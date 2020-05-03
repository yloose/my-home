export interface controllerIFace {
  uuid: any,
  ip: string;
  port: number;
  name: string;
  ledState: {
    isOn: boolean;
    pColor: number[];
    sColor: number[];
    brightness: number;
    effect: number;
  };
  effects: Array<String>;
}
