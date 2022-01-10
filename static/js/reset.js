// manage data-toggle="pill"
let pills = document.querySelectorAll('*[data-toggle="pill"]');

// are we good ??
if (pills.length > 0)
{
    [].forEach.call(pills, (e)=>{
        e.addEventListener('click', ()=>{
            // get the href
            let tabPane = document.querySelector('#v-pills-tabContent');
            // console.log(tabPane.parentNode);
            window.scrollTo({
                top: tabPane.parentNode.offsetTop - 130,
                left: tabPane.parentNode.offsetLeft,
                behavior: 'smooth'
              });
        });
    });

    // load path name
    let pathName = location.pathname.replace(/^[\/]/, '').split('/');
    if (pathName.length == 2)
    {
        let pathTarget = pathName[1];

        // find now
        pathTarget = document.querySelector('*[href="#'+pathTarget+'"]');

        // can we click
        if (pathTarget !== null)
        {
            pathTarget.click();
        }
    }

    // manage data-if
    let dataIf = document.querySelectorAll('*[data-if]');
    if (dataIf.length > 0)
    {
        function check(e, val){
            if (this.value == val)
            {
                e.style.display = 'block';
            }
            else
            {
                e.style.display = 'none';
            }
        };

        [].forEach.call(dataIf, (e)=>{

            // get the attribute
            let attr = e.getAttribute('data-if').split('=');

            // can we continue
            if (attr.length > 1)
            {
                let attrElement = document.querySelector(attr[0]);

                // are we good?
                if (attrElement != null)
                {
                    attrElement.addEventListener('input', check.bind(attrElement, e, attr[1]));
                    attrElement.addEventListener('blur', check.bind(attrElement, e, attr[1]));
                    attrElement.addEventListener('change', check.bind(attrElement, e, attr[1]));
                }
            }
        });
    }
}

// manage process select 
function dataSelectChecked(initial=true)
{
    let radioArea = document.querySelectorAll('*[data-select="true"] input[type="radio"]');

    // are we good
    if (radioArea.length > 0)
    {
        // can we check for all?
        [].forEach.call(radioArea, (radio)=>{

            if (radio.checked || (initial == true && radio.parentNode.classList.contains('active')))
            {
                radio.parentNode.classList.add('active');
                radio.checked = true;

                // allow button to be clicked
                let selectArea = radio.parentNode.parentNode;
                if (selectArea.hasAttribute('data-only-radio'))
                {
                    let btn = document.querySelector('*[data-to="'+(selectArea.getAttribute('data-btn-to'))+'"]');
                    if (btn != null)
                    {
                        btn.removeAttribute('disabled');
                    }

                    // trigger next
                    if (radio.parentNode.parentNode.hasAttribute('data-next'))
                    {
                        var parent = radio.parentNode.parentNode;

                        // check if auto
                        if (parent.getAttribute('data-next') == 'auto')
                        {
                            loadDataToButton(btn);

                            // scroll section
                            document.getElementById('ms-contact-section').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
                        }
                    }
                }   
            }
            else
            {
                radio.parentNode.classList.remove('active');
            }

            // check again for click
            radio.addEventListener('click', ()=>{
                dataSelectChecked(false);
            });
        });
    }
}

// data to button
function dataToButton()
{
    // buttton to clicked
    let buttonTo = document.querySelectorAll('.process-tab button[data-to]');

    // button clicked
    if (buttonTo.length > 0) 
    {
        [].forEach.call(buttonTo, (button)=>{

            // clicked??
            button.addEventListener('click', ()=>{
                loadDataToButton(button);
            });
        });
    }
}

function loadDataToButton(button)
{
    // get destination
    let destination = button.getAttribute('data-to');
                
    // set process target to active
    let processTarget = document.querySelector('.processes *[data-target="'+destination+'"]');
    
    // is process null
    if (processTarget != null)
    {
        // hide process-tab
        let process_tab_active = document.querySelector('.process-tab.active');

        // hide active tab
        if (process_tab_active != null) process_tab_active.classList.remove('active');

        // show target tab
        let process_tab_new = document.querySelector('#'+destination);

        // set new target tab to be active
        if (process_tab_new != null) process_tab_new.classList.add('active');

        processTarget.classList.add('active');

        // load process target
        loadProcessTarget();

    }
}

// load process target
function loadProcessTarget()
{
    // set process target to active
    let processTarget = document.querySelectorAll('.processes li[data-target]');

    // are we good?
    if (processTarget.length > 0)
    {
        [].forEach.call(processTarget, (target)=>{

            if (target.classList.contains('active'))
            {
                target.addEventListener('click', ()=>{

                    // hide process-tab
                    let process_tab_active = document.querySelector('.process-tab.active');

                    // hide active tab
                    if (process_tab_active != null) process_tab_active.classList.remove('active');

                    // show target tab
                    let process_tab_new = document.querySelector('#'+target.getAttribute('data-target'));

                    // set new target tab to be active
                    if (process_tab_new != null) process_tab_new.classList.add('active');

                    target.classList.add('active');

                });
            }
        });
    }
}

// load all required fields
function loadDataRequiredFields()
{
    let parentTarget = document.querySelectorAll('*[data-required-enable]');

    // load all
    if (parentTarget.length > 0)
    {
        [].forEach.call(parentTarget, (target)=>{

            // load button
            let button = target.querySelector(target.getAttribute('data-required-enable'));

            // load all child required elements
            let childElements = target.querySelectorAll('*[data-required]');

            // filed
            let filled = 0;

            // load loop
            if (childElements.length > 0)
            {
                [].forEach.call(childElements, (child)=>{
                    child.addEventListener('input', ()=>{
                        if (child.value.trim().length > 0)
                        {
                            if (!child.hasAttribute('data-recorded'))
                            {
                                child.setAttribute('data-recorded', true);
                                filled += 1;
                            }
                        }
                        else
                        {
                            if (child.hasAttribute('data-recorded'))
                            {
                                child.removeAttribute('data-recorded');
                                filled -= 1;
                            }
                        }

                        manageButtonVisibility();
                    });


                    // has value
                    if (child.value.trim().length > 0)
                    {
                        filled += 1;
                        manageButtonVisibility();
                    }
                });
            }

            // check filled length
            function manageButtonVisibility()
            {
                console.log(filled);
                if (filled >= childElements.length)
                {
                    button.removeAttribute('disabled');
                }
            }
        });
    }
}

// call now
dataSelectChecked();

// data to
dataToButton();

// call now
loadDataRequiredFields();

// has service
if (typeof phpvars.service != 'undefined')
{
    // set parent tab active
    let nextTab = document.querySelector('#v-pills-tab *[href="#'+phpvars.service+'"]');

    // all good ?
    if (nextTab != null)
    {
        nextTab.classList.add('active');
        nextTab.setAttribute('aria-selected', 'yes');

        // get content
        let nextContent = document.querySelector('#v-pills-tabContent > #'+phpvars.service);

        if (nextContent != null)
        {
            // hide active 
            let activeTab = document.querySelector('#v-pills-tab .nav-link.active');

            // all good ?
            if (activeTab != null)
            {
                activeTab.classList.remove('active');
                activeTab.setAttribute('aria-selected', 'no');

                // get content
                let activeContent = document.querySelector('#v-pills-tabContent .tab-pane.fade.show.active');
                if (activeContent != null)
                {
                    activeContent.classList.remove('show');
                    activeContent.classList.remove('active');
                }
            }

            nextContent.classList.add('show');
            nextContent.classList.add('active');
        }
    }
}