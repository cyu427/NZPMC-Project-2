interface FormDataType {
    firstName: string;
    lastName: string;
    homeSchooled: boolean;
    email: string;
    password: string;
    school?: string;
}

interface StudentProfileDTO {
    firstName: string;
    lastName: string;
    isHomeSchooled: boolean;
    school?: string;
    email: string;
}

interface StudentRegistrationDTO {
    email: string;
    password: string;
    studentProfile: StudentProfileDTO;
}

const convertFormDataToDTO = (formData: FormDataType) => {
    // Destructure the formData for easier usage
    const { firstName, lastName, homeSchooled, email, password, school } = formData;
  
    // Create the student profile based on the form data
    const studentProfile : StudentProfileDTO = {
        firstName,
        lastName,
        isHomeSchooled: homeSchooled,
        school,
        email,
    };
  
    // Create the final StudentRegistrationDTO
    const studentRegistrationDTO : StudentRegistrationDTO = {
        email, 
        password,
        studentProfile,
    };
  
    return studentRegistrationDTO;
  };

export default convertFormDataToDTO;
  