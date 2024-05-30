// Requiring file system module
const fs = require("fs");
let { text } = require("stream/consumers");

// Checking if a binary file is provided as an argument
if (process.argv[2] === undefined) {
    console.log(`\x1b[90m\x1b[1mArgument: \x1b[32m2\x1b[0m\n\x1b[31mPlease provide a binary file as an argument\x1b[0m`);
    process.exit(1);
}

// Read binary data from the file without specifying an encoding
const buffer = fs.readFileSync(process.argv[2]);

// Convert binary buffer to a string of binary representation
text = buffer.toString("binary")
.split(/\s+/) // Split the binary string based on spaces and newline characters (\n)
.map(binary => String.fromCharCode(parseInt(binary, 2)))
.join('');

let compiledText = false;
let compiled;

// Check if it contains the -c tag for compiling
if (process.argv[3] === "-c") {
    compiledText = buffer.toString("binary");
    compiled = true;
}

// Removing the comments
const singleLine = "//";
const multiLineStart = "/*";
const multiLineEnd = "*/";

// Making the .rep function
String.prototype.rep = function(s, mls, mle) {
    return this.replace(new RegExp(`(\\${s}.*$|\\${mls}[\\s\\S]*?\\${mle})`, 'gm'), '');
}

// Final result chooser
let textWithoutComment = compiled === true ? compiledText.rep(singleLine, multiLineStart, multiLineEnd).replace(/\s+/g, '').replace(/(.{8})/g, '$1 ') : text.rep(singleLine, multiLineStart, multiLineEnd)

// Compile the file
if (!process.argv[2].endsWith(".bin")) {
    if (compiled === true) {
        if (!fs.existsSync("compiled/")) {
            fs.mkdirSync("compiled/");
        }
        fs.writeFileSync("compiled/" + process.argv[2].split(".b")[0] + ".bin", textWithoutComment);
        console.log("\x1b[32mCompiled the binary.\x1b[0m");
    }
} else {
    if (compiled === true) {
        console.log(`\x1b[31mPlease end your binary file with an .binp extension.\x1b[0m`);
        process.exit(1);
    }
}

// Logging out the final result
if (compiled !== true) {
    console.log(textWithoutComment);
}