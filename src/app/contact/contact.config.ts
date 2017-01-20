export const contactConfig = Object.freeze({
    emailService: {
        requestUrl: "http://resume.poggileigh.com:81/index.php"
    },
    sections: [
        /*
         * Section C: Category - Software Engineer
         */
        {
            classes: {"section-wrap": true},
            overlay: true,
            style: {
                height: "500px",
                color: "#FFFFFF",
                "text-align": "right"
            },
            img: {
                src: "/assets/images/Profile-2.jpg",
                style: {
                }
            },
            title: 'Let\'s collaborate!',
        },

        /*
         * Section D: Category - About Software Engineering
         */
        /*
        {
            classes: {"fg-black": true},
            overlay: false,
            style: {
            },
            description: [
                "Thanks for taking the time to learn about me.  I look forward to the opportunity to collaborate on a new or legacy project -- or just have drink."
            ],
        }
        */
    ],
});
