export class TimelineEvent {
    parentId: number;
    eventType: string;
    start: Date;
    end: Date;
    message: string;
    rect? : {
        height: number;
        width: number;
    };
}

export const resumeConfig: TimelineEvent[] = [

    /*
     * Introduction
     */
    {
        parentId: 0,
        eventType: "work experience",
        start: new Date(),
        end: new Date(),
        message: '<p>Thank you for taking the opportunity to learn about Bernardo P. Leigh. This timeline was developed while discovering new client side technologies.</p> <br/>To navigate one can use the following arrow keys:<br/> &#8592; &#8594;',
        rect: {
            height: 200,
            width: 400
        }
    },

    /*
     * Work Experience
     */
    // Tenderloin Housing Clinic
    {
        parentId: 0,
        eventType: "work experience",
        start: new Date(2004,7,1),
        end: new Date(2006,6,1),
        message: '<h3>Tenderloin Housing Clinic</h3><h4>Client Accounts<span class="date" >Aug 2004 - July 2006</span></h4><p><a target="_blank" href="https://www.thclinic.org/" />Tenderloin Housing Clinic</a> prevents tenant displacement and operates on the Housing First model.</p><p>I started as a Housing Placement Coordinator, vetting clients and aiding them through the housing process until they were sheltered in an SRO. During this time, I started to discover a need to use software to automate my tasks.</p><p> I developed a calculator, using excel, to determine where social workers may have committed mathematical errors on a client\'s account.  I used this tool to ensure data integrity and to correct past mistakes.',
        rect: {
            height: 400,
            width: 400
        }
    },

    // Ship Art International
    {
        parentId: 0,
        eventType: "work experience",
        start: new Date(2006,7,1),
        end: new Date(2009,8,1),
        message: '<h3>Ship Art International</h3><h4>International Coordinator<span class="date" >Aug 2006 - Sept 2009</span></h4><p><a target="_blank" href="http://www.shipart.com/" >Ship Art International</a> is a packing and shipping company that services collectors of fine art.  I had the privelage to coordinate international shipments for musuems and private collectors. I learned the industry and nuances of international customs.</p><p>I had the opportunity to use the excel skills I learned at my previous employment, and developed a calculator to provide estimates on collection, packing and variety of crates. Prior to this, estimates were handled with paper and pencil.</p>',
        rect: {
            height: 350,
            width: 400
        }
    },

    // Parkside Lending
    {
        parentId: 0,
        eventType: "work experience",
        start: new Date(2010,11,1),
        end: new Date(2016,9,27),
        message: '<h3>Parkside Lending LLC</h3><h4>Software Architect<span class="date" >Dec 2010 - Oct 2016</span></h4><p><a target="_blank" href="https://www.parksidelending.com/" >Parkside Lending LLC</a> is a national leader in wholesale and correspondent lending.</p><p>I collaborated as a full-stack engineer; faciliating the companie\'s growth from 60 to 300 plus employees, and the ability to service beyond California and Oregon into 48 states.</p><p>Working during the Dodd-Frank era, I had the opportunity to deliver solutions under pressure due to the constant changes in regulations. These solutions had to be delivered without exception to comply to with <a target="_blank" href="http://www.consumerfinance.gov/" >CFPB</a>.</p>',
        rect: {
            height: 400,
            width: 400
        }
    },

    /*
     * Work Experience
     */
];
