import { Request, Response } from 'express';
export declare const userSignup: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const userSignin: (req: Request, res: Response) => Promise<void>;
export declare const deleteUser: (req: Request, res: Response) => Promise<void>;
export declare const updateUser: (req: Request, res: Response) => Promise<void>;
export declare const getAllUsers: (req: Request, res: Response) => Promise<void>;
