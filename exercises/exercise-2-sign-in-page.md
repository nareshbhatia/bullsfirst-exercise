# Exercise 2: Sign-In Page

Implement the sign-in page as shown in the visual designs. This is a responsive
page and should look good on mobile, tablets and desktop. Make sure that the
sign-in form is centered horizontally and slightly above the center vertically.
A good approach is to distribute one-third of the empty space above and
two-thirds below the form.

## General Guidelines

- Use react-hook-form and yup for form handling and validation.
- Set the route for this page to `/signin`.
- Create two components for this exercise
  - `SingIn` - this is the sign-in page
  - `SignInForm` - this is a child of the `SignIn` page and contains a form that
    accepts and validates user credentials. If validations succeed, it returns
    the credentials entered by the user to the parent component.
- On successful submit, simply console out the form values in the parent
  component (`SignIn` page).
- Make sure you have good unit test coverage, e.g. test that field validations
  are working.
- Attach screenshots of the sign-in page to your pull request to show responsive
  behavior.
  - mobile (320 x 768)
  - desktop (1280 x 800)

## Dependencies

Version numbers noted are at the time of this writing.

1. react-hook-form (7.2.3)
2. @hookform/resolvers (2.4.0)
3. yup (0.32.9)
4. @types/yup (0.29.11) - dev dependency

## References

1. [React Hook Form example with Yup validation](https://react-hook-form.com/get-started/#SchemaValidation)
2. [Complex form example](https://github.com/nareshbhatia/form-examples)
   1. Clone this repo and build the example
   2. Check out the helper components
      [here](https://github.com/nareshbhatia/form-examples/tree/main/checkout-form-rhf/src/components/Form)
   3. No need to implement internationalization
