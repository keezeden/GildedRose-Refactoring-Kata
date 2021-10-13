const { checkIsSpecialItem, checkIsPass, checkIsSulfuras, checkIsAgedBrie, checkIsBelowMaxQuality, checkIsAboveMinQuality } = require('./utilities');

class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  applyQualityRules(item) {
    if (!checkIsSpecialItem(item) && checkIsAboveMinQuality(item)) return (item.quality = item.quality - 1);

    if (checkIsBelowMaxQuality(item)) {
      item.quality = item.quality + 1;

      if (checkIsPass(item)) {
        // Apply backstage pass rules
        if (item.sellIn < 11) {
          if (checkIsBelowMaxQuality(item)) {
            // Double increase edge case check
            item.quality = item.quality + 1;
          }
        }
        if (item.sellIn < 6) {
          // Apply backstage pass rules
          if (checkIsBelowMaxQuality(item)) {
            // Double increase edge case check
            item.quality = item.quality + 1;
          }
        }
      }
    }
  }

  updateQuality() {
    this.items.forEach(item => {
      this.applyQualityRules(item);

      if (!checkIsSulfuras(item)) {
        // Sulfuras check
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        // Quality decrease
        if (!checkIsAgedBrie(item)) {
          if (!checkIsPass(item)) {
            if (item.quality > 0) {
              if (!checkIsSulfuras(item)) {
                item.quality = item.quality - 1;
              }
            }
          } else {
            item.quality = item.quality - item.quality; // Pass sellIn < 0 quality 0
          }
        } else {
          if (item.quality < 50) {
            // Aged brie quality increase
            item.quality = item.quality + 1;
          }
        }
      }
    });

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
};
