interface Command {
    cmd: any;
    usage: string;
    minargs: number;
    func: (msg: any) => string;
    minrank: number;
    hidden: boolean;
}

export = Command;