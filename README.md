# React Application examples for This is Not A Drill!

<img src="./packages/dashboard/public/ThisIsNotADrill_cutout.png" width="250" height="250">

This repo contains a sample application for the service: This Is Not A Drill!

See the .env_example file for setup instructions.

Once you've entered your temporary API key, you can try out your own
notifications on any of this sample application's pages. Just set the
page parameter on the notification to match the one used to
instantiate the TINAD component.

For example, if you take a look at `src/components/HomePage.tsx`
you'll see the component rendered with this JSX:

``` javascript
<TinadComponent pageId="home" mode="toast" template={CustomTemplate} />
```

The `pageId` parameter will only render notifications identified by a
page value of `home` in the dashboard.
