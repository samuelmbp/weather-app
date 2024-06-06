import "./Spinner.scss";

const Spinner = () => {
    return (
        <div className="spinner">
            <h2>Loading...</h2>
            <div className="spinner__circle"></div>
        </div>
    );
};

export default Spinner;
