class ADIMemorySegment {
    constructor(seg) {
        /* Parse one of the XML memory objects
        ** from the CCES XML files.
        */
        this.regionName = seg.attributes.name;
        this.start_s = seg.attributes.start;
        this.start = parseInt(this.start_s, 16);
        this.end_s = seg.attributes.end;
        this.end = parseInt(this.end_s, 16);
        this.width = parseInt(seg.attributes.width, 16);
        this.width_s = this.width.toString();
        this.size = (this.end - this.start);
        this.size_s = this.size.toString(16);
        this.is_rom = this.isROM();
        this.is_ram = this.isRAM();
        this.is_flash = this.isFlash();
        this.is_device = this.isDevice();
        this.core = this.determine_mem_core();
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
    is_rom = null;
    is_ram = null;
    is_flash = null;
    is_device = null;
    core = null;

    isROM() {
        return (this.determine_mem_type() == "ROM");
    }

    isRAM() {
        var memType = this.determine_mem_type();
        return (memType == "L1" || memType == "L2" || memType == "L3");
    }

    isFlash() {
        return (this.determine_mem_type() == "Flash");
    }

    isDevice() {
        var memType = this.determine_mem_type();
        return (memType == "Flash" || memType == "PCIe" || memType == "SMC" );
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
        if (this.regionName.match(/SMC/i) !== null) {
            return "SMC";
        }
        if (this.regionName.match(/PCIe/i) !== null) {
            return "PCIe";
        }
        
        throw new Error("Unknown memory type for " + this.regionName);
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
        } else if ( this.regionName.match(/^SHARC L1/i) !== null ) {
            return "sharc0";
        } else if (this.regionName.match(/^L2 RAM/i) !== null) {
            return "shared";
        } else if (this.regionName.match(/^DMC/i) !== null) {
            return "shared";
        } else if (this.regionName.match(/ROM/i) !== null) {
            return "shared";
        } else if (this.regionName.match(/Flash/i) !== null) {
            return "shared";
        } else if (this.regionName.match(/SMC/i) !== null) {
            return "shared";
        }  else if (this.regionName.match(/PCIe/i) !== null) {
            return "shared";
        }
        throw new Error("Unknown memory core for " + this.regionName);
    }
};

module.exports = { ADIMemorySegment };