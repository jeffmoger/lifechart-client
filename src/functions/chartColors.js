export const chartColors = (palette) => {
  const colors = {
    calorieChart: {
      title: 'Calories Burned vs Consumed',
      burned: 'hsl(246, 100%, 78%)', //rgb(152, 141, 255)
      consumed: 'hsl(143, 49%, 78%)', //rgb(171, 226, 192)
    },
    nutritionChart: {
      title: 'Caloric Breakdown',
      protein: 'hsl(143, 49%, 55%)',
      fat: 'hsl(143, 49%, 70%)',
      carbs: 'hsl(143, 49%, 85%)',
      toolTip: {
        cursor: {
          fill: '#333333',
          stroke: '#222222',
          strokeWidth: 0,
        },
      },
    },
    moodChart: {
      title: 'Mood & Wellbeing',
      energy: 'rgb(84, 196, 127)',
      irritability: 'rgb(246, 96, 85)',
      mood: 'rgb(255, 184, 77)',
      toolTip: {
        cursor: {
          stroke: '#222',
          strokeWidth: 1,
        },
      },
    },
    sleepChart: {
      title: 'Sleep Patterns',
      sleep: 'rgb(152, 141, 255)',
      toolTip: {
        cursor: {
          fill: '#333333',
          stroke: '#222222',
          strokeWidth: 0,
        },
      },
    },
    weightChart: {
      title: 'Weight',
      weight: 'rgb(220, 133, 249)',
      toolTip: {
        cursor: {
          stroke: '#222',
          strokeWidth: 1,
        },
      },
    },
    symptomChart: {
      title: 'My Symptoms',
      toolTip: {
        cursor: {
          stroke: '#222',
          strokeWidth: 1,
        },
      },
    },
    colorArray: [
      'rgb(182, 182, 124)',
      'rgb(124, 182, 124)',
      'rgb(124, 182, 182)',
      'rgb(139, 124, 182)',
      'rgb(182, 124, 139)',
      'rgb(121, 134, 203)', //indigo
      'rgb(100, 181, 246)', //blue
      'rgb(77, 208, 225)', //cyan
      'rgb(77, 182, 172)', //teal
      'rgb(129, 199, 132)', //green
      'rgb(174, 213, 129)', //light green
      'rgb(220, 231, 117)', //lime
      'rgb(255, 241, 118)', //yellow
      'rgb(255, 213, 79)', //amber
      'rgb(255, 183, 77)', //orange
      'rgb(255, 138, 101)', //deep orange
      'rgb(161, 136, 127)', //brown
      'rgb(229, 115, 115)', //red
    ],
    styles: {
      cartesianGrid: '#202020',
      axisX: '#EEE',
      axisY: '#BBB',
    },
    wrapperStyle: {
      backgroundColor: '#000',
      opacity: 0.8,
      border: '1px solid #8884d8',
      textShadow: '1px 1px black',
    },
    type: palette.type,
  };

  const colors_light = {
    calorieChart: {
      burned: 'hsl(246, 100%, 68%)', //rgb(152, 141, 255)
      consumed: 'hsl(143, 49%, 68%)', //rgb(171, 226, 192)
    },
    nutritionChart: {
      protein: 'hsl(143, 49%, 30%)',
      fat: 'hsl(143, 49%, 45%)',
      carbs: 'hsl(143, 49%, 60%)',
      toolTip: {
        cursor: {
          fill: '#EEE',
          stroke: '#999',
          strokeWidth: 0,
        },
      },
    },
    moodChart: {
      energy: 'rgb(84, 196, 127)',
      irritability: 'rgb(246, 96, 85)',
      mood: 'rgb(255, 184, 77)',
      toolTip: {
        cursor: {
          stroke: '#CCC',
          strokeWidth: 1,
        },
      },
    },
    sleepChart: {
      sleep: 'rgb(152, 141, 255)',
      toolTip: {
        cursor: {
          fill: '#EEE',
          stroke: '#999',
          strokeWidth: 0,
        },
      },
    },
    weightChart: {
      weight: 'rgb(220, 133, 249)',
      toolTip: {
        cursor: {
          stroke: '#CCC',
          strokeWidth: 1,
        },
      },
    },
    symptomChart: {
      toolTip: {
        cursor: {
          stroke: '#CCC',
          strokeWidth: 1,
        },
      },
    },
    colorArray: [
      'rgb(182, 182, 124)',
      'rgb(124, 182, 124)',
      'rgb(124, 182, 182)',
      'rgb(139, 124, 182)',
      'rgb(182, 124, 139)',
      'rgb(121, 134, 203)', //indigo
      'rgb(100, 181, 246)', //blue
      'rgb(77, 208, 225)', //cyan
      'rgb(77, 182, 172)', //teal
      'rgb(129, 199, 132)', //green
      'rgb(174, 213, 129)', //light green
      'rgb(220, 231, 117)', //lime
      'rgb(255, 241, 118)', //yellow
      'rgb(255, 213, 79)', //amber
      'rgb(255, 183, 77)', //orange
      'rgb(255, 138, 101)', //deep orange
      'rgb(161, 136, 127)', //brown
      'rgb(229, 115, 115)', //red
    ],
    styles: {
      cartesianGrid: '#CCCCCC',
      axisX: '#666666',
      axisY: '#666666',
    },
    wrapperStyle: {
      backgroundColor: '#FFF',
      opacity: 0.8,
      border: '1px solid #8884d8',
    },
    type: palette.type,
  };
  if (palette.type === 'dark') return colors;
  if (palette.type === 'light') return colors_light;
};

export const wrapperStyle = () => {
  return {
    backgroundColor: '#000000',
    opacity: 0.8,
    border: '1px solid #8884d8',
    textShadow: '1px 1px black',
  };
};

export const chartDefaults = () => {
  return {
    cartesianGrid: '#202020',
  };
};
