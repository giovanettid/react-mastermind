
export default class ColorsMappers {
  static nbOccurences(colors, predicate) {
    return color => colors.filter(predicate(color)).length;
  }

  static correctPosition(colors) {
    return (color, position) => ({
      correct: color === colors[position],
      position,
    });
  }
}
