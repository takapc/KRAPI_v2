export interface Horse {
    id: number;
    code: string;
    color: number;
    name: string;
    owner: string;
    first: number;
    second: number;
    third: number;
    outs: number;
    total: number;
    apts: number;
    rate: number;
    belong: string;
    birth: number;
    age: number;
    sex: HorseSex;
}

enum HorseSex {
    "牡",
    "牝",
    "騙",
}
