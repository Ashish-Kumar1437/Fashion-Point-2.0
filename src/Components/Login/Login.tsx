import './Login.scss'
import { IMG_CONSTANTS } from '../../Constants/Assets'
import { useState } from 'react'
import HttpService,{HttpService as HttpServiceClass} from '../../Services/HttpService';
import useAuth from '../../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import FormUtils from '../../Utils/FormUtils';

export const Login = () => {
    const [formType,setFormType] = useState('login');
    const [loginForm,setLoginForm]:any = useState({});
    const [signup,setSignup]:any = useState({});
    const {setUser} = useAuth();
    const navigate = useNavigate();

    const handleChange = (e:any,type:string)=>{
        const key = e.target?.name;
        const value = e.target?.value;

        if(type === 'login'){
            setLoginForm((prev:any) => ({...prev,[key]:value}))
        }else{
            setSignup((prev:any) => ({...prev,[key]:value}))
        }

    }

    const onLogin = (e: any) => {
        e.preventDefault();
        const error = FormUtils.loginFormValidation(loginForm);
        if(error) {
            toast.error(error);
            return;
        }
        HttpService.login(loginForm)
        .then((res) => {
            if(res.status === 200){
                toast.success("Login successful");
                fetchUser();
            }
        })
        .catch((err) => {console.log(err);})
        console.log(loginForm);
      };

      const onSignup = (e: any) => {
        e.preventDefault();
        const error = FormUtils.signInFormValidation(signup);
        if(error) {
            toast.error(error);
            return;
        }
        HttpService.createUser(signup)
        .then(()=>{
            toast.success("User created successfully");
            setFormType("login");
        }).catch((e)=>{
            toast.error( e?.response?.data  || "Failed to create user")})
      };

    
      const fetchUser = ()=>{
        HttpService.fetchUser().then((res)=>{
            if(res.status == 200){
                setUser(res.data);
                HttpServiceClass.USER_ID = res.data.id;
                // navigate("/home");
            }
        })
      }
    


  return (
    <>
        <div className="warpper">
            <div className="form" style={{"display": formType === "login" ? "" : "none"}}>
                <div className="left">
                    <img src={IMG_CONSTANTS.LOGIN} alt="" />
                    <button className='btn1' onClick={()=> setFormType("signup")}>Create a account</button>
                </div>
                <div className="right">
                    <h1>SIGN IN</h1>
                    <form onSubmit={onLogin}>
                        <div className="input">
                            <img src={IMG_CONSTANTS.PERSON} alt="" />
                            <input type="text" placeholder='Username' value={loginForm.userName || ''} name="userName" onChange={(e)=>handleChange(e,'login')}/>
                        </div>
                        <div className="input">
                            <img src={IMG_CONSTANTS.LOCK} alt="" />
                            <input type="password" placeholder='Password' value={loginForm.password || ''} name="password" onChange={(e)=>handleChange(e,'login')}/>
                        </div>
                        <button className='btn1'>Forgot password?</button>
                        <button type="submit" className='form-btn'>Login</button>
                    </form>
                </div>
            </div>

            <div className="form" style={{"display": formType !== "login" ? "" : "none"}}>
                <div className="right">
                <h1>SIGN UP</h1>
                    <form onSubmit={onSignup}>
                        <div className="input">
                            <img src={IMG_CONSTANTS.PERSON} alt="" />
                            <input type="text" placeholder='Username'value={signup.userName || ''} name="userName" onChange={(e)=>handleChange(e,'signup')}/>
                        </div>
                        <div className="input">
                            <img src={IMG_CONSTANTS.EMAIL} alt="" />
                            <input type="text" placeholder='Email'value={signup.email || ''} name="email" onChange={(e)=>handleChange(e,'signup')}/>
                        </div>
                        <div className="input">
                            <img src={IMG_CONSTANTS.LOCK} alt="" />
                            <input type="password" placeholder='Password'value={signup.password || ''} name="password" onChange={(e)=>handleChange(e,'signup')}/>
                        </div>
                        <div className="input">
                            <img src={IMG_CONSTANTS.LOCK} alt="" />
                            <input type="password" placeholder='Repeat your password'value={signup.repassword || ''} name="repassword" onChange={(e)=>handleChange(e,'signup')}/>
                        </div>
                        <button type='submit' className='form-btn'>Register</button>
                    </form>


                </div>
                <div className="left">
                <img src={IMG_CONSTANTS.SIGNIN} alt="" />
                    <button className='btn1' onClick={()=> setFormType("login")}>I already a member</button>
                </div>
            </div>

        </div>


    </>
  )
}
