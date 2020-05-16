#! /usr/bin/env node

const MODULE_DIRECTORY_PATH_SHELL_PARAMETER = (
	"--moduleDirectoryPath"
);

(
	async	function runFormatPackageJSONFile( shellParameterList ){
				"use strict";

				const formatPackageJSONFile = (
					require( "./format-package-json-file.js" )
				);

				return	(
							await	formatPackageJSONFile(
										(
											shellParameterList[
												(
														shellParameterList
														.indexOf(
															MODULE_DIRECTORY_PATH_SHELL_PARAMETER
														)
													+	1
												)
											]
										)
									)
						);
			}
)( process.argv );
