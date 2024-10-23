# INA219 Micro:bit Extension

This extension allows you to interface with the INA219 sensor via I2C using the Micro:bit. The INA219 sensor measures voltage, current, and power in your circuits. This extension provides blocks to configure the sensor and read measurements directly from it.

## Features

- Read shunt voltage
- Read bus voltage
- Read current
- Calculate power
- Supports configuration and calibration of the INA219 sensor

## Blocks

### Initialize I2C
Initialize I2C communication with the INA219 sensor.
```blocks
ina219.initI2C()
