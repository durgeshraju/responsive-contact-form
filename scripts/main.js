// Element refreance helper
const getEl = (value, type = "selector") => {
    return(
        type === "id" ? document.getElementById(value) : document.querySelector(value)
    )
};

// object: a container of DOM references.

const refs = {
    firstName: getEl("#firstName"),
    lastName: getEl("#lastName"),
    email: getEl("#email"),
    message: getEl("#message"),
    consent: getEl('#consent'),
    queryTypeOptions: document.querySelectorAll('input[name="queryType"]')
};

const chooseQueryType = () => Array.from(refs.queryTypeOptions).find(radio => radio.checked)?.value;

// hintMap with closest/querySelector chain

const hintMap = {
  firstName: refs.firstName.closest('.field').querySelector('.hint'),
  lastName: refs.lastName.closest('.field').querySelector('.hint'),
  email: refs.email.closest('.field').querySelector('.hint'),
  message: refs.message.closest('.field').querySelector('.hint'),
  consent: refs.consent.closest('.field').querySelector('.hint'),
  queryType: refs.queryTypeOptions[0].closest('.field').querySelector('.hint')
}

// Flag for tracking for submitted

let submitted = false;
console.log('submitted is outer:', submitted);

// validateForm with per-field falsy checks and errors object

const validateForm = (formData) => {
  const errors = {};  
  if(!formData.firstName){
    errors.firstName = true;
  }
  if(!formData.lastName){
    errors.lastName = true
  }
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
  if(!formData.email || !regex.test(formData.email)){
    errors.email = true
  }
  if(!formData.queryType){
    errors.queryType = true;
  }
  if(!formData.message){
    errors.message = true
  }
  if(!formData.consent){
    errors.consent = true
  }
  
  return errors;
}

// renderErrors to show and hide hints based on validation errors

const renderErrors = (errors) => {
  Object.values(hintMap).forEach((element) => {
      element.style.display = "none";
  });

  Object.keys(errors).forEach((key) => {
    hintMap[key].style.display = "block";
  });
}

// Form Submit handler
const formSubmitHandler = (e) => {
  e.preventDefault(); 
  submitted = true;
  const formData = getFormData();  
  const errors = validateForm(formData);

  if(Object.keys(errors).length > 0){
    renderErrors(errors);
  }
  else {
    document.body.classList.add('state-success');
    getEl('#contactForm').reset();
    setTimeout(() => {    
    document.body.classList.remove('state-success');
    }, 2000);
  }
};

const getFormData = () => {
    const formData = {
    firstName: refs.firstName.value.trim(),
    lastName: refs.lastName.value.trim(),
    email: refs.email.value.trim(),
    message: refs.message.value.trim(),
    consent: refs.consent.checked,
    queryType: chooseQueryType()
  }
  return formData
}

// Attach blur listeners to all fields for inline validation after first submit

const fieldElements = [
    refs.firstName, 
    refs.lastName, 
    refs.email, 
    refs.message, 
    refs.consent
];

fieldElements.forEach((field) => {
  field.addEventListener('blur', () => {
      if(!submitted) {
        return
      }
    const formData = getFormData();
    const errors = validateForm(formData);
    renderErrors(errors);
  });
});

getEl('[data-js="contact-form"]').addEventListener('submit', formSubmitHandler);