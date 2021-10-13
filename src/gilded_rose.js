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
    const specialItems = ['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert', 'Sulfuras, Hand of Ragnaros'];
    const isSpecialItem = specialItems.includes(item.name);

    if (!isSpecialItem && item.quality > 0) {
      item.quality = item.quality - 1; // Decrease quality
    } else {
      // Non-normal items
      if (item.quality < 50) {
        // No > 50 check
        item.quality = item.quality + 1;
        if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
          // Apply backstage pass rules
          if (item.sellIn < 11) {
            if (item.quality < 50) {
              // Double increase edge case check
              item.quality = item.quality + 1;
            }
          }
          if (item.sellIn < 6) {
            // Apply backstage pass rules
            if (item.quality < 50) {
              // Double increase edge case check
              item.quality = item.quality + 1;
            }
          }
        }
      }
    }
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.applyQualityRules(this.items[i]);

      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        // Sulfuras check
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        // Quality decrease
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality; // Pass sellIn < 0 quality 0
          }
        } else {
          if (this.items[i].quality < 50) {
            // Aged brie quality increase
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
};
