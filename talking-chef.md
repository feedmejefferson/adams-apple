# Dance Monkey, Dance!

To add a little fun and personality to the mix, we thought it would be nice to throw in a talking Chef Jefferson avatar for things like the welcome screen, intro tutorial, random encouragement, follow up feedback and well, pretty much anything where we think it makes sense to walk the user through a basic dialogue.

To give two similar examples of _prior art_ as inspiration, we have crazy Dave the neighbor in Plants vs Zombies who pops in and guides the player with some basic caption bubble instructions and Duo from Duolingo who pops onto the screen every now and then with some random words of encouragement.

We already have our Chef Jefferson as the basic site logo, but aside from the header banner he doesn't really play much of a part in the user journey. To make things a little more fun and playful, I figured why not add the smallest amount of animation to make it look like he's talking -- puppet style open/close mouth.

## Enter Chef from Stage Left

Think of Chef Jefferson as that quirky attention seeking boob that's always upstaging the real important stuff to take the spotlight. That's the kind of personality we're looking to add in here. As much as he adds some fun to the mix, he really is just a background supporting role and it's important that we not make him the core of the app.

1. He should always be easy to dismiss (except in the few cases where we absolutely need something from the user)
2. When he's on screen, everything else should be disabled so that the user doesn't accidentally do anything as part of their main interaction while trying to get Chef to go away
3. It would be nice if it was fairly easy to call him onstage from any part of the interaction to say a few words with minimal lines of code
4. We don't want to have to worry about formatting content, it would be great if you could just have chef say a few words by saying what those words were, and let him take care of the rest -- they should fit on the screen appropriately with pagination if needed and in the right font size that the user has chosen so that the text is easily readable
5. Support for longer dialogues would be nice
6. Support for guided tours would be nice

### Dialogues

A dialogue is a conversation between two or more people -- as opposed to a monologue. So when we say dialogue, we mean a simple interaction between the chef and the user. We are not talking about any kind of complicated AI chatbot here -- maybe one day, but for now, we mean something more like a choose your own adventure style interaction. The chef says a few things, and asks the user to make a simple choice.

In most cases, I think we want to stick with simple yes/no type responses (two options), but again, I reserve the right to want to expand this for more involved surveys in the future (like if we add in feedback at the start of a return visit -- i.e. last time I suggested steak, did you actually have steak? were you happy with it?)

### Guided Tours

Right now we'd like to use the Chef to give a guided tour/demo for new users. That would mean the Chef either needs to get out of the way, or we just need to make sure that he doesn't take up too much of the screen for the user to see what's going on behind him.

Background routes seem like a good way to handle the guided tour -- as in the tour would involve a sequence of captions in the foreground in front of a designated background route. The only question here is how we couple the two -- should the background route drive the chef? Or should the chef drive the route.

## The Model

In order to make it easy to set up a new chef experience, we want to keep the inputs to a minimum. The chef component should take care of all of the transitions and animations regarding entering, exiting, talking and user interaction (as well as the state management necessary to manage those transitions).

The developer should just specify the content of the dialogue. Here's a starting draft of what that might look like:

    Caption Node (aka Chef Says):
        Text: The main content, what the chef should say
        Dismissible: can the user dismiss the chef without completing this dialogue, or do they have to go on to the next step?
        Next: The next caption node to forward (three possibilities)
            1. null/undefined
            2. A caption node -- if the user clicks on the caption bubble it will just continue to the next caption node
            3. An array of options, each option will display as a button in the caption bubble so the option in the array must itself be an object with the following values:
                Display: the content to display in the button (i.e. "Yes", "No", "Ok")
                Caption: A caption node object
        Background: An optional route that should show in the background of this caption

Using the caption node as the basis for a graph, a dialogue is simply a directed graph of caption nodes.
