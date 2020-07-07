"use strict";

const PACKAGE_PROPERTY_LIST = (
	Object
	.freeze(
		(
			[
				"name",
				"version",
				"description",
				"main",
				"scripts",
				"bin",
				"repository",
				"keywords",
				"author",
				"contributors",
				"license",
				"bugs",
				"homepage",
				"dependencies",
				"devDependencies"
			]
		)
	)
);

module.exports = PACKAGE_PROPERTY_LIST;
