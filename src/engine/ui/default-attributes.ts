
export const defaultAttributes = (): Map<string, unknown> => {
  const data: Array<[string, unknown]> = [
    ['visible', true],
    ['disabled', false],
    ['focus', false],
    ['size' , 16],
    ['color' , '#000000'],
    ['padding', 0],
    ['family', 'serif'],
    ['lineHeight' , 1.3],
    ['content' , ''],
    ['borderColor', '#000000'],
    ['borderWidth' , 0],
    ['width' , 0],
    ['height', 0],
    ['position' , new DOMPoint(0,0)],
    ['backgroundColor', '#ffffff'],
    ['backgroundImage' , ''],
    ['scale', 1],
    ['borderImage', null],
  ];
  return new Map(data);
}