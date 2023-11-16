import HMC1000 from '../assets/images/HMC1000.jpg';
import SL45 from '../assets/images/SL45.jpg';
import HMC1000large from '../assets/images/HMC1000largeimg.jpg';
import SL45large from '../assets/images/SL45largeimg.jpg';
import sensor1 from '../assets/images/sensor1.png';
import sensor2 from '../assets/images/sensor2.png';
import sensor3 from '../assets/images/sensor3.png';
import sensor4 from '../assets/images/sensor4.png';
interface Threshold {
  min: number | string;
  max: number | string;
}

interface Sensor {
  name: string;
  description: string;
  min?: number;
  max?: number;
  threshold: Threshold;
  uom: string;
  interval: string;
  trigger?: string;
}

interface Subsystem {
  name: string;
  sensors: Sensor[];
}

export interface MachineData {
  machine: string;
  subsystems: Subsystem[];
  image: string | any;
  id: string;
  largeimg: string | any;
}
export const MACHINES_DATA: MachineData[] = [
  {
    machine: 'HMC1000',
    id: '1',
    image: HMC1000,
    largeimg: HMC1000large,
    subsystems: [
      {
        name: 'Hydraulic System',
        sensors: [
          {
            name: 'Hydraulic oil Temperature',
            description: 'OT1_01',
            min: 30,
            max: 40,
            threshold: {
              min: 30,
              max: 50,
            },
            uom: '°C',
            interval: '8 Hrs',
          },
          {
            name: 'Hydraulic oil Pump Pressure',
            description: 'P1_01',
            min: 50,
            max: 60,
            threshold: {
              min: 50,
              max: 60,
            },
            uom: 'Kg/cm2',
            interval: '4 Hrs',
          },
          {
            name: 'Hydraulic oil level',
            description: 'OL1_01',
            threshold: {
              min: 'NA',
              max: 'NA',
            },
            uom: '',
            interval: '8 Hrs',
          },
          {
            name: 'Pump Motor Surface Temperature',
            description: 'ST1_01',
            min: 30,
            max: 50,
            threshold: {
              min: 30,
              max: 60,
            },
            uom: '°C',
            interval: '8 Hrs',
          },
        ],
      },
      {
        name: 'Spindle Oil Cooling System',
        sensors: [
          {
            name: 'Spindle Oil Outlet Temperature',
            description: 'OT1_02',
            min: 0,
            max: 30,
            threshold: {
              min: '<30',
              max: 30,
            },
            uom: '°C',
            interval: '8 Hrs',
          },
          {
            name: 'Spindle Oil Pump Pressure',
            description: 'P1_02',
            min: 5,
            max: 7,
            threshold: {
              min: 5,
              max: 7,
            },
            uom: 'Kg/cm2',
            interval: '4 Hrs',
          },
        ],
      },
      {
        name: 'Coolant System',
        sensors: [
          {
            name: 'Coolant Oil pump pressure',
            description: 'P1_03',
            min: 20,
            max: 25,
            threshold: {
              min: 25,
              max: 25,
            },
            uom: 'Kg/cm2',
            interval: '4 Hrs',
          },
          {
            name: 'Oil level in lube tank',
            description: 'OL1_03',
            threshold: {
              min: 'NA',
              max: 'NA',
            },
            uom: '',
            interval: '1 Hrs',
          },
        ],
      },
      {
        name: 'Lubrication Unit system',
        sensors: [
          {
            name: 'Lube Oil pump pressure',
            description: 'P1_04',
            threshold: {
              min: 'NA',
              max: 'NA',
            },
            uom: '',
            interval: '1 Hrs',
            trigger: 'When Threshold exceeds the maximum and minimum limt',
          },
        ],
      },
    ],
  },
  {
    machine: 'SL45',
    id: '2',
    image: SL45,
    largeimg: SL45large,
    subsystems: [
      {
        name: 'Hydraulic System',
        sensors: [
          {
            name: 'Hydraulic oil level',
            description: 'OL2_01',
            threshold: {
              min: 'NA',
              max: 'NA',
            },
            uom: 'NA',
            interval: '8 Hrs',
          },
          {
            name: 'Hydraulic oil Pump Pressure',
            description: 'P2_01',
            min: 30,
            max: 40,
            threshold: {
              min: 40,
              max: 50,
            },
            uom: '°C',
            interval: '8 hrs',
          },
          {
            name: 'Hydraulic oil Pump Pressure',
            description: 'P2_01',
            min: 45,
            max: 65,
            threshold: {
              min: 45,
              max: 65,
            },
            uom: 'Kg/cm2',
            interval: '4 hrs',
          },
          {
            name: 'Hydraulic Oil Chuck Clamping Pressure',
            description: 'P2_02',
            min: 15,
            max: 65,
            threshold: {
              min: 15,
              max: 65,
            },
            uom: 'Kg/cm2',
            interval: '4 hrs',
          },
          {
            name: 'Pump Motor Surface Temperature',
            description: 'ST2_01',
            min: 30,
            max: 50,
            threshold: {
              min: 30,
              max: 60,
            },
            uom: '°C',
            interval: '8 hrs',
          },
        ],
      },
      {
        name: 'Control Panel System',
        sensors: [
          {
            name: 'Air Temperature inside the cabinet',
            description: 'AT2_01',
            min: 20,
            max: 35,
            threshold: {
              min: 20,
              max: 35,
            },
            uom: '°C',
            interval: '8 Hrs',
          },
        ],
      },
      {
        name: 'Lubrication Unit system',
        sensors: [
          {
            name: 'Oil level in lube tank',
            description: 'OL2_02',
            threshold: {
              min: 'NA',
              max: 'NA',
            },
            uom: '',
            interval: '1 hrs',
          },
          {
            name: 'Lube Oil pump pressure',
            description: 'P2_03',
            threshold: {
              min: 'NA',
              max: 'NA',
            },
            uom: '',
            interval: '1 Hrs',
          },
        ],
      },
    ],
  },
];

export const ALL_SENSOR_DATA = [
  { title: 'Hydraulic Oil temprature', image: sensor1 },
  { title: 'Hydraulic pump pressure', image: sensor2 },
  { title: 'Hydraulic oil level', image: sensor3 },
  { title: 'Spindle oil level', image: sensor4 },
  { title: 'Spindle oil outlet temprature', image: sensor1 },
  { title: 'Spindle oil pump pressure', image: sensor2 },
  { title: 'Coolant oil pump pressure', image: sensor3 },
  { title: 'Oil level in lube tank', image: sensor4 },
  { title: 'Lube oil pump pressure', image: sensor1 },
  { title: 'Hydraulic oil pump pressure', image: sensor2 },
  { title: 'Hydraulic Oil temprature', image: sensor3 },
  { title: 'Hydraulic pump pressure', image: sensor4 },
  { title: 'Hydraulic oil level', image: sensor1 },
];
