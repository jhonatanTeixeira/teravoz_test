import Serialize from 'serialazy/lib/dist/decorators/serialize';

export class ActionTransfer {
    @Serialize()
    readonly type: string;

    @Serialize({name: 'call_id'})
    readonly callId: string;

    @Serialize()
    readonly destination: string;

    constructor(type: string, callId: string, destination: string) {
        this.type = type;
        this.callId = callId;
        this.destination = destination;
    }
}