# Express application template

Copy this repo and start your application with a preconfigured express application, featuring:

* Decoupled routing/controller/model structure
* Asset packaging & cache busting (requirejs)
* Less
* Tests
- Unit
- Controller
- Integration

## Notes
### Express
Below are some brief notes, for additional information see the full [Api docs](http://expressjs.com/api.html)

#### Hello World

	var express = require('express');
	var app = express();
	app.get('/', function(req, res){
		res.send('hello world');
	});
	app.listen(3000);

#### Middleware
Middleware is invoked sequentially, so registration order matters!
Middleware is easy to use in express, and you'll find that certain kinds of problems can be easily solved using the middleware pattern.

You can decide to handle requests, tranform them, or simply pass them to the next handler.


Example:

	app.use(function(request, response, next) {
		console.log(request.url);
		next();
	});

Basic middleware provided by express/connect:

* basicAuth
* bodyParser
* compress
* cookieParser
* cookieSession
* csrf
* static
* directory
* logger
* session
* app.router
* errorHandler
* favicon
* methodOverride

#### Request Object

	req.params    => routing params
	req.query     => query params
	req.body      => body params
	req.files     => file params
	req.param     => pull from any of the above (in order of routing params, body, query)
	req.cookies   => cookies
	req.get       => get header values (req.get("content-type"))
	req.ip        => request ip (proxy aware)
	req.xhr       => xhr request?
	req.protocol  => http or https
	req.secure    => is https?
	req.subdomain => array of subdomains

#### Response Object

	res.status => set response status (res.status(200))
	res.set  => set response headers (res.set("content-type"))
	res.get => get response headers (res.get("content-type"))
	res.cookie => set response cookie
	res.redirect => redirection, defaults to 302 (res.redirect("http://www.google.com"), res.redirect(301, "http://www.google.com"))
	res.send =>
		res.send(new Buffer("whoop"));
		res.send({ some: "json" });
		res.send("some html");
		res.send(404, "Sorry, we cannot find that!");
		res.send(500, { error: "something blew up" });
		res.send(200);
	res.json => Force response to be json (res.json({foo: "bar"}), res.json(null)
	res.type => Set response content type
	res.format => rails style content handlers
	res.attachment => Set Content-Disposition header to attachment, set Content-Type based on filename
	res.sendfile => Set Content-Type based on filename
	res.download => Transfer the file as an attachment (browsers will prompt users)
	res.locals => Place to set content for views or other middleware to use
	res.render => Have view engine handle response

### Requirejs
[Requirejs](http://requirejs.org/) is an AMD implementation with an optimizer that combines all modules into a single minified file (with correct load order) for production.

Example module definition:

	define(function(require) {
		var $ = require("jquery");
		var Thing = function() { ... }
		return Thing;
	});

### Less
[Less](http://lesscss.org/) is a superset of css, that is compiled into css.
It supports variables, mixins, and nested elements.

To autocompile less files on change:

	grunt watch:less

## Structure

* Controllers    => application/controllers
* Models         => application/models
* Middleware etc => application/lib
* Views          => application/views
* Javascript     => application/assets/javascripts
* Less           => application/assets/less

## Running
The application server can be started with the following command:

	node boot

The environment and port can also be specified

	APP_ENV=production APP_PORT=8080 node boot

When the application is booted, it starts a cluster of applications, one for each processor.
If an application server dies, it is automatically respawned.

In development mode, javascript files are served individually, but less files must be compiled.
Less files can be automatically compiled on change using grunt

	PATH=$PATH:./node_modules/grunt/bin/
	grunt watch:less

## Testing
TODO

## Deploying
* grunt release (build client assets)
* APP_ENV=production APP_PORT=8080 node boot
