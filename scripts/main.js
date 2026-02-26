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

// validateForm with per-field falsy checks and errors object

const validateForm = (formData) => {
  const errros = {};  
  if(!formData.firstName){
    errros.firstName = true;
  }
  if(!formData.lastName){
    errros.lastName = true
  }
  if(!formData.email){
    errros.email = true
  }
  if(!formData.queryType){
    errros.queryType = true;
  }
  if(!formData.message){
    errros.message = true
  }
  if(!formData.consent){
    errros.consent = true
  }
  
  return errros;
}


// Form Submit handler

const formSubmitHandler = (e) => {
  e.preventDefault(); 
  const formData = {
    firstName: refs.firstName.value.trim(),
    lastName: refs.lastName.value,
    email: refs.email.value,
    message: refs.message.value,
    consent: refs.consent.checked,
    queryType: chooseQueryType()
  }
  console.log(validateForm(formData))
};

getEl('[data-js="contact-form"]').addEventListener('submit', formSubmitHandler);