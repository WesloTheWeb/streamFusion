import { NAV_HOME, NAV_GITHUB_TITLE, GITHUB_REPO_LINK } from "../constants/AppConstants"

export const navLinksConfig = [
    {
        navTitle: NAV_HOME,
        path: '/',
        icon: null
    },
    { 
        navTitle: NAV_GITHUB_TITLE,
        path: GITHUB_REPO_LINK,
        icon: {
            viewBox: "0 0 24 24",
            path: "M22,12v9a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V3A1,1,0,0,1,3,2h9a1,1,0,0,1,0,2H4V20H20V12a1,1,0,0,1,2,0Zm-.618-9.923A.991.991,0,0,0,21,2H16a1,1,0,0,0,0,2h2.586l-7.293,7.293a1,1,0,1,0,1.414,1.414L20,5.414V8a1,1,0,0,0,2,0V3a1.01,1.01,0,0,0-.077-.382A1,1,0,0,0,21.382,2.077Z"
        }
    }
];