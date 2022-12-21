// import inspect from 'util';
const fs = require('fs');
const { ADIDSPMemoryMap } = require('./ADIDSPMemoryMap');

var xmldata = new Array();

/* Routine to find and load all the XML memory maps */

function get_xml_maps(dir) {
    return new Promise((resolve, reject) => {

        fs.readdir(dir, (err, files) => {
            const matchString = "-arm-memory.xml";
            matchFiles = files.filter(filename => filename.includes(matchString));
            promiseArray = new Array();
            matchFiles.forEach(val => {
                const cmd = xmldata.push(new ADIDSPMemoryMap(dir + "/" + val));
                promiseArray.push(cmd);
            })
            Promise.all(promiseArray)
                .then(res => {

                    resolve(xmldata);
                });
        });
    });
};


exports.printMsg = function () {
    console.log("libdsp: Initialised");
}
