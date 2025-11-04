// Helper function to construct regex from array of trigger words
// Regex is used to test whether a trigger word is has been sent in chat

const buildRegexStringFromArray = (arrayOfKeywords) => {
  if (arrayOfKeywords) {
    const reduceArrayIntoString = arrayOfKeywords.reduce(
      (accumulator, currentValue, index) => {
        if (index === 0) {
          return `\\b${currentValue}\\b`;
        } else {
          return `${accumulator}|\\b${currentValue}\\b`;
        }
      },
      ""
    );

    const regexFromReduecedArrayIntoString = new RegExp(
      `${reduceArrayIntoString}`,
      "i" // case insensitive flag
    );

    return regexFromReduecedArrayIntoString;
  } else {
    return null;
  }
};

exports.buildRegexStringFromArray = buildRegexStringFromArray;
