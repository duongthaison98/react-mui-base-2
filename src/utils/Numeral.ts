import round from 'lodash/round';
import numeral from 'numeral';
import 'numeral/locales/vi';
import Regexs from './Regexs';

class Numeral {
  constructor() {
    numeral.locale('vi');
  }

  public price(value: any) {
    return numeral(value).format('0,0[.]000');
  }

  public round(value: any, precision: number = 2) {
    const valueAsString = String(value);
    if (!Regexs.decimal.test(valueAsString)) return null;
    return round(parseFloat(valueAsString), precision);
  }
}

const instance = new Numeral();

export default instance;
