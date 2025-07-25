"use client";

import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
// (Icons will be imported only if used in the UI rendering)
import { Plus, Trash2 } from "lucide-react";

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
    fetch("/api/trial")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch trial data");
        return res.json();
      })
      .then((d) => {
        // Attach recipes to drinks
        const drinksWithRecipes = d.drinks.map((drink: Drink) => ({
          ...drink,
          recipe: demoRecipes[drink.name] || [],
        }));
        setData(d);
        setDrinks(drinksWithRecipes);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
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
    const summary = {
      totalProfit: updatedDrinks
        .reduce((sum, d) => sum + d.profit, 0)
        .toFixed(2),
      averageProfit: (
        updatedDrinks.reduce((sum, d) => sum + d.profit, 0) /
        updatedDrinks.length
      ).toFixed(2),
      averageMargin: (
        updatedDrinks.reduce((sum, d) => sum + d.profitMargin, 0) /
        updatedDrinks.length
      ).toFixed(1),
    };
    setData((prev) =>
      prev ? { ...prev, summary, drinks: updatedDrinks } : null
    );
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
    setDrinks(prev => [...prev, { name: newDrink.name.trim(), price: priceUSD, cost: 0, profit: 0, profitMargin: 0, recipe: [] }]);
    setNewDrink({ name: "", price: "" });
  };
  const handleUpdateDrink = (idx: number, field: "name" | "price", value: string) => {
    setDrinks(prev => prev.map((drink, i) => {
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
    }));
  };
  const handleDeleteDrink = (idx: number) => {
    if (!window.confirm("Delete this drink?")) return;
    setDrinks(prev => prev.filter((_, i) => i !== idx));
  };

  // RECIPE CRUD
  const handleAddRecipeItem = (drinkIdx: number) => {
    if (!newRecipeItem.ingredient || !newRecipeItem.quantity) return;
    let qty = Number(newRecipeItem.quantity.replace(/[^\d.]/g, ""));
    if (isNaN(qty) || qty < 0) qty = 0;
    setDrinks(prev => prev.map((drink, i) => {
      if (i !== drinkIdx) return drink;
      if (drink.recipe.some(item => item.ingredient === newRecipeItem.ingredient)) return drink;
      return { ...drink, recipe: [...drink.recipe, { ingredient: newRecipeItem.ingredient, quantity: qty }] };
    }));
    setNewRecipeItem({ ingredient: "", quantity: "" });
  };
  const handleUpdateRecipeItem = (drinkIdx: number, itemIdx: number, field: "ingredient" | "quantity", value: string) => {
    setDrinks(prev => prev.map((drink, i) => {
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
    }));
  };
  const handleDeleteRecipeItem = (drinkIdx: number, itemIdx: number) => {
    if (!window.confirm("Delete this ingredient from recipe?")) return;
    setDrinks(prev => prev.map((drink, i) => {
      if (i !== drinkIdx) return drink;
      return { ...drink, recipe: drink.recipe.filter((_, j) => j !== itemIdx) };
    }));
  };

  useEffect(() => {
    if (data) {
      // Attach recipes again if language changes
      setDrinks(
        data.drinks.map((drink: Drink) => ({
          ...drink,
          recipe: demoRecipes[drink.name] || [],
        }))
      );
    }
    // eslint-disable-next-line
  }, [language]);

  return (
    <div className="min-h-screen bg-[#F5E9DA] flex flex-col items-center py-8 px-2 sm:px-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#6F4E37] mb-4">
        {t.title}
      </h1>
      {loading && <div className="text-lg text-[#6F4E37]">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-6 items-start">
        {/* Ingredients Table - Left Column */}
        <div className="w-full md:w-1/3 mb-4 md:mb-0 sticky top-24 self-start z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block bg-[#A3B18A] text-white rounded-full w-7 h-7 flex items-center justify-center font-bold">1</span>
            <h2 className="text-lg font-semibold text-[#6F4E37]">{language === 'vi' ? 'Nguyên liệu' : 'Ingredients'}</h2>
          </div>
          <div className="bg-white rounded-xl shadow border border-[#E6D3C5] p-3 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#F5E9DA] text-[#6F4E37]">
                  <th className="py-2 px-2 text-left">{language === 'vi' ? 'Tên' : 'Name'}</th>
                  <th className="py-2 px-2 text-right">{language === 'vi' ? 'Đơn vị' : 'Unit'}</th>
                  <th className="py-2 px-2 text-right">{language === 'vi' ? 'Giá mỗi đơn vị' : 'Price/unit'}</th>
                  <th className="py-2 px-2 text-center"></th>
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
                        className="w-20 px-1 py-1 border border-[#E6D3C5] rounded text-left focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent bg-[#F5E9DA]/40"
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
                        className="w-16 px-1 py-1 border border-[#E6D3C5] rounded text-right focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent bg-[#F5E9DA]/40"
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
                      className="w-20 px-1 py-1 border border-[#E6D3C5] rounded text-left bg-[#F5E9DA]/40"
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
                      className="w-16 px-1 py-1 border border-[#E6D3C5] rounded text-right bg-[#F5E9DA]/40"
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
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          {/* Drinks Table */}
          {data && drinks.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-4 border border-[#E6D3C5]">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block bg-[#FFB347] text-white rounded-full w-7 h-7 flex items-center justify-center font-bold">2</span>
                <h2 className="text-lg font-semibold text-[#6F4E37]">{language === 'vi' ? 'Menu' : 'Menu'}</h2>
              </div>
              <table className="w-full mb-2 border-collapse text-sm">
                <thead>
                  <tr className="bg-[#F5E9DA] text-[#6F4E37]">
                    <th className="py-2 px-2 text-left">{t.table.drink}</th>
                    <th className="py-2 px-2 text-right">{t.table.cost}</th>
                    <th className="py-2 px-2 text-right">{t.table.price}</th>
                    <th className="py-2 px-2 text-right">{t.table.profit}</th>
                    <th className="py-2 px-2 text-right">{t.table.margin}</th>
                    <th className="py-2 px-2 text-center">{language === 'vi' ? 'Công thức' : 'Recipe'}</th>
                    <th className="py-2 px-2 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {drinks.map((drink, idx) => (
                    <tr key={drink.name} className="border-t border-[#E6D3C5]">
                      <td className="py-2 px-2 font-medium text-[#6F4E37]">
                        <input
                          type="text"
                          value={drink.name}
                          onChange={e => handleUpdateDrink(idx, "name", e.target.value)}
                          className="w-20 px-1 py-1 border border-[#E6D3C5] rounded text-left focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent bg-[#F5E9DA]/40"
                        />
                      </td>
                      <td className="py-2 px-2 text-right">{t.format(drink.cost * currencyMultiplier)} {t.currencySymbol}</td>
                      <td className="py-2 px-2 text-right">
                        <input
                          type="text"
                          value={t.format(drink.price * currencyMultiplier)}
                          onChange={e => handleUpdateDrink(idx, "price", e.target.value)}
                          className="w-16 px-1 py-1 border border-[#E6D3C5] rounded text-right focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent bg-[#F5E9DA]/40"
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
                        className="w-20 px-1 py-1 border border-[#E6D3C5] rounded text-left bg-[#F5E9DA]/40"
                      />
                    </td>
                    <td></td>
                    <td className="py-2 px-2 text-right">
                      <input
                        type="text"
                        value={newDrink.price}
                        onChange={e => setNewDrink({ ...newDrink, price: e.target.value })}
                        placeholder={language === 'vi' ? 'Giá' : 'Price'}
                        className="w-16 px-1 py-1 border border-[#E6D3C5] rounded text-right bg-[#F5E9DA]/40"
                      /> {t.currencySymbol}
                    </td>
                    <td colSpan={4} className="py-2 px-2 text-center">
                      <button onClick={handleAddDrink} className="text-green-600 hover:text-green-800"><Plus size={18} /></button>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* Collapsible Recipes */}
              {drinks.map((drink, drinkIdx) => (
                openRecipe === drink.name && (
                  <div key={drink.name + '-recipe'} className="mb-4 bg-[#F5E9DA]/60 rounded-lg p-3 border border-[#E6D3C5]">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block bg-[#6F4E37] text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">{drinkIdx + 1}</span>
                      <span className="text-lg font-bold text-[#6F4E37]">{drink.name}</span>
                    </div>
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-[#F5E9DA] text-[#6F4E37]">
                          <th className="py-1 px-2 text-left">{language === 'vi' ? 'Nguyên liệu' : 'Ingredient'}</th>
                          <th className="py-1 px-2 text-right">{language === 'vi' ? 'Số lượng' : 'Quantity'}</th>
                          <th className="py-1 px-2 text-right">{language === 'vi' ? 'Đơn vị' : 'Unit'}</th>
                          <th className="py-1 px-2 text-center"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {drink.recipe.map((item, itemIdx) => (
                          <tr key={item.ingredient} className="border-t border-[#E6D3C5] hover:bg-[#F5E9DA]/60 transition">
                            <td className="py-1 px-2 text-[#4B3A2F]">
                              <select
                                value={item.ingredient}
                                onChange={e => handleUpdateRecipeItem(drinkIdx, itemIdx, "ingredient", e.target.value)}
                                className="w-24 px-1 py-1 border border-[#E6D3C5] rounded text-left bg-[#F5E9DA]/40"
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
                              className="w-24 px-1 py-1 border border-[#E6D3C5] rounded text-left bg-[#F5E9DA]/40"
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
          className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-[#A3B18A]/90 to-[#6F4E37]/90 text-white shadow-lg py-3 px-4 flex flex-col sm:flex-row items-center justify-center gap-4 z-50"
        >
          <div className="font-semibold text-lg">{t.summary.title}</div>
          <div>
            {t.summary.totalProfit}:{" "}
            <span className="font-bold text-green-200">
              {t.format(Number(data.summary.totalProfit) * currencyMultiplier)}{" "}
              {t.currencySymbol}
            </span>
          </div>
          <div>
            {t.summary.averageProfit}:{" "}
            <span className="font-bold">
              {t.format(
                Number(data.summary.averageProfit) * currencyMultiplier
              )}{" "}
              {t.currencySymbol}
            </span>
          </div>
          <div>
            {t.summary.averageMargin}:{" "}
            <span className="font-bold">{data.summary.averageMargin}</span>
          </div>
        </div>
      )}
    </div>
  );
}
