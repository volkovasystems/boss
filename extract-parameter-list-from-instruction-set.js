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
			"path": "path",
			"extract-parameter-list-from-function": "extractParameterListFromFunction"
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

		var parameterList = extractParameterListFromFunction( instructionProcedure );
		instruction.parameterList = parameterList;
	}
};

var fs = require( "fs" );
var path = require( "path" );
var extractParameterListFromFunction = require( "./extract-parameter-list-from-function/extract-parameter-list-from-function.js" );
( module || { } ).exports = extractParameterListFromInstructionSet;