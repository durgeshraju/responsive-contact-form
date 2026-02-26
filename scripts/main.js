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


// validateForm with per-field falsy checks and errors object

const validateForm = (formData) => {
  const errors = {};  
  if(!formData.firstName){
    errors.firstName = true;
  }
  if(!formData.lastName){
    errors.lastName = true
  }
  if(!formData.email){
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
  const formData = {
    firstName: refs.firstName.value.trim(),
    lastName: refs.lastName.value.trim(),
    email: refs.email.value.trim(),
    message: refs.message.value.trim(),
    consent: refs.consent.checked,
    queryType: chooseQueryType()
  }

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

getEl('[data-js="contact-form"]').addEventListener('submit', formSubmitHandler);