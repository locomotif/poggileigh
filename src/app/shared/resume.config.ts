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
        eventType: "introduction",
        start: new Date(),
        end: new Date(),
        message: '<p>Thank you for taking the time to learn about my work related experiences. This timeline was developed while discovering new client side technologies.</p> <br/>To navigate one can use the following arrow keys:<br/> &#8592; &#8594; or swipe on mobile devices.',
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
        eventType: "experience",
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
        eventType: "experience",
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
        eventType: "experience",
        start: new Date(2010,11,1),
        end: new Date(2016,9,27),
        message: '<h3>Parkside Lending LLC</h3><h4>Software Architect<span class="date" >Dec 2010 - Oct 2016</span></h4><p><a target="_blank" href="https://www.parksidelending.com/" >Parkside Lending LLC</a> is a national leader in wholesale and correspondent lending.</p><p>I collaborated as a full-stack engineer; faciliating the companie\'s growth from 60 to 300 plus employees, and the ability to service beyond California and Oregon into 48 states.</p><p>Working during the Dodd-Frank era, I had the opportunity to deliver solutions under pressure due to the constant changes in regulations. These solutions had to be delivered without exception to comply to with <a target="_blank" href="http://www.consumerfinance.gov/" >CFPB</a>.</p>',
        rect: {
            height: 400,
            width: 400
        }
    },

    /*
     * education
     */
    //University of Florida
    {
        parentId: 0,
        eventType: "education",
        start: new Date(1993,6,15),
        end: new Date(1997,4,15),
        message: '<h3>University of Florida</h3><h4>Systems & Industrial Engineering<span class="date" >May 1993 - Apr 1997</span></h4>',
        rect: {
            height: 100,
            width: 400
        }
    },

    //SantaFe College
    {
        parentId: 0,
        eventType: "education",
        start: new Date(1998,1,6),
        end: new Date(1999,4, 23),
        message: '<h3>Santa Fe College</h3><h4>Fine Arts<span class="date" >Jan 1998 - Apr 1999</span></h4>',
        rect: {
            height: 100,
            width: 400
        }
    },

    //San Francisco Art Institute
    {
        parentId: 0,
        eventType: "education",
        start: new Date(1999,8,15),
        end: new Date(2001,4, 22),
        message: '<h3>San Francisco Art Institute</h3><h4>Bachelor of Fine Arts, Painting<span class="date" >May 1999 - Apr 2001</span></h4>',
        rect: {
            height: 100,
            width: 400
        }
    },

    /*
     * projects
     */
    // estilomio.com
    {
        parentId: 0,
        eventType: "projects",
        start: new Date(2012,7,30),
        end: new Date(),
        //https://web.archive.org/web/20131124015427/https://estilomio.com/
        //https://web-beta.archive.org/web/20131124015427/https://estilomio.com/
        message: '<h3>estilomio.com</h3>',
        rect: {
            height: 100,
            width: 400
        }
    },

    // pwatterslac.com
    {
        parentId: 0,
        eventType: "projects",
        start: new Date(2010,5,29),
        end: new Date(),
        message: '<h3>pwatterslac.com</h3>',
        rect: {
            height: 100,
            width: 400
        }
    },

    // sqrtube.com
    {
        parentId: 0,
        eventType: "projects",
        start: new Date(2010,3,21),
        end: new Date(),
        message: '<h3>sqrtube.com</h3><p>When I decided to teach myself to become a software developer, I set a project that would challenge me during the learning process.  The objective of the project was to download emails from galleries I had signed up to their mailing list and extract all the content and save to MySQL, then reproduce the emails on sqrtube.com.</p>',
        rect: {
            height: 400,
            width: 400
        }
    },
];
