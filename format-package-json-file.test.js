"use strict";

const assert = require( "assert" );

const strictAssert = assert.strict;

const formatPackageJSONFile = (
	require( "./format-package-json-file.js" )
);

(
	async	function( ){
				strictAssert
				.equal(
					(
						await	formatPackageJSONFile(
									"./"
								)
					),

					(
						true
					),

					(
						"Must return true"
					)
				);
			}
)( );

(
	async	function( ){
				const fs = require( "fs" );

				const fsAsync = fs.promises;

				const PACKAGE_PROPERTY_LIST = (
					require( "./package-property-list.constant.js" )
				);

				strictAssert
				.equal(
					(
						Object
						.keys(
							JSON
							.parse(
								await	fsAsync
										.readFile(
											"./package.json"
										)
							)
						)
						.toString( )
					),

					(
						PACKAGE_PROPERTY_LIST
						.toString( )
					),

					(
						"Package property list must be equal"
					)
				);
			}
)( );
