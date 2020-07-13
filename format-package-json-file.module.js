"use strict";

/*;
	@license;
	@module-license:
		MIT License

		Copyright (c) 2020-present Richeve S. Bebedor <richeve.bebedor@gmail.com>

		@copyright:
			Richeve S. Bebedor
			<
				@license-year-range:
					2020-present
				@end-license-year-range
			>
			<
				@contact-detail:
					richeve.bebedor@gmail.com
				@end-contact-detail
			>
		@end-copyright

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
	@end-module-license
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

const formatPackageJSONFile = (
	async	function formatPackageJSONFile( moduleDirectoryPath, option ){
				/*;
					@procedure-definition:
						Reformat package JSON file to specific convention.
					@end-procedure-definition

					@parameter-definition:
						{
							"moduleDirectoryPath": "
								[
									@type:
											string
									@end-type

									<@required;>
								]
							",

							"option": "
								[
									@type:
											object with {
												"propertyList": "[@type:object as Array;]"
											}
									@end-type

									<@optional;>
								]
							"
						}
					@end-parameter-definition

					@trigger-definition:
						{
							"trigger": "
								[
									@type:
											object as Error
									@end-type

									<@tag:invalid-module-directory-path;>
									<@tag:cannot-find-package-json-file;>
									<@tag:cannot-format-package-json-file;>
								]
							"
						}
					@end-trigger-definition

					@result-definition:
						{
							"result": "
								[
									@type:
											boolean
									@end-type
								]
							"
						}
					@end-result-definition
				*/

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
						option = (
								(
									option
								)

							||	(
									{ }
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

						const PACKAGE_PROPERTY_LIST = (
								(
										(
												Array
												.isArray(
													(
														option
														.propertyList
													)
												)
											===	true
										)
								)
							?	(
									option
									.propertyList
								)
							:	(
									DEFAULT_PACKAGE_PROPERTY_LIST
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
												"cannot execute format package json file;",

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
