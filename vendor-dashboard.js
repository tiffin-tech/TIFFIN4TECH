/**
 * TiffinTech - Vendor Dashboard Functionality
 * Handles logout, dashboard data, and notifications
 */

document.addEventListener("DOMContentLoaded", function () {
  initLogout();         // Setup logout buttons
  loadDashboardData();  // Load and display dashboard data
});

/* ------------------------------------------------------------------
 * LOGOUT FUNCTIONALITY
 * ------------------------------------------------------------------*/

/**
 * Initialize logout functionality
 */
function initLogout() {
  const logoutBtn = document.getElementById("logout-btn");
  const mobileLogoutBtn = document.getElementById("mobile-logout-btn");

  function logout() {
    localStorage.removeItem("vendorData");
    window.location.href = "index.html"; // Redirect to login page
  }

  if (logoutBtn) logoutBtn.addEventListener("click", logout);
  if (mobileLogoutBtn) mobileLogoutBtn.addEventListener("click", logout);
}

/* ------------------------------------------------------------------
 * DASHBOARD DATA LOADING
 * ------------------------------------------------------------------*/

/**
 * Load dashboard data and update UI
 */
function loadDashboardData() {
  const vendorData = JSON.parse(localStorage.getItem("vendorData"));

  if (vendorData) {
    updateVendorStats(vendorData); // Update dashboard statistics
    checkPlanExpiry();             // Show plan expiry notifications
  }
}

/**
 * Update vendor statistics on the dashboard
 * @param {Object} vendorData - The vendor data object
 */
function updateVendorStats(vendorData) {
  // Example revenue update logic (extend with real API in future)
  // const revenueElement = document.getElementById("monthly-revenue");
  // if (revenueElement) {
  //   const monthlyRevenue = calculateMonthlyRevenue(vendorData);
  //   revenueElement.textContent = formatCurrency(monthlyRevenue);
  // }
}

/**
 * Calculate monthly revenue based on vendor data
 * @param {Object} vendorData - The vendor data object
 * @returns {number} Calculated monthly revenue
 */
function calculateMonthlyRevenue(vendorData) {
  const monthlyCustomers = 20; // Example placeholder value
  return monthlyCustomers * vendorData.tiffinRate;
}

/* ------------------------------------------------------------------
 * PLAN EXPIRY NOTIFICATIONS
 * ------------------------------------------------------------------*/

/**
 * Check if any customer’s monthly plan expires today
 */
function checkPlanExpiry() {
  // Example mock data (replace with backend/API integration later)
  const customerPlans = [
    { name: "Ravi Kumar", endDate: "2025-09-20" },
    { name: "Aarti Sharma", endDate: "2025-09-25" },
    { name: "Mohit Verma", endDate: "2025-09-30" },
  ];

  const today = new Date().toISOString().split("T")[0];
  const expiredCustomers = customerPlans.filter(
    (c) => c.endDate === today
  );

  if (expiredCustomers.length > 0) {
    const notificationBox = document.getElementById("notifications");
    const notificationText = document.getElementById("notification-text");

    if (notificationBox && notificationText) {
      notificationText.textContent = expiredCustomers
        .map((c) => `${c.name}'s monthly plan has expired today.`)
        .join(" | ");
      notificationBox.classList.remove("hidden");
    }
  }
}
