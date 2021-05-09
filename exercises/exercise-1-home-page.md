# Exercise 1: Home Page

Implement the home page as shown in the
[visual design](https://www.figma.com/file/UdOTt1Z2fTnm0Cbi0FA1We/Bullsfirst).
This is a responsive page and should look good on mobile, tablets and desktop.

## General Guidelines

- Use only CSS to style your components.
- Use CSS Variables to ensure that you are not repeating color values, spacings
  etc.
- You may use a lightweight CSS framework like
  [Chota](https://jenil.github.io/chota/) to get you started. See
  [Accelerated News](https://github.com/PublicisSapient/accelerated-news) for an
  example.
- Use [BEM](https://en.bem.info/) to properly namespace your styles.
- Set the route for this page to `/`.
- When the "Sign In" button is clicked, navigate to a blank page with the route
  set to `/signin`.
- Create a simple unit test to make sure that the page is rendering correctly.
- Create an integration test to make sure that the navigation to Sign In page is
  working correctly.
- Attach screenshots of the sign-in page to your pull request to show responsive
  behavior.
  - mobile (320 x 768)
  - desktop (1280 x 800)

## Getting Started

As a participant in the React Accelerate program, you have been assigned a
repository named `bullsfirst-[firstname]-[lastname]` on GitHub. Please create a
local repo on your machine with the same name using the
[React Accelerate](https://github.com/PublicisSapient/cra-template-accelerate)
template. For example, the repository name assigned to me was
`bullsfirst-naresh-bhatia`, so I created a local repository using the following
command:

```sh
npx create-react-app bullsfirst-naresh-bhatia --template accelerate
```

Make sure your local repo works by running the app. If everything looks good,
push this repository to GitHub using the instructions on your GitHub repository
page.

## Resources

- The two images for this exercise can be found in the assets folder.

## References

1. [MindBEMding – getting your head ’round BEM syntax](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
2. [Get BEM - Naming](http://getbem.com/naming/)
3. [Learn CSS Variables in 5 minutes](https://www.freecodecamp.org/news/learn-css-variables-in-5-minutes-80cf63b4025d/)
4. [Difference between CSS variables and preprocessor variables](https://css-tricks.com/difference-between-types-of-css-variables/)
5. [CSS Variables - Lea Verou](https://www.youtube.com/watch?v=2an6-WVPuJU)
