/**
 * TiffinTech - Common JavaScript
 * Functions used across multiple pages
 */

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu functionality
  initMobileMenu();
  
  // Smooth scrolling for anchor links
  initSmoothScrolling();
});

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
  const menuButton = document.querySelector('.mobile-menu-button');
  const menu = document.querySelector('.mobile-menu');
  
  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
  }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Format currency for display
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(amount);
}

/**
 * Show a notification message
 * @param {string} message - The message to display
 * @param {string} type - The type of notification (success, error, warning, info)
 */
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 p-4 rounded-md shadow-md text-white ${getNotificationColor(type)}`;
  notification.textContent = message;
  notification.style.zIndex = '10000';
  
  // Add to document
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 3000);
}

/**
 * Get notification color based on type
 * @param {string} type - The notification type
 * @returns {string} Tailwind color classes
 */
function getNotificationColor(type) {
  switch (type) {
    case 'success':
      return 'bg-green-500';
    case 'error':
      return 'bg-red-500';
    case 'warning':
      return 'bg-yellow-500';
    default:
      return 'bg-blue-500';
  }
}