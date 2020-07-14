const generateStepperMarks = (stepsCount) => (
  (new Array(stepsCount).fill({}))
    .map((obj, index) => ({
      value: index + 1,
      label: `${index + 1}`,
    }))
);

export default generateStepperMarks;
