const fs = require("fs");
const https = require("https");

const downloadLink = process.argv[2];
const fileName = process.argv[3];

if (!downloadLink) {
  console.error("Download link not provided.");
  process.exit(1);
}

if (!fileName) {
  console.error("File name not provided.");
  process.exit(1);
}

const fileStream = fs.createWriteStream(fileName);
let size = 0;
let date = new Date();
let elapsed;

https.get(downloadLink, response => {
  if (response.statusCode !== 200) {
    console.error("Failed to download file. Status code:", response.statusCode);
    process.exit(1);
  }

  response.on("data", chunk => {
    size += chunk.length;
    elapsed = new Date() - date;

    const progress = `\r${(size / (1024 * 1024)).toFixed(2)} MB of data downloaded. Total elapsed time is ${elapsed / 1000} s`;
    process.stdout.write(progress);
    fileStream.write(chunk);
  });

  response.on("end", () => {
    console.log(`\nFile downloaded successfully. Speed: ${((size / (1024 * 1024)) / (elapsed / 1000)).toFixed(2)} MB/s`);
    fileStream.end();
  });

  response.on("error", error => {
    console.error("Error while downloading file:", error);
    fileStream.close();
    process.exit(1);
  });
}).on("error", error => {
  console.error("Error while establishing connection:", error);
  process.exit(1);
});
