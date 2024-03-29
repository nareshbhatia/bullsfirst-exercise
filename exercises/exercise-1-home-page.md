# Exercise 1: Home Page

This exercise is focused on writing good CSS.

Implement the home page as shown in the
[visual design](https://www.figma.com/file/UdOTt1Z2fTnm0Cbi0FA1We/Bullsfirst).
This is a responsive page and should look good on mobile, tablets and desktop.
There is one breakpoint at 480px. Below this the content should be full width.
Above this the content should be centered on the screen, with max-width of
800px, however the neutral-light background on the header should extend from
edge-to-edge of the page. In both cases there should be 24px of left and right
padding. So the effective max-width for content on desktops is 800 - (2 * 24) =
752px.

## General Guidelines

- Use only CSS to style your components.
- Use CSS Variables to ensure that you are not repeating color values, spacings
  etc.
- Use `main.css` in
  [Accelerated News](https://github.com/PublicisSapient/accelerated-news) as a
  starting point for your styling.
- Note that the Inter font should be loaded in `/public/index.html`. Also,
  Storybook should load it for your stories to work correctly. This is done in
  `.storybook/preview-head.html`. Look at Accelerated News to see how this is
  done.
- Use [BEM](https://en.bem.info/) to properly namespace your styles.
- Set the route for this page to `/`.
- The visual design specifies `Inter` as the font for all the typography. Make
  sure you load this font and set it as the default on the `<body>` tag.
- When the "Sign In" button is clicked, navigate to a blank page with the route
  set to `/signin`.
- Don't build the Home page as a monolithic component. Break it up into smaller
  logical components, e.g. Hero, Content and Footer. Create a Storybook story
  for the Hero component to make sure it behaves as expected. When satisfied,
  wire it into the Home page.
- The two images for this exercise are provided in this bullsfirst-docs repo.
  Copy them from `/code/src/assets` to your repo under `/src/assets`.
- Create simple unit tests to make sure that the components are rendering
  correctly.
- Start a new integration test named `authentication.spec.js`. We will expand
  this test over the next few exercises to verify the authentication flow. For
  now, simply make sure that clicking on the _Sign In_ button makes the app
  navigate to the _Sign In_ page.
- Attach screenshots of the Home page to your pull request to show responsive
  behavior.
  - mobile (460 x 800) (footer should be visible at this height)
  - desktop (1024 x 800)

## Getting Started

As a participant in the React Accelerate program, you have been assigned a
repository named `bullsfirst-[firstname]-[lastname]` on GitHub. Please create a
local repo on your machine with the exact same name using the detailed
instructions in the Getting Started section of the
[React Accelerate](https://github.com/PublicisSapient/cra-template-accelerate#getting-started)
template. Follow these instructions precisely to avoid wasting time.

If everything looks good, push this repository to GitHub using the instructions
in your GitHub repository page.

At this point create a branch from `main` and call it something like
`home-page`. Always work on a branch when implementing a new feature or fixing a
bug. Never work directly on main.

Once you have a sufficient implementation of this exercise, create a pull
request so that others can start reviewing your code and providing comments.

## References

1. [MindBEMding – getting your head ’round BEM syntax](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
2. [Get BEM - Naming](http://getbem.com/naming/)
3. [Learn CSS Variables in 5 minutes](https://www.freecodecamp.org/news/learn-css-variables-in-5-minutes-80cf63b4025d/)
4. [Difference between CSS variables and preprocessor variables](https://css-tricks.com/difference-between-types-of-css-variables/)
5. [CSS Variables - Lea Verou](https://www.youtube.com/watch?v=2an6-WVPuJU)
6. [How to Make Your Code Reviewer Fall in Love with You](https://mtlynch.io/code-review-love/)
