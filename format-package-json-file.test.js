"use strict";

const assert = require( "assert" );

const strictAssert = assert.strict;

const formatPackageJSONFile = (
	require( "./format-package-json-file.js" )
);

const TEST_MODULE_DIRECTORY = (
	async	function TEST_MODULE_DIRECTORY( ){
				try{
					strictAssert
					.equal(
						(
							await	formatPackageJSONFile(
										(
											"./"
										)
									)
						),

						(
							true
						),

						(
							[
								"#test-module-directory;",

								"test module directory;",
								"must return true;"
							]
						)
					);

					return	(
								true
							);
				}
				catch( error ){
					console
					.error(
						(
							error
						)
					);

					return	(
								false
							);
				}
			}
);

const TEST_PACKAGE_JSON_FILE_AND_DEFAULT_PACKAGE_PROPERTY_LIST = (
	async	function TEST_PACKAGE_JSON_FILE_AND_DEFAULT_PACKAGE_PROPERTY_LIST( ){
				const fs = require( "fs" );

				const fsAsync = fs.promises;

				const DEFAULT_PACKAGE_PROPERTY_LIST = (
					require( "./package-property-list.constant.js" )
				);

				try{
					strictAssert
					.equal(
						(
							Object
							.keys(
								(
									JSON
									.parse(
										(
											await	fsAsync
													.readFile(
														(
															"./package.json"
														)
													)
										)
									)
								)
							)
							.toString( )
						),

						(
							DEFAULT_PACKAGE_PROPERTY_LIST
							.toString( )
						),

						(
							[
								"#test-package-json-file-and-default-package-property-list;",

								"test package json file and default package property list;",
								"must be equal;"
							]
						)
					);

					return	(
								true
							);
				}
				catch( error ){
					console
					.error(
						(
							error
						)
					);

					return	(
								false
							);
				}
			}
);

(
	async	function TEST_SCENE_BASIC( ){
				console
				.table(
					[
						{
							"test": (
								"test module directory"
							),

							"result": (
								await	TEST_MODULE_DIRECTORY( )
							)
						},

						{
							"test": (
								"test package json file and default package property list"
							),

							"result": (
								await	TEST_PACKAGE_JSON_FILE_AND_DEFAULT_PACKAGE_PROPERTY_LIST( )
							)
						}
					]
				);
			}
)( );
