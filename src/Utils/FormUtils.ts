class FormUtils {
    private static EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

    loginFormValidation(userForm: any) {
        const { userName, password } = userForm;
        if (!userName) return "Please enter a valid username";
        if (!password || password.length < 5) return "Please enter a valid password";
    }

    signInFormValidation(signInForm: any) {
        const { userName, email, password, repassword } = signInForm;
        if (!userName) return "Please enter a valid username";
        if (!email || !FormUtils.isValidEmail(email)) return "Please enter a valid email";
        if (!password || password.length < 5) return "Please enter a valid password";
        if (password !== repassword) return "Both passwords do not match";
    }

    profileFormValidation(value:any,validations:any){
        console.log(value,validations)
        for(const validation of validations){
            switch(validation){
                case "required":
                    if(!value) return "Field cannot be empty";
                    break;
                case "email":
                    if(!FormUtils.isValidEmail(value)) return "Enter a valid email";
                    break;
                case "min-4":
                    if(value.length < 4) return "Enter minimum 4 characters";
                    break;
                case "length-6":
                    if(value.length != 6) return "Enter a valid Pincode";
                    break;
            }
        }
    }

    private static isValidEmail(email: string) {
        return FormUtils.EMAIL_REGEX.test(email);
    }


}

export default new FormUtils();
