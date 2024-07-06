import { createContext } from 'react';

const noteContext = createContext();

export default noteContext;

/*  
Important -
1. createContext is a method in React which can help to create a context directly.
2. We need to import createContext from the react.
3. We just need to create a variable and define the createContext method, and it will automatically create a context.
4. To use to context, we have to use State, for which we can create different javascript file for the same. We can use it here also, but it's better to keep things clean and separate.
*/
