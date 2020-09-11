"use strict";

const PACKAGE_PROPERTY_LIST = (
	Object
	.freeze(
		(
			[
				"name",
				"alias",
				"version",
				"description",
				"main",
				"scripts",
				"repository",
				"keywords",
				"author",
				"contributors",
				"license",
				"bugs",
				"homepage"
			]
		)
	)
);

module.exports = PACKAGE_PROPERTY_LIST;
