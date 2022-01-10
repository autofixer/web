// get element
const getElement = function(selector, callback = null){

    // make query
    const element = typeof selector !== 'string' ? selector : this.querySelector(selector);

    // load callback
    if (callback !== null && element !== null) callback.call(this, element);

    // return element
    return element;
};

// get all elements
const getAllElements = function(identifier, callback = null){

    // find element
    const elements = Array.prototype.map.call(this.querySelectorAll(identifier), (e)=>{ return e; });

    // call callback
    if (elements.length > 0 && callback !== null) callback.call(this, elements);

    // return element
    return elements;
};

// let's define how we want to use querySelector
Document.prototype.get = Element.prototype.get = getElement;

// let's define how we want to use queryAllSelector
Document.prototype.getAll = Element.prototype.getAll = getAllElements;

// show modal for element
Element.prototype.showModal = function () {
    this.classList.remove('animate-modal-out');
    this.classList.add('animate-modal');
};

// hide modal for element
Element.prototype.hideModal = function (callback=null) {
    this.classList.add('animate-modal-out');
    setTimeout(()=>{
        this.classList.remove('animate-modal');
        if (callback !== null) callback.call(this);
    },600);
};

// logs
const logs = {

    // page did load
    init : ()=> {
        console.info('Welcome to AutoFixer, Designed and Engineered by FregateLab Inc.');

        // switch password type for forms
        switchPasswordType();
    },

    // all good
    loaded : () => {
        console.info('Everything looks good. Please enjoy your browsing experience.');
    },

    // support
    support : () => {
        console.info('Please send an email to [support@fregatelab.com] if you experence any difficulty using the web app. Yours truly!');
    }
};

// just init log
logs.init();

// get content before
let contentBefore = '';

// load buttons
const buttons = {

    // loading button
    loading : function(target, content = '')
    {
        // cache button
        let buttonReference = null;

        // show loader now
        document.get(target, (button)=>{

            // cache content before
            contentBefore = button.innerHTML;

            // disable button
            button.setAttribute('disabled', 'yes');

            // set ref
            buttonReference = button;

            // load loader
            button.innerHTML = '<span class="inline-loader-text"><span data-spinner="text">'+content+'</span> <div class="spinner-border text-light spinner-button loader"></div></span>';
        });

        // return function
        return {
            hide : function(delay = 0){

                if (buttonReference !== null)
                {
                    // return back to base
                    setTimeout(()=>{
                        buttonReference.innerHTML = this.content;
                        buttonReference.removeAttribute('disabled');

                        // load resolve
                        //resolve(buttonReference);

                    }, delay);
                }
            },

            // change text content
            text : function(content, delay=0)
            {
                const promise = new Promise((resolve, reject) => {
                    if (buttonReference !== null)
                    {
                        setTimeout(()=>{
                            buttonReference.get('*[data-spinner="text"]', (spinnerText)=>{
                                spinnerText.innerHTML = content;
                                // load resolve
                                resolve(buttonReference);
                            });
                        }, delay);
                    }
                    else
                    {
                        reject('Could not proceed.');
                    }
                });

                // return promise
                return promise;
            },

            // cache content
            content : contentBefore
        }
    },

    // success button
    success : function(target, content, delay = 3000)
    {
        const promise = new Promise((resolve, reject)=>{

            // show success button now
            document.get(target, (button)=>{

                setTimeout(()=>{

                    // cache content before
                    contentBefore = contentBefore == '' ? button.innerHTML : contentBefore;

                    // load text
                    button.innerHTML = content;

                    // change class
                    button.classList.add('btn-success-theme');

                    // disable button
                    button.setAttribute('disabled','true');

                    // resolve
                    resolve({status:1, btn: button});

                    // remove
                    setTimeout(()=>{

                        // remove disabled button
                        button.removeAttribute('disabled');
                        button.classList.remove('btn-success-theme');
                        button.innerHTML = contentBefore;

                        // reset content before
                        contentBefore = '';

                        // resolve
                        resolve({status:2, btn: button});

                    }, delay);

                }, 0);

            });

        });

        // return promise
        return promise;
    },

    // error button
    error : function(target, content, delay = 3000)
    {
        const promise = new Promise((resolve, reject)=>{

            // show success button now
            document.get(target, (button)=>{

                setTimeout(()=>{

                    // cache content before
                    contentBefore = contentBefore == '' ? button.innerHTML : contentBefore;

                    // load text
                    button.innerHTML = content;

                    // change class
                    button.classList.add('btn-danger-theme');

                    // all good
                    resolve({status:1, btn: button});

                    // disable button
                    button.setAttribute('disabled','true');

                    // remove
                    setTimeout(()=>{

                        // remove disabled button
                        button.removeAttribute('disabled');
                        button.classList.remove('btn-danger-theme');
                        button.innerHTML = contentBefore;

                        // reset content before
                        contentBefore = '';

                        // all good
                        resolve({status:2, btn: button});

                    }, delay);

                }, 0);

            });

        });

        // return promise
        return promise;
    }
}

// switch password types
function switchPasswordType()
{
    document.getAll('.control-password', (switcherArray)=>{

        // loop through
        switcherArray.forEach((element)=>{

            // listen for click events
            element.addEventListener('click', ()=>{
                if (element.firstElementChild.hasAttribute('data-changed'))
                {
                    element.firstElementChild.removeAttribute('data-changed');
                    element.firstElementChild.className = element.getAttribute('data-default');

                    // change type to password
                    element.parentNode.get('input', (e)=>{e.type = 'password';});
                }
                else
                {
                    element.firstElementChild.setAttribute('data-changed', 'yes');
                    element.firstElementChild.className = element.getAttribute('data-changed');

                    // change type to text
                    element.parentNode.get('input', (e)=>{e.type = 'text';});
                }
            });

        });
    });
}

// events
const events = {
    roles : {
        uncheckAll : function(action = null){

            // helper function
            const helper = function(target, element, checked = false)
            {
                if (action === true) {
                    if (!element.hasAttribute('data-clicked')) element.setAttribute('data-clicked','yes');
                    element.click();
                }

                // clicked
                element.addEventListener('click', ()=>{

                    // manage toggle
                    if (element.hasAttribute('data-clicked')) {
                        checked = true;
                        element.textContent = 'Uncheck all';
                        if (element.hasAttribute('data-clicked')) element.removeAttribute('data-clicked');
                    }
                    else
                    {
                        element.setAttribute('data-clicked', 'yes');
                        element.textContent = 'Check all';
                        checked = false;
                    }

                    // look for data-access=read
                    document.getAll('*[data-access="'+target+'"]', function(elements){
                        elements.forEach(input => { input.checked = checked; });
                    });
                });
            };

            // look for read button
            document.get('#uncheck-all-read', function(element){
                // load helper
                helper('read', element, false);
            });

            // look for write button
            document.get('#uncheck-all-write', function(element){
                // load helper
                helper('write', element, false);
            });
        },

        matchAccess : function(){

            // look for data attr
            document.getAll('*[data-access]', function(elements){
                // load all
                elements.forEach(element => {

                    // listen for change event
                    element.addEventListener('change', ()=>{

                        // change children also
                        changeChildWithDataParent(element);
                    });
                });
            });

            // change child
            function changeChildWithDataParent(element)
            {
                // load all children
                document.getAll('*[data-parent="'+element.id+'"]', function(children){

                    // load all
                    children.forEach(child => {
                        child.checked = element.checked;
                    });
                });
            }
        },

        loadRef : function()
        {
            // @var array refArray
            let refArray = [], refKeys = [];

            // Run query
            document.getAll('*[data-ref]', function(elements){

                // loop through
                elements.forEach((element) => {

                    // create object
                    let objectWrapper = Object.create(null);
                    objectWrapper.NavRef = element.getAttribute('data-ref');

                    // can save
                    let canSave = true;

                    // check refKeys
                    if (refKeys.indexOf(objectWrapper.NavRef) >= 0) {
                        objectWrapper = refArray[refKeys.indexOf(objectWrapper.NavRef)];
                        canSave = false;
                    }
                    else
                    {
                        refKeys.push(objectWrapper.NavRef);
                    }

                    // check access
                    switch (element.getAttribute('data-access'))
                    {
                        // read
                        case 'read':
                            objectWrapper.read = element.checked == true ? 1 : 0;
                            break;

                        // write
                        case 'write':
                            objectWrapper.write = element.checked == true ? 1 : 0;
                            break;
                    }

                    // push object
                    if (canSave) refArray.push(objectWrapper);

                });
            });

            // return array
            return refArray;
        }
    }
};

// preloader
const preloader = {
    inline : {
        cache : {},
        target : null,
        show : function(target){

            let object = function(){};

            // get element
            document.get(target, (e)=>{

                // cache body
                object.target = e;

                // set preloader
                e.setAttribute('data-preloader-inline', 'yes');

                // can we cache the body?
                if (typeof this.cache[target] == 'undefined')
                {
                    this.cache[target] = e.innerHTML;
                }

                object.cache = this.cache[target];

                // reset
                e.innerHTML = '<div class="preloader-line"></div>\
                <div class="preloader-line"></div>\
                <div class="preloader-line"></div>';

                // show element
                if (e.hasAttribute('data-preloader-inline')) e.removeAttribute('data-preloader-inline');
            });

            // bind others
            object.constructor = this.constructor;
            object.error = this.error;
            object.hide = this.hide;

            // return instance
            return object;
        },
        hide : function(){
            if (this.target != null) this.target.innerHTML = this.cache;
        },
        error : function(errorText){
            if (this.target != null) this.target.innerHTML = '<div class="error-screen">\
            <span class="error-icon"></span>\
            <span class="error-text">'+errorText+'</span></div>';
        }
    }
}

// modal
const modal = {
    show : function(title, message, type = 'error')
    {
        document.get('*[data-target="modal-message"]', (modalContainer)=>{

            // remove style
            modalContainer.removeAttribute('style');

            // Add it's titel
            modalContainer.querySelector('h2').innerText = title;

            // add it's message
            modalContainer.querySelector('p').innerText = message;

            // update modal-icon
            modalContainer.querySelector('*[data-modal="'+type+'"]').style.display = 'block';

            // show modal
            modalContainer.classList.add('show');

            // toggle modal
            toggleModalMessage(modalContainer);

        });
    }
};

// collect data
document.getAll('.collect-form-data', (formArray)=>{
    formArray.forEach((form)=>{
        form.addEventListener('submit', (e)=>{
            e.preventDefault();

            // get the button
            form.get('.btn', (btn)=>{

                btn.classList.add('no-hover');
                let loader = buttons.loading(btn, "PLEASE WAIT");

                // build form data
                let formData = {};
                
                // run loop
                [].forEach.call(form.elements, (element)=>{
                    if (element.id != '') formData[element.id] = element.value;
                });

                // get data-processor
                if (form.hasAttribute('data-caller'))
                {
                    window[form.getAttribute('data-caller')](formData, loader, btn, ()=>{
                        [].forEach.call(form.elements, (element)=>{
                            if (element.id != '') form[element.id].value = '';
                        });
                    });
                }
            });
        });
    });
}); 

// load all requests
document.getAll('*[data-request]', (requestFunctionArray)=>
{
    requestFunctionArray.forEach((requestFunction)=>{

        // get the attribute
        let attribute = requestFunction.getAttribute('data-request');

        // split now
        let attributeArray = attribute.split('|'), target = null;

        // has target
        if (attributeArray.length == 2) 
        {
            target = document.querySelector(attributeArray[1]);
        }

        if (typeof window[attributeArray[0]] == 'function') window[attributeArray[0]](target);
    });
})

// helper function
function createFormData(objectData)
{
    let formData = new FormData, key;

    // append data
    for (key in objectData) formData.append(key, objectData[key]);

    // return form data
    return formData;
}

// make submitDiagnosis
function submitDiagnosis(entries, loader, btn, clearRecords)
{
    axios({
        url : phpvars.endpoint + '/api',
        method : 'post',
        headers : {
            'x-meta-service' : 'services',
            'x-meta-method' : 'submit diagnosis'
        },
        data : createFormData(entries)
    })
    .then((response)=>{
        if (response.data.Status == true)
        {
            loader.hide();
            buttons.success(btn, 'SUBMITTED');
            clearRecords();
        }
    })
    .catch((error)=>{
        console.log(error);
    });
}

// make submitMaintenance
function submitMaintenance(entries, loader, btn, clearRecords)
{
    axios({
        url : phpvars.endpoint + '/api',
        method : 'post',
        headers : {
            'x-meta-service' : 'services',
            'x-meta-method' : 'submit maintenance'
        },
        data : createFormData(entries)
    })
    .then((response)=>{
        if (response.data.Status == true)
        {
            loader.hide();
            buttons.success(btn, 'SUBMITTED');
            clearRecords();
        }
    })
    .catch((error)=>{
        console.log(error);
    });
}

// make submitRepair
function submitRepair(entries, loader, btn, clearRecords)
{
    axios({
        url : phpvars.endpoint + '/api',
        method : 'post',
        headers : {
            'x-meta-service' : 'services',
            'x-meta-method' : 'submit repair'
        },
        data : createFormData(entries)
    })
    .then((response)=>{
        if (response.data.Status == true)
        {
            loader.hide();
            buttons.success(btn, 'SUBMITTED');
            clearRecords();
        }
    })
    .catch((error)=>{
        console.log(error);
    });
}

// sign up for newletter
function signUpForNewsletter(entries, loader, btn, clearRecords)
{
    axios({
        url : phpvars.endpoint + '/api',
        method : 'post',
        headers : {
            'x-meta-service' : 'services',
            'x-meta-method' : 'sign up for newsletter'
        },
        data : createFormData(entries)
    })
    .then((response)=>{
        if (response.data.Status == true)
        {
            loader.hide();
            buttons.success(btn, 'SUBMITTED');
            clearRecords();
        }
    })
    .catch((error)=>{
        console.log(error);
    });
}

// submit contact message
function submitContact(entries, loader, btn, clearRecords)
{
    axios({
        url : phpvars.endpoint + '/api',
        method : 'post',
        headers : {
            'x-meta-service' : 'services',
            'x-meta-method' : 'submit contact message'
        },
        data : createFormData(entries)
    })
    .then((response)=>{
        if (response.data.Status == true)
        {
            loader.hide();
            buttons.success(btn, 'SUBMITTED');
            clearRecords();
        }
        else
        {
            loader.hide();
            buttons.error(btn, 'ERROR!');
            alert('You have to submit all valid and required fields.');
        }
    })
    .catch((error)=>{
        console.log(error);
    });
}

// submit mechanic message
function submitMechanicMessage(entries, loader, btn, clearRecords)
{
    axios({
        url : phpvars.endpoint + '/api',
        method : 'post',
        headers : {
            'x-meta-service' : 'services',
            'x-meta-method' : 'submit mechanic message'
        },
        data : createFormData(entries)
    })
    .then((response)=>{
        if (response.data.Status == true)
        {
            loader.hide();
            buttons.success(btn, 'SUBMITTED');
            clearRecords();
        }
        else
        {
            loader.hide();
            buttons.error(btn, 'ERROR!');
        }
    })
    .catch((error)=>{
        console.log(error);
    });
}

// get all manufacturers
function getManufactures(target)
{
    if (target != null)
    {
        axios({
            url : phpvars.endpoint + '/api?column=name,id&visible=1&sortby=name|asc',
            method : 'get',
            headers : {
                'x-meta-service' : 'manufacturers',
                'x-meta-method' : 'get all'
            }
        })
        .then((response)=>{
            if (response.data.Status == true)
            {
                [].forEach.call(response.data.Data, (data)=>{
                    let option = document.createElement('option');
                    option.value = data.ID;
                    option.innerText = data.ManufacturerName;
                    target.appendChild(option);
                });
            }
        })
        .catch((error)=>{
            console.log(error);
        });
    }
}

// get all manufacturers
function loadAllManufactures(target)
{
    if (target != null)
    {
        axios({
            url : phpvars.endpoint + '/api?visible=1&sortby=name|asc',
            method : 'get',
            headers : {
                'x-meta-service' : 'manufacturers',
                'x-meta-method' : 'get all'
            }
        })
        .then((response)=>{
            if (response.data.Status == true)
            {
                [].forEach.call(response.data.Data, (data)=>{
                    let label = document.createElement('label'), 
                    img = document.createElement('img'), 
                    title = document.createElement('h5'), 
                    input = document.createElement('input');

                    // add title
                    title.innerText = data.ManufacturerName;

                    // update img
                    img.className = 'img-fluid pb-3 ms-main-img';
                    img.src = data.ManufacturerLogo;

                    // update input
                    input.type = 'radio';
                    input.id = 'brand-' + data.ID;
                    input.value = data.ID;
                    input.name = 'manufacturer';

                    // update label
                    label.setAttribute('for', input.id);

                    // add child to label
                    label.appendChild(img);
                    label.appendChild(title);
                    label.appendChild(input);

                    // add to target
                    target.appendChild(label);
                });

                // allow selection
                dataSelectChecked();
            }
        })
        .catch((error)=>{
            console.log(error);
        });
    }
}

// submit quote
function submitQuote(btn)
{
    if (!btn.hasAttribute('data-clicked'))
    {
        btn.setAttribute('data-clicked', true);
        let loader = buttons.loading(btn, 'SUBMIT');

        // build data
        let entries = {
            service_type : $('input[name="service"]:checked').val(),
            manufacturerid : $('input[name="manufacturer"]:checked').val(),
            model : $('#car_model').val(),
            car_year : $('#car_year').val(),
            name : $('#name').val(),
            email : $('#email').val(),
            tel : $('#tel').val(),
            location : $('#location').val(),
            issue : $('#issue').val(),
            number_of_cars : $('#number_of_cars').val(),
            mileage : $('#mileage').val(),
        };

        // make request
        axios({
            url : phpvars.endpoint + '/api',
            method : 'post',
            headers : {
                'x-meta-service' : 'services',
                'x-meta-method' : 'submit quote'
            },
            data : createFormData(entries)
        })
        .then((response)=>{
            if (response.data.Status == true)
            {
                loader.hide();
                buttons.success(btn, 'SUBMITTED');
                setTimeout(()=>{
                    window.location = window.location.href + '/success';
                }, 1000);
            }
            else
            {
                loader.hide();
                buttons.error(btn, 'FAILED');
                alert('You have an error in your form.');
            }
        })
        .catch((error)=>{
            console.log(error);
        });

    }
}