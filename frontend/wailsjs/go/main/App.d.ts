// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT
import {main} from '../models';

export function CreateFile(arg1:string,arg2:string,arg3:string,arg4:number):Promise<void>;

export function CreateFolder(arg1:string):Promise<main.Folder>;

export function DeleteFile(arg1:number):Promise<void>;

export function DeleteFilesByFolderID(arg1:number):Promise<void>;

export function DeleteFolder(arg1:number):Promise<void>;

export function GetAllFolders():Promise<Array<main.Folder>>;

export function GetFile(arg1:number):Promise<main.File>;

export function GetFolder(arg1:number):Promise<main.Folder>;

export function Greet(arg1:string):Promise<string>;

export function UpdateFile(arg1:number,arg2:string,arg3:string,arg4:string,arg5:number):Promise<void>;

export function UpdateFileContent(arg1:number,arg2:string):Promise<void>;

export function UpdateFileName(arg1:number,arg2:string):Promise<void>;

export function UpdateFolderName(arg1:number,arg2:string):Promise<void>;
