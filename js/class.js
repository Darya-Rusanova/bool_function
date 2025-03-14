export class bFunc {
    func = "";
    n = 0;
    constructor(n) {
        this.n = n;
        this.func = randomFunk(n);
    }
    constructor() {
        this.n = n;
        this.func = randomFunk(n);
    }
    show(){
        return `f(${this.n}) = ${this.func}`;
    }
}
function randomFunk(n) {
    var l = Math.pow(2,n);
    var c = ""
    for (let i=0;i<l;i++)
    {
        c+= Math.round(Math.random());
    }
    return c;
}
