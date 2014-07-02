/*:
	@module-configuration:
		{
			"packageName": "boss",
			"fileName": "extract-parameter-list-from-instruction-set.js",
			"moduleName": "extractParameterListFromInstructionSet",
			"authorName": "Richeve S. Bebedor",
			"authorEMail": "richeve.bebedor@gmail.com",
			"repository": "git@github.com:volkovasystems/boss.git"
		}
	@end-module-configuration

	@module-documentation:
	@end-module-documentation

	@include:
		{
			"fs": "fs",
			"path": "path"
		}
	@end-include
*/
var extractParameterListFromInstructionSet = function extractParameterListFromInstructionSet( instructionSet, instructionSetDirectoryPath ){
	/*:
		@meta-configuration:
			{
				"instructionSet:required": "Set",
				"instructionSetDirectoryPath": "string"
			}
		@end-meta-configuration
	*/

	instructionSetDirectoryPath = instructionSetDirectoryPath || "./../instruction-set";
	instructionSetDirectoryPath = instructionSetDirectoryPath.replace( "/", path.sep );

	for( var command in instructionSet ){
		var instruction = instructionSet[ command ];
		var instructionFilePath = [ instructionSetDirectoryPath, instruction.fileName + ".js" ].join( path.sep );

        var instructionProcedure = require( instructionFilePath );
        var rawInstructionProcedure = instructionProcedure.toString( );


	}
};

var fs = require( "fs" );
var path = require( "path" );
( module || { } ).exports = extractParameterListFromInstructionSet;