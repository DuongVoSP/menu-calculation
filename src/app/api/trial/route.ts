import { NextResponse } from 'next/server';

// Configure for static export
export const dynamic = 'force-static';

// Define 5 simple drinks
const drinks = [
  { name: 'Espresso', cost: 1.0, price: 2.5 },
  { name: 'Americano', cost: 1.2, price: 3.0 },
  { name: 'Latte', cost: 1.5, price: 3.8 },
  { name: 'Cappuccino', cost: 1.4, price: 3.6 },
  { name: 'Mocha', cost: 1.7, price: 4.2 },
];

export async function GET() {
  // Calculate profit for each drink
  const result = drinks.map(drink => ({
    name: drink.name,
    cost: drink.cost,
    price: drink.price,
    profit: parseFloat((drink.price - drink.cost).toFixed(2)),
    profitMargin: parseFloat((((drink.price - drink.cost) / drink.price) * 100).toFixed(1)),
  }));

  return NextResponse.json({
    drinks: result,
    summary: {
      totalProfit: result.reduce((sum, d) => sum + d.profit, 0).toFixed(2),
      averageProfit: (result.reduce((sum, d) => sum + d.profit, 0) / result.length).toFixed(2),
      averageMargin: (result.reduce((sum, d) => sum + d.profitMargin, 0) / result.length).toFixed(1) + '%',
    }
  });
} 