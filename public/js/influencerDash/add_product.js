const form = document.querySelector('form');
const productName = document.getElementById('productName');
const productShortDescription = document.getElementById('productShortDescription');
const productCategory = document.getElementById('productCategory');
const productBrand = document.getElementById('productBrand');
const productPrice = document.getElementById('productPrice');
const stockQuantity = document.getElementById('stockQuantity');
const discountPercentage = document.getElementById('discountPercentage');
const productDescription = document.getElementById('productDescription');
const imagesInput = document.getElementById('producImages');
const productTags = document.getElementById('productTags');
const colors = document.getElementById('colors');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Validate product name
  if (productName.value.trim() === '') {
    showError(productName, 'Product name is required');
  } else {
    showSuccess(productName);
  }

  // Validate product short description
  if (productShortDescription.value.trim() === '') {
    showError(productShortDescription, 'Product short description is required');
  } else {
    showSuccess(productShortDescription);
  }

  // Validate product category
  if (productCategory.value === '') {
    showError(productCategory, 'Product category is required');
  } else {
    showSuccess(productCategory);
  }

  // Validate product brand
  if (productBrand.value === '') {
    showError(productBrand, 'Product brand is required');
  } else {
    showSuccess(productBrand);
  }

  // Validate product price
  if (productPrice.value.trim() === '') {
    showError(productPrice, 'Product price is required');
  } else if (isNaN(productPrice.value.trim())) {
    showError(productPrice, 'Product price must be a number');
  } else {
    showSuccess(productPrice);
  }

  // Validate stock quantity
  if (stockQuantity.value.trim() === '') {
    showError(stockQuantity, 'Stock quantity is required');
  } else if (isNaN(stockQuantity.value.trim())) {
    showError(stockQuantity, 'Stock quantity must be a number');
  } else {
    showSuccess(stockQuantity);
  }

  // Validate discount percentage
  if (discountPercentage.value.trim() !== '' && isNaN(discountPercentage.value.trim())) {
    showError(discountPercentage, 'Discount percentage must be a number');
  } else {
    showSuccess(discountPercentage);
  }

  // Validate product description
  if (productDescription.value.trim() === '') {
    showError(productDescription, 'Product description is required');
  } else {
    showSuccess(productDescription);
  }

  // Validate images input
  if (imagesInput.files.length === 0) {
    showError(imagesInput, 'At least one image is required');
  } else {
    showSuccess(imagesInput);
  }

  // Validate product tags
  if (productTags.value.trim() === '') {
    showError(productTags, 'Product tags are required');
  } else {
    showSuccess(productTags);
  }

  // Validate colors
  if (colors.value.trim() === '') {
    showError(colors, 'Colors are required');
  } else {
    showSuccess(colors);
  }

  // Submit the form if all fields are valid
  if (isValid()) {
    form.submit();
  }
});

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.classList.remove('valid');
  formControl.classList.add('invalid');
  const error = formControl.querySelector('.error-message');
  error.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.classList.remove('invalid');
  formControl.classList.add('valid');
  const error = formControl.querySelector('.error-message');
}
