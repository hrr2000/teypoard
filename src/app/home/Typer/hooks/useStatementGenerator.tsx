import { shuffle } from "@/utils/functions";
import { easyEnglishWordsList } from "../data/easyEnglish";

interface IGeneratorOptions {
  type: 'dictionary';
  limit?: number
}

export default function useStatementGenerator() {

  const data = {
    dictionary: (options: IGeneratorOptions): string[] => {
      return shuffle(easyEnglishWordsList).slice(0, options.limit || 30);
    }
  }

  const generateStatement = (options: IGeneratorOptions): string[] => {
    return data[options.type](options);
  }

  return {
    generateStatement
  }
}