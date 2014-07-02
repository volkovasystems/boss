/*:
	@module-configuration:
		{
			"packageName": "boss",
			"fileName": "read-instruction-set-directory.js",
			"moduleName": "readInstructionSetDirectory",
			"authorName": "Richeve S. Bebedor",
			"authorEMail": "richeve.bebedor@gmail.com",
			"repository": "git@github.com:volkovasystems/boss.git"
		}
	@end-module-configuration

	@module-documentation:
		This will check if the including project contains an instruction-set directory where it will base all instruction files.
		Then it will return an instruction set JSON format for the instruction engine to read.
		Note that this has a capability to set what instruction set directory you want to use.
	@end-module-documentation

	@include:
		{
			"fs": "fs",
			"path": "path"
		}
	@end-include
*/
var readInstructionSetDirectory = function readInstructionSetDirectory( instructionSetDirectoryPath ){
	/*:
		@meta-configuration:
			{
				"instructionSetDirectoryPath": "string"
			}
		@end-meta-configuration
	*/

	instructionSetDirectoryPath = instructionSetDirectoryPath || "./../instruction-set";
	instructionSetDirectoryPath = instructionSetDirectoryPath.replace( "/", path.sep );

	if( fs.existsSync( instructionSetDirectoryPath ) &&
		fs.statSync( instructionSetDirectoryPath).isDirectory( ) )
	{
		var instructionSet = { };

		var instructionFileList = fs.readdirSync( instructionSetDirectoryPath );

		var instructionFileListLength = instructionFileList.length;
		for( var index = 0; index < instructionFileListLength; index++ ){
			var instructionFileName = instructionFileList[ index ];

			if( !instructionFileName.match( /\.js$/ ) ){
				var error = new Error( "invalid javascript file" );
				console.error( error );
				throw error;
			}

			var instructionFilePath = [ instructionSetDirectoryPath, instructionFileName ].join( path.sep );
			var instructionProcedure = require( instructionFilePath );

			var instructionModuleName = instructionProcedure.name;
			instructionFileName = instructionFileName.replace( ".js", "" );

			var instructionFormat = instructionFileName.replace( "-", " " );
			instructionSet[ instructionFormat ] = {
				"moduleName": instructionModuleName,
				"fileName": instructionFileName
			};
		}

		return instructionSet;
	}else{
		//Throw error because someone is dumb not to include an instruction-set directory but dare to use this project without reading the fucking documentation.
		var error = new Error( "instruction-set directory does not exists" );
		console.error( error );
		throw error;
	}
};

var fs = require( "fs" );
var path = require( "path" );
( module || { } ).exports = readInstructionSetDirectory;