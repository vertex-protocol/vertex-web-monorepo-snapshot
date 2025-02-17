import { createContext, use } from 'react';
import { EVMContextData } from './types';

export const EVMContext = createContext<EVMContextData>({} as EVMContextData);

export const useEVMContext = () => use(EVMContext);
