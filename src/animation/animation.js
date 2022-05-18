export const textAnimation = {
    hidden: {x: -200, opacity: 0},
    show: {
        opacity: 1,
        x: 0,
        transition: {duration: 2, ease: "easeOut"},
    },
};

export const textAnimation2 = {
    hidden: {opacity: 0},
    show: {opacity: 1, transition: {duration: 2}}
};

export const container = {
    hidden: {x: 100},
    show: {x: 0, transition: {duration: 1.7, ease: "easeOut", staggerChildren: 0.25, when: "beforeChildren"}}
};

export const container2 = {
    show: {x: 0, transition: {duration: .1, ease: "easeOut", staggerChildren: 0.2}}
};

export const imageAnimation = {
    hidden: {scale: 1.1, opacity: 0},
    show: {scale: 1, opacity: 1, transition: {ease: "easeOut", duration: 4}}
}

export const svgArrow = {
    hidden: {x: -200, opacity: 0},
    show: {
        opacity: 1,
        x: 0,
        transition: {duration: 2, ease: "easeOut"},
    },
}

export const pageTransition = {
    hidden: {
        opacity: 0.3,
    },
    show: {
        opacity: 1,
        transition: {
            duration: 1, type: 'spring', damping: 50,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 1
        }
    }
}