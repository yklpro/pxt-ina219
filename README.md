# INA219 Micro:bit Extension

This extension allows you to interface with the INA219 sensor via I2C using the Micro:bit. The INA219 sensor measures voltage, current, and power in your circuits. This extension provides blocks to configure the sensor and read measurements directly from it.

此擴充套件允許您透過 micro:bit 使用 I2C 與 INA219 感測器進行介面連接。INA219 感測器可測量電路中的電壓、電流及功率。此擴充套件提供積木以設定感測器並直接讀取測量值。

## Features

- Read shunt voltage
- Read bus voltage
- Read current
- Calculate power
- Supports configuration and calibration of the INA219 sensor


- 讀取分流電壓  
- 讀取匯流排電壓  
- 讀取電流  
- 計算功率  
- 支援 INA219 感測器的設定與校準  


## Blocks

### Initialize I2C
Initialize I2C communication with the INA219 sensor.
```blocks
ina219.initI2C()
