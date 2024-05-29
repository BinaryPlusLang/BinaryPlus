// Requiring file system module
const fs = require("fs");
let { text } = require("stream/consumers");

// Checking if a binary file is provided as an argument
if (process.argv[2] === undefined) {
    console.log("Please provide a binary file as an argument");
    process.exit(1);
}

// Read binary data from the file without specifying an encoding
const buffer = fs.readFileSync(process.argv[2]);

// Convert binary buffer to a string of binary representation
text = buffer.toString("binary")
    .split(/\s+/) // Split the binary string based on spaces and newline characters (\n)
    .map(binary => String.fromCharCode(parseInt(binary, 2)))
    .join('');

// Removing the comments
const singleLine = "//";
const multiLineStart = "/*";
const multiLineEnd = "*/";
let textWithoutComment = text.replace(new RegExp(`(\\${singleLine}.*$|\\${multiLineStart}[\\s\\S]*?\\${multiLineEnd})`, 'gm'), '')

// Logging out the final result
console.log(textWithoutComment);