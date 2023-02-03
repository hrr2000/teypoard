import { shuffle } from "@/utils/functions";
import { dictioarnyWordsList } from "../data/dictionary";

interface IGeneratorOptions {
  type: 'dictionary';
  limit?: number
}

export default function useStatementGenerator() {

  const data = {
    dictionary: (options: IGeneratorOptions): string[] => {
      return shuffle(dictioarnyWordsList).slice(0, options.limit || 30);
    }
  }

  const generateStatement = (options: IGeneratorOptions): string[] => {
    return data[options.type](options);
  }

  return {
    generateStatement
  }
}