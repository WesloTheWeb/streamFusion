import { navLinksConfig } from "../../config/nav/navConfig";
import classes from './Navigation.module.scss';

const { navLinkContainer, navLink, navIcon } = classes;

const NavigationHeader = ({ }) => {
    return (
        <nav className={navLinkContainer}>
            <h1>StreamFusion</h1>
            <div className={navLink}
            >
                {
                    navLinksConfig.map((navItem) => {
                        return (
                            <a
                                key={navItem.navTitle}
                                href={navItem.path}
                                className={navLink}
                            >
                                {navItem.navTitle}
                                {navItem.icon && (
                                    <svg
                                        className={navIcon}
                                        viewBox={navItem.icon.viewBox}
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d={navItem.icon.path}></path>
                                    </svg>
                                )}
                            </a>
                        )
                    })
                }
            </div>
        </nav>
    );
};

export default NavigationHeader;