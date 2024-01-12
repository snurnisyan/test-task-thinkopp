import {TBorderRules} from "./types";

export const borderRules: TBorderRules = {
  leafLeft: ['round', 'leafRight', 'leafLeft'],
  leafRight: ['round', 'leafRight', 'leafLeft'],
  round: ['leafRight', 'leafLeft'],
}

export const borderStyles = {
  leafLeft: { borderRadius: '0 200px'},
  leafRight: { borderRadius: '200px 0' },
  round: { borderRadius: '200px' },
}
