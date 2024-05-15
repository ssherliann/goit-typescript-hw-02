type Props = {
    error: Error;
}

const ErrorMessage: React.FC<Props> = ({ error }) => {
    return (
        <div>
            <p>Error: {error.message}</p>
        </div>
    );
};

export default ErrorMessage;
