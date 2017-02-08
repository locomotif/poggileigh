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
                src: "/assets/images/BPL_Profile-1_right.jpg",
                style: {
                    "margin-left": "-200px",
                }
            },
            title: 'Let\'s collaborate!',
        }
    ],
});
