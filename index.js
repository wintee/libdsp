fs = require('fs');
var parser = require('xml-parser');
var inspect = require('util').inspect;

xmldata = new Array();

/* Routine to load an XML memory map */
function process_dsp_xml_map(mapfile) {
    var xml = fs.readFileSync(mapfile, 'utf8');
    var obj = parser(xml);
    xmldata.push(obj);
}
/* Routine to find and load all the XML memory maps */


function get_xml_maps(dir) {
    return new Promise((resolve, reject) => {
        
        d = fs.readdir(dir, (err, files) => {
            const matchString = "-arm-memory.xml";
            matchFiles = files.filter(filename => filename.includes(matchString));
            promiseArray = new Array();
            matchFiles.forEach( val => {
                const cmd = process_dsp_xml_map(dir+"/"+val);
                promiseArray.push(cmd);
            })
            Promise.all(promiseArray)
            .then( res => {
                    console.log("All XML files parsed");
                    resolve(xmldata);
                })
            });
    });
};



const xcall = new Array();
const getmaps = get_xml_maps("./tmp/opt/analog/cces/2.11.1/ARM/qemu/share/qemu/memmaps"); 
xcall.push(getmaps);
Promise.all(xcall)
.then( res => {
    console.log(xmldata);
    console.log("Done");
});

exports.printMsg = function() {
    console.log("libdsp: Initialised");
  }