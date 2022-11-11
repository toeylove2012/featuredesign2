interface IResponseExChange {
  '0': string[];
  '1': string[];
  '2': string[];
  '3': string[];
  '4': string[];
  '5': string[];
  datetime: string;
}
interface IResponseGold {
  datetime: string;
  lblBLBuy: string;
  lblBLSell: string;
  lblOMBuy: string;
  lblOMSell: string;
}
interface IResponseOil {
  Diesel: string;
  DieselB10: string;
  Gasohol91: string;
  Gasohol95: string;
  GasoholE20: string;
  datetime: string;
}

export type { IResponseExChange, IResponseGold, IResponseOil };
