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
        message: '<p>Thank you for taking the time to learn about my experiences. This timeline was developed as a goal to learn new client side technologies and implement them in the development of this site.</p>To navigate one can use the following:<p><ul class="list-group" ><li class="list-group-item" ><span class="blue bold" > &#8592; &#8594;&nbsp;&nbsp;</span>left and right arrow keys</li><li class="list-group-item" ><span><i class="fa fa-hand-o-up bold blue" >&nbsp;&nbsp;</i>swipe on touch screen devices</span></li><li class="list-group-item" ><span><i class="fa fa-bullseye bold blue" >&nbsp;&nbsp;</i>click on timeline date</span></li><li class="list-group-item" ><span><a title="Bernardo Poggi Liegh Resume" alt="Bernardo Poggi Liegh Resume" href="http://poggileigh.com/resume.php"><i class="fa fa-file-pdf-o" >&nbsp;</i></a>Click on this PDF icon or top left corner icon to download my resume</span></li></ul>',
        rect: {
            height: 260,
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
        message: '<h3>Tenderloin Housing Clinic</h3><h4>Client Accounts<span class="date" >Aug 2004 - July 2006</span></h4><p><a target="_blank" href="https://www.thclinic.org/" />Tenderloin Housing Clinic</a> prevents tenant displacement and operates on the Housing First model.</p><p>I started as a Housing Placement Coordinator, vetting clients and aiding them through the housing process until they were sheltered in an SRO. During this time, I started to discover a need to use software to automate my tasks.</p><p> I developed a calculator, using excel, to determine mathematical errors in our client\'s accounts.  I used this tool to ensure data integrity and to correct past mistakes.',
        rect: {
            height: 350,
            width: 400
        }
    },

    // Ship Art International
    {
        parentId: 0,
        eventType: "experience",
        start: new Date(2006,7,1),
        end: new Date(2009,8,1),
        message: '<h3>Ship Art International</h3><h4>International Coordinator<span class="date" >Aug 2006 - Sept 2009</span></h4><p><a target="_blank" href="http://www.shipart.com/" >Ship Art International</a> is a packing and shipping company that services collectors of fine art.  I had the privilege to coordinate international shipments for museums and private collectors. I learned the industry and nuances of international customs.</p><p>I had the opportunity to use the excel skills I learned at my previous employment, and developed a calculator to provide estimates on collection, packing and variety of crates. Prior to this, estimates were handled with paper and pencil.</p><p>Top level requirements:<ul class="list-group"><li class="list-group-item" >Configuration page to update material/labor costs.</li><li class="list-group-item" >Interface to select crate type.</li><li class="list-group-item" >Form to enter dimensions of individual works</li><li class="list-group-item" >Ability to select type of materials for wrapping</li><li class="list-group-item" >A results section</li></ul></p>',
        rect: {
            height: 475,
            width: 400
        }
    },

    // Parkside Lending
    {
        parentId: 0,
        eventType: "experience",
        start: new Date(2010,11,1),
        end: new Date(2016,9,27),
        message: '<h3>Parkside Lending LLC</h3><h4>Software Architect<span class="date" >Dec 2010 - Oct 2016</span></h4><p><a target="_blank" href="https://www.parksidelending.com/" >Parkside Lending LLC</a> is a national leader in wholesale and correspondent lending.</p><p>I collaborated as a full-stack engineer; faciliating the company\'s growth from 60 to 300 plus employees, and the ability to service beyond California and Oregon into 48 states.</p><p>Working during the Dodd-Frank era, I had the opportunity to deliver solutions under pressure due to the constant changes in regulations. These solutions had to be delivered without exception to comply with <a target="_blank" href="http://www.consumerfinance.gov/" >CFPB</a>.</p>',
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
        message: '<h3>University of Florida</h3><h4>Systems & Industrial Engineering<span class="date" >May 1993 - Apr 1997</span></h4><p>Relevant course work:<ul class="list-group" ><li class="list-group-item" >C++</li><li class="list-group-item" >Engineering Statistics</li><li class="list-group-item" >Industrial Application of Microprocessors</li></ul></p>',
        rect: {
            height: 200,
            width: 400
        }
    },

    //SantaFe College
    {
        parentId: 0,
        eventType: "education",
        start: new Date(1998,1,6),
        end: new Date(1999,4, 23),
        message: '<h3>Santa Fe College</h3><h4>Fine Arts<span class="date" >Jan 1998 - Apr 1999</span></h4><p>Relevant course work:<ul class="list-group" ><li class="list-group-item" >Intro to Java Programming</li></ul></p>',
        rect: {
            height: 150,
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

    //City College of San Francisco
    {
        parentId: 0,
        eventType: "education",
        start: new Date(2009,1,1),
        end: new Date(2009,12, 1),
        message: '<h3>City College of San Francisco</h3><h4><span class="date" >Jan 2009 - Dec 2009</span></h4><p>Relevant course work:<ul class="list-group" ><li class="list-group-item" >Html</li><li class="list-group-item" >PHP</li><li class="list-group-item" >Unix/Linux</li><li class="list-group-item" >Bash Shell Scripting</li></ul></p>',
        rect: {
            height: 220,
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
        message: '<h3>estilomio.com</h3><p>This project was a collaboration with a cousin in Perú.  We developed an e-commerce application to service Perú, including custom delivery solution. The application was built from the ground up, without the use of any 3rd party framework. I handled the technology, credit card integrations, shipping integration, email campaign, server configuration and artistic direction while my cousin handled the business, vendor accounts, and managing a small team that handled data entry, packaging and photography of products.</p><p>This project took a year to develop, while burning the candle from both ends.  We launced the site in Nov. 2012, and later sold the business to <a href="http://elcomercio.pe/" >elcomercio.pe</a>. I continued to support the application until it was rebuilt. Sometime in mid 2016, <a href="https://ofertop.pe/"> a site also owned by El Commercio</a>, absorbed estilomio.com.<p/>',
        rect: {
            height: 420,
            width: 400
        }
    },

    // pwatterslac.com
    {
        parentId: 0,
        eventType: "projects",
        start: new Date(2010,5,29),
        end: new Date(),
        message: '<h3>pwatterslac.com</h3><p>Acupuncture website for my partner, Patricia Watters.  Direction was provided by client. Photography and development accomplished by me. This was a collaborative effort; however, I had to aid and not intervene in the client\'s vision.</p>',
        rect: {
            height: 200,
            width: 400
        }
    },

    // sqrtube.com
    {
        parentId: 0,
        eventType: "projects",
        start: new Date(2010,3,21),
        end: new Date(),
        message: '<h3>sqrtube.com</h3><p>This was my motivating project that allowed me to transition from being a Fine Artist to Software Developer.  The goal of this project was to build an application that would download targeted emails from a personal email account. I would sign up to as many galleries/museums e-mail list, so that I can be notified on their upcoming shows.</p><p>Top level view of the application:<ul class="list-group"><li class="list-group-item" >Download email and determine type and subtype.</li><li class="list-group-item" >Determine the vendor.</li><li class="list-group-item" >Extract all content and distribute locally either to MySQL or filesystem.</li><li class="list-group-item" >Fix broken HTML tags in the notifications using regular expressions.</li><li class="list-group-item" >Inject custom hooks in the html for later use.</li><li class="list-group-item" >Display the email on sqrtube.com exactly how it was received with no external content.</li></ul></p>',
        rect: {
            height: 400,
            width: 400
        }
    },

    // resume.poggileigh.com
    {
        parentId: 0,
        eventType: "projects",
        start: new Date(2017,0,18),
        end: new Date(),
        message: '<h3>resume.poggileigh.com</h3><p>I set out on this project to learn new technologies, before I began looking for a new employer.</p><p>Main Technologies:<ul class="list-group"><li class="list-group-item" ><a target="_blank" href="https://angular.io/" >Angular 2</a></li><li class="list-group-item" ><a target="_blank" href="https://d3js.org/" >D3</a></li><li class="list-group-item" ><a target="_blank" href="http://sass-lang.com/" >SASS</a></li><li class="list-group-item" ><a target="_blank" href="http://reactivex.io/rxjs/" >RxJS</a></li><li class="list-group-item" ><a target="_blank" href="https://cli.angular.io/" >Angular-cli</a></li></li><li class="list-group-item" ><a target="_blank" href="https://cli.angular.io/" >typescript</a></li></li></ul></p><p>Some of the Supporting Technologies:<ul class="list-group"><li class="list-group-item" >nginx</li><li class="list-group-item" >ansible</li><li class="list-group-item" >npm scripts with bash scripts</li><li class="list-group-item" >AWS Cloud Formation</li><li class="list-group-item" >vim</li><li class="list-group-item" >git</li></ul></p>',
        rect: {
            height: 475,
            width: 400
        }
    },
];
