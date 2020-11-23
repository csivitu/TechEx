const signupAjax = async (name, email, phone, password, regnumber, captcha, code, events) => {

    console.log('hey there!')

    const cname = document.getElementById('name');
    cname.value='';
    const cemail = document.getElementById('email');
    cemail.value = '';
    const cphone = document.getElementById('phone');
    cphone.value = '';
    const cpassword = document.getElementById('password');
    cpassword.value = '';
    const repassword = document.getElementById('rePassword');
    repassword.value = '';
    const cregnumber = document.getElementById('regnumber');
    cregnumber.value = '';
    const refer = document.getElementById('code');
    refer.value = '';
        
    $.ajax('/',{
        type: 'POST',
        data: {
            name: name,
            email: email,
            phone: phone,
            password: password,
            regnumber: regnumber,
            captcha: captcha,
            code: code,
            events: events
        },
        success: (data, status) =>{
            showAlert(data.status, data.msg);
        },
        error: (err) => {
            console.log('Failed!');
        }
    })
};


function showAlert(type, message) {
  if(type === 'success'){
            document.getElementById('spitErrors').style.color='#165724';
            document.getElementById('spitErrors').style.backgroundColor="#D4EDDA"
            document.getElementById('spitErrors').innerHTML= message;
   }else if(type==='error'){  
            document.getElementById('spitErrors').style.color='#721C24'; 
            document.getElementById('spitErrors').style.backgroundColor="#FFF3CD"
            document.getElementById('spitErrors').innerHTML= message;
            gsap.fromTo('input[type=button]',)
    }
}

var onSubmit = () => {
    console.log('Submitting!')
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const regnumber = document.getElementById('regnumber').value.toUpperCase();
    const code = document.getElementById('code').value.toUpperCase();
    var events = [];
    // const figma = document.getElementById('figma-check');
    const pygame = document.getElementById('pygame-check');
    if (pygame.checked){
        events.push(pygame.value);
    }
    // if (figma.checked) {
    //     events.push(figma.value)
    // }
    const captcha = document.getElementById('g-recaptcha-response').value;
    signupAjax(name, email,phone, password,regnumber, captcha, code, events);
}

const checkEmail = (input) => {
const re = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(input.value).toLowerCase())) {
            showAlert('error', 'Enter a valid email');
            return false;
        } else return true;
    };

const checkRegNumber = (reg) => {

    if (reg === ''){
        return true;
    }

    const re = /[1-9][0-9][A-Z][A-Z][A-Z][0-9][0-9][0-9][0-9]/;
    reg = reg.toUpperCase();
    console.log(reg)
    if(re.test(reg)){
        return true;
    }

    showAlert('error', 'Registration number not entered properly!');
    return false;

}
    
    const checkFieldMatch = (input1, input2) => {
        if (input1.value !== input2.value) {
            showAlert('error', 'Passwords do not match');
            return false;
        } else return true;
    };
    
    
    const getFieldName = (input) => input.id.charAt(0).toUpperCase() + input.id.slice(1);
    
    
    const checkLength = (input, min, max) => {
        if (input.value.length < min) {
            showAlert('error', `${getFieldName(input)} must be atleast ${min} characters`);
            return false;    
        } else if (input.value.length > max) {
            showAlert('error', `${getFieldName(input)} cannot exceed ${max} characters`);
            return false;
        } else return true;
    };

    const checkBoxes = () => {
        // const figma = document.getElementById('figma-check');
        const pygame = document.getElementById('pygame-check');
        if(pygame.checked)
            return true;
        showAlert('error','You need to select atleast one workshop.')
    }
    
    
    
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();

        if(!checkEmail(document.getElementById('email'))){
            return;  
        }
    
        if(!checkLength(document.getElementById('password'), 6, 50)){
            return;
        }


        if (! (checkFieldMatch(document.getElementById('rePassword'), document.getElementById('password')))){
            return;
        }

        if (!checkBoxes()){
            return;
        }

        if(! checkRegNumber(document.getElementById('regnumber').value)){
            return;
        }

        onSubmit();
    
    });