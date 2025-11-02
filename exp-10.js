import React, { useState } from 'react';
import { Wallet, TrendingDown, TrendingUp, DollarSign, Trash2, Filter } from 'lucide-react';

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');
  const [type, setType] = useState('expense');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = [
    { value: 'food', label: '🍔 Food', color: 'bg-orange-100 text-orange-700' },
    { value: 'transport', label: '🚗 Transport', color: 'bg-blue-100 text-blue-700' },
    { value: 'entertainment', label: '🎬 Entertainment', color: 'bg-purple-100 text-purple-700' },
    { value: 'utilities', label: '💡 Utilities', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'healthcare', label: '🏥 Healthcare', color: 'bg-red-100 text-red-700' },
    { value: 'shopping', label: '🛍️ Shopping', color: 'bg-pink-100 text-pink-700' },
    { value: 'other', label: '📦 Other', color: 'bg-gray-100 text-gray-700' },
  ];

  const addTransaction = () => {
    if (!description || !amount) return;

    const newExpense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      category,
      type,
      date: new Date().toLocaleDateString(),
    };

    setExpenses([newExpense, ...expenses]);
    setDescription('');
    setAmount('');
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const filteredExpenses = filterCategory === 'all' 
    ? expenses 
    : expenses.filter(exp => exp.category === filterCategory);

  const totalIncome = expenses
    .filter(exp => exp.type === 'income')
    .reduce((acc, exp) => acc + exp.amount, 0);

  const totalExpense = expenses
    .filter(exp => exp.type === 'expense')
    .reduce((acc, exp) => acc + exp.amount, 0);

  const balance = totalIncome - totalExpense;

  const getCategoryInfo = (cat) => categories.find(c => c.value === cat) || categories[6];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Wallet className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">Expense Tracker</h1>
          </div>
          <p className="text-gray-600">Manage your finances efficiently</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-indigo-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Balance</p>
                <p className={`text-3xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${balance.toFixed(2)}
                </p>
              </div>
              <DollarSign className="w-12 h-12 text-indigo-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Income</p>
                <p className="text-3xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Expenses</p>
                <p className="text-3xl font-bold text-red-600">${totalExpense.toFixed(2)}</p>
              </div>
              <TrendingDown className="w-12 h-12 text-red-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Add Transaction</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setType('expense')}
                      className={`flex-1 py-2 rounded-lg font-medium transition ${
                        type === 'expense'
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Expense
                    </button>
                    <button
                      onClick={() => setType('income')}
                      className={`flex-1 py-2 rounded-lg font-medium transition ${
                        type === 'income'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Income
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={addTransaction}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition shadow-md hover:shadow-lg"
                >
                  Add Transaction
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Transaction History</h2>
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredExpenses.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <p className="text-lg">No transactions yet</p>
                    <p className="text-sm">Add your first transaction to get started!</p>
                  </div>
                ) : (
                  filteredExpenses.map(exp => {
                    const catInfo = getCategoryInfo(exp.category);
                    return (
                      <div
                        key={exp.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${catInfo.color}`}>
                            {catInfo.label}
                          </span>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">{exp.description}</p>
                            <p className="text-sm text-gray-500">{exp.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-lg font-bold ${
                            exp.type === 'income' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {exp.type === 'income' ? '+' : '-'}${exp.amount.toFixed(2)}
                          </span>
                          <button
                            onClick={() => deleteExpense(exp.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}