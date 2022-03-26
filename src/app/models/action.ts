export class Action {

    label: string;
    route: string;
    params: any;
    iconRef: string;

    constructor(l: string, r: string, p: any, i: string) {
        this.label = l;
        this.route = r;
        this.params = p;
        this.iconRef = i;
    }

}
