# smartthings-dashboard

Creates a sveltekit dashboard

Requires a config file in `src/lib` that looks like

```{typescript}
const domain = 'http://mydomain.com';

export { domain };
```

---

Gets the data from the nodeJS smartthings-log-api project.

I have `nginx` set-up to serve the .json files the project below creates.

<https://github.com/EricKit/smartthings-log-api/>
