const { ADIMemorySegment } = require('./ADIMemorySegment');
const fs = require('fs');
const parse = require('xml-parser');

class ADIDSPMemoryMap {
    fullname = null;
    filename = null;
    processor = null;
    cores = null;
    memoryRegions = new Array();

    constructor(mapfile) {
        /* Parse an entire ADI XML memory map
        ** to build up a profile of a processor.
        */
        var xml = fs.readFileSync(mapfile, 'utf8');
        var obj = parse(xml);
        try {
            this.fullname = mapfile;
            this.filename = obj.root.attributes.name;
            this.processor = this.filename.replace(/-arm-memory.xml/g, '');
            var schemaVersion = obj.root.attributes["schema-version"];
            if (schemaVersion != 1) {
                throw new Error("Unsupported schema version");
            }
            var memoryFound = false;
            obj.root.children.forEach(child => {
                if (child.name == "memory-definitions") {
                    memoryFound = true;
                    child.children.forEach(seg => {
                        if (seg.name == "memory-segment") {
                            this.memoryRegions.push(new ADIMemorySegment(seg));
                        }
                    })
                }
            })
            if (!memoryFound) {
                throw new Error("Failed to find memory definition");
            }
        }
        catch (err) {
            console.error("Error: " + mapfile + " is malformed");
            console.error(err);
            throw new Error("Could not parse XML file: "+mapfile);
        }
    }

};
module.exports = { ADIDSPMemoryMap };