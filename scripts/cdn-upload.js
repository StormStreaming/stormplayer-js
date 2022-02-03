const SFTPUpload = require('sftp-upload')
const fs = require('fs');

const rawSFTPConfig = fs.readFileSync('./cdn.config.json');
const sftpConfig = JSON.parse(rawSFTPConfig);

const iifePath = 'dist/iife/index.js';

const options = {
    host: sftpConfig.host,
    username: sftpConfig.username,
    path: './deploy',
    remoteDir: sftpConfig.remoteDir,
    privateKey: fs.readFileSync(sftpConfig.privateKey),
    passphrase: sftpConfig.passphrase,
    dryRun: false,
}

const createVersion = () => {

    const packageJSONRaw = fs.readFileSync('./package.json', 'utf8');
    const packageJSON = JSON.parse(packageJSONRaw);
    const fullVersion = packageJSON.version;
    const shortVersion = fullVersion.slice(0,fullVersion.lastIndexOf("."));
    const minVersion = shortVersion.slice(0,shortVersion.lastIndexOf("."));

    const iifeContent = fs.readFileSync(iifePath, 'utf8');

    fs.writeFileSync("deploy/"+fullVersion+".min.js", iifeContent, 'utf8');
    fs.writeFileSync("deploy/"+shortVersion+"-latest.min.js", iifeContent, 'utf8');
    fs.writeFileSync("deploy/"+minVersion+"-latest.min.js", iifeContent, 'utf8');

};

createVersion();


const sftp = new SFTPUpload(options);

sftp.on('error', function(err) {
    throw err;
}).on('uploading', function(progress) {
    console.log('Uploading', progress.file);
    console.log(progress.percent+'% completed');
}).on('completed', function() {
    console.log('Upload Completed');
}).upload();
