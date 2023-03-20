export default class ColorsMappers {
  static nbOccurences(predicate) {
    return (colors) => (color) => colors.filter(predicate(color)).length;
  }

  static correctPosition(colors) {
    return (color, position) => ({
      correct: color === colors[position],
      position,
    });
  }
}
