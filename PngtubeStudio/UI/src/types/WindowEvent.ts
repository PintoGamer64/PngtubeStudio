//Const
export type TypeEventWindow = 'minimize' | 'close' | 'restore';
export type TypeEventModels = 'getModels' | 'sendModels';

//Methods
export type TypeEventWindow_Func = (typeEvent: TypeEventWindow) => void
export type TypeEventModels_Func = (typeEvent: TypeEventModels) => Promise<object>