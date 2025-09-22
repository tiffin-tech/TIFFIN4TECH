/**
 * TiffinTech - Vendor Registration Form Validation
 * Handles form validation and submission for vendor registration
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize form validation
  initRegistrationForm();
});

/**
 * Initialize vendor registration form validation
 */
function initRegistrationForm() {
  const registrationForm = document.getElementById('vendor-registration-form');
  
  if (registrationForm) {
    registrationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validateRegistrationForm()) {
        processRegistrationForm();
      }
    });
  }
}

/**
 * Validate the registration form
 * @returns {boolean} True if form is valid, false otherwise
 */
function validateRegistrationForm() {
  const form = document.getElementById('vendor-registration-form');
  let isValid = true;
  
  // Required fields validation
  const requiredFields = form.querySelectorAll('[required]');
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      markFieldAsInvalid(field, 'This field is required');
      isValid = false;
    } else {
      markFieldAsValid(field);
    }
  });
  
  // Phone number validation
  const phoneField = document.getElementById('phone');
  if (phoneField.value.trim()) {
    const phoneRegex = /^[6-9]\d{9}$/; // Indian phone numbers
    if (!phoneRegex.test(phoneField.value.trim())) {
      markFieldAsInvalid(phoneField, 'Please enter a valid phone number');
      isValid = false;
    } else {
      markFieldAsValid(phoneField);
    }
  }
  
  // Email validation
  const emailField = document.getElementById('email');
  if (emailField.value.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailField.value.trim())) {
      markFieldAsInvalid(emailField, 'Please enter a valid email address');
      isValid = false;
    } else {
      markFieldAsValid(emailField);
    }
  }
  
  // Pincode validation
  const pincodeField = document.getElementById('pincode');
  if (pincodeField.value.trim()) {
    const pincodeRegex = /^\d{6}$/;
    if (!pincodeRegex.test(pincodeField.value.trim())) {
      markFieldAsInvalid(pincodeField, 'Please enter a valid 6-digit pincode');
      isValid = false;
    } else {
      markFieldAsValid(pincodeField);
    }
  }
  
  return isValid;
}

/**
 * Mark a field as invalid
 * @param {Element} field - The form field element
 * @param {string} message - The error message
 */
function markFieldAsInvalid(field, message) {
  field.classList.add('border-red-500');
  field.classList.remove('border-green-500');
  
  // Remove existing error message
  const existingError = field.parentNode.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }
  
  // Add error message
  const errorElement = document.createElement('p');
  errorElement.className = 'field-error text-red-500 text-xs mt-1';
  errorElement.textContent = message;
  field.parentNode.appendChild(errorElement);
}

/**
 * Mark a field as valid
 * @param {Element} field - The form field element
 */
function markFieldAsValid(field) {
  field.classList.remove('border-red-500');
  field.classList.add('border-green-500');
  
  // Remove existing error message
  const existingError = field.parentNode.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }
}

/**
 * Process the registration form submission
 */
function processRegistrationForm() {
  const form = document.getElementById('vendor-registration-form');
  const formData = new FormData(form);
  
  // Convert FormData to object
  const vendorData = {};
  for (const [key, value] of formData.entries()) {
    vendorData[key] = value;
  }
  
  // Get selected locations
  const locationSelect = document.getElementById('locations');
  vendorData.locations = Array.from(locationSelect.selectedOptions).map(option => option.value);
  
  // Get selected meal times
  vendorData.mealTimes = [];
  if (document.getElementById('lunch').checked) {
    vendorData.mealTimes.push('lunch');
  }
  if (document.getElementById('dinner').checked) {
    vendorData.mealTimes.push('dinner');
  }
  
  // Save vendor data to localStorage
  localStorage.setItem('vendorData', JSON.stringify(vendorData));
  
  // Show success message
  showNotification('Registration successful! Redirecting to dashboard...', 'success');
  
  // Redirect to dashboard after a short delay
  setTimeout(() => {
    window.location.href = 'vendor-dashboard.html';
  }, 2000);
}