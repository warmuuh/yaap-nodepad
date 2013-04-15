yaap-nodepad
============

a more complex yaap/express example of a note-webapplication


based on http://dailyjs.com/2010/11/01/node-tutorial/

uses wire.js, express.js, yaap/wire and yaap/wire/express


#features:
 * mongodb as backend
 * user authentification
 * simple rest-api
 * MVC-approach

#overview
this application is basically structured like a typical SpringMVC application. 
You have the [wire-context](nodepad/app.js) which wires the application together.
There is a [model](nodepad/model) and there are [views](nodepad/views) that will be rendered (like JSPs).
Then there are the controllers that handles all requests (e.g. the [DocumentHandler](nodepad/controller/documents.js) (this is also where a lot of yaap-annotations are used).


#Screenshot
![screen](img/screen.jpg)
