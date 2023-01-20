const { get_xml_maps } = require('@wintee/libdsp');
const util = require('util');

const xcall = new Array();
const getmaps = get_xml_maps("../tmp/opt/analog/cces/2.11.1/ARM/qemu/share/qemu/memmaps");
xcall.push(getmaps);
Promise.all(xcall)
    .then(res => {
        // console.log("%o", xmldata);
        console.log("Done");
        console.log(util.inspect(res, false, null, true));
    });

