import './loading_spinner.css';

// функциональный компонент "спиннер загрузки".
function LoadingSpinner() {
    return (
        <div className="loading-spinner">
            <div className="spinner"></div>
        </div>
    );
}

export default LoadingSpinner;