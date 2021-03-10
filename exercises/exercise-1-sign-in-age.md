# Exercise 1: Sign-In Page

Look at the [visual design](../visual-design). This is a responsive page and
should look good on mobile, tablets and desktop. Make sure that the sign-in form
is centered horizontally and slightly above the center vertically. A good
approach is to distribute one-third of the empty space above and two-thirds
below the form.

- We will use bootstrap and react-bootstrap as our component libraries.
- We will use react-icons to render icons.
- Form handling and validation will be done using react-hook-form and yup.
- The route for this page will be `/`.
- On successful submit, simply console out the form values.
- Make sure you have good unit test coverage, e.g. test that field validations
  are working.
- Attach screenshots of the sign-in page to your pull request to show responsive
  behavior.
  - mobile (320 x 768)
  - desktop (1280 x 800)

## Getting Started

As a participant in the React Accelerate program, you have been assigned a
repository named `bullsfist-[firstname]-[lastname]` on GitHub. Please create a
local repo on your machine with the same name using the
[React Accelerate](https://github.com/PublicisSapient/cra-template-accelerate)
template. For example, the repository name assigned to me was
`bullsfist-naresh-bhatia`, so I created a local repository using the following
command:

```sh
npx create-react-app bullsfist-naresh-bhatia --template accelerate
```

Make sure your local repo works by running the app. If everything looks good,
push this repository to GitHub using the instructions on your GitHub repository
page.

## Dependencies

Version numbers noted are at the time of this writing.

1. bootstrap (4.6.0)
2. react-bootstrap (1.5.0)
3. react-icons (4.2.0)
4. react-hook-form (6.15.4)
5. @hookform/resolvers (2.0.0-rc.1)
6. yup (0.32.9)
7. @types/yup (0.29.11) - dev dependency

## Resources

- Use logo from the assets folder (assets/bullsfirst.logo.svg)
- Use styles from the styles folder

## References

1. [React Hook Form example with Yup validation](https://react-hook-form.com/get-started/#SchemaValidation)
2. [Complex form example](https://github.com/nareshbhatia/form-examples)
   1. Clone this repo and build the example
   2. Check out the helper components
      [here](https://github.com/nareshbhatia/form-examples/tree/main/checkout-form-rhf/src/components/Form)
   3. No need to implement internationalization
