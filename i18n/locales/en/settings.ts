export default {
  title: "Account settings",
  password: {
    title: "Password",
    field: {
      current: {
        label: "Current password",
        validation: {
          too_small: "Current password is required",
          invalid: "Invalid password",
        },
      },
      password: {
        label: "New password",
        validation: {
          too_small:
            "Min length is {minimum, plural, =1{one symbol} other{# symbols}}",
        },
      },
      confirmation: {
        label: "Password confirmation",
        validation: {
          too_small:
            "Min length is {minimum, plural, =1{one symbol} other{# symbols}}",
          match: "Password don't match",
        },
      },
    },
    submit: "Update password",
  },
  "2fa": {
    title: "Two-factor authentication",
    field: {
      enabled: {
        label: "Enabled",
      },
      code: {
        label: "Code",
        hint: "Scan QR-code below via your authenticator app or paste its secret and enter generated one-time-code",
        validation: {
          too_small: "Code must be 6-symbols long",
          too_big: "Code must be 6-symbols long",
          invalid: "Code is invalid",
        },
      },
    },
    submit: "Submit",
  },
  drop2fa: {
    title: "Two-factor authentication",
    field: {
      enabled: {
        label: "Enabled",
      },
      code: {
        label: "Code",
        hint: "Enter one-time code to disable two-factor authentication",
        validation: {
          too_small: "Code must be 6-symbols long",
          too_big: "Code must be 6-symbols long",
          invalid: "Code is invalid",
        },
      },
    },
    submit: "Disable",
  },
  avatar: {
    title: "Avatar",
    field: {
      file: {
        label: "Drop file here",
        hint: "or click to browse",
      },
    },
    confirm: "Confirm",
    submit: "Upload avatar",
    retake: "Retake",
    error: {
      upload: "Error while uploading avatar",
    },
    delete: "Delete current avatar",
  },
};
