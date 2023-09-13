export default {
  signIn: {
    title: "Authorization",
    field: {
      login: {
        placeholder: "Login",
        validation: {
          too_small: "Login is required",
        },
      },
      password: {
        placeholder: "Password",
        validation: {
          too_small: "Password is required",
        },
      },
    },
    error: {
      validation: "",
      UNAUTHORIZED: "User not found",
    },
    submit: "Sign in",
    signUp: "Sign up",
  },
  signUp: {
    title: "Registration",
    field: {
      login: {
        placeholder: "Login",
        validation: {
          too_small:
            "Min length is {minimum, plural, =1{one symbol} other{# symbols}}",
          invalid_string:
            'Login must contain only latin letters, numbers, "-" and "_" symbols',
        },
      },
      password: {
        placeholder: "Password",
        validation: {
          too_small:
            "Min length is {minimum, plural, =1{one symbol} other{# symbols}}",
        },
      },
      confirmation: {
        placeholder: "Password confirmation",
        validation: {
          too_small:
            "Min length is {minimum, plural, =1{one symbol} other{# symbols}}",
          match: "Password don't match",
        },
      },
      agreement: {
        label: "Agree with",
        hint: "Terms and conditions",
        validation: {
          invalid_literal: "You must accept the terms",
        },
      },
    },
    error: {
      validation: "",
      FORBIDDEN: "Login is taken",
    },
    submit: "Sign up",
    signIn: "Sign in",
  },
};
