class CreateInterface {
    static fields = [];

    static[Symbol.hasInstance](instance) {
        var errors = "";
        var ownKeys = Reflect.ownKeys(instance);
        if (ownKeys.length !== this.fields.length) {
            throw new Error("Count of fields doesn't match!")
        };
        this.fields.forEach( ([name,type]) => {
            (instance[name] !== undefined) ? (instance[name].constructor.name !== (type?.prototype.constructor.name || type.constructor.name) && (errors += `Field: ${name} must to be ${type.prototype.constructor.name} type;`)) : errors += `Field: ${name} is missing in the object;`;
        });
        if (errors.length) {
            throw new Error(errors);
        } else {
            return instance
        }
    }
}

var createObject = (obj, interFace) => {
    class I extends CreateInterface {
        static fields = interFace;
    }
    return (obj instanceof I) && obj;
}

export default createObject;