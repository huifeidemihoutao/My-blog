export interface index {
    counter: number,
    name: string,
    isAdmin: boolean,
    nameLength:number,
    userInfo:{userName:string},
    // @ts-ignore
    $patch(arg: { name: string }),
}
