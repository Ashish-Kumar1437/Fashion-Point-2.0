import React, { useState, useCallback, useEffect, FocusEvent } from 'react';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { IMG_CONSTANTS } from "../../Constants/Assets";
import "./Address.scss";
import { Input } from '../../Shared Components/SharedComponets';
import { useAddressContext } from '../../Contexts/AddressContext';
import HttpService from '../../Services/HttpService';
import toast from 'react-hot-toast';

type Errors = {
  [key: string]: string;
};

const validateField = (name: string, value: string): string => {
  let errorMsg = '';
  if (!value && name !== 'landmark') {
    errorMsg = `${name} is required`;
  } else {
    switch (name) {
      case 'receiverPhoneNo':
        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(value)) {
          errorMsg = 'Invalid phone number';
        }
        break;
      case 'pincode':
        const pincodePattern = /^[0-9]{6}$/;
        if (!pincodePattern.test(value)) {
          errorMsg = 'Invalid pincode';
        }
        break;
      default:
        break;
    }
  }
  return errorMsg;
};

export const Address: React.FC = () => {
  const {getAddressById,setCount} = useAddressContext();
  const {id} = useParams();
  const navigate = useNavigate();
  const [payload, setPayload] = useState<any>(getAddressById(id));
  const [errors, setErrors] = useState<Errors>({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((prev:any) => ({ ...prev, [name]: value }));
    validateAndSetField(name, value);
  };

  const validateAndSetField = useCallback((name: string, value: string) => {
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  }, []);

  const validateForm = useCallback(() => {
    const fieldsToValidate = ['receiverName', 'receiverPhoneNo', 'pincode', 'city', 'state', 'address'];
    fieldsToValidate.forEach((field) => validateAndSetField(field, payload[field] || ''));

    const hasErrors = Object.values(errors).some((error) => error);
    const isComplete = fieldsToValidate.every((field) => payload[field]);
    setIsFormValid(!hasErrors && isComplete);
  }, [errors, payload, validateAndSetField]);

  useEffect(() => {
    validateForm();
  }, [payload]);

  const handleAddressTypeChange = (type: string) => {
    setPayload((prev:any) => ({ ...prev, addressType: type }));
  };

  const updateAddress = (e:any) => {
    e.preventDefault();
    HttpService.updateAddress(payload)
    .then((res)=>{
      if(res.status === 200){
        toast.success(res.data);
        setCount((prev:number) => ++prev)
        navigate("/myAccount/address")
      }
    }).catch(()=> toast.error("Failed to update address"));
  }

  return (
    <div className="address-wrapper">
      <NavLink to="/myAccount/address">
        <img src={IMG_CONSTANTS.LESS_THAN} alt="Back" /> Back to My Addresses
      </NavLink>
      <div className="heading">My Address</div>
      <form className="address-form" onSubmit={updateAddress}>
        <div className="field">
          <Input
            placeholder="Full Name"
            name="receiverName"
            fieldValue={payload.receiverName || ''}
            handleBlur={handleBlur}
            error={errors.receiverName}
          />
        </div>
        <div className="field">
          <Input
            placeholder="Phone Number"
            name="receiverPhoneNo"
            fieldValue={payload.receiverPhoneNo || ''}
            handleBlur={handleBlur}
            error={errors.receiverPhoneNo}
          />
        </div>
        <hr />
        <div className="field">
          <Input
            placeholder="Pincode/Postal Code/Zipcode"
            name="pincode"
            fieldValue={payload.pincode || ''}
            handleBlur={handleBlur}
            error={errors.pincode}
          />
        </div>
        <div className="field d-flex jf-space">
          <Input
            placeholder="City"
            width="49%"
            name="city"
            fieldValue={payload.city || ''}
            handleBlur={handleBlur}
            error={errors.city}
          />
          <Input
            placeholder="State"
            width="49%"
            name="state"
            fieldValue={payload.state || ''}
            handleBlur={handleBlur}
            error={errors.state}
          />
        </div>
        <div className="field">
          <Input
            placeholder="Building No/Flat/Area"
            name="address"
            fieldValue={payload.address || ''}
            handleBlur={handleBlur}
            error={errors.address}
          />
        </div>
        <div className="field">
          <Input
            placeholder="Landmark (Optional)"
            name="landmark"
            fieldValue={payload.landmark || ''}
            handleBlur={handleBlur}
          />
        </div>
        <div className="field">
          <label htmlFor="addressType">Save Address As</label>
          <div className="chips">
            <div
              className={`chip ${payload.addressType === 'HOME' ? 'selected' : ''}`}
              onClick={() => handleAddressTypeChange('HOME')}
            >
              Home
            </div>
            <div
              className={`chip ${payload.addressType === 'OFFICE' ? 'selected' : ''}`}
              onClick={() => handleAddressTypeChange('OFFICE')}
            >
              Office
            </div>
            <div
              className={`chip ${payload.addressType === 'OTHER' ? 'selected' : ''}`}
              onClick={() => handleAddressTypeChange('OTHER')}
            >
              Other
            </div>
          </div>
        </div>
        <button type="submit" disabled={!isFormValid}>
          Save Address
        </button>
      </form>
    </div>
  );
};

export default Address;
