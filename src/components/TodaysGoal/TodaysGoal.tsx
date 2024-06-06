import "./TodaysGoal.scss";

const TodaysGoal = () => {
    return (
        <div className="todays-goal">
            <h2 className="todays-goal__heading">
                What is your main goal for today?
            </h2>
            <p className="todays-goal__quote">
                When you wake up in the morning you have two choices: go back to
                sleep, or wake up and chase those dreams.
            </p>
        </div>
    );
};

export default TodaysGoal;