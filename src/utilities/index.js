// `isAgedBrie` etc conflicts with boolean pattern
const checkIsAgedBrie = item => item.name === 'Aged Brie';
const checkIsPass = item => item.name === 'Backstage passes to a TAFKAL80ETC concert';
const checkIsSulfuras = item => item.name === 'Sulfuras, Hand of Ragnaros';

const checkIsSpecialItem = item => [checkIsAgedBrie, checkIsPass, checkIsSulfuras].map(check => check(item)).some(passed => passed);

const checkIsAboveMinQuality = item => item.quality > 0;
const checkIsBelowMaxQuality = item => item.quality < 50;

module.exports = { checkIsAgedBrie, checkIsPass, checkIsSulfuras, checkIsSpecialItem, checkIsAboveMinQuality, checkIsBelowMaxQuality };
