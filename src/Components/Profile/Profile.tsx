import { NavLink } from "react-router-dom";
import { IMG_CONSTANTS } from "../../Constants/Assets";
import "./Profile.scss";
import useAuth from "../../Contexts/AuthContext";
import { useState, useEffect, useCallback, ChangeEvent } from "react";
import { Input } from "../../Shared Components/SharedComponets";
import HttpService from "../../Services/HttpService";
import toast from "react-hot-toast";

type User = {
  userName?: string;
  name?: string;
  email?: string;
  phoneNo?: string;
  dob?: string;
  gender?: string;
};

type Errors = {
  [key: string]: string;
};

type GenderToggleProps = {
  selectedGender: string;
  onGenderChange: (gender: string) => void;
};

const GenderToggle: React.FC<GenderToggleProps> = ({ selectedGender, onGenderChange }) => (
  <div className="toggle">
    <span
      className={selectedGender === 'MALE' ? 'selected' : ''}
      onClick={() => onGenderChange('MALE')}
    >
      Male
    </span>
    <span
      className={selectedGender === 'FEMALE' ? 'selected' : ''}
      onClick={() => onGenderChange('FEMALE')}
    >
      Female
    </span>
  </div>
);

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [payload, setPayload] = useState<User>(user);
  const [errors, setErrors] = useState<Errors>({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleGenderChange = (gender: string) => {
    setPayload((prev) => ({ ...prev, gender }));
    validateField('gender', gender);
  };

  const validateField = useCallback((name: string, value: string) => {
    let errorMsg = '';
    if (!value) {
      errorMsg = `${name} is required`;
    } else {
      switch (name) {
        case 'email':
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(value)) {
            errorMsg = 'Invalid email address';
          }
          break;
        case 'phoneNo':
          const phonePattern = /^[0-9]{10}$/;
          if (!phonePattern.test(value)) {
            errorMsg = 'Invalid phone number';
          }
          break;
        default:
          break;
      }
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  }, []);

  const validateForm = useCallback(() => {
    const fieldsToValidate: (keyof User)[] = ['userName', 'name', 'email', 'phoneNo', 'dob', 'gender'];
    fieldsToValidate.forEach((field) => validateField(field, payload[field] || ''));

    const hasErrors = Object.values(errors).some((error) => error);
    const isComplete = fieldsToValidate.every((field) => payload[field]);
    setIsFormValid(!hasErrors && isComplete);
  }, [errors, payload, validateField]);

  useEffect(() => {
    validateForm();
  }, [payload]);

  const saveChanges = (e:any) => {
    e.preventDefault();
    HttpService.updateUser(payload).then((res)=>{
      console.log(res);
    }).catch(() => toast.error("Failed to update"))
  } 
  return (
    <div className="profile-wrapper">
      <NavLink to={"/myAccount"}>
        <img src={IMG_CONSTANTS.LESS_THAN} alt="Back" /> Back to My Account
      </NavLink>
      <div className="heading">My Profile</div>
      <form className="profile-form" onSubmit={saveChanges}>
        <div className="field">
          <Input
            placeholder="User Name"
            name="userName"
            disabled
            handleBlur={handleChange}
            fieldValue={payload.userName || ''}
            error={errors.userName}
          />
        </div>
        <div className="field">
          <Input
            placeholder="Full Name"
            name="name"
            handleBlur={handleChange}
            fieldValue={payload.name || ''}
            error={errors.name}
          />
        </div>
        <div className="field">
          <Input
            placeholder="Email"
            name="email"
            handleBlur={handleChange}
            fieldValue={payload.email || ''}
            error={errors.email}
          />
        </div>
        <div className="field">
          <Input
            placeholder="Password"
            disabled
            width="50%"
            fieldValue="*****"
          />
          <p className="action-btn">Change password</p>
        </div>
        <div className="field">
          <Input
            placeholder="Phone Number"
            width="50%"
            name="phoneNo"
            handleBlur={handleChange}
            fieldValue={payload.phoneNo || ''}
            error={errors.phoneNo}
          />
        </div>
        <div className="field">
          <Input
            type="date"
            name="dob"
            handleBlur={handleChange}
            fieldValue={payload.dob || ''}
            error={errors.dob}
            onKeyDown={(e:any) => {
              e.preventDefault();
           }}
          />
          <p className="info">
            Share your DOB to get special gifts on the 1st day of your birthday month
          </p>
        </div>
        <div className="field">
          <label htmlFor="gender">Gender</label>
          <GenderToggle
            selectedGender={payload.gender || ''}
            onGenderChange={handleGenderChange}
          />
        </div>
        <button type="submit" disabled={!isFormValid}>Save Changes</button>
      </form>
    </div>
  );
};

export default Profile;
