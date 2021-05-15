# Exercise 2: Sign-In Page

Implement the sign-in page as shown in the
[visual design](https://www.figma.com/file/UdOTt1Z2fTnm0Cbi0FA1We/Bullsfirst).
This is a responsive page and should look good on mobile, tablets and desktop.
Make sure that the sign-in form is centered horizontally and slightly above the
center vertically. A good approach is to distribute one-third of the empty space
above and two-thirds below the form.

## General Guidelines

- Introduce a data structure called `Credentials` consisting of an email and a
  password. Use a TypeScript interface to define it in
  /src/models/Credentials.ts.
- Create the `SignIn` page under the folder /src/pages/SignIn.
- Set the route for this page to `/signin`.
- The component hierarchy of the SignIn page should look like this:

```
SignIn
`--- SignInForm
```

- `SignInForm` contains two text fields: email and a password. It should use
  react-hook-form and yup to accept user input and validate it. If validation
  succeeds, it returns the credentials entered by the user to its parent. Here's
  the definition of the props accepted by the SignInForm. Note that the form
  also accepts a `signInError` to show any errors returned by the server in case
  of sign-in failure.

```ts
export interface SignInFormProps {
  signInError?: string;
  onSubmit: (credentials: Credentials) => void;
}
```

- For now, the SignIn page should not do anything with the credentials. It
  should simply navigate to a blank Accounts page (route is `/accounts`).
- Make sure you have good unit test coverage, e.g. test that field validations
  are working.
- Attach screenshots of the sign-in page to your pull request to show responsive
  behavior.
  - mobile (460 x 800)
  - desktop (1024 x 800)

## Dependencies

Version numbers noted are at the time of this writing.

1. react-hook-form (7.5.3)
2. @hookform/resolvers (2.5.0)
3. yup (0.32.9)
4. @types/yup (0.29.11) - dev dependency
