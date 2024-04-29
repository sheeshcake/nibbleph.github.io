import React from "react";

const BgOpacity = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
            <defs>
                <filter
                    id="bbblurry-filter"
                    width="400%"
                    height="400%"
                    x="-100%"
                    y="-100%"
                    colorInterpolationFilters="sRGB"
                    filterUnits="objectBoundingBox"
                    primitiveUnits="userSpaceOnUse"
                >
                    <feGaussianBlur
                        x="0%"
                        y="0%"
                        in="SourceGraphic"
                        result="blur"
                        stdDeviation="40"
                    ></feGaussianBlur>
                </filter>
            </defs>
            <g filter="url(#bbblurry-filter)">
                <ellipse
                    cx="395.098"
                    cy="163.88"
                    fill="hsl(37, 99%, 67%)"
                    rx="150"
                    ry="150"
                ></ellipse>
                <ellipse
                    cx="235.148"
                    cy="623.242"
                    fill="hsl(316, 73%, 52%)"
                    rx="150"
                    ry="150"
                ></ellipse>
                <ellipse
                    cx="161.995"
                    cy="285.865"
                    fill="hsl(185, 100%, 57%)"
                    rx="150"
                    ry="150"
                ></ellipse>
            </g>
        </svg>
    );
}

export default BgOpacity;
