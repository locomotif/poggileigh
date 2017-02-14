export const dashboardConfig = Object.freeze({
    sections: [
        /*
         * Section A: Main Title
         */
        {
            classes: {"section-wrap": true},
            overlay: true,
            style: {
                height: "700px",
                color: "#FFF",
                "text-align": "right"
            },
            img: {
                src: "/assets/images/defines_me_72.jpg"
            },
            title: 'Bernardo Poggi Leigh',
            subTitle: 'developer - artist - tinker - papá',
        },

        /*
         * Section B: Short summary about fine art and development
         */
        {
            classes: {"fg-black": true},
            overlay: false,
            style: {
                "min-height": "200px"
            },
            description: [
                "There are many similarities between art and software development/engineering.  They transform ideas into reality to be consumed and engaging.  This can be both satisfying for the artist and the consumer, if well executed.  They both require attention to detail, persistence, and patience.  Through their process they lend to discovering new approaches, techniques, and how to deal with obstacles. We must keep an open mind! Both these practices have stimulated, frustrated and guided my process of discovery.",
                "I am currently on a self prescribed sabbatical focusing on client side technologies, and preparing to start a new series of works on panel. I am always open to the opportunity to collaborate on ideas.",
            ],
        },

        /*
         * Section C: Category - Software Engineer
         */
        {
            classes: {"section-wrap": true},
            overlay: false,
            style: {
                height: "700px",
                color: "#F6851F",
                "text-align": "right"
            },
            img: {
                classes: "profile",
                src: "/assets/images/BPL_Profile-1_left_72.jpg",
                style: {
                    "margin-left": "-250px",
                }
            },
            title: 'Software Engineer',
            subTitle: 'Full Stack Engineer / DevOps'
        },

        /*
         * Section D: Category - About Software Engineering
         */
        {
            classes: {"fg-black": true},
            overlay: false,
            style: {
                "min-height": "200px"
            },
            description: [
                    "I transitioned to software engineering in 2009, after being layed off from a Fine Art Shipping company, during the mortgage crisis.  I took this opportuinity to develop a portion of me that I had abondoned when I decided to become a Fine Artist -- back in 1997.  I set a goal to immerse myself into this discipline for one year, before setting out to look for a position as a full stack LAMP engineer.  The journey began from the perspective of a Linux Administrator, and slowly bubbling up to client side technologies.  In December 2010, I applied to Parkside Lending LLC where I was employed for approximately 6 years.",
                    "Full Stack Engineering has evolved to a broad beast, which requires time to discover new technologies which fall into its spectrum.  Currently I been in the process of working with: AWS (CloudFormation), ansible, nginx, and angular2."

            ],
        },

        /*
         * Section E: Category - Category Papa
         */
        {
            classes: {"section-wrap": true},
            overlay: true,
            style: {
                height: "700px",
                color: "#FFFFFF",
                "text-align": "right"
            },
            img: {
                src: "/assets/images/fb_72.jpg",
                style: {
                    "margin-top": "-300px",
                },
            },
            title: 'Frankie & Papá',
            subTitle: 'Work/Life Balance'
        },

        /*
         * Section F: Something about papa - Life balance
         */
        {
            classes: {"fg-black": true},
            overlay: false,
            style: {
                "min-height": "200px"
            },
            description: [
                    "I find it difficult to balance life and work.  I tend to lean on the side of work, mostly because I enjoy the chanllanges that it presents me.  I tend to get lost in what I am working on and usualy set a goal to have it completed by a certain time.  This lends it self great to fine art and software development, because I tend to stay on the project until I meet the deadline.  This approach always unbalances any sense of work/life balance.  This is a work in progress!",
            ],
        },

        /*
         * Section G: Category Fine-Artist
         */
        {
            classes: {"section-wrap": true},
            overlay: true,
            style: {
                height: "700px",
                color: "#FFF"
            },
            img: {
                src: "/assets/images/OvergrownWaiting_SM.jpg",
                style: {
                    "margin-left": "-300px"
                }
            },
            title: 'Fine Artist'
        },

        /*
         * Section H: Something about Fine Art
         */
        {
            classes: {"fg-black": true},
            overlay: false,
            style: {
                "min-height": "200px"
            },
            description: [
                    "I moved to SF in 1999 to study at the San Francisco Art Institue, after speding 4.5 years studing Industrial and Systems Engineering at the Unitveristy of Florida. It took a decade to realize that it was difficult for me to be a gallery artist.  I didn't have the business element required to work in a gallery setting.  I enjoy putting on a exhibtion of work, and was lucky to be able to show in some galleries.  My last show, was a group show in 2009, at Togonan Gallery.",
            ],
        },

    ],
});
