# Exercise 1: Home Page

Implement the home page as shown in the
[visual design](https://www.figma.com/file/UdOTt1Z2fTnm0Cbi0FA1We/Bullsfirst).
This is a responsive page and should look good on mobile, tablets and desktop.
There is one breakpoint at 480px. Below this the content should be full width.
Above this the content should be centered on the screen, with max-width of
800px. In both cases there should be 24px of left and right padding. So the
effective max-width for content on desktops is 800 - (2 * 24) = 752px.

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
- Don't build the Home page as a monolithic component. Break it up into smaller
  logical components, e.g. Hero, Content and Footer. Create a Storybook story
  for the Hero component to make sure it behaves as expected. When satisfied,
  wire it into the Home page.
- Create simple unit tests to make sure that the components are rendering
  correctly.
- Create an integration test to make sure that clicking on the _Sign In_ button
  makes the app navigate to the _Sign In_ page.
- Attach screenshots of the Home page to your pull request to show responsive
  behavior.
  - mobile (375 x 667)
  - desktop (1024 x 800)

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

Make sure your local repo works by running the app. Make any adjustments if
needed. For example, I prefer the sections in package.json in a certain order
(see some initial commits on accelerated-news). If everything looks good, push
this repository to GitHub using the instructions in your GitHub repository page.

At this point create a branch from `main` and call it something like
`home-page`. Always work on a branch when implementing a new feature or fixing a
bug. Never work directly on main.

Once you have a sufficient implementation of this exercise, create a pull
request so that others can start reviewing your code and providing comments.

## Resources

- The two images for this exercise can be found in the assets folder.

## References

1. [MindBEMding – getting your head ’round BEM syntax](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
2. [Get BEM - Naming](http://getbem.com/naming/)
3. [Learn CSS Variables in 5 minutes](https://www.freecodecamp.org/news/learn-css-variables-in-5-minutes-80cf63b4025d/)
4. [Difference between CSS variables and preprocessor variables](https://css-tricks.com/difference-between-types-of-css-variables/)
5. [CSS Variables - Lea Verou](https://www.youtube.com/watch?v=2an6-WVPuJU)
6. [How to Make Your Code Reviewer Fall in Love with You](https://mtlynch.io/code-review-love/)
