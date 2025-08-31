"use client";

import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTrialData } from "@/services/trialService";
// (Icons will be imported only if used in the UI rendering)
import { Plus, Trash2, Package, Ruler, DollarSign, Coffee, Calculator, Percent, ChefHat, Hash, ShoppingCart, MenuSquare, UtensilsCrossed } from "lucide-react";

interface Ingredient {
  name: string;
  unit: string;
  price: number; // per unit
}

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

const translations = {
  vi: {
    title: "Dùng thử: Tính lợi nhuận đồ uống",
    table: {
      drink: "Đồ uống",
      cost: "Giá vốn (₫)",
      price: "Giá bán (₫)",
      profit: "Lợi nhuận (₫)",
      margin: "Biên lợi nhuận (%)",
    },
    summary: {
      title: "Tổng kết",
      totalProfit: "Tổng lợi nhuận",
      averageProfit: "Lợi nhuận trung bình",
      averageMargin: "Biên lợi nhuận TB",
    },
    currency: "VND",
    currencySymbol: "₫",
    format: (value: number) => value.toLocaleString("vi-VN"),
  },
  en: {
    title: "Trial: Drink Profit Calculation",
    table: {
      drink: "Drink",
      cost: "Cost ($)",
      price: "Price ($)",
      profit: "Profit ($)",
      margin: "Profit Margin (%)",
    },
    summary: {
      title: "Summary",
      totalProfit: "Total Profit",
      averageProfit: "Average Profit",
      averageMargin: "Average Margin",
    },
    currency: "USD",
    currencySymbol: "$",
    format: (value: number) =>
      value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
  },
};

function getMarginColor(margin: number) {
  if (margin > 60) return "text-green-700 font-bold";
  if (margin >= 40) return "text-yellow-600 font-semibold";
  return "text-red-600 font-semibold";
}

export default function TrialPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const [data, setData] = useState<TrialData | null>(null);
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    // default demo
    { name: "Coffee", unit: "g", price: 0.02 },
    { name: "Milk", unit: "ml", price: 0.01 },
    { name: "Chocolate", unit: "g", price: 0.03 },
    { name: "Water", unit: "ml", price: 0.001 },
    { name: "Sugar", unit: "g", price: 0.005 },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openRecipe, setOpenRecipe] = useState<string | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const [newIngredient, setNewIngredient] = useState({ name: "", unit: "", price: "" });
  const [newDrink, setNewDrink] = useState({ name: "", price: "" });
  const [newRecipeItem, setNewRecipeItem] = useState({ ingredient: "", quantity: "" });

  // For demo, if Vietnamese, multiply all values by 24000 (VND/USD)
  const currencyMultiplier = language === "vi" ? 24000 : 1;

  // Demo recipes for 5 drinks
  const demoRecipes: Record<string, RecipeItem[]> = {
    Espresso: [
      { ingredient: "Coffee", quantity: 8 },
      { ingredient: "Water", quantity: 30 },
    ],
    Americano: [
      { ingredient: "Coffee", quantity: 8 },
      { ingredient: "Water", quantity: 90 },
    ],
    Latte: [
      { ingredient: "Coffee", quantity: 8 },
      { ingredient: "Milk", quantity: 120 },
      { ingredient: "Water", quantity: 30 },
    ],
    Cappuccino: [
      { ingredient: "Coffee", quantity: 8 },
      { ingredient: "Milk", quantity: 60 },
      { ingredient: "Water", quantity: 30 },
    ],
    Mocha: [
      { ingredient: "Coffee", quantity: 8 },
      { ingredient: "Milk", quantity: 60 },
      { ingredient: "Chocolate", quantity: 10 },
      { ingredient: "Water", quantity: 30 },
    ],
  };

  useEffect(() => {
    try {
      // Get data from service instead of API
      const d = getTrialData();
      
      // Attach recipes to drinks
      const drinksWithRecipes = d.drinks.map((drink: Drink) => ({
        ...drink,
        recipe: demoRecipes[drink.name] || [],
      }));
      setData(d);
      setDrinks(drinksWithRecipes);
      // Initial cost calculation
      setTimeout(() => recalcSummary(drinksWithRecipes), 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load trial data");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  // Helper: get ingredient price by name
  const getIngredientPrice = (name: string) => {
    const found = ingredients.find((i) => i.name === name);
    return found ? found.price : 0;
  };

  // Helper: get ingredient unit by name
  const getIngredientUnit = (name: string) => {
    const found = ingredients.find((i) => i.name === name);
    return found ? found.unit : "";
  };

  // Recalculate drink cost based on recipe and ingredient prices
  function recalcDrinkCost(drink: Drink): number {
    return drink.recipe.reduce(
      (sum, item) => sum + getIngredientPrice(item.ingredient) * item.quantity,
      0
    );
  }

  // Recalculate profit/margin and summary when drinks change
  function recalcSummary(updatedDrinks: Drink[]) {
    // First recalculate costs for all drinks
    const drinksWithUpdatedCosts = updatedDrinks.map(drink => {
      const cost = recalcDrinkCost(drink);
      const profit = drink.price - cost;
      const profitMargin = drink.price > 0 ? (profit / drink.price) * 100 : 0;
      return {
        ...drink,
        cost,
        profit,
        profitMargin
      };
    });

    const summary = {
      totalProfit: drinksWithUpdatedCosts
        .reduce((sum, d) => sum + d.profit, 0)
        .toFixed(2),
      averageProfit: drinksWithUpdatedCosts.length > 0 ? (
        drinksWithUpdatedCosts.reduce((sum, d) => sum + d.profit, 0) /
        drinksWithUpdatedCosts.length
      ).toFixed(2) : "0.00",
      averageMargin: drinksWithUpdatedCosts.length > 0 ? (
        drinksWithUpdatedCosts.reduce((sum, d) => sum + d.profitMargin, 0) /
        drinksWithUpdatedCosts.length
      ).toFixed(1) : "0.0",
    };
    
    setData((prev) =>
      prev ? { ...prev, summary, drinks: drinksWithUpdatedCosts } : null
    );
    setDrinks(drinksWithUpdatedCosts);
  }

  // INGREDIENT CRUD
  const handleAddIngredient = () => {
    if (!newIngredient.name.trim() || !newIngredient.unit.trim() || !newIngredient.price.trim()) return;
    const exists = ingredients.some(i => i.name.toLowerCase() === newIngredient.name.trim().toLowerCase());
    if (exists) return;
    let price = Number(newIngredient.price.replace(/[^\d.]/g, ""));
    if (isNaN(price) || price < 0) price = 0;
    const priceUSD = language === "vi" ? price / 24000 : price;
    setIngredients(prev => [...prev, { name: newIngredient.name.trim(), unit: newIngredient.unit.trim(), price: priceUSD }]);
    setNewIngredient({ name: "", unit: "", price: "" });
  };
  const handleUpdateIngredient = (idx: number, field: "name" | "unit" | "price", value: string) => {
    setIngredients(prev => prev.map((ing, i) => {
      if (i !== idx) return ing;
      if (field === "price") {
        let raw = value;
        if (language === "vi") raw = raw.replace(/\./g, "");
        let price = Number(raw.replace(/[^\d.]/g, ""));
        if (isNaN(price) || price < 0) price = 0;
        const priceUSD = language === "vi" ? price / 24000 : price;
        return { ...ing, price: priceUSD };
      }
      return { ...ing, [field]: value };
    }));
    
    // Recalculate costs when ingredient prices change
    if (field === "price") {
      setTimeout(() => recalcSummary(drinks), 0);
    }
  };
  const handleDeleteIngredient = (idx: number) => {
    if (!window.confirm("Delete this ingredient?")) return;
    const ingName = ingredients[idx].name;
    setIngredients(prev => prev.filter((_, i) => i !== idx));
    // Remove from all recipes
    setDrinks(prev => prev.map(drink => ({
      ...drink,
      recipe: drink.recipe.filter(item => item.ingredient !== ingName)
    })));
  };

  // DRINK CRUD
  const handleAddDrink = () => {
    if (!newDrink.name.trim() || !newDrink.price.trim()) return;
    const exists = drinks.some(d => d.name.toLowerCase() === newDrink.name.trim().toLowerCase());
    if (exists) return;
    let price = Number(newDrink.price.replace(/[^\d.]/g, ""));
    if (isNaN(price) || price < 0) price = 0;
    const priceUSD = language === "vi" ? price / 24000 : price;
    setDrinks(prev => {
      const updated = [...prev, { name: newDrink.name.trim(), price: priceUSD, cost: 0, profit: 0, profitMargin: 0, recipe: [] }];
      // Recalculate costs when new drink is added
      setTimeout(() => recalcSummary(updated), 0);
      return updated;
    });
    setNewDrink({ name: "", price: "" });
  };
  const handleUpdateDrink = (idx: number, field: "name" | "price", value: string) => {
    setDrinks(prev => {
      const updated = prev.map((drink, i) => {
        if (i !== idx) return drink;
        if (field === "price") {
          let raw = value;
          if (language === "vi") raw = raw.replace(/\./g, "");
          let price = Number(raw.replace(/[^\d.]/g, ""));
          if (isNaN(price) || price < 0) price = 0;
          const priceUSD = language === "vi" ? price / 24000 : price;
          return { ...drink, price: priceUSD };
        }
        return { ...drink, [field]: value };
      });
      
      // Recalculate costs when drink prices change
      if (field === "price") {
        setTimeout(() => recalcSummary(updated), 0);
      }
      
      return updated;
    });
  };
  const handleDeleteDrink = (idx: number) => {
    if (!window.confirm("Delete this drink?")) return;
    setDrinks(prev => {
      const updated = prev.filter((_, i) => i !== idx);
      // Recalculate costs when drinks are deleted
      setTimeout(() => recalcSummary(updated), 0);
      return updated;
    });
  };

  // RECIPE CRUD
  const handleAddRecipeItem = (drinkIdx: number) => {
    if (!newRecipeItem.ingredient || !newRecipeItem.quantity) return;
    let qty = Number(newRecipeItem.quantity.replace(/[^\d.]/g, ""));
    if (isNaN(qty) || qty < 0) qty = 0;
    setDrinks(prev => {
      const updated = prev.map((drink, i) => {
        if (i !== drinkIdx) return drink;
        if (drink.recipe.some(item => item.ingredient === newRecipeItem.ingredient)) return drink;
        return { ...drink, recipe: [...drink.recipe, { ingredient: newRecipeItem.ingredient, quantity: qty }] };
      });
      
      // Recalculate costs when recipe changes
      setTimeout(() => recalcSummary(updated), 0);
      return updated;
    });
    setNewRecipeItem({ ingredient: "", quantity: "" });
  };
  const handleUpdateRecipeItem = (drinkIdx: number, itemIdx: number, field: "ingredient" | "quantity", value: string) => {
    setDrinks(prev => {
      const updated = prev.map((drink, i) => {
        if (i !== drinkIdx) return drink;
        const newRecipe = drink.recipe.map((item, j) => {
          if (j !== itemIdx) return item;
          if (field === "quantity") {
            let qty = Number(value.replace(/[^\d.]/g, ""));
            if (isNaN(qty) || qty < 0) qty = 0;
            return { ...item, quantity: qty };
          }
          return { ...item, [field]: value };
        });
        return { ...drink, recipe: newRecipe };
      });
      
      // Recalculate costs when recipe changes
      setTimeout(() => recalcSummary(updated), 0);
      return updated;
    });
  };
  const handleDeleteRecipeItem = (drinkIdx: number, itemIdx: number) => {
    if (!window.confirm("Delete this ingredient from recipe?")) return;
    setDrinks(prev => {
      const updated = prev.map((drink, i) => {
        if (i !== drinkIdx) return drink;
        return { ...drink, recipe: drink.recipe.filter((_, j) => j !== itemIdx) };
      });
      
      // Recalculate costs when recipe changes
      setTimeout(() => recalcSummary(updated), 0);
      return updated;
    });
  };

  useEffect(() => {
    if (data) {
      // Attach recipes again if language changes
      const drinksWithRecipes = data.drinks.map((drink: Drink) => ({
        ...drink,
        recipe: demoRecipes[drink.name] || [],
      }));
      setDrinks(drinksWithRecipes);
      // Recalculate costs after setting drinks
      setTimeout(() => recalcSummary(drinksWithRecipes), 0);
    }
    // eslint-disable-next-line
  }, [language]);

  // Recalculate costs when ingredients change
  useEffect(() => {
    if (drinks.length > 0) {
      recalcSummary(drinks);
    }
    // eslint-disable-next-line
  }, [ingredients]);

  return (
    <div className="min-h-screen bg-[#F5E9DA] flex flex-col items-center py-8 px-2 sm:px-4 pb-24 sm:pb-20">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#6F4E37] mb-4">
        {t.title}
      </h1>
      {loading && <div className="text-lg text-[#6F4E37]">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-6 items-start mb-20">
        {/* Ingredients Table - Left Column */}
        <div className="w-full lg:w-1/3 mb-4 lg:mb-0 lg:sticky lg:top-24 self-start z-10">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart size={20} className="text-[#A3B18A]" />
            <h2 className="text-lg font-semibold text-[#6F4E37]">{language === 'vi' ? 'Nguyên liệu' : 'Ingredients'}</h2>
          </div>
          <div className="bg-white rounded-xl shadow border border-[#E6D3C5] p-3 overflow-x-auto">
            <table className="w-full border-collapse text-sm min-w-[400px]">
              <thead>
                <tr className="bg-[#F5E9DA] text-[#6F4E37]">
                  <th className="py-2 px-2 text-left min-w-[100px]">
                    <div className="flex items-center gap-1">
                      <Package size={14} />
                      <span className="hidden sm:inline">{language === 'vi' ? 'Tên' : 'Name'}</span>
                      <span className="sm:hidden text-xs">{language === 'vi' ? 'Tên' : 'Name'}</span>
                    </div>
                  </th>
                  <th className="py-2 px-2 text-right min-w-[60px]">
                    <div className="flex items-center justify-end gap-1">
                      <Ruler size={14} />
                      <span className="hidden sm:inline">{language === 'vi' ? 'Đơn vị' : 'Unit'}</span>
                      <span className="sm:hidden text-xs">{language === 'vi' ? 'ĐV' : 'Unit'}</span>
                    </div>
                  </th>
                  <th className="py-2 px-2 text-right min-w-[120px]">
                    <div className="flex items-center justify-end gap-1">
                      <DollarSign size={14} />
                      <span className="hidden sm:inline">{language === 'vi' ? 'Giá mỗi đơn vị' : 'Price/unit'}</span>
                      <span className="sm:hidden text-xs">{language === 'vi' ? 'Giá/ĐV' : 'Price/u'}</span>
                    </div>
                  </th>
                  <th className="py-2 px-2 text-center min-w-[40px]"></th>
                </tr>
              </thead>
              <tbody>
                {ingredients.map((ing, idx) => (
                  <tr key={ing.name} className="border-t border-[#E6D3C5] hover:bg-[#F5E9DA]/60 transition">
                    <td className="py-2 px-2 font-medium text-[#6F4E37]">
                      <input
                        type="text"
                        value={ing.name}
                        onChange={e => handleUpdateIngredient(idx, "name", e.target.value)}
                        className="w-24 sm:w-28 px-2 py-1 border border-[#E6D3C5] rounded text-left focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent bg-[#F5E9DA]/40"
                      />
                    </td>
                    <td className="py-2 px-2 text-right text-[#4B3A2F]">
                      <input
                        type="text"
                        value={ing.unit}
                        onChange={e => handleUpdateIngredient(idx, "unit", e.target.value)}
                        className="w-12 px-1 py-1 border border-[#E6D3C5] rounded text-right focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent bg-[#F5E9DA]/40"
                      />
                    </td>
                    <td className="py-2 px-2 text-right">
                      <input
                        type="text"
                        value={t.format(ing.price * currencyMultiplier)}
                        onChange={e => handleUpdateIngredient(idx, "price", e.target.value)}
                        className="w-20 sm:w-24 px-1 py-1 border border-[#E6D3C5] rounded text-right focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent bg-[#F5E9DA]/40"
                      /> <span className="text-[#A3B18A] font-semibold">{t.currencySymbol}</span>
                    </td>
                    <td className="py-2 px-2 text-center">
                      <button onClick={() => handleDeleteIngredient(idx)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="py-2 px-2">
                    <input
                      type="text"
                      value={newIngredient.name}
                      onChange={e => setNewIngredient({ ...newIngredient, name: e.target.value })}
                      placeholder={language === 'vi' ? 'Tên' : 'Name'}
                      className="w-24 sm:w-28 px-2 py-1 border border-[#E6D3C5] rounded text-left bg-[#F5E9DA]/40"
                    />
                  </td>
                  <td className="py-2 px-2 text-right">
                    <input
                      type="text"
                      value={newIngredient.unit}
                      onChange={e => setNewIngredient({ ...newIngredient, unit: e.target.value })}
                      placeholder={language === 'vi' ? 'Đơn vị' : 'Unit'}
                      className="w-12 px-1 py-1 border border-[#E6D3C5] rounded text-right bg-[#F5E9DA]/40"
                    />
                  </td>
                  <td className="py-2 px-2 text-right">
                    <input
                      type="text"
                      value={newIngredient.price}
                      onChange={e => setNewIngredient({ ...newIngredient, price: e.target.value })}
                      placeholder={language === 'vi' ? 'Giá' : 'Price'}
                      className="w-20 sm:w-24 px-1 py-1 border border-[#E6D3C5] rounded text-right bg-[#F5E9DA]/40"
                    /> <span className="text-[#A3B18A] font-semibold">{t.currencySymbol}</span>
                  </td>
                  <td className="py-2 px-2 text-center">
                    <button onClick={handleAddIngredient} className="text-green-600 hover:text-green-800"><Plus size={18} /></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Drinks Table - Right Column */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          {/* Drinks Table */}
          {data && drinks.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-4 border border-[#E6D3C5]">
              <div className="flex items-center gap-2 mb-2">
                <MenuSquare size={20} className="text-[#FFB347]" />
                <h2 className="text-lg font-semibold text-[#6F4E37]">{language === 'vi' ? 'Menu' : 'Menu'}</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full mb-2 border-collapse text-sm min-w-[800px]">
                <thead>
                  <tr className="bg-[#F5E9DA] text-[#6F4E37]">
                    <th className="py-2 px-2 text-left min-w-[170px]">
                      <div className="flex items-center gap-1">
                        <Coffee size={16} />
                        <span className="hidden sm:inline">{t.table.drink}</span>
                        <span className="sm:hidden text-xs">{language === 'vi' ? 'Đồ uống' : 'Drink'}</span>
                      </div>
                    </th>
                    <th className="py-2 px-2 text-right min-w-[80px]">
                      <div className="flex items-center justify-end gap-1">
                        <Calculator size={14} />
                        <span className="hidden sm:inline">{t.table.cost}</span>
                        <span className="sm:hidden text-xs">{language === 'vi' ? 'Vốn' : 'Cost'}</span>
                      </div>
                    </th>
                    <th className="py-2 px-2 text-right min-w-[80px]">
                      <div className="flex items-center justify-end gap-1">
                        <DollarSign size={14} />
                        <span className="hidden sm:inline">{t.table.price}</span>
                        <span className="sm:hidden text-xs">{language === 'vi' ? 'Giá' : 'Price'}</span>
                      </div>
                    </th>
                    <th className="py-2 px-2 text-right min-w-[80px]">
                      <div className="flex items-center justify-end gap-1">
                        <DollarSign size={14} className="text-green-600" />
                        <span className="hidden sm:inline">{t.table.profit}</span>
                        <span className="sm:hidden text-xs">{language === 'vi' ? 'LN' : 'Profit'}</span>
                      </div>
                    </th>
                    <th className="py-2 px-2 text-right min-w-[70px]">
                      <div className="flex items-center justify-end gap-1">
                        <Percent size={14} />
                        <span className="hidden sm:inline">{t.table.margin}</span>
                        <span className="sm:hidden text-xs">%</span>
                      </div>
                    </th>
                    <th className="py-2 px-2 text-center min-w-[80px]">
                      <div className="flex items-center justify-center gap-1">
                        <ChefHat size={14} />
                        <span className="hidden sm:inline">{language === 'vi' ? 'Công thức' : 'Recipe'}</span>
                        <span className="sm:hidden text-xs">{language === 'vi' ? 'CT' : 'Recipe'}</span>
                      </div>
                    </th>
                    <th className="py-2 px-2 text-center min-w-[40px]"></th>
                  </tr>
                </thead>
                <tbody>
                  {drinks.map((drink, idx) => (
                    <tr key={drink.name} className={`border-t border-[#E6D3C5] ${openRecipe === drink.name ? 'bg-[#A3B18A]/20 border-[#A3B18A]' : 'hover:bg-[#F5E9DA]/60'} transition-colors`}>
                      <td className="py-2 px-2 font-medium text-[#6F4E37]">
                        <input
                          type="text"
                          value={drink.name}
                          onChange={e => handleUpdateDrink(idx, "name", e.target.value)}
                          className={`min-w-[150px] w-full sm:w-40 px-2 py-1 border border-[#E6D3C5] rounded text-left focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent ${openRecipe === drink.name ? 'bg-[#A3B18A]/10 border-[#A3B18A]' : 'bg-[#F5E9DA]/40'}`}
                        />
                      </td>
                      <td className="py-2 px-2 text-right">{t.format(drink.cost * currencyMultiplier)} {t.currencySymbol}</td>
                      <td className="py-2 px-2 text-right">
                        <input
                          type="text"
                          value={t.format(drink.price * currencyMultiplier)}
                          onChange={e => handleUpdateDrink(idx, "price", e.target.value)}
                          className={`w-24 sm:w-20 px-1 py-1 border border-[#E6D3C5] rounded text-right focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent ${openRecipe === drink.name ? 'bg-[#A3B18A]/10 border-[#A3B18A]' : 'bg-[#F5E9DA]/40'}`}
                        /> {t.currencySymbol}
                      </td>
                      <td className="py-2 px-2 text-right text-green-700">{t.format(drink.profit * currencyMultiplier)} {t.currencySymbol}</td>
                      <td className={`py-2 px-2 text-right ${getMarginColor(drink.profitMargin)}`}>{drink.profitMargin.toFixed(1)} %</td>
                      <td className="py-2 px-2 text-center">
                        <button
                          className={`px-2 py-1 rounded text-xs font-medium ${openRecipe === drink.name ? 'bg-[#A3B18A] text-white' : 'bg-[#F5E9DA] text-[#6F4E37]'} border border-[#E6D3C5] hover:bg-[#A3B18A] hover:text-white transition`}
                          onClick={() => setOpenRecipe(openRecipe === drink.name ? null : drink.name)}
                        >
                          {openRecipe === drink.name ? (language === 'vi' ? 'Ẩn' : 'Hide') : (language === 'vi' ? 'Chỉnh' : 'Edit')}
                        </button>
                      </td>
                      <td className="py-2 px-2 text-center">
                        <button onClick={() => handleDeleteDrink(idx)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="py-2 px-2">
                      <input
                        type="text"
                        value={newDrink.name}
                        onChange={e => setNewDrink({ ...newDrink, name: e.target.value })}
                        placeholder={language === 'vi' ? 'Tên' : 'Name'}
                        className="min-w-[150px] w-full sm:w-40 px-2 py-1 border border-[#E6D3C5] rounded text-left bg-[#F5E9DA]/40"
                      />
                    </td>
                    <td></td>
                    <td className="py-2 px-2 text-right">
                      <input
                        type="text"
                        value={newDrink.price}
                        onChange={e => setNewDrink({ ...newDrink, price: e.target.value })}
                        placeholder={language === 'vi' ? 'Giá' : 'Price'}
                        className="w-20 sm:w-24 px-1 py-1 border border-[#E6D3C5] rounded text-right bg-[#F5E9DA]/40"
                      /> {t.currencySymbol}
                    </td>
                    <td colSpan={4} className="py-2 px-2 text-center">
                      <button onClick={handleAddDrink} className="text-green-600 hover:text-green-800"><Plus size={18} /></button>
                    </td>
                  </tr>
                </tbody>
              </table>
              </div>
              {/* Collapsible Recipes */}
              {drinks.map((drink, drinkIdx) => (
                openRecipe === drink.name && (
                  <div key={drink.name + '-recipe'} className="mb-4 bg-[#F5E9DA]/60 rounded-lg p-3 border border-[#E6D3C5]">
                    <div className="flex items-center gap-2 mb-2">
                      <UtensilsCrossed size={18} className="text-[#6F4E37]" />
                      <span className="text-lg font-bold text-[#6F4E37]">{drink.name}</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-sm min-w-[400px]">
                      <thead>
                        <tr className="bg-[#F5E9DA] text-[#6F4E37]">
                          <th className="py-1 px-2 text-left min-w-[120px]">
                            <div className="flex items-center gap-1">
                              <Package size={12} />
                              <span className="hidden sm:inline">{language === 'vi' ? 'Nguyên liệu' : 'Ingredient'}</span>
                              <span className="sm:hidden text-xs">{language === 'vi' ? 'NL' : 'Ingredient'}</span>
                            </div>
                          </th>
                          <th className="py-1 px-2 text-right min-w-[80px]">
                            <div className="flex items-center justify-end gap-1">
                              <Hash size={12} />
                              <span className="hidden sm:inline">{language === 'vi' ? 'Số lượng' : 'Quantity'}</span>
                              <span className="sm:hidden text-xs">{language === 'vi' ? 'SL' : 'Qty'}</span>
                            </div>
                          </th>
                          <th className="py-1 px-2 text-right min-w-[60px]">
                            <div className="flex items-center justify-end gap-1">
                              <Ruler size={12} />
                              <span className="hidden sm:inline">{language === 'vi' ? 'Đơn vị' : 'Unit'}</span>
                              <span className="sm:hidden text-xs">{language === 'vi' ? 'ĐV' : 'Unit'}</span>
                            </div>
                          </th>
                          <th className="py-1 px-2 text-center min-w-[40px]"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {drink.recipe.map((item, itemIdx) => (
                          <tr key={item.ingredient} className="border-t border-[#E6D3C5] hover:bg-[#F5E9DA]/60 transition">
                            <td className="py-1 px-2 text-[#4B3A2F]">
                              <select
                                value={item.ingredient}
                                onChange={e => handleUpdateRecipeItem(drinkIdx, itemIdx, "ingredient", e.target.value)}
                                className="w-full px-1 py-1 border border-[#E6D3C5] rounded text-left bg-[#F5E9DA]/40"
                              >
                                {ingredients.map(ing => (
                                  <option key={ing.name} value={ing.name}>{ing.name}</option>
                                ))}  
                              </select>
                            </td>
                            <td className="py-1 px-2 text-right">
                              <input
                                type="number"
                                min="0"
                                value={item.quantity}
                                onChange={e => handleUpdateRecipeItem(drinkIdx, itemIdx, "quantity", e.target.value)}
                                className="w-16 px-1 py-1 border border-[#E6D3C5] rounded text-right bg-[#F5E9DA]/40"
                              />
                            </td>
                            <td className="py-1 px-2 text-right text-[#A3B18A]">{getIngredientUnit(item.ingredient)}</td>
                            <td className="py-1 px-2 text-center">
                              <button onClick={() => handleDeleteRecipeItem(drinkIdx, itemIdx)} className="text-red-500 hover:text-red-700"><Trash2 size={14} /></button>
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td className="py-1 px-2">
                            <select
                              value={newRecipeItem.ingredient}
                              onChange={e => setNewRecipeItem({ ...newRecipeItem, ingredient: e.target.value })}
                              className="w-full px-1 py-1 border border-[#E6D3C5] rounded text-left bg-[#F5E9DA]/40"
                            >
                              <option value="">{language === 'vi' ? 'Chọn NL' : 'Select'}</option>
                              {ingredients.filter(ing => !drink.recipe.some(item => item.ingredient === ing.name)).map(ing => (
                                <option key={ing.name} value={ing.name}>{ing.name}</option>
                              ))}
                            </select>
                          </td>
                          <td className="py-1 px-2 text-right">
                            <input
                              type="number"
                              min="0"
                              value={newRecipeItem.ingredient && openRecipe === drink.name ? newRecipeItem.quantity : ""}
                              onChange={e => setNewRecipeItem({ ...newRecipeItem, quantity: e.target.value })}
                              className="w-16 px-1 py-1 border border-[#E6D3C5] rounded text-right bg-[#F5E9DA]/40"
                            />
                          </td>
                          <td></td>
                          <td className="py-1 px-2 text-center">
                            <button onClick={() => handleAddRecipeItem(drinkIdx)} className="text-green-600 hover:text-green-800"><Plus size={16} /></button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    </div>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Sticky Summary Bar */}
      {data && drinks.length > 0 && (
        <div
          ref={summaryRef}
          role="status"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 8px)' }}
          className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-[#2E6C28] via-[#2A5B24] to-[#153812] text-white shadow-[0_12px_30px_rgba(0,0,0,0.6)] py-3 sm:py-4 px-3 sm:px-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 z-50 rounded-t-xl border-t-4 border-[#122e10]"
        >
          <div className="font-semibold text-base sm:text-xl tracking-wide drop-shadow-sm">{t.summary.title}</div>

          <div className="text-sm sm:text-base flex items-baseline gap-2">
            <span className="hidden sm:inline">{t.summary.totalProfit}:</span>
            <span className="sm:hidden">{language === 'vi' ? 'Tổng LN:' : 'Total:'}</span>
            <span className="font-extrabold text-white text-lg sm:text-2xl drop-shadow">{t.format(Number(data.summary.totalProfit) * currencyMultiplier)}</span>
            <span className="text-sm sm:text-base text-white">{t.currencySymbol}</span>
          </div>

          <div className="text-sm sm:text-base flex items-baseline gap-2">
            <span className="hidden sm:inline">{t.summary.averageProfit}:</span>
            <span className="sm:hidden">{language === 'vi' ? 'TB LN:' : 'Avg:'}</span>
            <span className="font-bold text-white text-lg sm:text-xl">{t.format(Number(data.summary.averageProfit) * currencyMultiplier)}</span>
            <span className="text-sm sm:text-base text-white">{t.currencySymbol}</span>
          </div>

          <div className="text-sm sm:text-base flex items-baseline gap-2">
            <span className="hidden sm:inline">{t.summary.averageMargin}:</span>
            <span className="sm:hidden">{language === 'vi' ? 'TB %:' : 'Margin:'}</span>
            <span className="font-bold text-white text-lg sm:text-xl">{data.summary.averageMargin}%</span>
          </div>
        </div>
      )}
    </div>
  );
}
