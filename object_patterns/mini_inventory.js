const validItemName = str => /\S{5}/.test(str);
const validCategoryName = str => /^\S{5,}$/.test(str);

function ItemCreator(itemName, category, quantity) {
  if (quantity == null || !validItemName(itemName) || !validCategoryName(category)) {
    return {
      notValid: true,
    }
  }
  return {
    skuCode: (itemName.replace(/\s/g, '').slice(0, 3) + category.slice(0, 2)).toUpperCase(),
    itemName,
    category,
    quantity,
  }
}

const ItemManager = {
  items : [],

  findItemBySKU(skuCode) {
    return this.items.find(item => item.skuCode === skuCode);
  },

  create(itemName, category, quantity) {
    const item = ItemCreator(itemName, category, quantity);

    if (item.notValid) return false;

    this.items.push(item);
    return item;
  },

  update(skuCode, itemInfo) {
    const item = this.findItemBySKU(skuCode);
    if (!item) return null;

    const validUpdates = {};

    Object.keys(itemInfo).forEach(key => {
      if (key in item && key !== 'skuCode') {
        validUpdates[key] = itemInfo[key];
      }
    });

    Object.assign(item, validUpdates);

    return item;
  },

  delete(skuCode) {
    this.items = this.items.filter(item => item.skuCode !== skuCode);
    return this.items;
  },

  inStock() {
    return this.items.filter(item => item.quantity > 0);
  },

  itemsInCategory(category) {
    return this.items.filter(item => item.category === category);
  }
}

const ReportManager = {
  itemManager : {},

  init(itemManager) {
    this.itemManager = itemManager;
  },

  createReporter(skuCode) {
    const item = this.itemManager.findItemBySKU(skuCode);
    if (!item) return null;
    return {
      itemInfo() {
        Object.entries(item).forEach(([key,val]) => console.log(`${key}: ${val}`))
      }
    }
  },

  reportInStock() {
    const inStock = this.itemManager.inStock().map(item => item.itemName).join(',');
    console.log(inStock);
    return inStock;
  }
}

ItemManager.create('basket ball', 'sports', 0);       // valid
ItemManager.create('asd', 'sports', 0);               // invalid (too short)
ItemManager.create('soccer ball', 'sports', 5);       // valid
ItemManager.create('football', 'sports');             // invalid (no quantity)
ItemManager.create('football', 'sports', 3);          // valid
ItemManager.create('kitchen pot', 'cooking items', 0);// invalid (category has space)
ItemManager.create('kitchen pot', 'cooking', 3);      // valid

ItemManager.items; //?
// => items with 4 valid items

ReportManager.init(ItemManager);
ReportManager.reportInStock(); //?
// logs: soccer ball,football,kitchen pot

ItemManager.update('SOCSP', { quantity: 0 });
ItemManager.inStock(); //?
// => football, kitchen pot

ReportManager.reportInStock(); //?
// logs: football,kitchen pot

ItemManager.itemsInCategory('sports'); //?
// => basket ball, soccer ball, football

ItemManager.delete('SOCSP');
ItemManager.items; // ?
// => remaining 3 valid items (soccer ball removed)

const kitchenPotReporter = ReportManager.createReporter('KITCO');
kitchenPotReporter.itemInfo();
// logs:
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 3

ItemManager.update('KITCO', { quantity: 10 });
kitchenPotReporter.itemInfo();
// logs:
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 10