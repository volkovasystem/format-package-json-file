"use strict";

//;	@code-space:template-engine:
const assert = require( "assert" );
const util = require( "util" );

const strictAssert = (
	assert
	.strict
);

//;	@procedure:check-directory:
const checkDirectory = (
	async	function checkDirectory( directoryPath ){
					const fs = require( "fs" );
					const path = require( "path" );

					const fsAsync = (
						fs
						.promises
					);

					(
							directoryPath
						=	(
								path
								.resolve(
									(
										directoryPath
									)
								)
							)
					);

					try{
						return	(
									(
										await	fsAsync
												.stat(
													(
														directoryPath
													)
												)
									)
									.isDirectory( )
								);
					}
					catch( error ){
						return	(
									false
								);
					}
			}
);
//;	@procedure:check-directory;

//;	@procedure:check-file:
const checkFile = (
	async	function checkFile( filePath ){
					const fs = require( "fs" );
					const path = require( "path" );

					const fsAsync = (
						fs
						.promises
					);

					(
							filePath
						=	(
								path
								.resolve(
									(
										filePath
									)
								)
							)
					);

					try{
						return	(
									(
										await	fsAsync
												.stat(
													(
														filePath
													)
												)
									)
									.isFile( )
								);
					}
					catch( error ){
						return	(
									false
								);
					}
			}
);
//;	@procedure:check-file;

//;	@procedure:get-directory-file-list:
const getDirectoryFileList = (
	async	function getDirectoryFileList( directoryPath ){
				const fs = require( "fs" );
				const path = require( "path" );

				const fsAsync = (
					fs
					.promises
				);

				(
						directoryPath
					=	(
							path
							.resolve(
								(
									directoryPath
								)
							)
						)
				);

				try{
					return	(
								await	fsAsync
										.readdir(
											(
												directoryPath
											),

											(
												{
													"withFileTypes": (
														true
													)
												}
											)
										)
							);
				}
				catch( error ){
					return	(
								[ ]
							);
				}
			}
);
//;	@procedure:get-directory-file-list;

//;	@procedure:execute-shell-script:
const executeShellScript = (
	async	function executeShellScript( shellScript, moduleDirectoryPath ){
				const childProcess = require( "child_process" );
				const path = require( "path" );

				const execAsync = (
					util
					.promisify(
						(
							childProcess
							.exec
						)
					)
				);

				if(
						(
								typeof
								moduleDirectoryPath
							==	"string"
						)

					&&	(
								moduleDirectoryPath
								.length
							>	0
						)
				){
					(
							moduleDirectoryPath
						=	(
								path
								.resolve(
									(
										moduleDirectoryPath
									)
								)
							)
					);
				}
				else{
					(
							moduleDirectoryPath
						=	(
								process
								.cwd( )
							)
					);
				}

				try{
					const	{
								stdout,
								stderr
							}
						=	(
								await	execAsync(
											(
												shellScript
											),

											(
												{
													"cwd": (
														moduleDirectoryPath
													)
												}
											)
										)
							);

					return	(
								{
									"outputLog": (
										stdout
										.trim( )
									),

									"errorLog": (
										stderr
										.trim( )
									)
								}
							);
				}
				catch( error ){
					return	(
								{
									"error": (
										util
										.inspect(
											(
												error
											)
										)
									)
								}
							);
				}
			}
);
//;	@procedure:execute-shell-script;

//;	@procedure:setup-test-directory:
const SETUP_TEST_DIRECTORY = (
	async	function SETUP_TEST_DIRECTORY( ){
				const shellParameterList = (
					process
					.argv
				);

				const DISABLE_SETUP_TEST_DIRECTORY_SHELL_PARAMETER = (
					"--disableSetupTestDirectory"
				);

				const DISABLE_SETUP_TEST_DIRECTORY_SHORT_SHELL_PARAMETER = (
					"--xstd"
				);

				const disableSetupTestDirectory = (
						(
								shellParameterList
								.includes(
									(
										DISABLE_SETUP_TEST_DIRECTORY_SHELL_PARAMETER
									)
								)
							===	true
						)

					||	(
								shellParameterList
								.includes(
									(
										DISABLE_SETUP_TEST_DIRECTORY_SHORT_SHELL_PARAMETER
									)
								)
							===	true
						)
				);

				if(
						(
								disableSetupTestDirectory
							===	true
						)
				){
					return	(
								true
							);
				}

				return	(
							await	executeShellScript(
										(
											"mkdir .test || true"
										)
									)
						);
			}
);
//;	@procedure:setup-test-directory;

//;	@procedure:clean-test-directory:
const CLEAN_TEST_DIRECTORY = (
	async	function CLEAN_TEST_DIRECTORY( ){
				const shellParameterList = (
					process
					.argv
				);

				const DISABLE_CLEAN_TEST_DIRECTORY_SHELL_PARAMETER = (
					"--disableCleanTestDirectory"
				);

				const DISABLE_CLEAN_TEST_DIRECTORY_SHORT_SHELL_PARAMETER = (
					"--xctd"
				);

				const disableCleanTestDirectory = (
						(
								shellParameterList
								.includes(
									(
										DISABLE_CLEAN_TEST_DIRECTORY_SHELL_PARAMETER
									)
								)
							===	true
						)

					||	(
								shellParameterList
								.includes(
									(
										DISABLE_CLEAN_TEST_DIRECTORY_SHORT_SHELL_PARAMETER
									)
								)
							===	true
						)
				);

				if(
						(
								disableCleanTestDirectory
							===	true
						)
				){
					return	(
								true
							);
				}

				return	(
							await	executeShellScript(
										(
											"rm -rfv .test || true"
										)
									)
						);
			}
);
//;	@procedure:clean-test-directory;
//;	@code-space:template-engine;

const formatPackageJSONFile = (
	require( "./format-package-json-file.js" )
);

const TEST_MODULE_DIRECTORY = (
	async	function TEST_MODULE_DIRECTORY( ){
				try{
					const actualValue = (
						await	formatPackageJSONFile(
									(
										"./"
									)
								)
					);

					const testValue = (
						true
					);

					strictAssert
					.equal(
						(
							actualValue
						),

						(
							testValue
						),

						(
							[
								"#test-module-directory;",

								"test module directory;",
								`must return, ${ testValue };`
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

					const actualPropertyList = (
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
					)

					const testPropertyList = (
						Array
						.from(
							(
								DEFAULT_PACKAGE_PROPERTY_LIST
							)
						)
					);

					const actualValue = (
							testPropertyList
							.every(
								(
									( property ) => (
										actualPropertyList
										.includes(
											(
												property
											)
										)
									)
								)
							)
						===	true
					);

					const testValue = (
						true
					);

					strictAssert
					.equal(
						(
							actualValue
						),

						(
							testValue
						),

						(
							[
								"#test-package-json-file-and-default-package-property-list;",

								"test package json file and default package property list;",
								`package json file must contain default package property list, ${ DEFAULT_PACKAGE_PROPERTY_LIST };`,
								`must assert to ${ testValue };`
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
				(
					await	CLEAN_TEST_DIRECTORY( )
				);

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

				(
					await	CLEAN_TEST_DIRECTORY( )
				);
			}
)( );
