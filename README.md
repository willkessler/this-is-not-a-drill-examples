# React Application examples for _This is Not A Drill!_

<img src="./public/ThisIsNotADrill_cutout.png" width="250" height="250">

This repo contains a sample application for the service: This Is Not A Drill!

See the `.env_example` file for setup instructions. To get started,
copy `.env_example` to `.env` and enter your API key in the file where
indicated.

Once you've entered an API key, you can try out your own
notifications on any of this sample application's pages. Just set the
`page` parameter on the notification to match the one used to
instantiate the TINAD component.

For example, if you take a look at `src/components/HomePage.tsx`
you'll see the component rendered with this JSX fragment:

``` javascript
<TinadComponent pageId="home" mode="toast" template={CustomTemplate} />
```

The `pageId` parameter will only render notifications identified by a
page value of `home` in the dashboard.  The `template` parameter can
be used to pass a custom template for inlined notifications (not modal
or toast types).

More documentation is available at https://www.this-is-not-a-drill.com.
