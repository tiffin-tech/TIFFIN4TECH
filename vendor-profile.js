/**
 * TiffinTech - Vendor Profile Management
 * Handles profile modal and vendor data
 */

document.addEventListener('DOMContentLoaded', function() {
  // Load vendor data from localStorage
  loadVendorData();
  
  // Initialize profile modal functionality
  initProfileModal();
});

/**
 * Load vendor data from localStorage and update UI
 */
function loadVendorData() {
  const vendorData = JSON.parse(localStorage.getItem('vendorData'));
  
  if (vendorData) {
    // Update welcome message with vendor name
    const welcomeElement = document.getElementById('vendor-welcome');
    if (welcomeElement) {
      welcomeElement.textContent = `Welcome, ${vendorData.name} !!`;
    }
    
    // Populate profile modal with vendor details
    populateProfileModal(vendorData);
  } else {
    // Redirect to registration if no vendor data found
    if (!window.location.href.includes('vendor-registration.html')) {
      window.location.href = 'vendor-registration.html';
    }
  }
}

/**
 * Populate profile modal with vendor data
 * @param {Object} vendorData - The vendor data object
 */
function populateProfileModal(vendorData) {
  const profileDetails = document.getElementById('vendor-profile-details');
  if (!profileDetails) return;
  
  profileDetails.innerHTML = `
    <div class="flex justify-between items-center">
      <span class="text-gray-600 font-medium">Name:</span>
      <span>${vendorData.name}</span>
    </div>
    <div class="flex justify-between items-center">
      <span class="text-gray-600 font-medium">Phone:</span>
      <span>${vendorData.phone}</span>
    </div>
    <div class="flex justify-between items-center">
      <span class="text-gray-600 font-medium">Service Name:</span>
      <span>${vendorData.serviceName}</span>
    </div>
    <div class="flex justify-between items-start">
      <span class="text-gray-600 font-medium">Address:</span>
      <span class="text-right">${vendorData.address}</span>
    </div>
    <div class="flex justify-between items-center">
      <span class="text-gray-600 font-medium">Pincode:</span>
      <span>${vendorData.pincode}</span>
    </div>
    <div class="flex justify-between items-center">
      <span class="text-gray-600 font-medium">Monthly Rate:</span>
      <span>₹${vendorData.tiffinRate}</span>
    </div>
    <div class="flex justify-between items-center">
      <span class="text-gray-600 font-medium">One-Time Rate:</span>
      <span>₹${vendorData.oneTimeRate}</span>
    </div>
    <div class="flex justify-between items-center">
      <span class="text-gray-600 font-medium">Food Type:</span>
      <span>${vendorData.foodType === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}</span>
    </div>
    <div class="flex justify-between items-center">
      <span class="text-gray-600 font-medium">Weekly Holiday:</span>
      <span>${vendorData.holiday.charAt(0).toUpperCase() + vendorData.holiday.slice(1)}</span>
    </div>
  `;
}

/**
 * Initialize profile modal functionality
 */
function initProfileModal() {
  const profileModal = document.getElementById('profile-modal');
  const profileBtn = document.getElementById('profile-btn');
  const mobileProfileBtn = document.getElementById('mobile-profile-btn');
  const mobileProfileBtn2 = document.getElementById('mobile-profile-btn-2');
  const headerProfileBtn = document.getElementById('header-profile-btn');
  const closeProfileModal = document.getElementById('close-profile-modal');
  
  // Function to open profile modal
  function openProfileModal() {
    if (profileModal) {
      profileModal.style.display = 'flex';
    }
  }
  
  // Function to close profile modal
  function closeProfileModalFunc() {
    if (profileModal) {
      profileModal.style.display = 'none';
    }
  }
  
  // Add event listeners for profile modal
  if (profileBtn) profileBtn.addEventListener('click', openProfileModal);
  if (mobileProfileBtn) mobileProfileBtn.addEventListener('click', openProfileModal);
  if (mobileProfileBtn2) mobileProfileBtn2.addEventListener('click', openProfileModal);
  if (headerProfileBtn) headerProfileBtn.addEventListener('click', openProfileModal);
  if (closeProfileModal) closeProfileModal.addEventListener('click', closeProfileModalFunc);
  
  // Close modal when clicking outside
  if (profileModal) {
    profileModal.addEventListener('click', function(e) {
      if (e.target === profileModal) {
        closeProfileModalFunc();
      }
    });
  }
}