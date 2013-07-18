glorify.js: glorify.coffee
	coffee -c glorify.coffee

publish: glorify.js version-patch
	npm publish

version-minor:
	npm version minor

version-patch:
	npm version patch
