

const signupAjax = async (name, email, phone, password, regnumber, captcha) => {
        
    $.ajax('/',{
        type: 'POST',
        data: {
            name: name,
            email: email,
            phone: phone,
            password: password,
            regnumber: regnumber,
            captcha: captcha
        },
        success: (data, status) =>{
            console.log(data)
            // if (data.status =='success')
            // {
            //     showAlert('success', 'Signup Successfull.');
            // }
        },
        error: (err) => {
            console.log('Failed!');
        }
    })
        
        
        //     if (res.data.status === 'captcha-not-done') {
        //         showAlert('error', 'Captcha not done!!');
        //         document.querySelector('#submitBtn').disabled = false;
        //         grecaptcha.reset();
        //     } else if (res.data.status === 'Failed-captcha-verification') {
        //         showAlert('error', 'Captcha verification failed!! Try again');
        //         document.querySelector('#submitBtn').disabled = false;
        //         grecaptcha.reset();
        //       if (res.data.status === 'email_exist') {
        //         showAlert('error', 'Email already exists!');
        //         document.querySelector('#submitBtn').disabled = false;
        //     } else if (res.data.status === 'name_exist') {
        //         showAlert('error', 'Name already taken!');
        //         document.querySelector('#submitBtn').disabled = false;
        //     } else if (res.data.status === 'success') {
        //         showAlert('success', 'Signup Successfull.Verify to continue');
        //     }
        // }
};


function showAlert(type, message) {
  if(type === 'success')
        {
            document.getElementById('spitErrors').style.color='lightgreen';
            document.getElementById('spitErrors').innerHTML= message;
        }
  else if(type==='error')
        {  
            document.getElementById('spitErrors').style.color='red'; 
            document.getElementById('spitErrors').innerHTML= message;
        }
}

var onSubmit = () => {
    console.log('Submitting!')
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const reenteredPassword = document.getElementById('rePassword').value;
    const regnumber = document.getElementById('regnumber').value.toUpperCase();
    const captcha = document.getElementById('g-recaptcha-response').value;
    signupAjax(name, email,phone, password,regnumber, captcha);
}

const checkEmail = (input) => {
const re = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(input.value).toLowerCase())) {
            showAlert('error', 'Enter a valid email');
            return false;
        } else return true;
    };

const checkRegNumber = (reg) => {

    const re = /[1-9][0-9][A-Z][A-Z][A-Z][0-9][0-9][0-9][0-9]/;
    reg = reg.toUpperCase();
    console.log(reg)
    if(re.test(reg)){
        return true;
    }

    showAlert('error','Registration Number not entered properly.')

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

        if(! checkRegNumber(document.getElementById('regnumber').value)){
            return;
        }

        onSubmit();
        
        // grecaptcha.execute();
    
    });