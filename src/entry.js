const tagCharacter = '~';

const entryMatcher = /(^.*?[.!?])(?:\s|$)(.*)|(.*)/s;
const tagMatcher = new RegExp(`(?<=\\s|^)${tagCharacter}\\w+\\b`, 'g');

const tagToLowercase = tag => tag.toLowerCase();
const removeDuplicateTags = (unique, item) => (unique.includes(item) ? unique : [...unique, item]);

class Entry {
  constructor(entryText) {
    const entry = entryMatcher.exec(entryText);

    this.title = entry[1] ? entry[1] : entryText;
    this.text = entry[2] ? entry[2] : '';
    this.tags = (entryText.match(tagMatcher) || [])
      .map(tagToLowercase)
      .reduce(removeDuplicateTags, []);
    this.timeStamp = Date.now();
  }
}

module.exports = {
  Entry
};
