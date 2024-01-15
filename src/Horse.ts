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

export interface Race {
    idd: number;
    code: string;
    name: string;
    class: string;
    going: string;
    res1: string | undefined;
    res2: string | undefined;
    res3: string | undefined;
    res4: string | undefined;
    res5: string | undefined;
    res6: string | undefined;
    res7: string | undefined;
    res8: string | undefined;
    res9: string | undefined;
    res10: string | undefined;
    res11: string | undefined;
    res12: string | undefined;
    done: boolean;
}
