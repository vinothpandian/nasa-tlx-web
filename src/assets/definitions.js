const definitions = {
  'Mental Demand':
    'How much mental and perceptual activity was required (e.g. thinking, deciding, calculating, remembering, looking, searching, etc.)? Was the task easy or demanding, simple or complex, exacting or forgiving?',
  'Physical Demand':
    'How much physical activity was required (e.g. pushing, pulling, turning, controlling, activating, etc.)? Was the task easy or demanding, slow or brisk, slack or strenuous, restful or laborious?',
  'Temporal Demand':
    'How much time pressure did you feel due to the rate or pace at which the tasks or task elements occurred? Was the pace slow and leisurely or rapid and frantic?',
  Performance:
    'How successful do you think you were in accomplishing the goals of the task set by the experimenter (or yourself)? How satisfied were you with your performance in accomplishing these goals?',
  Effort:
    'How hard did you have to work (mentally and physically) to accomplish your level of performance?',
  'Frustration Level':
    'How insecure, discouraged, irritated, stressed and annoyed versus secure, gratified, content, relaxed and complacent did you feel during the task?',
};

export const shortDefinitions = {
  'Mental Demand': {
    description: 'How mentally demanding was the task?',
    leftValue: 'Low',
    rightValue: 'High',
  },
  'Physical Demand': {
    description: 'How physically demanding was the task?',
    leftValue: 'Low',
    rightValue: 'High',
  },
  'Temporal Demand': {
    description: 'How hurried or rushed was the pace of the task?',
    leftValue: 'Low',
    rightValue: 'High',
  },
  Performance: {
    description: 'How successful were you in accomplishing the task?',
    leftValue: 'Poor',
    rightValue: 'Good',
  },
  Effort: {
    description: 'How hard did you have to work to accomplish your level of performance?',
    leftValue: 'Low',
    rightValue: 'High',
  },
  'Frustration Level': {
    description: 'How insecure, discouraged, irritated, stressed, or annoyed were you?',
    leftValue: 'Low',
    rightValue: 'High',
  },
};

export default definitions;
