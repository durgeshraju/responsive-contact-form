// Element refreance helper
const getEl = (value, type = "selector") => {
    return(
        type === "id" ? document.getElementById(value) : document.querySelector(value)
    )
};

// Storing elements in a object

const refs = {
    firstName: getEl("#firstName"),
    lastName: getEl("#lastName"),
    email: getEl("#email"),
    message: getEl("#message"),
    consent: getEl('#consent'),
    queryTypeOptions: document
};

// Form Submit handler

const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log('form suubmitted!');
};

getEl('[data-js="contact-form"]').addEventListener('submit', formSubmitHandler);
