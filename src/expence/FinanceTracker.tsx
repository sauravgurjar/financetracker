import React, { useState, useEffect } from 'react';
import { PlusCircle, Wallet, TrendingUp, Target, PiggyBank, DollarSign, ArrowUpRight, ArrowDownRight, Calendar, BarChart3 } from 'lucide-react';

interface Transaction {
    id: string;
    type: 'income' | 'expense';
    category: string;
    amount: number;
    description: string;
    date: string;
}

interface SavingsPod {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    monthlyContribution: number;
    category: string;
}

interface Investment {
    id: string;
    type: 'gold' | 'mutual_fund' | 'stocks';
    name: string;
    amount: number;
    units: number;
    currentValue: number;
    returns: number;
}

const FinanceTracker: React.FC = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [savingsPods, setSavingsPods] = useState<SavingsPod[]>([]);
    const [investments, setInvestments] = useState<Investment[]>([]);

    // Transaction Form States
    const [transactionForm, setTransactionForm] = useState({
        type: 'expense' as 'income' | 'expense',
        category: '',
        amount: '',
        description: ''
    });

    // Savings Pod Form States
    const [podForm, setPodForm] = useState({
        name: '',
        targetAmount: '',
        monthlyContribution: '',
        category: 'emergency'
    });

    // Investment Form States
    const [investmentForm, setInvestmentForm] = useState({
        type: 'mutual_fund' as 'gold' | 'mutual_fund' | 'stocks',
        name: '',
        amount: '',
        units: ''
    });

    // Initialize with sample data
    useEffect(() => {
        const sampleTransactions: Transaction[] = [
            { id: '1', type: 'income', category: 'Salary', amount: 50000, description: 'Monthly salary', date: new Date().toISOString().split('T')[0] },
            { id: '2', type: 'expense', category: 'Food', amount: 2500, description: 'Groceries', date: new Date().toISOString().split('T')[0] },
            { id: '3', type: 'expense', category: 'Transport', amount: 1200, description: 'Uber rides', date: new Date().toISOString().split('T')[0] }
        ];

        const samplePods: SavingsPod[] = [
            { id: '1', name: 'Emergency Fund', targetAmount: 100000, currentAmount: 25000, monthlyContribution: 5000, category: 'emergency' },
            { id: '2', name: 'Vacation Fund', targetAmount: 50000, currentAmount: 15000, monthlyContribution: 3000, category: 'travel' }
        ];

        const sampleInvestments: Investment[] = [
            { id: '1', type: 'gold', name: 'Digital Gold', amount: 10000, units: 2.5, currentValue: 10500, returns: 5.0 },
            { id: '2', type: 'mutual_fund', name: 'Large Cap Fund', amount: 15000, units: 150, currentValue: 16200, returns: 8.0 }
        ];

        setTransactions(sampleTransactions);
        setSavingsPods(samplePods);
        setInvestments(sampleInvestments);
    }, []);

    const addTransaction = () => {
        if (!transactionForm.category || !transactionForm.amount || !transactionForm.description) return;

        const newTransaction: Transaction = {
            id: Date.now().toString(),
            type: transactionForm.type,
            category: transactionForm.category,
            amount: parseFloat(transactionForm.amount),
            description: transactionForm.description,
            date: new Date().toISOString().split('T')[0]
        };

        setTransactions([...transactions, newTransaction]);
        setTransactionForm({ type: 'expense', category: '', amount: '', description: '' });
    };

    const addSavingsPod = () => {
        if (!podForm.name || !podForm.targetAmount || !podForm.monthlyContribution) return;

        const newPod: SavingsPod = {
            id: Date.now().toString(),
            name: podForm.name,
            targetAmount: parseFloat(podForm.targetAmount),
            currentAmount: 0,
            monthlyContribution: parseFloat(podForm.monthlyContribution),
            category: podForm.category
        };

        setSavingsPods([...savingsPods, newPod]);
        setPodForm({ name: '', targetAmount: '', monthlyContribution: '', category: 'emergency' });
    };

    const addInvestment = () => {
        if (!investmentForm.name || !investmentForm.amount || !investmentForm.units) return;

        const newInvestment: Investment = {
            id: Date.now().toString(),
            type: investmentForm.type,
            name: investmentForm.name,
            amount: parseFloat(investmentForm.amount),
            units: parseFloat(investmentForm.units),
            currentValue: parseFloat(investmentForm.amount) * 1.05, // Mock 5% return
            returns: 5.0
        };

        setInvestments([...investments, newInvestment]);
        setInvestmentForm({ type: 'mutual_fund', name: '', amount: '', units: '' });
    };

    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const netBalance = totalIncome - totalExpenses;
    const totalSavings = savingsPods.reduce((sum, pod) => sum + pod.currentAmount, 0);
    const totalInvestments = investments.reduce((sum, inv) => sum + inv.currentValue, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 mb-8 border border-white/20">
                    <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        FinanceTracker Pro
                    </h1>
                    <p className="text-center text-gray-600 text-lg">Smart Financial Management & Investment Platform</p>

                    {/* Navigation */}
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        {[
                            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                            { id: 'transactions', label: 'Transactions', icon: Wallet },
                            { id: 'savings', label: 'Savings Pods', icon: PiggyBank },
                            { id: 'investments', label: 'Investments', icon: TrendingUp }
                        ].map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                                        activeTab === tab.id
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                                            : 'bg-white/50 text-gray-700 hover:bg-white/70 hover:scale-105'
                                    }`}
                                >
                                    <Icon size={20} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Dashboard Tab */}
                {activeTab === 'dashboard' && (
                    <div className="space-y-8">
                        {/* Financial Overview Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-6 text-white shadow-xl">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-semibold">Total Income</h3>
                                    <ArrowUpRight className="w-6 h-6" />
                                </div>
                                <p className="text-3xl font-bold">₹{totalIncome.toLocaleString()}</p>
                            </div>

                            <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-2xl p-6 text-white shadow-xl">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-semibold">Total Expenses</h3>
                                    <ArrowDownRight className="w-6 h-6" />
                                </div>
                                <p className="text-3xl font-bold">₹{totalExpenses.toLocaleString()}</p>
                            </div>

                            <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-semibold">Net Balance</h3>
                                    <DollarSign className="w-6 h-6" />
                                </div>
                                <p className="text-3xl font-bold">₹{netBalance.toLocaleString()}</p>
                            </div>

                            <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-semibold">Investments</h3>
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <p className="text-3xl font-bold">₹{totalInvestments.toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Recent Transactions */}
                            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Wallet className="w-5 h-5" />
                                    Recent Transactions
                                </h3>
                                <div className="space-y-3">
                                    {transactions.slice(-5).map(transaction => (
                                        <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                            <div>
                                                <p className="font-semibold">{transaction.description}</p>
                                                <p className="text-sm text-gray-600">{transaction.category}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                                    {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                                                </p>
                                                <p className="text-xs text-gray-500">{transaction.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Savings Progress */}
                            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Target className="w-5 h-5" />
                                    Savings Progress
                                </h3>
                                <div className="space-y-4">
                                    {savingsPods.map(pod => (
                                        <div key={pod.id} className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="font-semibold">{pod.name}</span>
                                                <span className="text-sm text-gray-600">
                          ₹{pod.currentAmount.toLocaleString()} / ₹{pod.targetAmount.toLocaleString()}
                        </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-3">
                                                <div
                                                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                                                    style={{ width: `${(pod.currentAmount / pod.targetAmount) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Transactions Tab */}
                {activeTab === 'transactions' && (
                    <div className="space-y-8">
                        {/* Add Transaction Form */}
                        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                            <h3 className="text-xl font-bold mb-4">Add New Transaction</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                <select
                                    value={transactionForm.type}
                                    onChange={(e) => setTransactionForm({...transactionForm, type: e.target.value as 'income' | 'expense'})}
                                    className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="expense">Expense</option>
                                    <option value="income">Income</option>
                                </select>

                                <input
                                    type="text"
                                    placeholder="Category"
                                    value={transactionForm.category}
                                    onChange={(e) => setTransactionForm({...transactionForm, category: e.target.value})}
                                    className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />

                                <input
                                    type="number"
                                    placeholder="Amount"
                                    value={transactionForm.amount}
                                    onChange={(e) => setTransactionForm({...transactionForm, amount: e.target.value})}
                                    className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />

                                <input
                                    type="text"
                                    placeholder="Description"
                                    value={transactionForm.description}
                                    onChange={(e) => setTransactionForm({...transactionForm, description: e.target.value})}
                                    className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />

                                <button
                                    onClick={addTransaction}
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-xl hover:scale-105 transition-transform font-semibold flex items-center justify-center gap-2"
                                >
                                    <PlusCircle size={20} />
                                    Add
                                </button>
                            </div>
                        </div>

                        {/* Transactions List */}
                        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                            <h3 className="text-xl font-bold mb-4">All Transactions</h3>
                            <div className="space-y-3">
                                {transactions.map(transaction => (
                                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-3 h-3 rounded-full ${transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                            <div>
                                                <p className="font-semibold">{transaction.description}</p>
                                                <p className="text-sm text-gray-600">{transaction.category}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`font-bold text-lg ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                                {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                                            </p>
                                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                                <Calendar size={12} />
                                                {transaction.date}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Savings Tab */}
                {activeTab === 'savings' && (
                    <div className="space-y-8">
                        {/* Add Savings Pod Form */}
                        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                            <h3 className="text-xl font-bold mb-4">Create New Savings Pod</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                <input
                                    type="text"
                                    placeholder="Pod Name"
                                    value={podForm.name}
                                    onChange={(e) => setPodForm({...podForm, name: e.target.value})}
                                    className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />

                                <input
                                    type="number"
                                    placeholder="Target Amount"
                                    value={podForm.targetAmount}
                                    onChange={(e) => setPodForm({...podForm, targetAmount: e.target.value})}
                                    className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />

                                <input
                                    type="number"
                                    placeholder="Monthly Contribution"
                                    value={podForm.monthlyContribution}
                                    onChange={(e) => setPodForm({...podForm, monthlyContribution: e.target.value})}
                                    className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />

                                <select
                                    value={podForm.category}
                                    onChange={(e) => setPodForm({...podForm, category: e.target.value})}
                                    className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="emergency">Emergency Fund</option>
                                    <option value="travel">Travel</option>
                                    <option value="car">Car Purchase</option>
                                    <option value="house">House Down Payment</option>
                                    <option value="education">Education</option>
                                </select>

                                <button
                                    onClick={addSavingsPod}
                                    className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-3 rounded-xl hover:scale-105 transition-transform font-semibold flex items-center justify-center gap-2"
                                >
                                    <Target size={20} />
                                    Create Pod
                                </button>
                            </div>
                        </div>

                        {/* Savings Pods Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {savingsPods.map(pod => (
                                <div key={pod.id} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-lg font-bold">{pod.name}</h4>
                                        <PiggyBank className="w-6 h-6 text-blue-500" />
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span>Progress</span>
                                            <span>{Math.round((pod.currentAmount / pod.targetAmount) * 100)}%</span>
                                        </div>

                                        <div className="w-full bg-gray-200 rounded-full h-4">
                                            <div
                                                className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500"
                                                style={{ width: `${(pod.currentAmount / pod.targetAmount) * 100}%` }}
                                            ></div>
                                        </div>

                                        <div className="flex justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Current</p>
                                                <p className="font-bold">₹{pod.currentAmount.toLocaleString()}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-600">Target</p>
                                                <p className="font-bold">₹{pod.targetAmount.toLocaleString()}</p>
                                            </div>
                                        </div>

                                        <div className="pt-3 border-t border-gray-200">
                                            <p className="text-sm text-gray-600">Monthly Contribution</p>
                                            <p className="font-semibold text-blue-600">₹{pod.monthlyContribution.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Investments Tab */}
                {activeTab === 'investments' && (
                    <div className="space-y-8">
                        {/* Add Investment Form */}
                        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                            <h3 className="text-xl font-bold mb-4">Add New Investment</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                <select
                                    value={investmentForm.type}
                                    onChange={(e) => setInvestmentForm({...investmentForm, type: e.target.value as 'gold' | 'mutual_fund' | 'stocks'})}
                                    className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="mutual_fund">Mutual Fund</option>
                                    <option value="gold">Gold</option>
                                    <option value="stocks">Stocks</option>
                                </select>

                                <input
                                    type="text"
                                    placeholder="Investment Name"
                                    value={investmentForm.name}
                                    onChange={(e) => setInvestmentForm({...investmentForm, name: e.target.value})}
                                    className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />

                                <input
                                    type="number"
                                    placeholder="Amount Invested"
                                    value={investmentForm.amount}
                                    onChange={(e) => setInvestmentForm({...investmentForm, amount: e.target.value})}
                                    className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />

                                <input
                                    type="number"
                                    placeholder="Units/Quantity"
                                    value={investmentForm.units}
                                    onChange={(e) => setInvestmentForm({...investmentForm, units: e.target.value})}
                                    className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />

                                <button
                                    onClick={addInvestment}
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-xl hover:scale-105 transition-transform font-semibold flex items-center justify-center gap-2"
                                >
                                    <TrendingUp size={20} />
                                    Add Investment
                                </button>
                            </div>
                        </div>

                        {/* Investment Portfolio */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {investments.map(investment => (
                                <div key={investment.id} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h4 className="text-lg font-bold">{investment.name}</h4>
                                            <p className="text-sm text-gray-600 capitalize">{investment.type.replace('_', ' ')}</p>
                                        </div>
                                        <div className={`p-2 rounded-full ${
                                            investment.type === 'gold' ? 'bg-yellow-100 text-yellow-600' :
                                                investment.type === 'mutual_fund' ? 'bg-blue-100 text-blue-600' :
                                                    'bg-green-100 text-green-600'
                                        }`}>
                                            <TrendingUp size={20} />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Invested</p>
                                                <p className="font-bold">₹{investment.amount.toLocaleString()}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-600">Current Value</p>
                                                <p className="font-bold text-green-600">₹{investment.currentValue.toLocaleString()}</p>
                                            </div>
                                        </div>

                                        <div className="flex justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Units</p>
                                                <p className="font-semibold">{investment.units}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-600">Returns</p>
                                                <p className={`font-semibold ${investment.returns > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {investment.returns > 0 ? '+' : ''}{investment.returns.toFixed(1)}%
                                                </p>
                                            </div>
                                        </div>

                                        <div className="pt-3 border-t border-gray-200">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">P&L</span>
                                                <span className={`font-bold ${investment.currentValue > investment.amount ? 'text-green-600' : 'text-red-600'}`}>
                          {investment.currentValue > investment.amount ? '+' : ''}₹{(investment.currentValue - investment.amount).toLocaleString()}
                        </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Investment Summary */}
                        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                            <h3 className="text-xl font-bold mb-4">Investment Summary</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-blue-600">₹{investments.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}</p>
                                    <p className="text-gray-600">Total Invested</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-green-600">₹{totalInvestments.toLocaleString()}</p>
                                    <p className="text-gray-600">Current Value</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-purple-600">
                                        ₹{(totalInvestments - investments.reduce((sum, inv) => sum + inv.amount, 0)).toLocaleString()}
                                    </p>
                                    <p className="text-gray-600">Total Returns</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FinanceTracker;