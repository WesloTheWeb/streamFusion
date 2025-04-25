import { GITHUB_PROFILE_LINK } from '../../config';
import classes from './Footer.module.scss';

const { footerContainer } = classes;

const Footer = ({ }) => {
    return (
        <footer className={footerContainer}>
            <p>Made by Wesley</p>
            <p>
                For more of my work, checkout <a href={GITHUB_PROFILE_LINK} target="_blank">my Github</a>
            </p>
        </footer>
    );
};

export default Footer;