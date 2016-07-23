# balloon

## Usage

Firstly, load the module:

```js
import Balloon from 'balloon'
```

Now create a new instance (and pass along options, if you want):

```js
const app = new Balloon({
  ...
})
```

Once you're done with the code, use [electron](https://www.npmjs.com/package/electron-prebuilt) to run the app:

```bash
$ npm install electron-prebuilt -g
$ electron index
```

Done! :blush:

## Configuration

| Property | Description | Default&nbsp;value | Type |
| -------- | ----------- | ------------------ | ---- |
| root | The directory that contains your app's assets | process.cwd() | String |
