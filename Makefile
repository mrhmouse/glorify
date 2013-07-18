glorify.js: glorify.coffee
	coffee -c glorify.coffee

publish: glorify.js version
	npm publish

version:
	npm version minor
