
export class Filter {
    name: string;
    count: number;
    enabled: boolean;

    constructor(name: string) {
        this.name = name;
        this.count = 0;
        this.enabled = true;

    }


}