# hapi-less
A LessCSS plugin for hapijs

## Installation
```
npm install hapi-less
```

## Usage
```javascript
server.pack.register({
	plugin: require('hapi-less'),
	options: {
		home: __dirname + '/../app/styles',
		route: '/styles/{filename*}',
	    less: {
		    compress: true
		}
	}
}, function (err) {

	if (err) {
		console.log('Failed loading hapi-less');
	}
});
```

options is an object with these keys:
```
home: root folder of the less files. mandatory.
route: the hapi route to bind to, must have a {filename*} somewhere. optional, default: '/styles/'.
less: parameter to pass to less. optional.
```

## License

hapi-less is distributed under the [MIT license](https://raw.github.com/asafyish/hapi-less/master/LICENSE).