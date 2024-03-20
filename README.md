<img src="./public/ThisIsNotADrill_cutout.png" width="250" height="250">

# Sample React Application for _This is Not A Drill!_

This repo contains a sample application for the _This Is Not A Drill!_
service.  

Each page in `src/components` has a different method of instantiating
the TINAD component to demonstrate different notification styles you
can use.

When you first sign up for TINAD we generate a few sample
notifications for you that will show up in this sample
application. You can try out your own notifications as well.  In the
dashboard, set the `page` parameter on your notification to match the
one used to instantiate the TINAD component in the sample application
page.

For example, if you take a look at `src/components/HomePage.tsx`
you'll see the component rendered with this JSX fragment:

``` javascript
<TinadComponent pageId="home" mode="toast" template={CustomTemplate} />
```

The `pageId` parameter will only render notifications identified by a
page value of `home` in the dashboard.  The `template` parameter can
be used to pass a custom template for inlined notifications (not modal
or toast types).

<img src="./public/CreateNewNotifPageId.png">

When you render the TinadComponent without a `pageId` parameter, then
all applicable notifications will be served on every page where the
component renders.

## Usage in StackBlitz

When using this application from the Playground in the dashboard, you
don't have to set up an API key. Accessing from the dashboard
automatically injects a time-limited API key into the environment
(good for 1 hour).

You may notice loading of the web application's pages to be slow in
StackBlitz. This is an aspect of Stackblitz and does not represent
anything about TINAD's speed in production. If you clone this repo and
run it locally you will get a better sense of timing. A lot of hard
work has been done to keep TINAD as light and as fast as possible.

If you fork the Stackblitz rig into your own account on Stackblitz and
use <a
href="https://blog.stackblitz.com/posts/introducing-webcontainers/">webcontainers</a>,
you should see a huge speed increase, which will be closer to actual
production speeds.

## Local Usage

To get this sample going locally, follow these steps:

1. Clone this repo locally
1. Modify `src/envConfig.ts`. In production, you will probably want to
   inject environment variables into the `TINAD_ENDUSER_ID` and
   `TINAD_API_KEY` settings of `envConfig`.
1. Start the application with `yarn && yarn run dev`.


More documentation is available at https://www.this-is-not-a-drill.com.
