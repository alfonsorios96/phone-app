import { css } from 'lit-element';

export const fadeInTransitionPage = css`
    @keyframes fadeInTransitionPage {
        0% {
        transform: translate(0, 100%);
        animation-timing-function:ease-in-out
        }
        10% {
        transform: translate(0, 90%);
        animation-timing-function:ease-in-out
        }
        20% {
        transform: translate(0, 80%);
        animation-timing-function:ease-in-out
        }
        30% {
        transform: translate(0, 70%);
        animation-timing-function:ease-in-out
        }
        40% {
        transform: translate(0, 60%);
        animation-timing-function:ease-in-out
        }
        50% {
        transform: translate(0, 50%);
        animation-timing-function:ease-in-out
        }
        60% {
        transform: translate(0, 40%);
        animation-timing-function:ease-in-out
        }
        70% {
        transform: translate(0, 30%);
        animation-timing-function:ease-in-out
        }
        80% {
        transform: translate(0, 20%);
        animation-timing-function:ease-in-out
        }
        90% {
        transform: translate(0, 10%);
        animation-timing-function:ease-in-out
        }
        100% {
        transform: translate(0, 0);
        animation-timing-function:ease-in-out
        }
    }
`;
