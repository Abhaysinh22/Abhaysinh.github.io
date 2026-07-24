/* ==========================================
   BUSINESS DASHBOARD - Main Application
   ========================================== */

class DashboardApp {
    constructor() {
        this.currentPage = 'dashboard';
        this.charts = {};
        this.isDarkMode = localStorage.getItem('dashboardTheme') === 'dark';
        this.init();
    }

    init() {
        // Set initial theme
        if (this.isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }

        // Set current date
        this.updateDateDisplay();

        // Initialize login
        this.initLogin();

        // Initialize navigation
        this.initNavigation();

        // Initialize sidebar
        this.initSidebar();

        // Initialize theme toggle
        this.initThemeToggle();

        // Initialize search
        this.initSearch();

        // Initialize period buttons
        this.initPeriodButtons();

        // Initialize reports
        this.initReports();

        // Initialize settings
        this.initSettings();

        // Initialize logout
        this.initLogout();

        // Initialize password toggle
        this.initPasswordToggle();

        // Load dashboard data
        this.loadDashboardData();
    }

    // ===== DATE DISPLAY =====
    updateDateDisplay() {
        const dateEl = document.getElementById('dateDisplay');
        if (dateEl) {
            const now = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dateEl.textContent = now.toLocaleDateString('en-US', options);
        }
    }

    // ===== LOGIN =====
    initLogin() {
        const loginForm = document.getElementById('loginForm');
        const loginBtn = document.getElementById('loginBtn');
        
        if (!loginForm) return;

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            let isValid = true;

            // Validate email
            if (!email.value || !this.isValidEmail(email.value)) {
                document.getElementById('emailError').classList.add('show');
                email.classList.add('error');
                isValid = false;
            } else {
                document.getElementById('emailError').classList.remove('show');
                email.classList.remove('error');
            }

            // Validate password
            if (!password.value || password.value.length < 3) {
                document.getElementById('passwordError').classList.add('show');
                password.classList.add('error');
                isValid = false;
            } else {
                document.getElementById('passwordError').classList.remove('show');
                password.classList.remove('error');
            }

            if (isValid) {
                // Show loading
                loginBtn.classList.add('loading');
                loginBtn.innerHTML = '<div class="spinner"></div>';

                // Simulate login
                setTimeout(() => {
                    this.showDashboard();
                    this.showToast('Welcome back! Login successful.', 'success');
                }, 1200);
            }
        });

        // Real-time validation
        document.getElementById('email').addEventListener('input', function() {
            if (this.value) {
                document.getElementById('emailError').classList.remove('show');
                this.classList.remove('error');
            }
        });

        document.getElementById('password').addEventListener('input', function() {
            if (this.value) {
                document.getElementById('passwordError').classList.remove('show');
                this.classList.remove('error');
            }
        });
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    initPasswordToggle() {
        const toggleBtn = document.getElementById('togglePassword');
        if (!toggleBtn) return;

        toggleBtn.addEventListener('click', () => {
            const password = document.getElementById('password');
            const icon = toggleBtn.querySelector('i');
            
            if (password.type === 'password') {
                password.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                password.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    }

    showDashboard() {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('dashboardPage').style.display = 'flex';
        
        // Initialize charts after dashboard is visible
        setTimeout(() => {
            this.initDashboardCharts();
            this.initSalesCharts();
            this.initCustomerCharts();
            this.initInventoryCharts();
            this.initFinanceCharts();
        }, 100);
    }

    // ===== SIDEBAR =====
    initSidebar() {
        const sidebar = document.getElementById('sidebar');
        const toggleBtn = document.getElementById('sidebarToggle');
        const mobileBtn = document.getElementById('mobileMenuBtn');

        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed');
            });
        }

        if (mobileBtn) {
            mobileBtn.addEventListener('click', () => {
                sidebar.classList.toggle('mobile-open');
            });
        }

        // Close sidebar on outside click (mobile)
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!sidebar.contains(e.target) && !mobileBtn.contains(e.target)) {
                    sidebar.classList.remove('mobile-open');
                }
            }
        });
    }

    // ===== NAVIGATION =====
    initNavigation() {
        const navItems = document.querySelectorAll('.nav-item[data-page]');
        
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;
                
                // Update active state
                navItems.forEach(n => n.classList.remove('active'));
                item.classList.add('active');

                // Show page
                document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
                const targetPage = document.getElementById(`page-${page}`);
                if (targetPage) {
                    targetPage.classList.add('active');
                    this.currentPage = page;
                }

                // Close mobile sidebar
                if (window.innerWidth <= 768) {
                    document.getElementById('sidebar').classList.remove('mobile-open');
                }
            });
        });
    }

    // ===== THEME TOGGLE =====
    initThemeToggle() {
        const themeBtn = document.getElementById('themeToggle');
        const darkModeCheckbox = document.getElementById('darkModeToggle');

        if (themeBtn) {
            themeBtn.addEventListener('click', () => {
                this.toggleTheme();
                if (darkModeCheckbox) darkModeCheckbox.checked = this.isDarkMode;
            });
        }

        if (darkModeCheckbox) {
            darkModeCheckbox.checked = this.isDarkMode;
            darkModeCheckbox.addEventListener('change', () => {
                this.toggleTheme();
            });
        }
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        if (this.isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        localStorage.setItem('dashboardTheme', this.isDarkMode ? 'dark' : 'light');
        
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) {
            themeBtn.innerHTML = this.isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }
    }

    // ===== SEARCH =====
    initSearch() {
        const searchInput = document.getElementById('globalSearch');
        if (!searchInput) return;

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            // Highlight or filter logic can be added
            if (query.length > 2) {
                this.showToast(`Searching for "${query}"...`, 'info');
            }
        });
    }

    // ===== PERIOD BUTTONS =====
    initPeriodButtons() {
        document.querySelectorAll('.period-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const parent = btn.closest('.chart-period');
                parent.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update chart data based on period
                if (this.charts.revenue) {
                    this.updateRevenueChart(btn.dataset.period);
                }
            });
        });
    }

    updateRevenueChart(period) {
        const data = DashboardData.revenueData;
        const chart = this.charts.revenue;
        
        if (!chart) return;

        let labels, values;
        switch (period) {
            case 'weekly':
                labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                values = [5200, 6100, 5800, 7200, 8400, 6800, 5500];
                break;
            case 'monthly':
                labels = data.labels;
                values = data.revenue;
                break;
            case 'yearly':
                labels = ['2020', '2021', '2022', '2023', '2024'];
                values = [185000, 215000, 248000, 284500, 325000];
                break;
            default:
                labels = data.labels;
                values = data.revenue;
        }

        chart.data.labels = labels;
        chart.data.datasets[0].data = values;
        chart.update();
    }

    // ===== DASHBOARD CHARTS =====
    initDashboardCharts() {
        this.initRevenueChart();
        this.initSalesPieChart();
        this.initRecentOrders();
        this.animateCounters();
    }

    initRevenueChart() {
        const ctx = document.getElementById('revenueChart');
        if (!ctx) return;

        const data = DashboardData.revenueData;
        
        this.charts.revenue = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Revenue',
                    data: data.revenue,
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointBackgroundColor: '#6366f1',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0,0,0,0.05)' },
                        ticks: {
                            callback: value => '$' + value.toLocaleString()
                        }
                    },
                    x: {
                        grid: { display: false }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }

    initSalesPieChart() {
        const ctx = document.getElementById('salesPieChart');
        if (!ctx) return;

        const data = DashboardData.salesBreakdown;

        this.charts.salesPie = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.data,
                    backgroundColor: data.colors,
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 12,
                            usePointStyle: true,
                            font: { size: 11 }
                        }
                    }
                }
            }
        });
    }

    initRecentOrders() {
        const tbody = document.getElementById('recentOrdersBody');
        if (!tbody) return;

        tbody.innerHTML = DashboardData.recentOrders.map(order => `
            <tr>
                <td><strong>${order.id}</strong></td>
                <td>${order.customer}</td>
                <td>${order.product}</td>
                <td>$${order.amount.toLocaleString()}</td>
                <td><span class="status-badge ${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
            </tr>
        `).join('');
    }

    // ===== ANIMATED COUNTERS =====
    animateCounters() {
        const kpis = DashboardData.kpis;
        
        this.animateValue('totalRevenue', kpis.totalRevenue, '$');
        this.animateValue('totalOrders', kpis.totalOrders);
        this.animateValue('totalCustomers', kpis.totalCustomers);
        this.animateValue('growthRate', kpis.growthRate, '', '%');
    }

    animateValue(elementId, target, prefix = '', suffix = '') {
        const el = document.getElementById(elementId);
        if (!el) return;

        let current = 0;
        const increment = target / 40;
        const duration = 1500;
        const stepTime = duration / 40;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                if (Number.isInteger(target)) {
                    el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
                } else {
                    el.textContent = prefix + current.toFixed(1) + suffix;
                }
                setTimeout(updateCounter, stepTime);
            } else {
                if (Number.isInteger(target)) {
                    el.textContent = prefix + target.toLocaleString() + suffix;
                } else {
                    el.textContent = prefix + target.toFixed(1) + suffix;
                }
            }
        };

        updateCounter();
    }

    // ===== LOAD DASHBOARD DATA =====
    loadDashboardData() {
        const data = DashboardData;

        // Dashboard KPI values (already animated via animateCounters)
        
        // Sales page KPIs
        document.getElementById('monthlyRevenue').textContent = '$' + data.salesData.monthlyRevenue.toLocaleString();
        document.getElementById('avgOrderValue').textContent = '$' + data.salesData.avgOrderValue.toFixed(2);
        document.getElementById('conversionRate').textContent = data.salesData.conversionRate + '%';
        document.getElementById('totalProductsSold').textContent = data.salesData.totalProductsSold.toLocaleString();

        // Customer page KPIs
        document.getElementById('newCustomers').textContent = data.customerData.newCustomers;
        document.getElementById('returningCustomers').textContent = data.customerData.returningCustomers;
        document.getElementById('avgRating').textContent = data.customerData.avgRating.toFixed(1);
        document.getElementById('retentionRate').textContent = data.customerData.retentionRate + '%';

        // Inventory page KPIs
        document.getElementById('totalProducts').textContent = data.inventoryData.totalProducts;
        document.getElementById('inStock').textContent = data.inventoryData.inStock;
        document.getElementById('lowStock').textContent = data.inventoryData.lowStock;
        document.getElementById('outOfStock').textContent = data.inventoryData.outOfStock;

        // Finance page KPIs
        document.getElementById('financeRevenue').textContent = '$' + data.financeData.totalRevenue.toLocaleString();
        document.getElementById('totalExpenses').textContent = '$' + data.financeData.totalExpenses.toLocaleString();
        document.getElementById('netProfit').textContent = '$' + data.financeData.netProfit.toLocaleString();
        document.getElementById('profitMargin').textContent = data.financeData.profitMargin + '%';

        // Populate tables
        this.populateSalesTable();
        this.populateCustomerTable();
        this.populateInventoryTable();
        this.populateTransactionsTable();
    }

    // ===== SALES CHARTS =====
    initSalesCharts() {
        this.initSalesTrendChart();
        this.initTopProductsChart();
    }

    initSalesTrendChart() {
        const ctx = document.getElementById('salesTrendChart');
        if (!ctx) return;

        const data = DashboardData.salesData.trend;

        this.charts.salesTrend = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Sales',
                    data: data.data,
                    backgroundColor: 'rgba(99, 102, 241, 0.7)',
                    borderColor: '#6366f1',
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0,0,0,0.05)' },
                        ticks: {
                            callback: value => '$' + value.toLocaleString()
                        }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    }

    initTopProductsChart() {
        const ctx = document.getElementById('topProductsChart');
        if (!ctx) return;

        const data = DashboardData.salesData.topProducts;

        this.charts.topProducts = new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.data,
                    backgroundColor: [
                        'rgba(99, 102, 241, 0.7)',
                        'rgba(16, 185, 129, 0.7)',
                        'rgba(245, 158, 11, 0.7)',
                        'rgba(59, 130, 246, 0.7)',
                        'rgba(239, 68, 68, 0.7)'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 10, usePointStyle: true, font: { size: 11 } }
                    }
                }
            }
        });
    }

    populateSalesTable() {
        const tbody = document.getElementById('salesTableBody');
        if (!tbody) return;

        tbody.innerHTML = DashboardData.salesData.products.map(p => `
            <tr>
                <td>${p.name}</td>
                <td>${p.category}</td>
                <td>${p.unitsSold}</td>
                <td>$${p.revenue.toLocaleString()}</td>
                <td><span class="kpi-change ${p.trend}"><i class="fas fa-arrow-${p.trend}"></i></span></td>
            </tr>
        `).join('');
    }

    // ===== CUSTOMER CHARTS =====
    initCustomerCharts() {
        this.initCustomerGrowthChart();
        this.initDemographicsChart();
    }

    initCustomerGrowthChart() {
        const ctx = document.getElementById('customerGrowthChart');
        if (!ctx) return;

        const data = DashboardData.customerData.growth;

        this.charts.customerGrowth = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'New Customers',
                        data: data.new,
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 2
                    },
                    {
                        label: 'Returning',
                        data: data.returning,
                        borderColor: '#6366f1',
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { usePointStyle: true, font: { size: 11 } }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0,0,0,0.05)' }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    }

    initDemographicsChart() {
        const ctx = document.getElementById('demographicsChart');
        if (!ctx) return;

        const data = DashboardData.customerData.demographics;

        this.charts.demographics = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.data,
                    backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#3b82f6', '#ef4444'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 10, usePointStyle: true, font: { size: 11 } }
                    }
                }
            }
        });
    }

    populateCustomerTable() {
        const tbody = document.getElementById('customerTableBody');
        if (!tbody) return;

        tbody.innerHTML = DashboardData.customerData.customers.map(c => `
            <tr>
                <td>${c.name}</td>
                <td>${c.email}</td>
                <td>${c.orders}</td>
                <td>$${c.spent.toLocaleString()}</td>
                <td><span class="status-badge ${c.status}">${c.status.charAt(0).toUpperCase() + c.status.slice(1)}</span></td>
            </tr>
        `).join('');

        // Customer search
        const searchInput = document.getElementById('customerSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                const rows = tbody.querySelectorAll('tr');
                rows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    row.style.display = text.includes(query) ? '' : 'none';
                });
            });
        }
    }

    // ===== INVENTORY CHARTS =====
    initInventoryCharts() {
        this.initStockLevelsChart();
        this.initCategoriesChart();
    }

    initStockLevelsChart() {
        const ctx = document.getElementById('stockLevelsChart');
        if (!ctx) return;

        const data = DashboardData.inventoryData.stockLevels;

        this.charts.stockLevels = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'In Stock',
                        data: data.inStock,
                        backgroundColor: 'rgba(16, 185, 129, 0.7)',
                        borderRadius: 4
                    },
                    {
                        label: 'Low Stock',
                        data: data.lowStock,
                        backgroundColor: 'rgba(245, 158, 11, 0.7)',
                        borderRadius: 4
                    },
                    {
                        label: 'Out of Stock',
                        data: data.outOfStock,
                        backgroundColor: 'rgba(239, 68, 68, 0.7)',
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { usePointStyle: true, font: { size: 11 } }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0,0,0,0.05)' }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    }

    initCategoriesChart() {
        const ctx = document.getElementById('categoriesChart');
        if (!ctx) return;

        const data = DashboardData.inventoryData.categories;

        this.charts.categories = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Products',
                    data: data.data,
                    backgroundColor: 'rgba(99, 102, 241, 0.2)',
                    borderColor: '#6366f1',
                    borderWidth: 2,
                    pointBackgroundColor: '#6366f1'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0,0,0,0.05)' }
                    }
                }
            }
        });
    }

    populateInventoryTable() {
        const tbody = document.getElementById('inventoryTableBody');
        if (!tbody) return;

        tbody.innerHTML = DashboardData.inventoryData.inventory.map(item => `
            <tr>
                <td>${item.product}</td>
                <td>${item.category}</td>
                <td>${item.stock}</td>
                <td>$${item.price.toLocaleString()}</td>
                <td><span class="status-badge ${item.status}">${item.status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</span></td>
            </tr>
        `).join('');
    }

    // ===== FINANCE CHARTS =====
    initFinanceCharts() {
        this.initCashFlowChart();
        this.initExpensePieChart();
    }

    initCashFlowChart() {
        const ctx = document.getElementById('cashFlowChart');
        if (!ctx) return;

        const data = DashboardData.financeData.cashFlow;

        this.charts.cashFlow = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Cash Inflow',
                        data: data.inflow,
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 2
                    },
                    {
                        label: 'Cash Outflow',
                        data: data.outflow,
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { usePointStyle: true, font: { size: 11 } }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0,0,0,0.05)' },
                        ticks: {
                            callback: value => '$' + value.toLocaleString()
                        }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    }

    initExpensePieChart() {
        const ctx = document.getElementById('expensePieChart');
        if (!ctx) return;

        const data = DashboardData.financeData.expenseBreakdown;

        this.charts.expensePie = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.data,
                    backgroundColor: ['#6366f1', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 10, usePointStyle: true, font: { size: 11 } }
                    }
                }
            }
        });
    }

    populateTransactionsTable() {
        const tbody = document.getElementById('transactionsTableBody');
        if (!tbody) return;

        tbody.innerHTML = DashboardData.financeData.transactions.map(t => `
            <tr>
                <td>${t.date}</td>
                <td>${t.description}</td>
                <td>${t.category}</td>
                <td style="color: ${t.type === 'in' ? 'var(--accent-success)' : 'var(--accent-danger)'}">
                    ${t.type === 'in' ? '+' : '-'}$${t.amount.toLocaleString()}
                </td>
                <td><span class="status-badge ${t.type}">${t.type === 'in' ? 'Income' : 'Expense'}</span></td>
            </tr>
        `).join('');
    }

    // ===== REPORTS =====
    initReports() {
        const generateBtn = document.getElementById('generateReportBtn');
        const exportBtn = document.getElementById('exportBtn');
        const printBtn = document.getElementById('printBtn');

        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generateReport());
        }

        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportReport());
        }

        if (printBtn) {
            printBtn.addEventListener('click', () => window.print());
        }

        // Set default dates
        const from = document.getElementById('reportFrom');
        const to = document.getElementById('reportTo');
        if (from && to) {
            const now = new Date();
            const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
            from.value = firstDay.toISOString().split('T')[0];
            to.value = now.toISOString().split('T')[0];
        }
    }

    generateReport() {
        const type = document.getElementById('reportType').value;
        const content = document.getElementById('reportContent');
        const from = document.getElementById('reportFrom').value;
        const to = document.getElementById('reportTo').value;

        if (!content) return;

        let reportHtml = '';

        switch (type) {
            case 'sales':
                reportHtml = this.generateSalesReport(from, to);
                break;
            case 'customers':
                reportHtml = this.generateCustomerReport(from, to);
                break;
            case 'inventory':
                reportHtml = this.generateInventoryReport();
                break;
            case 'finance':
                reportHtml = this.generateFinanceReport(from, to);
                break;
        }

        content.innerHTML = reportHtml;
        this.showToast('Report generated successfully!', 'success');
    }

    generateSalesReport(from, to) {
        const data = DashboardData.salesData;
        return `
            <div class="report-content">
                <h4>Sales Report (${from} to ${to})</h4>
                <div class="report-stats">
                    <div class="report-stat">
                        <span>Total Revenue</span>
                        <strong>$${data.monthlyRevenue.toLocaleString()}</strong>
                    </div>
                    <div class="report-stat">
                        <span>Avg Order Value</span>
                        <strong>$${data.avgOrderValue}</strong>
                    </div>
                    <div class="report-stat">
                        <span>Products Sold</span>
                        <strong>${data.totalProductsSold}</strong>
                    </div>
                    <div class="report-stat">
                        <span>Conversion Rate</span>
                        <strong>${data.conversionRate}%</strong>
                    </div>
                </div>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Units Sold</th>
                            <th>Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.products.map(p => `
                            <tr>
                                <td>${p.name}</td>
                                <td>${p.category}</td>
                                <td>${p.unitsSold}</td>
                                <td>$${p.revenue.toLocaleString()}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    generateCustomerReport(from, to) {
        const data = DashboardData.customerData;
        return `
            <div class="report-content">
                <h4>Customer Report (${from} to ${to})</h4>
                <div class="report-stats">
                    <div class="report-stat">
                        <span>Total Customers</span>
                        <strong>${DashboardData.kpis.totalCustomers}</strong>
                    </div>
                    <div class="report-stat">
                        <span>New Customers</span>
                        <strong>${data.newCustomers}</strong>
                    </div>
                    <div class="report-stat">
                        <span>Avg Rating</span>
                        <strong>${data.avgRating}/5</strong>
                    </div>
                    <div class="report-stat">
                        <span>Retention Rate</span>
                        <strong>${data.retentionRate}%</strong>
                    </div>
                </div>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Orders</th>
                            <th>Spent</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.customers.map(c => `
                            <tr>
                                <td>${c.name}</td>
                                <td>${c.email}</td>
                                <td>${c.orders}</td>
                                <td>$${c.spent.toLocaleString()}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    generateInventoryReport() {
        const data = DashboardData.inventoryData;
        return `
            <div class="report-content">
                <h4>Inventory Report</h4>
                <div class="report-stats">
                    <div class="report-stat">
                        <span>Total Products</span>
                        <strong>${data.totalProducts}</strong>
                    </div>
                    <div class="report-stat">
                        <span>In Stock</span>
                        <strong>${data.inStock}</strong>
                    </div>
                    <div class="report-stat">
                        <span>Low Stock</span>
                        <strong style="color: var(--accent-warning)">${data.lowStock}</strong>
                    </div>
                    <div class="report-stat">
                        <span>Out of Stock</span>
                        <strong style="color: var(--accent-danger)">${data.outOfStock}</strong>
                    </div>
                </div>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.inventory.map(item => `
                            <tr>
                                <td>${item.product}</td>
                                <td>${item.category}</td>
                                <td>${item.stock}</td>
                                <td>$${item.price.toLocaleString()}</td>
                                <td>${item.status}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    generateFinanceReport(from, to) {
        const data = DashboardData.financeData;
        return `
            <div class="report-content">
                <h4>Financial Report (${from} to ${to})</h4>
                <div class="report-stats">
                    <div class="report-stat">
                        <span>Total Revenue</span>
                        <strong>$${data.totalRevenue.toLocaleString()}</strong>
                    </div>
                    <div class="report-stat">
                        <span>Total Expenses</span>
                        <strong>$${data.totalExpenses.toLocaleString()}</strong>
                    </div>
                    <div class="report-stat">
                        <span>Net Profit</span>
                        <strong style="color: var(--accent-success)">$${data.netProfit.toLocaleString()}</strong>
                    </div>
                    <div class="report-stat">
                        <span>Profit Margin</span>
                        <strong>${data.profitMargin}%</strong>
                    </div>
                </div>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.transactions.map(t => `
                            <tr>
                                <td>${t.date}</td>
                                <td>${t.description}</td>
                                <td>${t.category}</td>
                                <td>$${t.amount.toLocaleString()}</td>
                                <td>${t.type === 'in' ? 'Income' : 'Expense'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    exportReport() {
        const format = document.getElementById('exportFormat').value;
        const content = document.getElementById('reportContent');
        
        if (!content || content.querySelector('.report-placeholder')) {
            this.showToast('Please generate a report first!', 'error');
            return;
        }

        const reportText = content.innerText;

        if (format === 'csv') {
            this.downloadCSV(reportText);
        } else {
            this.downloadJSON(reportText);
        }

        this.showToast(`Report exported as ${format.toUpperCase()}!`, 'success');
    }

    downloadCSV(text) {
        const lines = text.split('\n').filter(line => line.trim());
        let csv = lines.map(line => {
            return line.split('\t').map(cell => `"${cell.trim()}"`).join(',');
        }).join('\n');
        
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `report_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }

    downloadJSON(text) {
        const data = { report: text, generatedAt: new Date().toISOString() };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `report_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    // ===== SETTINGS =====
    initSettings() {
        const saveBtn = document.getElementById('saveProfileBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                const name = document.getElementById('settingsName').value;
                const email = document.getElementById('settingsEmail').value;
                
                if (name && email) {
                    this.showToast('Profile settings saved successfully!', 'success');
                } else {
                    this.showToast('Please fill in all fields.', 'error');
                }
            });
        }
    }

    // ===== LOGOUT =====
    initLogout() {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                document.getElementById('dashboardPage').style.display = 'none';
                document.getElementById('loginPage').style.display = 'flex';
                
                // Reset login button
                const loginBtn = document.getElementById('loginBtn');
                loginBtn.classList.remove('loading');
                loginBtn.innerHTML = '<span>Sign In</span><i class="fas fa-arrow-right"></i>';
                
                this.showToast('Logged out successfully.', 'info');
            });
        }
    }

    // ===== TOAST NOTIFICATIONS =====
    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle'
        };

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas ${icons[type] || icons.info}"></i>
            <span>${message}</span>
            <span class="toast-close"><i class="fas fa-times"></i></span>
        `;

        container.appendChild(toast);

        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.remove();
        });

        // Auto remove
        setTimeout(() => {
            if (toast.parentElement) {
                toast.style.animation = 'slideIn 0.3s ease reverse';
                setTimeout(() => toast.remove(), 300);
            }
        }, 4000);
    }
}

// ===== INITIALIZE APP =====
document.addEventListener('DOMContentLoaded', () => {
    window.app = new DashboardApp();
});

