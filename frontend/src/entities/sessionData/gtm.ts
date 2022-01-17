export default class Gtm {

    gtmUserId: string;
    gtmAgentType: string;

    constructor(userId = '', agentType = '') {
        this.gtmUserId = userId;
        this.gtmAgentType = agentType;
    }

}
