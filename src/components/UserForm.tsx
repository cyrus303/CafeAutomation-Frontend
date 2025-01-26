import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { format } from 'date-fns';
import clsx from 'clsx';
import VerificationForm from './VerificationForm';
import CouponCode from './CouponCode';

interface FormInputs {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
}

interface UserFormProps {
  onCouponDisplay: () => void;
}

const inputClasses = "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cafe-500 focus:border-transparent";
const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
const errorClasses = "text-red-500 text-sm mt-1";

export default function UserForm({ onCouponDisplay }: UserFormProps) {
  const [step, setStep] = useState<'form' | 'verification' | 'coupon'>('form');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [couponCode, setCouponCode] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    // Here you would integrate with your CRM system
    console.log('Form submitted:', data);
    setPhoneNumber(data.phoneNumber);
    setStep('verification');
    
    // In a real implementation, this would trigger sending the SMS code
  };

  const handleVerificationComplete = () => {
    // Generate a random 6-digit coupon code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setCouponCode(code);
    setStep('coupon');
    onCouponDisplay(); // Notify parent component to hide offer text
  };

  const validatePhone = (value: string) => {
    const phoneNumber = parsePhoneNumberFromString(value, 'US');
    return phoneNumber?.isValid() || 'Please enter a valid phone number';
  };

  const validateDateOfBirth = (value: string) => {
    const date = new Date(value);
    const today = new Date();
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 100);
    const maxDate = new Date();
    maxDate.setFullYear(today.getFullYear() - 13);

    if (date > maxDate) {
      return 'You must be at least 13 years old';
    }
    if (date < minDate) {
      return 'Please enter a valid date of birth';
    }
    return true;
  };

  if (step === 'verification') {
    return <VerificationForm 
      phoneNumber={phoneNumber}
      onVerificationComplete={handleVerificationComplete}
    />;
  }

  if (step === 'coupon') {
    return <CouponCode code={couponCode} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="firstName" className={labelClasses}>
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          className={clsx(inputClasses, errors.firstName && 'border-red-500')}
          {...register('firstName', { required: 'First name is required' })}
        />
        {errors.firstName && (
          <p className={errorClasses}>{errors.firstName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="lastName" className={labelClasses}>
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          className={clsx(inputClasses, errors.lastName && 'border-red-500')}
          {...register('lastName', { required: 'Last name is required' })}
        />
        {errors.lastName && (
          <p className={errorClasses}>{errors.lastName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="dateOfBirth" className={labelClasses}>
          Date of Birth
        </label>
        <input
          id="dateOfBirth"
          type="date"
          max={format(new Date(), 'yyyy-MM-dd')}
          className={clsx(inputClasses, errors.dateOfBirth && 'border-red-500')}
          {...register('dateOfBirth', {
            required: 'Date of birth is required',
            validate: validateDateOfBirth
          })}
        />
        {errors.dateOfBirth && (
          <p className={errorClasses}>{errors.dateOfBirth.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phoneNumber" className={labelClasses}>
          Phone Number
        </label>
        <input
          id="phoneNumber"
          type="tel"
          placeholder="(555) 555-5555"
          className={clsx(inputClasses, errors.phoneNumber && 'border-red-500')}
          {...register('phoneNumber', {
            required: 'Phone number is required',
            validate: validatePhone
          })}
        />
        {errors.phoneNumber && (
          <p className={errorClasses}>{errors.phoneNumber.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-cafe-700 text-white py-3 px-6 rounded-lg hover:bg-cafe-800 transition duration-200"
      >
        Claim Your Offer
      </button>
    </form>
  );
}