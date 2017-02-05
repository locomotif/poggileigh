export class TimelineEvent {
    start: Date;
    end: Date;
    message: string;
    rect? : {
        height: number;
        width: number;
    };
}

export const resumeConfig: TimelineEvent[] = [
    {
        start: new Date(2006,8,1),
        end: new Date(2009,9,1),
        message: 'Loremem ipsum dolor sit amet <a href="poggileigh.com" >poggileigh.com<a>. Fusce accumsan consectetur congue. Suspendisse ut mi orci. Integer porta libero nullam.',
        rect: {
            height: 400,
            width: 400
        }
    },
    {
        start: new Date(2009,12,1),
        end: new Date(2010,9,1),
        message: "Conclude ",
    },
    {
        start: new Date(2010,12,1),
        end: new Date(2016,9,27),
        message: "<h3>Parkside Lending LLC</h3>",
    },
    {
        start: new Date(),
        end: new Date(),
        message: "\"Thank you for taking the opportunity to learn about Bernardo P. Leigh. This resume timeline was developed while discovering new client side technologies.\" <br/><br/>To move through the timeline you can use any of your error keys &#8592; &#8593; &#8594; &#8595;",
        rect: {
            height: 200,
            width: 400
        }
    }
];
