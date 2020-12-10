export const gadgetConfig = (name) => {
  switch (true) {
    case name === 'calorieGadgets':
      return calorieGadgets;
    case name === 'sleepGadgets':
      return sleepGadgets;
    default:
      return null;
  }
};

const calorieGadgets = [
  {
    name: 'dailyAverage3',
    label: '3 Day Average',
    goal: 500,
    days: 3,
    includeToday: false,
    type: 'average',
    active: true,
  },
  {
    name: 'dailyAverage14',
    label: '14 Day Average',
    goal: 500,
    days: 14,
    includeToday: false,
    type: 'average',
    active: true,
  },
  {
    name: 'total14',
    label: '60 Day Average',
    goal: 500,
    days: 60,
    includeToday: false,
    type: 'average',
    active: true,
  },
  {
    name: 'total60',
    label: '60 Day Total',
    goal: 500 * 60,
    days: 60,
    includeToday: false,
    type: 'total',
    active: true,
  },
];

const sleepGadgets = [
  {
    name: 'sleep3',
    label: '3 Day Average',
    goal: 480,
    days: 3,
    includeToday: false,
    type: 'average',
    active: true,
  },
  {
    name: 'sleep14',
    label: '14 Day Average',
    goal: 480,
    days: 14,
    includeToday: false,
    type: 'average',
    active: true,
  },
  {
    name: 'sleep60',
    label: '60 Day Average',
    goal: 480,
    days: 60,
    includeToday: false,
    type: 'average',
    active: true,
  },
  {
    name: 'total60',
    label: '7 Day +/-',
    goal: 480,
    days: 7,
    includeToday: false,
    type: 'total',
    active: true,
  },
];
