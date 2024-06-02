# Zebra Puzzle

The Zebra Puzzle is a famous logic puzzle also called Einstein's Puzzle or Einstein's Riddle.

The following 15 statements are all known to be true:

1. There are five houses.
2. The Englishman lives in the red house.
3. The Spaniard owns the dog.
4. Coffee is drunk in the green house.
5. The Ukrainian drinks tea.
6. The green house is immediately to the right of the ivory house.
7. The Old Gold smoker owns snails.
8. Kools are smoked in the yellow house.
9. Milk is drunk in the middle house.
10. The Norwegian lives in the first house.
11. The man who smokes Chesterfields lives in the house next to the man with the fox.
12. Kools are smoked in the house next to the house where the horse is kept.
13. The Lucky Strike smoker drinks orange juice.
14. The Japanese smokes Parliaments.
15. The Norwegian lives next to the blue house.

Additionally, each of the five houses is painted a different color, and their inhabitants are of different national extractions, own different pets, drink different beverages and smoke different brands of cigarettes.

Wikipedia - https://en.wikipedia.org/wiki/Zebra_Puzzle

### Add Custom Rules and attributes

Change the `attributes` object to add custom rules and attributes.

```js
const attributes = {
  [attributeName]: {
    values: [values],
    rules: [rules],
  },
};
```

the values array contains the possible values for the attribute. (It needs to be equal to the number of houses)

the rules object contains the rules that need to be satisfied for the attribute.

```js
const rules = {
  [ruleNumber]: (houses) => // Your custom rule here,
};
```
