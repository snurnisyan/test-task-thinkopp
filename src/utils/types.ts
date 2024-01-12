export type TBorderRules = {
  leafLeft: TBorderType[],
  leafRight: TBorderType[],
  round: TBorderType[]
}

export type TBorderType = keyof TBorderRules;
