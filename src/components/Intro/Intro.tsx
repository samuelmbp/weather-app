import DateTimeDisplay from "../DateTimeDisplay/DateTimeDisplay";
import "./Intro.scss";

interface IntroProps {
    greeting: string;
    name: string;
    region: string;
    country: string;
}

const Intro = ({ greeting, name, region, country }: IntroProps) => {
    return (
        <div className="intro">
            <div className="intro__container">
                <h2 className="intro__greeting">{greeting}</h2>
                <DateTimeDisplay />
            </div>
            <h3 className="intro__location">
                {name}, {region}, {country}
            </h3>
        </div>
    );
};

export default Intro;
