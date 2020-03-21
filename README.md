![](https://github.com/bothzoli/jrnl.js/workflows/cibuild/badge.svg)

# jrnl.js - Command line journal

_jrnl.js_ is a command line journal application based on [jrnl.sh](https://jrnl.sh/).

I really liked the idea of [jrnl.sh](https://jrnl.sh/) and also started using it.
I had some minor issues with it however and since I was also looking for hobby project ideas I thought I'd just write something similar myself for myself.

However I'm quite happy to share it with anyone who's interested.

My main goals for this project were:

- Have a very simple and easy to use application
- Write most part in functional programming style
  - One of my reasons to embark on a hobby project was to practice some functional programming
  - It may not be perfect at the time, but I'm trying to chisel away any non-functional parts as I go along
- Not to spend too much time on it
  - I mostly work on this on quiet weekday evenings, which I don't have too much, thus I can't work on it too much 😊

## What it does and how to use it

You can use this tool to write journal entries from the command line.
The entries will be saved in an `entries.json` file in a folder of choice based on the settings in the `settings.js` file.

### Write a new entry

To write a new journal entry just start the app with `npm start` or if you have it installed globally just type `jrnl`.
This will prompt you for a new journal entry.

The first sentence you write will be considered as the title of the journal entry.
The rest will be considered as the content of the journal entry.

You can tag words which will be highlighted when you print your journal entries.
To have a word tagged just prefix it with the tag character set in `settings.js` file (default is the ~ character).
