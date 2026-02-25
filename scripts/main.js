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


// Form Submit handler

const formSubmitHandler = (e) => {
  e.preventDefault();  
};


getEl('[data-js="contact-form"]').addEventListener('submit', formSubmitHandler);