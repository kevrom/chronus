## Local development

Install [PNPM](https://pnpm.io/installation)

Install packages

```bash
$ pnpm i
```

Start development server

```bash
$ pnpm dev
```

Navigate to [http://localhost:3100](http://localhost:3100)

Run tests

```bash
$ pnpm test
```

## Todo (what could have been)

- The knob animation around the dial is a little janky. A smoothing function could help.
- The X button in the top-right corner signifies there should be some way of closing the timer, which makes me further assume there should be a mechanism to create new timers. I would create a list of active timers, and a way to minimize them into the list.
- A notification or sound when a timer completes.
- A way to change the name of your timer.
- LocalStorage syncing for your timers.
- A list of past timers.
- Convert into a PWA
- Theming
- Focus inputs when they appear on-sceen after clicking
- Write RxJS marble diagram tests for the state streams
