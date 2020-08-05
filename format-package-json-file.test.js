"use strict";

const assert = require( "assert" );

const strictAssert = (
	assert
	.strict
);

const formatPackageJSONFile = (
	require( "./format-package-json-file.js" )
);

const TEST_MODULE_DIRECTORY = (
	async	function TEST_MODULE_DIRECTORY( ){
				try{
					const testValue = (
						true
					);

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
							testValue
						),

						(
							[
								"#test-module-directory;",

								"test module directory;",
								`must return ${ testValue };`
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
				try{
					const fs = require( "fs" );

					const fsAsync = (
						fs
						.promises
					);

					const DEFAULT_PACKAGE_PROPERTY_LIST = (
						require( "./package-property-list.constant.js" )
					);

					const testValue = (
						DEFAULT_PACKAGE_PROPERTY_LIST
						.toString( )
					);

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
							testValue
						),

						(
							[
								"#test-package-json-file-and-default-package-property-list;",

								"test package json file and default package property list;",
								`must be equal to ${ testValue };`
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
					(
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
					)
				);
			}
)( );
