const { Shop, Item } = require('../src/gilded_rose');

// - Once the sell by date has passed, Quality degrades twice as fast
// - The Quality of an item is never negative
// - "Aged Brie" actually increases in Quality the older it gets
// - The Quality of an item is never more than 50
// - "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
// - "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
// Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
// Quality drops to 0 after the concert

describe('Gilded Rose', function() {
  it('should degrade quality twice as fast after sell by date has passed', function() {
    const gildedRose = new Shop([new Item('foo', 1, 10)]);
    const [item] = gildedRose.items;

    expect(item.sellIn).toBe(1);
    expect(item.quality).toBe(10);
    gildedRose.updateQuality();
    expect(item.sellIn).toBe(0);
    expect(item.quality).toBe(9);
    gildedRose.updateQuality();
    expect(item.quality).toBe(7);
  });

  it('should never have quality < 0', function() {
    const gildedRose = new Shop([new Item('foo', 0, 1)]);
    const [item] = gildedRose.items;

    expect(item.quality).toBe(1);
    gildedRose.updateQuality();
    expect(item.quality).toBe(0);
    gildedRose.updateQuality();
    expect(item.quality).not.toBe(-1);
  });

  it('should increases "Aged Brie" in quality the older it gets', function() {
    const gildedRose = new Shop([new Item('Aged Brie', 2, 10)]);
    const [item] = gildedRose.items;

    expect(item.quality).toBe(10);
    gildedRose.updateQuality();
    expect(item.quality).toBe(11);
  });

  it('should never have quality > 50', function() {
    const gildedRose = new Shop([new Item('Aged Brie', 0, 50)]);
    const [item] = gildedRose.items;

    expect(item.quality).toBe(50);
    gildedRose.updateQuality();
    expect(item.quality).not.toBe(51);
  });
});
