// Import interfaces from the main component to ensure consistency
interface RecipeItem {
  ingredient: string;
  quantity: number;
}

interface Drink {
  name: string;
  cost: number;
  price: number;
  profit: number;
  profitMargin: number;
  recipe: RecipeItem[];
}

interface TrialData {
  drinks: Drink[];
  summary: {
    totalProfit: string;
    averageProfit: string;
    averageMargin: string;
  };
}

// Define 5 simple drinks (without recipes initially)
const baseDrinks = [
  { name: 'Espresso', cost: 1.0, price: 2.5 },
  { name: 'Americano', cost: 1.2, price: 3.0 },
  { name: 'Latte', cost: 1.5, price: 3.8 },
  { name: 'Cappuccino', cost: 1.4, price: 3.6 },
  { name: 'Mocha', cost: 1.7, price: 4.2 },
];

export function getTrialData(): TrialData {
  // Calculate profit for each drink and add empty recipe
  const result = baseDrinks.map(drink => ({
    name: drink.name,
    cost: drink.cost,
    price: drink.price,
    profit: parseFloat((drink.price - drink.cost).toFixed(2)),
    profitMargin: parseFloat((((drink.price - drink.cost) / drink.price) * 100).toFixed(1)),
    recipe: [] as RecipeItem[], // Add empty recipe array
  }));

  return {
    drinks: result,
    summary: {
      totalProfit: result.reduce((sum, d) => sum + d.profit, 0).toFixed(2),
      averageProfit: (result.reduce((sum, d) => sum + d.profit, 0) / result.length).toFixed(2),
      averageMargin: (result.reduce((sum, d) => sum + d.profitMargin, 0) / result.length).toFixed(1) + '%',
    }
  };
}
