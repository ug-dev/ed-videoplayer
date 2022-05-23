export const validation: any = {
    string: {
        //required: "This field is required",
        matches: 'Invalid input',
        email: 'Invalid email',
    },
    mixed: {
        required: 'This field is required',
        //email:'Invalid email'
    },
    date: {
        //typeError:'Invalid date'
    },
    number: {
        //typeError:'Invalid number',
        min: 'Value must minimum be ${min}',
    },
};
