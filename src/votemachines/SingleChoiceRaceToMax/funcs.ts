import { IData } from './interface';

export const getName = () => {
  return 'Single Choice';
};

export const getProgramAddress = () => {
  return 'SingleChoiceRaceToMax';
};

/**
 * Providing both getType and getProgramAddress enables the same program with different views
 * @returns Type of the voting machine
 */
export const getType = () => {
  return 'SingleChoiceRaceToMax';
};

export const deleteChildNode = (data: IData, children:string[], childId:string) => {
  const index = children ? children.indexOf(childId) : -1;
  const result = data.options ? [...data.options] : [];
  if (index === -1) {
    return result;
  }
  result.splice(index, 1);
  return { ...data, options: result };
};

export const getInitialData = () => {
  const data : IData = {
    options: [],
    max: 0,
    includedAbstain: true,
    token: '',
  };
  return data;
};
