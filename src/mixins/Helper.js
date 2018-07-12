export function num2en(str){
    for(var i=0;i<10;i++){
      str=str.replace(persinNum[i],i);
    }
    return str;
}

export function isValidIranianNationalCode(input) {
    if (!/^\d{10}$/.test(input))
        return false;
    
    var check = +input[9];
    var sum = Array(9).fill().map((_, i) => +input[i] * (10 - i)).reduce((x, y) => x + y) % 11;
    return (sum < 2 && check == sum) || (sum >= 2 && check + sum == 11);
}
    
export function isValidIranianMobile(input)
{
    return /^[0][9][1-9][0-9]{8,8}$/.test(input);
}

const font = {
    IRANSans: {
      weights: {
        ExtraBold: '800',
        Bold: '700',
        SemiBold: '600',
        Light: '300',
        Normal: '400'
      },
      styles: {
        Italic: 'italic'
      }
    }
  }
  
  // generate styles for a font with given weight and style
  export const fontMaker = (options = {}) => {
    let { weight, style, family } = Object.assign({
      weight: null,
      style: null,
      family: 'IRANSans'
    }, options)
  
    const { weights, styles } = font[family]
  
    if (Platform.OS === 'android') {
      weight = weights[weight] ? weight : ''
      style = styles[style] ? style : ''
  
      const suffix = weight + style
  
      return {
        fontFamily: family + (suffix.length ? `-${suffix}` : '')
      }
    } else {
      weight = weights[weight] || weights.Normal
      style = styles[style] || 'normal'
  
      return {
        fontFamily: family,
        fontWeight: weight,
        fontStyle: style
      }
    }
  }
  