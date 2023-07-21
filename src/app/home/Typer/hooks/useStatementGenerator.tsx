import { shuffle } from "@/utils/functions";
import { ITyper } from "..";
import { easyEnglishWordsList } from "../data/easyEnglish";
import { mediumEnglishWordsList } from "../data/mediumEnglish";

type IGeneratorOptions = {
  type: 'dictionary';
  limit?: number
} & Partial<ITyper['options']>

const dataSource = {
  dictionary: {
    easy: easyEnglishWordsList,
    hard: mediumEnglishWordsList
  }
}

export default function useStatementGenerator() {

  const data = {
    dictionary: (options: IGeneratorOptions): string[] => {
      return shuffle(dataSource[options.type][options.difficulty || 'easy']).slice(0, options.limit || 30);
    }
  }

  const generateStatement = (options: IGeneratorOptions): string[] => {
    return data[options.type](options);
  }

  return {
    generateStatement
  }
}