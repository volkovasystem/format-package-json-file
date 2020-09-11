"use strict";

/*;
	@license:module:
		MIT License

		Copyright (c) 2020-present Richeve S. Bebedor <richeve.bebedor@gmail.com>

		@license:copyright:
			Richeve S. Bebedor

			<@license:year-range:2020-present;>

			<@license:contact-detail:richeve.bebedor@gmail.com;>
		@license:copyright;

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@license:module;
*/

const formatPackageJSONFile = (
	async	function formatPackageJSONFile( moduleDirectoryPath, optionData ){
				/*;
					@definition:
						@procedure:#formatPackageJSONFile
							@description:
								Reformat package JSON file to specific convention.
							@description;
						@procedure;

						@parameter:#moduleDirectoryPath
							@type:
									string
							@type;

							@description:
							@description;

							@required;
						@parameter;

						@parameter:#optionData
							@type:
									object:with:[
										propertyList
									]
							@type;

							@description:
							@description;

							@optional;
						@parameter;

						@parameter:#optionData.propertyList
							@type:
									object:as:Array:of:string
							@type;

							@description:
							@description;

							@optional;
						@parameter;

						@result:#result
							@type:
									boolean
							@type;

							@description:
							@description;
						@result;

						@trigger:#trigger
							@type:
									object:as:Error
							@type;

							@description:
							@description;

							@tag:#invalid-module-directory-path;
							@tag:#cannot-find-package-json-file;
							@tag:#cannot-format-package-json-file;
						@trigger;
					@definition;
				*/

				const fs = require( "fs" );
				const path = require( "path" );
				const util = require( "util" );

				const formatJSONFile = require( "format-json-file" );

				const fsAsync = (
					fs
					.promises
				);

				const PACKAGE_JSON_FILE_NAME = (
					"package.json"
				);

				const DEFAULT_PACKAGE_PROPERTY_LIST = (
					require( "./package-property-list.constant.js" )
				);

				try{
					if(
							(
									typeof
									moduleDirectoryPath
								==	"string"
							)

						&&	(
									moduleDirectoryPath
									.length
								>	1
							)

						&&	(
									(
										await	fsAsync
												.stat(
													(
														moduleDirectoryPath
													)
												)
									)
									.isDirectory( )
								===	true
							)
					){
						(
								optionData
							=	(
										(
											optionData
										)

									||	(
											{ }
										)
								)
						);

						const packageJSONFilePath = (
							path
							.resolve(
								(
									moduleDirectoryPath
								),

								(
									PACKAGE_JSON_FILE_NAME
								)
							)
						);

						if(
								(
										(
											await	fsAsync
													.stat(
														(
															packageJSONFilePath
														)
													)
										)
										.isFile( )
									===	true
								)
						){
							const packageData = (
								JSON
								.parse(
									(
										await	fsAsync
												.readFile(
													(
														packageJSONFilePath
													)
												)
									)
								)
							);

							const currentPackagePropertyList = (
								Object
								.keys(
									(
										packageData
									)
								)
							);

							const PACKAGE_PROPERTY_LIST = (
									(
											(
													Array
													.isArray(
														(
															optionData
															.propertyList
														)
													)
												===	true
											)

										&&	(
													(
														optionData
														.propertyList
													)
													.length
												>	0
											)
									)
								?	(
										optionData
										.propertyList
									)
								:	(
											(
													(
															Array
															.isArray(
																(
																	currentPackagePropertyList
																)
															)
														===	true
													)

												&&	(
															currentPackagePropertyList
															.length
														>	0
													)
											)
										?	(
												currentPackagePropertyList
											)
										:	(
												DEFAULT_PACKAGE_PROPERTY_LIST
											)
									)
							);

							return	(
										await	formatJSONFile(
													(
														packageJSONFilePath
													),

													(
														{
															"sortProperty": (
																true
															),

															"propertyList": (
																PACKAGE_PROPERTY_LIST
															)
														}
													)
												)
									);
						}
						else{
							throw	(
										new	Error(
												(
													[
														"#cannot-find-package-json-file;",

														"cannot format package json file;",
														"cannot find package json file;",

														"@package-json-file-path:",
														`${ packageJSONFilePath };`
													]
												)
											)
									);
						}
					}
					else{
						throw	(
									new	Error(
											(
												[
													"#invalid-module-directory-path;",

													"cannot format package json file;",
													"invalid module directory path;",

													"@module-directory-path:",
													`${ moduleDirectoryPath };`
												]
											)
										)
								);
					}
				}
				catch( error ){
					throw	(
								new	Error(
										(
											[
												"#cannot-format-package-json-file;",

												"cannot format package json file;",
												"cannot execute format package json file procedure;",

												"@error-data:",
												`${ util.inspect( error ) };`
											]
										)
									)
							);
				}
			}
);

module.exports = formatPackageJSONFile;
