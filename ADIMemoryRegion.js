class ADIMemoryRegion {
    constructor(seg) {
        /* Parse one of the XML memory objects
        ** from the CCES XML files.
        */
        this.regionName = seg.attributes.name;
        this.start_s = seg.attributes.start;
        this.start = parseInt(this.start_s, 16);
        this.end_s = seg.attributes.end;
        this.end = parseInt(this.end_s, 16);
        this.width_s = parseInt(seg.attributes.width, 16);
        this.size = (this.end - this.start);
        this.size_s = this.size.toString(16);
    }

    regionName = null;
    start = null;
    start_s = null;
    end = null;
    end_s = null;
    width = null;
    width_s = null;
    size = null;
    size_s = null;

    isROM() {
        return (determine_mem_type() == "ROM");
    }

    isRAM() {
        var memType = determine_mem_type();
        return (memType == "L1" || memType == "L2" || memType == "L3");
    }

    isFlash() {
        return (determine_mem_type() == "Flash");
    }

    determine_mem_type() {
        /* Attempt to determine the memory type from its name.
        ** This should always be successful for the ADSP XML files,
        ** so throw an exception if it fails.
        */
        if (this.regionName.match(/L1/i) !== null) {
            return "L1";
        }
        if (this.regionName.match(/L2 RAM/i) !== null) {
            return "L2";
        }
        if (this.regionName.match(/^DMC/i) !== null) {
            return "L3";
        }
        if (this.regionName.match(/ROM/i) !== null) {
            return "ROM";
        }
        if (this.regionName.match(/Flash/i) !== null) {
            return "Flash";
        }
        throw new Error("Unknown memory type for " + regionName);
    }

    determine_mem_core() {
        /* Attempt to determine the cores that a memory is associated with.
        ** This should always be successful for the ADSP XML files,
        ** so throw an exception if it fails.
        */
        if (this.regionName.match(/^SHARC 0/i) !== null) {
            return "sharc0";
        } else if (this.regionName.match(/^SHARC 1/i) !== null) {
            return "sharc1";
        } else if (this.regionName.match(/^L2 RAM/i) !== null) {
            return "shared";
        } else if (this.regionName.match(/^DMC/i) !== null) {
            return "shared";
        } else if (this.regionName.match(/ROM/i) !== null) {
            return "shared";
        } else if (this.regionName.match(/Flash/i) !== null) {
            return "shared";
        }
        throw new Error("Unknown memory core for " + name);
    }
};

module.exports = { ADIMemoryRegion };