#! /usr/bin/env node

const MODULE_DIRECTORY_PATH_SHELL_PARAMETER = (
	"--moduleDirectoryPath"
);

const PROPERTY_LIST_SHELL_PARAMETER = (
	"--propertyList"
);

(
	async	function runFormatPackageJSONFile( shellParameterList ){
				"use strict";

				const formatPackageJSONFile = (
					require( "./format-package-json-file.js" )
				);

				const moduleDirectoryPath = (
						(
								(
										shellParameterList
										.includes(
											(
												MODULE_DIRECTORY_PATH_SHELL_PARAMETER
											)
										)
									===	true
								)
						)
					?	(
							shellParameterList[
								(
									(
										shellParameterList
										.indexOf(
											(
												MODULE_DIRECTORY_PATH_SHELL_PARAMETER
											)
										)
									)+1
								)
							]
						)
					:	(
							process
							.cwd( )
						)
				);

				const propertyList = (
						(
								(
										shellParameterList
										.includes(
											(
												PROPERTY_LIST_SHELL_PARAMETER
											)
										)
									===	true
								)
						)
					?	(
							(
								shellParameterList[
									(
										(
											shellParameterList
											.indexOf(
												(
													PROPERTY_LIST_SHELL_PARAMETER
												)
											)
										)+1
									)
								]
							)
							.split(
								(
									/[\,\s\t\n\r]+/gm
								)
							)
						)
					:	(
							undefined
						)
				);

				return	(
							await	formatPackageJSONFile(
										(
											moduleDirectoryPath
										),

										(
											{
												"propertyList": (
													propertyList
												)
											}
										)
									)
						);
			}
)(
	(
		process
		.argv
	)
);
