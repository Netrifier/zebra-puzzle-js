/**
 * Generates permutations of attribute values for each house
 * @param {string} attribute - attribute's name to add to the houses
 * @param {string[]} values - possible values for the attribute
 * @param {Array<Array<Object>>} [previousPermutations=[]] - permutations made previously
 * @returns {Array<Array<Object>>} - permutations of attribute values with previous permutations
 */
const generateHousePermutations = (attribute, values, previousPermutations) => {
  const generatePermutations = (arr) => {
    if (arr.length === 0) return [[]];
    return arr.flatMap((value, i) =>
      generatePermutations(arr.slice(0, i).concat(arr.slice(i + 1))).map(
        (perm) => [value, ...perm]
      )
    );
  };

  if (!previousPermutations) {
    return generatePermutations(values).map((attributes) =>
      attributes.map((value) => ({ [attribute]: value }))
    );
  }

  const valuesPermutations = generatePermutations(values);
  return previousPermutations.flatMap((houses) =>
    valuesPermutations.map((permutation) =>
      houses.map((house, index) => ({
        ...house,
        [attribute]: permutation[index],
      }))
    )
  );
};

// Attribute values
const colors = ["red", "green", "ivory", "yellow", "blue"];
const nationalities = [
  "Englishman",
  "Spaniard",
  "Ukrainian",
  "Norwegian",
  "Japanese",
];
const pets = ["dog", "snails", "fox", "horse", "zebra"];
const beverages = ["coffee", "tea", "milk", "orange juice", "water"];
const smokes = [
  "Old Gold",
  "Kools",
  "Chesterfields",
  "Lucky Strike",
  "Parliaments",
];

// Rules
const rules = {
  2: (houses) =>
    houses.some(
      (h) => h.nationality === nationalities[0] && h.color === colors[0]
    ),
  3: (houses) =>
    houses.some((h) => h.nationality === nationalities[1] && h.pet === pets[0]),
  4: (houses) =>
    houses.some((h) => h.beverage === beverages[0] && h.color === colors[1]),
  5: (houses) =>
    houses.some(
      (h) => h.nationality === nationalities[2] && h.beverage === beverages[1]
    ),
  6: (houses) =>
    houses.some(
      (h, i) =>
        h.color === colors[1] &&
        houses[i - 1] &&
        houses[i - 1].color === colors[2]
    ),
  7: (houses) => houses.some((h) => h.smoke === smokes[0] && h.pet === pets[1]),
  8: (houses) =>
    houses.some((h) => h.smoke === smokes[1] && h.color === colors[3]),
  9: (houses) => houses[2].beverage === beverages[2],
  10: (houses) => houses[0].nationality === nationalities[3],
  11: (houses) =>
    houses.some(
      (h, i) =>
        h.smoke === smokes[2] &&
        ((houses[i + 1] && houses[i + 1].pet === pets[2]) ||
          (houses[i - 1] && houses[i - 1].pet === pets[2]))
    ),
  12: (houses) =>
    houses.some(
      (h, i) =>
        h.smoke === smokes[1] &&
        ((houses[i + 1] && houses[i + 1].pet === pets[3]) ||
          (houses[i - 1] && houses[i - 1].pet === pets[3]))
    ),
  13: (houses) =>
    houses.some((h) => h.smoke === smokes[3] && h.beverage === beverages[3]),
  14: (houses) =>
    houses.some(
      (h) => h.nationality === nationalities[4] && h.smoke === smokes[4]
    ),
  15: (houses) => houses[1].color === colors[4],
};

const attributes = {
  color: {
    values: colors,
    rules: [6],
  },
  nationality: {
    values: nationalities,
    rules: [10, 2, 15],
  },
  pet: {
    values: pets,
    rules: [3],
  },
  beverage: {
    values: beverages,
    rules: [4, 5, 9],
  },
  smoke: {
    values: smokes,
    rules: [7, 8, 11, 12, 13, 14],
  },
};

class ZebraPuzzle {
  #solvedHousesPossibilities = this.#solve();

  getSolvedHouses() {
    return (
      this.#getPossibilitiesMessage(this.#solvedHousesPossibilities.length) +
      this.#solvedHousesPossibilities
        .map(
          (house) =>
            this.#generateAttributeRow() + this.#generateHousesTable(house)
        )
        .join("\n")
    );
  }

  #getPossibilitiesMessage(length) {
    return length !== 1
      ? length !== 0
        ? `Multiple solutions found (${length} solutions)\n\n`
        : "No solutions found"
      : "";
  }

  #generateAttributeRow() {
    return Object.keys(attributes).join(",") + "\n";
  }

  #generateHousesTable(houses) {
    return houses
      .map(
        (house, i) => Object.values({ index: i + 1, ...house }).join(",") + "\n"
      )
      .join("");
  }

  #solve() {
    const houseSteps = Object.values(attributes).length;
    const housesSteps = Array.from({ length: houseSteps }, () => []);

    for (const attribute in attributes) {
      const attributeIndex = Object.keys(attributes).indexOf(attribute);

      for (const h of generateHousePermutations(
        attribute,
        attributes[attribute].values,
        attributeIndex === 0 ? null : housesSteps[attributeIndex - 1]
      )) {
        if (attributes[attribute].rules.some((r) => !rules[r](h))) continue;
        housesSteps[attributeIndex].push(h);
      }
    }

    return housesSteps[houseSteps - 1];
  }
}

const zebraPuzzle = new ZebraPuzzle();
console.log(zebraPuzzle.getSolvedHouses());
