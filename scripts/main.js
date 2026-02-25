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


// Form Submit handler

const formSubmitHandler = (e) => {
  e.preventDefault(); 
  const formData = {
    firstName: refs.firstName.value,
    lastName: refs.lastName.value,
    email: refs.email.value,
    message: refs.message.value,
    consent: refs.consent.checked,
    queryType: chooseQueryType()
  }
  console.log('consent isChecked:', formData.queryType)
};

getEl('[data-js="contact-form"]').addEventListener('submit', formSubmitHandler);