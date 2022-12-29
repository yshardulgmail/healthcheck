import { Bars, Circles } from "react-loader-spinner";

export const LoadingIndicatorBars = props => {
    return (
        <div
            style={{
                width: "100%",
                height: "100",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Bars color="#009EDC" height="80" width="150" />
        </div>)
};

export const LoadingIndicatorCircles = props => {
    return (<div
        style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}
    >
        <Circles color="#009EDC" height="80" width="150" />
    </div>);
};

// export default LoadingIndicatorBars;