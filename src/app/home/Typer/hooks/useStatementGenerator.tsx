import { dictioarnyWordsList } from "../data/dictionary";

interface IGeneratorOptions { 
    type: 'dictionary';
    limit?: number
}

export default function useStatementGenerator() {

    const data = {
        dictionary: (options: IGeneratorOptions): string[] => {
            return dictioarnyWordsList.sort((a, b) => Math.random() - 0.5).slice(0, options.limit || 30);
        }
    }

    const generateStatement = (options: IGeneratorOptions): string[] => {
        return data[options.type](options);
    }

    return {
        generateStatement
    }
}