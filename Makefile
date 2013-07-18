glorify.js: glorify.coffee
	coffee -c glorify.coffee

publish: glorify.js version-build
	npm publish

version-minor:
	npm version minor

version-build:
	npm version build
