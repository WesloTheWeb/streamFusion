import { navLinksConfig } from "../../config/nav/navConfig";
import classes from './Navigation.module.scss';

const { navLinkContainer } = classes;

const NavigationHeader = ({ }) => {
    return (
        <nav className={navLinkContainer}>
            <h1>StreamFusion</h1>
            <div>
                {
                    navLinksConfig.map((navLink) => {
                        return (
                            <a
                                key={navLink.navTitle}
                                href={navLink.path}>
                                {navLink.navTitle}
                            </a>
                        )
                    })
                }
            </div>
        </nav>
    );
};

export default NavigationHeader;