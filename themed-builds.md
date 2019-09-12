# Themed Builds

> So far I'm loving preact, however, I have to say that I'm not overly impressed with the direction of the cli build tool (sorry guys...). The more that I try to customize it's behavior with plugins or webpack configuration, the more I see that you really can't. Every new feature seems to have spawned a new nested if branch (or set of redundant if branches nested under other redundant if branches) to the point that it's quite difficult to follow what's going on, and especially difficult to trust that it's what should be going on.

It seems that in order to customize workbox, we have to create our own `sw.js` file and add the custom logic into it. However, as far as I can tell, there's no way to turn off the default logic that injects the precache manifest, so rather than changing any of that logic, our best option seems to be to _intercept_ (or rather replace) the copy process that moves static files from the `src/assets` folder over to the build directory with our own copy process that copies the contents of a totally different folder over using the rules that _**WE**_ provide.

This is where we'll introduce the main theme specific logic -- by creating a `src/themes` folder which contains one folder per theme plus a `common` theme to provide default files that can be shared across themes (or overridden) and a `dev` theme which will simply provide our limited number of development assets statically during development mode (the ones that would otherwise be provided remotely).

## Building with a Theme

Ideally this should be as easy as running a preact build with the argument variable `--theme=xyz`. The two main themes that we want to support are `feedme-jefferson` and `adams-apple`, but we may end up with a few different options for alternative staging environments in between.

## Theme Configurations

Aside from static resource files, we'll also want the ability to provide some configuration variables that are theme specific -- like the site name and the location of remote resources. We still need to implement this, but it will probably be accomplished through the `dotenv` package and theme specific `.env` files -- i.e. `.adams-apple.env` or `.feedme-jefferson.env`. These will load a number of vairables into the `process.env` for statically binding into the code at build time.

## Bootstrapping the core basket

Right now our constants.ts file imports the core basket json file with

```
import coreBasket from '../../remote-assets/meta/basket.core.json';
```

We want that to point to the theme specfic basket file based on the theme provided at build time. I'm still working on how to do that...

# Remote Resources

## Copying to Firebase

See `cloudstorage-notes.md` in the images repository for details on setting up cloud storage and cors -- for now I'm including localhost as a valid origin in the cors header -- that will make testing a locally hosted site agains the production deployed assets easier.

To sync the resources and make them all available at the public url use:

```
gsutil -m rsync -r -a public-read remote-assets/ gs://adams-apple.appspot.com/assets/
```

Then they'll be available at `https://storage.googleapis.com/adams-apple.appspot.com/assets/...`.

## debugging the service worker

When do the images for the core basket get loaded (aside from the two that happen to display)?
