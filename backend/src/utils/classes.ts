export const Classes = <T>(bases: (new (...args: any[]) => T)[]) => {
    class Bases {
        constructor() {
            bases.forEach((base) => Object.assign(this, new base()));
        }
    }

    bases.forEach((base) => {
        Object.getOwnPropertyNames(base.prototype).filter((prop) => prop !== 'contructor');
    });

    return Bases;
};
