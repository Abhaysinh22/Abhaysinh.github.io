/* ==========================================
   BUSINESS DASHBOARD - Mock Data
   ========================================== */

const DashboardData = {
    // KPI Values
    kpis: {
        totalRevenue: 284500,
        totalOrders: 3847,
        totalCustomers: 1856,
        growthRate: 23.4
    },

    // Revenue data (monthly)
    revenueData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        revenue: [18500, 22300, 19800, 25600, 28400, 31200, 29800, 34500, 37800, 35200, 41200, 44200],
        expenses: [12000, 14500, 13200, 16800, 18200, 20100, 19500, 22400, 24500, 22800, 26800, 28900]
    },

    // Sales breakdown (categories)
    salesBreakdown: {
        labels: ['Electronics', 'Clothing', 'Food & Drinks', 'Home & Living', 'Sports', 'Books'],
        data: [35, 25, 18, 12, 7, 3],
        colors: ['#6366f1', '#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6']
    },

    // Recent orders
    recentOrders: [
        { id: '#ORD-001', customer: 'Sarah Johnson', product: 'MacBook Pro 16"', amount: 2499, status: 'completed' },
        { id: '#ORD-002', customer: 'Michael Chen', product: 'Wireless Headphones', amount: 349, status: 'processing' },
        { id: '#ORD-003', customer: 'Emily Davis', product: 'Designer Chair', amount: 899, status: 'completed' },
        { id: '#ORD-004', customer: 'James Wilson', product: 'Running Shoes', amount: 129, status: 'pending' },
        { id: '#ORD-005', customer: 'Lisa Anderson', product: 'Organic Coffee Set', amount: 49, status: 'completed' },
        { id: '#ORD-006', customer: 'Robert Taylor', product: 'Smart Watch', amount: 399, status: 'cancelled' },
        { id: '#ORD-007', customer: 'Amanda Lee', product: 'Yoga Mat Premium', amount: 79, status: 'processing' },
        { id: '#ORD-008', customer: 'David Martinez', product: '4K Monitor 27"', amount: 699, status: 'completed' }
    ],

    // Sales data
    salesData: {
        monthlyRevenue: 44200,
        avgOrderValue: 128.50,
        conversionRate: 3.8,
        totalProductsSold: 6234,
        trend: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
            data: [8200, 9500, 8800, 11200, 10500, 12800, 11900, 14200]
        },
        topProducts: {
            labels: ['MacBook Pro', 'Wireless Buds', 'Designer Chair', 'Smart Watch', 'Running Shoes'],
            data: [245, 189, 156, 134, 112]
        },
        products: [
            { name: 'MacBook Pro 16"', category: 'Electronics', unitsSold: 245, revenue: 612255, trend: 'up' },
            { name: 'Wireless Headphones', category: 'Electronics', unitsSold: 189, revenue: 65961, trend: 'up' },
            { name: 'Designer Chair', category: 'Home & Living', unitsSold: 156, revenue: 140244, trend: 'up' },
            { name: 'Smart Watch Pro', category: 'Electronics', unitsSold: 134, revenue: 53466, trend: 'down' },
            { name: 'Running Shoes Air', category: 'Sports', unitsSold: 112, revenue: 14448, trend: 'up' },
            { name: 'Organic Coffee Set', category: 'Food & Drinks', unitsSold: 98, revenue: 4802, trend: 'down' },
            { name: '4K Monitor 27"', category: 'Electronics', unitsSold: 87, revenue: 60813, trend: 'up' },
            { name: 'Yoga Mat Premium', category: 'Sports', unitsSold: 76, revenue: 6004, trend: 'up' }
        ]
    },

    // Customer data
    customerData: {
        newCustomers: 423,
        returningCustomers: 1433,
        avgRating: 4.6,
        retentionRate: 73.5,
        growth: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            new: [45, 52, 38, 61, 55, 73, 68, 82, 79, 91, 86, 98],
            returning: [120, 135, 128, 156, 148, 172, 165, 189, 182, 198, 195, 215]
        },
        demographics: {
            labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
            data: [12, 35, 30, 15, 8]
        },
        customers: [
            { name: 'Sarah Johnson', email: 'sarah.j@email.com', orders: 24, spent: 12450, status: 'active' },
            { name: 'Michael Chen', email: 'm.chen@email.com', orders: 18, spent: 8900, status: 'active' },
            { name: 'Emily Davis', email: 'emily.d@email.com', orders: 31, spent: 15700, status: 'vip' },
            { name: 'James Wilson', email: 'j.wilson@email.com', orders: 7, spent: 2100, status: 'active' },
            { name: 'Lisa Anderson', email: 'lisa.a@email.com', orders: 15, spent: 6700, status: 'active' },
            { name: 'Robert Taylor', email: 'r.taylor@email.com', orders: 3, spent: 450, status: 'inactive' },
            { name: 'Amanda Lee', email: 'amanda.l@email.com', orders: 22, spent: 11200, status: 'vip' },
            { name: 'David Martinez', email: 'd.martinez@email.com', orders: 11, spent: 5800, status: 'active' },
            { name: 'Jennifer Brown', email: 'j.brown@email.com', orders: 9, spent: 3200, status: 'active' },
            { name: 'Chris Thompson', email: 'c.thompson@email.com', orders: 5, spent: 1800, status: 'inactive' }
        ]
    },

    // Inventory data
    inventoryData: {
        totalProducts: 1256,
        inStock: 987,
        lowStock: 198,
        outOfStock: 71,
        stockLevels: {
            labels: ['Electronics', 'Clothing', 'Food & Drinks', 'Home & Living', 'Sports', 'Books'],
            inStock: [180, 220, 150, 145, 130, 162],
            lowStock: [25, 45, 35, 30, 28, 35],
            outOfStock: [12, 18, 15, 10, 8, 8]
        },
        categories: {
            labels: ['Electronics', 'Clothing', 'Food & Drinks', 'Home & Living', 'Sports', 'Books'],
            data: [215, 283, 198, 185, 165, 210]
        },
        inventory: [
            { product: 'MacBook Pro 16"', category: 'Electronics', stock: 45, price: 2499, status: 'in-stock' },
            { product: 'Wireless Headphones', category: 'Electronics', stock: 128, price: 349, status: 'in-stock' },
            { product: 'Designer Chair', category: 'Home & Living', stock: 23, price: 899, status: 'in-stock' },
            { product: 'Running Shoes Air', category: 'Sports', stock: 8, price: 129, status: 'low-stock' },
            { product: 'Organic Coffee Set', category: 'Food & Drinks', stock: 0, price: 49, status: 'out-of-stock' },
            { product: 'Smart Watch Pro', category: 'Electronics', stock: 56, price: 399, status: 'in-stock' },
            { product: '4K Monitor 27"', category: 'Electronics', stock: 4, price: 699, status: 'low-stock' },
            { product: 'Yoga Mat Premium', category: 'Sports', stock: 0, price: 79, status: 'out-of-stock' },
            { product: 'Cotton T-Shirt Pack', category: 'Clothing', stock: 200, price: 39, status: 'in-stock' },
            { product: 'Standing Desk', category: 'Home & Living', stock: 15, price: 599, status: 'in-stock' }
        ]
    },

    // Finance data
    financeData: {
        totalRevenue: 284500,
        totalExpenses: 198200,
        netProfit: 86300,
        profitMargin: 30.3,
        cashFlow: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            inflow: [20500, 24300, 21800, 27600, 30400, 33200, 31800, 36500, 39800, 37200, 43200, 46200],
            outflow: [14000, 16500, 15200, 18800, 20200, 22100, 21500, 24400, 26500, 24800, 28800, 30900]
        },
        expenseBreakdown: {
            labels: ['Salaries', 'Marketing', 'Operations', 'Rent', 'Utilities', 'Other'],
            data: [35, 22, 18, 12, 8, 5]
        },
        transactions: [
            { date: '2024-12-15', description: 'Client Payment - Q4', category: 'Revenue', amount: 45000, type: 'in' },
            { date: '2024-12-14', description: 'Office Rent', category: 'Rent', amount: 8500, type: 'out' },
            { date: '2024-12-13', description: 'Employee Salaries', category: 'Salaries', amount: 28500, type: 'out' },
            { date: '2024-12-12', description: 'Product Sales - Online', category: 'Revenue', amount: 12400, type: 'in' },
            { date: '2024-12-11', description: 'Marketing Campaign', category: 'Marketing', amount: 5600, type: 'out' },
            { date: '2024-12-10', description: 'Server & Infrastructure', category: 'Operations', amount: 3200, type: 'out' },
            { date: '2024-12-09', description: 'Consulting Service', category: 'Revenue', amount: 8000, type: 'in' },
            { date: '2024-12-08', description: 'Utility Bills', category: 'Utilities', amount: 1800, type: 'out' },
            { date: '2024-12-07', description: 'Software Licenses', category: 'Operations', amount: 2400, type: 'out' },
            { date: '2024-12-06', description: 'Product Sales - Retail', category: 'Revenue', amount: 9600, type: 'in' }
        ]
    }
};

