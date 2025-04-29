import { AlertCircle } from 'lucide-react';
import classes from './ErrorMessage.module.scss';

const {
    errorContainer,
    errorIcon,
    errorContent,
    errorTitle,
    errorMessage,
    retryButton
} = classes;

interface ErrorMessageProps {
    message: string;
    title?: string;
    onRetry?: () => void;
}

const ErrorMessage = ({
    message,
    title = 'An error occurred',
    onRetry
}: ErrorMessageProps) => {
    return (
        <section className={errorContainer}>
            <div className={errorIcon}>
                <AlertCircle size={48} />
            </div>
            <div className={errorContent}>
                <h2 className={errorTitle}>{title}</h2>
                <p className={errorMessage}>{message}</p>
                {onRetry && (
                    <button className={retryButton} onClick={onRetry}>
                        Try Again
                    </button>
                )}
            </div>
        </section>
    );
};

export default ErrorMessage;