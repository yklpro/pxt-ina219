/**
 * INA219 功能擴展
 */
// % color="#1E90FF" weight=100 icon="\uf496" block="INA219"
namespace ina219 {
    
    let addr = 0x40;  // INA219 I2C address
    let Vsh_LSB = 10 * Math.pow(10, -6);  // 10uV fixed for shunt voltage
    let Bus_LSB = 4 * Math.pow(10, -3);   // 4mV fixed for bus voltage
	let s_bit = 16;

    let IMAX = 1.5;  // 最大預期電流
    let Rsh = 0.1;   // 分流電阻 (Shunt resistor) 單位 ohm
    let Cur_LSB = IMAX / Math.pow(2, 15);
    let Pow_LSB = 20 * Cur_LSB;
    let CAL = Math.floor(0.04096 / (Cur_LSB * Rsh));
	let config = 0x1ddf;

    // I2C 讀取暫存器
    function r_reg(reg: number): number {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let r_dat = pins.i2cReadBuffer(addr, 2); // 讀取2個byte
        let dat = (r_dat[0] << 8) | r_dat[1]; // 將 2 byte 組成 16 位元資料
        return dat;
    }

    // I2C 寫入暫存器
    function w_reg(pointer: number, dat: number): void {
        let buf = pins.createBuffer(3);
        buf[0] = pointer;
        buf[1] = (dat >> 8) & 0xff;  // MSB
        buf[2] = dat & 0xff;         // LSB
        pins.i2cWriteBuffer(addr, buf);
    }

    // 符號位數據轉換 (Signed Calculation)
    function sig(dat: number, num: number): number {
        if (dat >= (1 << (num - 1))) {
            dat = dat - (1 << num);
        }
        return dat;
    }


    /**
     * 初始化 INA219
     */
    //% block="初始化 INA219"
    export function initINA219(): void {
        w_reg(0x00, config);  // 寫入配置暫存器
        w_reg(0x05, CAL);     // 寫入校準暫存器
    }

    /**
     * 讀取電流 (mA)
     */
    //% block="讀取電流 (mA)"
    export function readCurrent(): number {
        let cur = sig(r_reg(0x04), 16) * Cur_LSB * 1000;  // 以 mA 為單位
        return cur;
    }

    /**
     * 讀取分流電壓 (uV)
     */
    //% block="讀取分流電壓 (uV)"
    export function readShuntVoltage(): number {
        let vsh = sig(r_reg(0x01), s_bit) * Vsh_LSB * 10 ** 6;  // 以 uV 為單位
        return vsh;
    }

    /**
     * 讀取匯流排 (bus) 電壓 (mV)
     */
    //% block="讀取匯流排 (bus) 電壓 (mV)"
    export function readBusVoltage(): number {
        let vbs = (r_reg(0x02) >> 3) * Bus_LSB * 1000;  // 以 mV 為單位
        return vbs;
    }

    /**
     * 計算電壓總和 (Vcc)
     */
    //% block="計算總電壓 Vcc (mV)"
    export function calculateVcc(): number {
        let vsh = readShuntVoltage() / 1000;  // 轉換為 mV
        let vbs = readBusVoltage();
        return vsh + vbs;
    }

    /**
     * 讀取功率 (mW)
     */
    //% block="讀取功率 (mW)"
    export function readPower(): number {
        let pow = r_reg(0x03) * Pow_LSB * 1000;  // 以 mW 為單位
        return pow;
    }
}
